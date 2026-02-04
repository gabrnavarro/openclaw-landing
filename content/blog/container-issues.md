---
title: "Disk quota exceeded error in docker containers"
date: "2020-04-04"
tags: ['docker', 'jenkins', 'linux']
---

At work, we experienced an issue with Jenkins builds starting to randomly fail on the slaves
with a pretty obscure error:

> OCI runtime create failed: container_linux.go:345:
> starting container process caused "process_linux.go:424: container init caused \"join session keyring: create session
> key: disk quota exceeded\"": unknown

We aggresively use docker images to build and deploy artifacts as well as run various scripts. Almost every shell script is run inside a docker container to make sure that the configuration of the "machines" are the same for all runs. This means we have hundreds of containers in the slaves, although most of them are not really running.


One morning, everything started to break, and our deploy jobs were affected, so I sprung into action and took a look.

## Disk quota?

At first glance, the error looked like a disk issue, so by instinct, I first checked whether the disk in one of the slaves was full.

```
jenkins@ip:~$ df -h
Filesystem      Size  Used Avail Use% Mounted on
udev             16G     0   16G   0% /dev
tmpfs           3.1G  584K  3.1G   1% /run
/dev/nvme1n1p1  7.7G  2.0G  5.7G  26% /
tmpfs            16G     0   16G   0% /dev/shm
tmpfs           5.0M     0  5.0M   0% /run/lock
tmpfs            16G     0   16G   0% /sys/fs/cgroup
/dev/nvme0n1p3   28G   13G   15G  47% /home/jenkins
/dev/nvme0n1p2   84G  8.5G   76G  11% /var/lib/docker
overlay          84G  8.5G   76G  11% /var/lib/docker/1001.1001/overlay2/8ec5fac4206d1918bda2f/merged
shm              64M     0   64M   0% /var/lib/docker/1001.1001/containers/c61c68c4c23b8841e468a/mounts/shm
tmpfs           3.1G     0  3.1G   0% /run/user/1001
```

There was nothing unusual in particular here, as no disks were really full. Next, I checked the inode usage.

```
jenkins@ip:~$ df -ih
Filesystem     Inodes IUsed IFree IUse% Mounted on
udev             3.9M   335  3.9M    1% /dev
tmpfs            3.9M   561  3.9M    1% /run
/dev/nvme1n1p1  1000K  107K  894K   11% /
tmpfs            3.9M     1  3.9M    1% /dev/shm
tmpfs            3.9M     3  3.9M    1% /run/lock
tmpfs            3.9M    18  3.9M    1% /sys/fs/cgroup
/dev/nvme0n1p3    14M  430K   14M    4% /home/jenkins
/dev/nvme0n1p2    42M  254K   42M    1% /var/lib/docker
overlay           42M  254K   42M    1% /var/lib/docker/1001.1001/overlay2/8ec5fac41918bda2f/merged
shm              3.9M     1  3.9M    1% /var/lib/docker/1001.1001/containers/c61c6877e16063d7f9757f0a568fa5c4c23b8841e468a/mounts/shm
tmpfs            3.9M    10  3.9M    1% /run/user/1001
```

Hmm. Nothing unusual as well. If the disk wasn't full, there must be a config somewhere that's limiting it, so I took a second look at the error
message for more clues.


> "join session keyring: create session key:


## Keyrings

It looked like some type of resource related to keyrings reached its limit, so I looked at the keyring limits and how many were running.

```
jenkins@ip:~$ cat /proc/sys/kernel/keys/maxkeys
1000000
jenkins@ip-:~$ cat /proc/sys/kernel/keys/root_maxkeys 
1000000
jenkins@ip:~$ cat /proc/keys | wc -l
243
```

The limits are large enough, and the keys are also pretty small relative to it. At this point, I got pretty stumped, until I read the `keyrings(7)`
manual and found another interesting config:


> /proc/sys/kernel/keys/maxbytes (since Linux 2.6.26)
>    This is the maximum number of bytes of data that a nonroot
>    user can hold in the payloads of the keys owned by the user.
>
>    The default value in this file is 20,000.

So i checked it.
```
jenkins@ip4:~$ cat /proc/sys/kernel/keys/maxbytes
20000
```

Aha. That limit is pretty low, considering we have about 243 keyrings. So I bumped it up to about 50mb. Turns out it was actually the issue,
and have found similar issues after some deep googling. Two things/bugs i learned:


- [The default limit for number of keyrings is high, but the disk space they can use is extremely low](https://github.com/opencontainers/runc/pull/582)
- [A unique session key is created for every linux container](https://github.com/opencontainers/runc/issues/726) which was why the issue only happened when there were too many containers in the slaves already.

## TLDR;/ Solution

We mitigated the issue by pruning the containers first using `docker prune -f a`, or `docker container prune`, then we set the correct limit by editing the config.

```
echo "52428800" > /proc/sys/keys/maxbytes
```
