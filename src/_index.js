import {hello} from "./hello";

export class Greeting{
    constructor(name){
        console.log(hello(name))
    }
}