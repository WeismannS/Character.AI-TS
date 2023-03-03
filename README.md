# Character.AI
![img.png](https://user-images.githubusercontent.com/60429301/222687912-6494b4b1-12b5-4ea5-bb17-4242113dfe7c.png)

Unofficial Javascript/Typescript Wrapper for character.ai


- [Getting started](https://github.com/WeismannS/Character.AI-JS/wiki)

Initialize a Client and Login
```js
import  Log_in,{Client}  from 'character.ai';

let client:Client = await Log_in("token") // returns the Client
```
the default of the second arg of ``innit`` is false, will start a new chat if it set to true, if there is no previous history between character and client it will create one

```js
const character = await client.innit("characterId",true) // returns a Character and sets client's current character to it 
const msg :Msg = await client.sendMsg("Hello!") // returns a Message Object
const History : Array<Msg> = client.history // returns an Array of Messages
```
to get user info
```js
const user = client.me // returns a User Object
```
lookFor returns an Array of Characters that has the same name as the first arg 
the second argument sorts the array by the amount of interactions the characters has, the default is "score"
```js
const characters : Array<char> = await client.lookFor("characterName","interactions") // returns an Array of Characters
````


This project was created using `bun init` in bun v0.5.7. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
