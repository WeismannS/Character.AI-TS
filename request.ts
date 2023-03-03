import Client from "./index.js";


let client: any =  new  Client()
 await client.Login("50958918b9aa2b1821240152d50f008d2be3eb7a");
await client.init("Zu1LhuTYHLXWjgdeBgVlIt1iF6c2v9Awi-at80CMQMc")

console.log(await client.sendMsg("Hello"))




