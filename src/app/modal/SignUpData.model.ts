export interface SignUpandLoginInResponse {
    kind:string;
    idToken:string;
    email:string;
    rereshToken:string;
    expiresIn:string;
    localId:string;
    registered?:boolean;

}

export class User {
    constructor(public email:string,public id:string, private _token:string, private _tokenExpDate:Date){}

    get token(){
        if(!this._tokenExpDate || new Date() > this._tokenExpDate){
            return null;
        }
        return this._token
    }
}