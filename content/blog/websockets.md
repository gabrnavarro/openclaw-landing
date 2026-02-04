---
title: "Accessing websocket data using userscripts"
date: "2020-05-19"
tags: ['javascript', 'userscripts']
---

Recently, I joined a game in Crowdpurr, an online trivia game app where people can answer trivia quesitons in multiple choice format. With everyone working from home, it quickly became a competition between who googles the answers the fastest. So, I decided to make a script to google the answers as soon as my browser picks up the questions.

Crowdpurr sends the data to and from the server using a single websocket connection. This is created as soon as your page loads. So my idea was, to be able to pick up the questions, I need to add my own listener to the websocket. To do that, I used a tool called Tampermonkey.


Tampermonkey is a userscript manager that lets you run Javascript on the browser. 


```
// ==UserScript==
// @name         Crwdlive script
// @include      /^https://crowd.live
// @include      /^https://www.crowd.live
// @run-at       document-start
// @grant        none
// ==/UserScript==
```

The `@include` directive tells the script to only run on the specified domain, while the `@run-at` directive tells the script when to run.

To get the websocket object, I simply wrapped the `WebSocket` constructor around a new function where I store a reference of the websocket object in the window so I can play around with it. Now, whenever the constructor is called, the function will add the socket instance into our `window`. 


```
window.mysocket = undefined;
const nativeWebSocket = window.WebSocket;
window.WebSocket = function(...args){
  const socket = new nativeWebSocket(...args);
  window.mysocket = socket;
  return socket;
};
```

Now that we already have the socket, we can now do things with it! In my case, I simply added a listener that picks up the question in the json body and adds the query in a google URL.


```
  window.mysocket.addEventListener('message', eventListener);
```

```
const eventListener = function (event) {
let jsonData = event.data.substring(2);
jsonData = jsonData.slice(0, -1);
jsonData = JSON.parse(jsonData);
jsonData = JSON.parse(jsonData);
if (jsonData.msg == 'result') {
    let result = jsonData.result;
    if (result && typeof result.forEach === 'function') {
        result.forEach(item => {
            if ('questionType' in item) {
                console.log(item.body);
                const google = "https://www.google.com/search?q=" + item.body;
                setTimeout(() => {
                    window.open(encodeURI(google));
                }, 500);
            }
        });
    }
}
};
```

You can play around with the websocket object as you like. In my case, I was able to request questions ahead of time by sending the same requests the app would do!
