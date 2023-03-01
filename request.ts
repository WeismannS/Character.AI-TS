import Client from "./index.js";


let client: any =  new  Client()
 await client.Login("50958918b9aa2b1821240152d50f008d2be3eb7a");
await client.init("RQrrOj-UNdEV2_PC5D03US-27MZ7EUtaRH_husjbRQA")

console.log(await client.sendMsg("Hello World"))



