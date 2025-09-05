--- README (quick steps to add to GitHub) ---


1. Create a new GitHub repository (e.g., `web-timer-alarm`).
2. Locally: create a folder and save the above `index.html` file (copy from this doc). Add `server.js` if you want webhook handling.


Commands:


```bash
git init
git add index.html server.js README.md
git commit -m "Initial: Web timer + optional Node server"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```


3. To serve the front-end during development you can simply open `index.html` in a browser. For cross-device testing (mobile -> desktop) use a simple static server:


```bash
npm i -g serve
serve .
```


4. To connect to your NodeMCU / IoT Cloud: either configure the NodeMCU to subscribe to the MQTT topic `home/timers` (or the topic you set), or have the Node server translate the POST into the cloud vendor's API (HTTP+Auth). When timer ends the front-end will POST to the webhook you set.




--- End of files ---