import {Injectable} from '@angular/core';
import {Http, Response,Headers} from '@angular/http';
import {AppFn} from './../appfn';
@Injectable()
export class NotificationSV {
    app = new AppFn();
    headers = new Headers();
    constructor(private http:Http) {
        this.headers.append('Content-Type','application/json');
    }

    public getNoti(send_to:any){ 
        return this.http.post(this.app.api()+'/notification/get_noti',this.app.body({'send_to':send_to}),{headers:this.headers}).map(res => res.json());
    }

    public addNoti(host_id:any, send_to:any, message:any, photo:any, link:any){ 
        return this.http.post(this.app.api()+'/notification/insert_noti',this.app.body({'host_id':host_id, 'send_to':send_to, 'message':message, 'photo':photo, 'link':link}),{headers:this.headers}).map(res => res.json());
    }

    public readNoti(id:any){
        return this.http.post(this.app.api()+'/notification/read_noti',this.app.body({'id':id}),{headers:this.headers}).map(res => res.json()); 
    }

    public readAll(uid:any){
        return this.http.post(this.app.api()+'/notification/read_all',this.app.body({'uid':uid}),{headers:this.headers}).map(res => res.json()); 
    } 


    public addFriend(user_id:any, user_id_res:any){
        return this.http.post(this.app.api()+'/notification/addFriend',this.app.body({'user_id':user_id, 'user_id_res':user_id_res}),{headers:this.headers}).map(res => res.json()); 
    }

    public delFriend(user_id:any, user_id_res:any){
        return this.http.post(this.app.api()+'/notification/delFriend',this.app.body({'user_id':user_id, 'user_id_res':user_id_res}),{headers:this.headers}).map(res => res.json()); 
    }



    public requestFriend(send_to:any){
        return this.http.post(this.app.api()+'/notification/requestFriend',this.app.body({'send_to':send_to}),{headers:this.headers}).map(res => res.json()); 
    }


    public acceptFriend(uid:any, uid_res:any){
        return this.http.post(this.app.api()+'/notification/acceptFriend',this.app.body({'uid':uid, 'uid_res':uid_res}),{headers:this.headers}).map(res => res.json()); 
    }

    public acceptAll(uid_res:any){
        return this.http.post(this.app.api()+'/notification/acceptAll',this.app.body({'uid_res':uid_res}),{headers:this.headers}).map(res => res.json()); 
    }

    public checkBtnFriend(uid:any, uid_res:any){
        return this.http.post(this.app.api()+'/notification/checkBtnFriend',this.app.body({'uid':uid, 'uid_res':uid_res}),{headers:this.headers}).map(res => res.json()); 
    }

    public defaultBtnFriend(uid:any, uid_res:any){
        return this.http.post(this.app.api()+'/notification/defaultBtnFriend',this.app.body({'uid':uid, 'uid_res':uid_res}),{headers:this.headers}).map(res => res.json()); 
    }

    public getUser(){
        return this.http.post(this.app.api()+'/notification/getUser',this.app.body({}),{headers:this.headers}).map(res => res.json()); 
    }
    public recommendFriend(uid:any){
        return this.http.post(this.app.api()+'/notification/recommendFriend',this.app.body({'uid':uid}),{headers:this.headers}).map(res => res.json()); 
    }
    
    public associateFriend(uid:any){
        return this.http.post(this.app.api()+'/notification/associateFriend',this.app.body({'uid':uid}),{headers:this.headers}).map(res => res.json()); 

    }
}
