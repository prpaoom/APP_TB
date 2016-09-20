declare var io:any;
export class AppFn {
    
    constructor(){
        
        
    }
    
   
   public static get api(): string { 
       return 'http://192.168.0.15:7777'; 
    }
    
    public api():string{

        return 'http://192.168.0.13:7777'; 

    }
    public connectSocket(){
        var socket = io.connect('192.168.0.15:7777');
        return socket;
    }
    public local_url():string{
        return 'http://localhost:8080'
    }

    public body(obj:any): any{
        return JSON.stringify(obj);
    }

}