import {Injectable} from '@angular/core';
import {Http, Response,Headers} from '@angular/http';
import {AppFn} from './../appfn';
@Injectable()
export class ChatSV {
    app = new AppFn();
    headers = new Headers();
    constructor(private http:Http) {
        this.headers.append('Content-Type','application/json');
    }
    public getListFriend(token:string){
        return this.http.post(this.app.api()+'/chat/getListFriend',this.app.body({access_token:token}),{headers:this.headers}).map(res => res.json());
    }
    public addActivities(friend_id:string,token:string){
        return this.http.post(this.app.api()+'/chat/addActivities',this.app.body({friend_id:friend_id,access_token:token}),{headers:this.headers}).map(res => res.json()); 
    }
    public readChat(gid:string,token:string){
        return this.http.post(this.app.api()+'/chat/readChat',this.app.body({gid:gid,access_token:token}),{headers:this.headers}).map(res => res.json());    

    }
    
    public getListGroup(token:string){
        return this.http.post(this.app.api()+'/chat/chatgroup',this.app.body({access_token:token}),{headers:this.headers}).map(res => res.json());    
    }
    public getListActivities(token:string){
        return this.http.post(this.app.api()+'/chat/chatActivities',this.app.body({access_token:token}),{headers:this.headers}).map(res => res.json());    
    }
    public chatMessage(token:string,gid:string){
        return this.http.post(this.app.api()+'/chat/chatMessage',this.app.body({gid:gid,access_token:token}),{headers:this.headers}).map(res => res.json());
    }
    public chatGroupMessage(token:string,gid:string){
        return this.http.post(this.app.api()+'/chat/chatGroupMessage',this.app.body({gid:gid,access_token:token}),{headers:this.headers}).map(res => res.json());
    }
    public findFriend(token:string,find:string,user_id:string){
        return this.http.post(this.app.api()+'/chat/findFriend',this.app.body({find:find,user_id:user_id,access_token:token}),{headers:this.headers}).map(res => res.json());
    }
    public lastRead(gid:string){
        return this.http.post(this.app.api()+'/chat/lastRead',this.app.body({gid:gid}),{headers:this.headers}).map(res => res.json());    
    }
    public sendChatMessage(token:string,gid:string,message:string,shop_id:string){
        return this.http.post(this.app.api()+'/chat/sendChatMessage',this.app.body({gid:gid,message:message,shop_id:shop_id,access_token:token}),{headers:this.headers}).map(res => res.json()); 
    }

    public chatSetting(token:string, state:number, val:any){
        return this.http.post(this.app.api()+'/chat/chatSetting',this.app.body({access_token:token, state:state, val:val}),{headers:this.headers}).map(res => res.json());    
    }

    public addGroup(user_id:string,friend_id:string,token:string){
        return this.http.post(this.app.api()+'/chat/addGroup',this.app.body({user_id:user_id,friend_id:friend_id,access_token:token}),{headers:this.headers}).map(res => res.json());    
    }
    public updateGroup(gid:string,name:string,token:string){
        return this.http.post(this.app.api()+'/chat/updateNameGroup',this.app.body({gid:gid,name:name,access_token:token}),{headers:this.headers}).map(res => res.json()); 

    }
    public addFriendGroup(gid:string,friend_id:string,token:string){
        return this.http.post(this.app.api()+'/chat/addFriendGroup',this.app.body({gid:gid,friend_id:friend_id,access_token:token}),{headers:this.headers}).map(res => res.json());    
    }
    public delUserGroup(gid:string,friend_id:string,token:string){
        return this.http.post(this.app.api()+'/chat/delUserGroup',this.app.body({gid:gid,friend_id:friend_id,access_token:token}),{headers:this.headers}).map(res => res.json()); 
    }
    public createGroup(name:string,listFriend:any,user_id:string,token:string){
        return this.http.post(this.app.api()+'/chat/createGroup',this.app.body({name:name,listFriend:listFriend,user_id:user_id,access_token:token}),{headers:this.headers}).map(res => res.json());     
    }
   
   

    
}
