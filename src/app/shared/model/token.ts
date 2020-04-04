import { TokenType } from './tokenType';

export class Token {
    token:string;
    isValid:boolean;
    tokenType:TokenType
    constructor(token:string,isValid:boolean,tokenType:TokenType){
        this.token=token;
        this.isValid=isValid;
        this.tokenType=tokenType;
    }
    
}