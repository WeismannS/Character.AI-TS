# Character.AI
![img.png](https://user-images.githubusercontent.com/60429301/222687912-6494b4b1-12b5-4ea5-bb17-4242113dfe7c.png)

Unofficial Javascript/Typescript Library for character.ai


- [Getting started](https://github.com/WeismannS/Character.AI-JS/wiki)

Initialize a Client and Login
```js
// CommonJS
const  Client  = require('character.ai').default;
//ESM
import  Client  from 'character.ai';

let client = new Client()
client = client.Loggin("token") // both returns a new client with token and logs in in place
```
the default of the second arg of ``innit`` is false, will start a new chat if it set to true, if there is no previous history between character and client it will create one

```js
const character = await client.innit("characterId",true) // returns a Character and sets client's current character to it 
const msg = await client.sendMsg("Hello!") // returns a Message Object
const History = client.replies // Chat History
```

This project was created using `bun init` in bun v0.5.7. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
