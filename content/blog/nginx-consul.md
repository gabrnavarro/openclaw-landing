---
title: "Setting up an NGINX proxy using consul-template and puppet"
date: "2020-07-26"
tags: ['nginx', 'consul', 'puppet']
---

Consul template is a wonderful tool that allows you to create configuration templates while interpolating consul resources and many important variables. You can also use these templates to automatically change the contents of your configuration files using the `watch` class in puppet.

To set up an nginx proxy using consul-template to control configuration, what you can do is initialize nginx using the `puppet-nginx` module and change the config files using consul template.

Here is the full code for reference. This is just what it should roughly look like, and I haven't tested this, so please read it and just take whichever parts you need to make it work.

```
// init.pp
class sample_proxy() {
  include consul_template

  $nginx_template = 'nginx-template'
  $ctmpl_template = "${::consul_template::config_dir}/${nginx_template}.ctmpl"

  $nginx_config = '/etc/nginx/sites-enabled/_.conf'

  file { $ctmpl_template:
ensure  => 'file',
content => template("templates/${nginx_template}.ctmpl.erb"),
mode    => '0644',
owner   => 'root',
group   => 'root',
notify  => Service['consul-template'],
  }

  consul_template::watch { $nginx_template:
config_hash   => {
  command     => 'service nginx reload',
  destination => $nginx_config,
  source      => $ctmpl_template,
},
  }

  exec { $nginx_template:
command   => "consul-template -once -template '${ctmpl_template}:${nginx_config}'",
tries     => 3,
try_sleep => 1,
unless    => "/usr/bin/test -s ${nginx_config}",
notify    => Service['nginx'],
require   => [
  File[$ctmpl_template],
  Service['consul'],
],
  }

  class { 'nginx': }

  apt::ppa { 'ppa:nginx/stable': }
}
```

```
// templates/${nginx_template}.ctmpl.erb
server {
  listen *:80;

  server_name           _;

  resolver                   8.8.8.8;
  index  index.html index.htm index.php;
  access_log            /mnt/logs/nginx/_.access.log default;
  error_log             /mnt/logs/nginx/_.error.log;

  location / {
proxy_pass             http://www,sample_website.com/{{ key "foo" }};
proxy_read_timeout     90s;
proxy_connect_timeout  90s;
proxy_send_timeout     90s;
proxy_redirect         off;
proxy_set_header       Host $host;
proxy_set_header       X-Real-IP $remote_addr;
proxy_set_header       X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header       Proxy "";
  }
```

Let's go by the parts one by one.

```
// init.pp
class sample_proxy() {
  include consul_template

  $nginx_template = 'nginx-template'
  $ctmpl_template = "${::consul_template::config_dir}/${nginx_template}.ctmpl"

  $nginx_config = '/etc/nginx/sites-enabled/_.conf'
```

In this part, we just initialize file paths for our config files:

- The path for the consul template configuration
- The file for the nginx config, which we will use as target when we run `consul-template`. In this case our server is named `_`, but you can change this to whatever you prefer.

```
  consul_template::watch { $nginx_template:
config_hash   => {
  command     => 'service nginx reload',
  destination => $nginx_config,
  source      => $ctmpl_template,
},
  }
```

Here, we create a ["watch"](https://www.consul.io/docs/commands/watch) from the consul template to the target nginx file. The `command` attribute is ran every time a change is detected. So, every time the config changes, we trigger an `nginx reload`.

```
exec { $nginx_template:
command   => "consul-template -once -template '${ctmpl_template}:${nginx_config}'",
tries     => 3,
try_sleep => 1,
unless    => "/usr/bin/test -s ${nginx_config}",
notify    => Service['nginx'],
require   => [
  File[$ctmpl_template],
],
  }
```

Here, we execute consul-template once to trigger the watch for the first time. If the config file already exists, it means that the nginx config has already been created and is being watched, so we don't have to run `consul-template` anymore.

```
  class { 'nginx': }

  apt::ppa { 'ppa:nginx/stable': }
```

This includes the nginx module, which sets up the nginx service and whatnot.

Let's head over to the template for the nginx server.

```
// templates/${nginx_template}.ctmpl.erb
server {
  listen *:80;

  server_name           _;

  resolver                   8.8.8.8;
  index  index.html index.htm index.php;
  access_log            /mnt/logs/nginx/_.access.log default;
  error_log             /mnt/logs/nginx/_.error.log;
}
```

In here, the server is just initialized and is listening at port 80. I had to use `8.8.8.8` as a resolver, but you can remove this part if you don't need it. The file paths for `access_log` and `error_log` can also be changed to your liking.

```
  location / {
proxy_pass             http://www,sample_website.com/{{ key "foo" }};
proxy_read_timeout     90s;
proxy_connect_timeout  90s;
proxy_send_timeout     90s;
proxy_redirect         off;
proxy_set_header       Host $host;
proxy_set_header       X-Real-IP $remote_addr;
proxy_set_header       X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header       Proxy "";
  }
```

In here, we are telling nginx to forward requests from the root path to `http://www.sample_website.com` plus the value of the key `foo` in your consul KV. If this value changes, then new requests are routed to the new URI. Consul template will then restart on its own.
