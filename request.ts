import Client from "./index.js";


let client: any =  new  Client()
 await client.Login("");
await client.init("Zu1LhuTYHLXWjgdeBgVlIt1iF6c2v9Awi-at80CMQMc")

console.log(await client.sendMsg("Hello"))




