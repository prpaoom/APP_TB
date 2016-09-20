import {Injectable,ViewChild} from '@angular/core';
import {Http, Response,Headers} from '@angular/http'; 

import {Router} from '@angular/router';

import {CookieService} from 'angular2-cookie/core';

import {AppFn} from './../appfn';

export interface myData {
   status:number;
}
@Injectable()
export class UserSV{
    app = new AppFn(); 
    private site = 'http://192.168.0.27:7777';
    private url = 'http://192.168.0.27:7777/auth/setToken';
    public status = 0 ;
    share_data:myData = {status:0}
    modelData = {uid:1}
     
   
    constructor(
        private http: Http,
        private _cookieService:CookieService,
        private route:Router
    ){}

    public forgot(email:string){ 
        const url = this.app.api();  
        const headers = new Headers();
        headers.append('Content-Type','application/json');
        return this.http.post(this.app.api()+'/auth/submit_forgot',this.app.body({'email':email}),{headers:headers}).map(res => res.json()); 
    }
    
   
    public loginFacebook(data:any){
        const headers = new Headers();
        headers.append('Content-Type','application/json'); 
        return this.http.post(this.app.api()+'/auth/facebookMobile',this.app.body(data),{headers:headers}).map(response => response.json());
    }
    public reset(uid:string, token:string){
        const url = this.app.api(); 
        const headers = new Headers();
        headers.append('Content-Type','application/json');
        return this.http.post(this.app.api()+'/auth/reset',this.app.body({'uid':uid, 'token':token}),{headers:headers}).map(res => res.json()); 
    }
    public resendNewEmail(token:string){
        const url = this.app.api(); 
        const headers = new Headers();
        headers.append('Content-Type','application/json');
        return this.http.post(this.app.api()+'/auth/resendNewEmail',this.app.body({access_token:token}),{headers:headers}).map(res => res.json());    
    }
    public submit_reset(uid:string, password:string, passwordConfirm:string){
        const url = this.app.api(); 
        const headers = new Headers();
        headers.append('Content-Type','application/json');
        return this.http.post(this.app.api()+'/auth/submit_reset',this.app.body({'uid':uid, 'password':password, 'passwordConfirm':passwordConfirm}),{headers:headers}).map(res => res.json()); 
    }
    public resetEmail(email:string,token:string){
        const headers = new Headers();
        headers.append('Content-Type','application/json');  
        return this.http.post(this.app.api()+'/auth/resetEmail',this.app.body({email:email,access_token:token}),{headers:headers}).map(res => res.json());  
    }
    public checkButtonAuth(){
        if(!this.getToken()){

            return {status:false,target:'.check_login'}
        }else{
           return {status:true,target:''} 
        }
    }
    public checkLoginCP(cb:any){
        this.getUser(this.getToken()).subscribe(data => {
            if(data.statusLogin){
                cb(true);
            }else{
                cb(false);
               
            } 
              
        },error => console.error(error))      
    }
    public checkLogin(){
        if(this.getToken()){
           
            this.getUser(this.getToken()).subscribe(data => {
                if(!data.email){
                    this.route.navigate(['/newemail'])    
                }
                if(!data.first_name && !data.last_name){
                    this.route.navigate(['/addmore'])
                }
                
              
            },error => console.error(error))
          
        }else{
            this.route.navigate(['/login'])
      
        }
    }
    

    public getToken(){
        return this._cookieService.get('token_bzn');
    }

    public setToken(token:string){
      this._cookieService.put('token_bzn', token);
    }

    public updateName(token:string,fname:string,lname:string,gender:string){
        const body:string = JSON.stringify({fname:fname,lname:lname,gender:gender,access_token:token}); 
        const headers = new Headers();
        headers.append('Content-Type','application/json'); 
        return this.http.post(this.app.api()+'/auth/submit_name',body,{headers:headers}).map(res => res.json())   
    }
    public newEmail(email:string,token:string){
        const headers = new Headers();
        headers.append('Content-Type','application/json');
        return this.http.post(this.app.api()+'/auth/newEmail',this.app.body({email:email,access_token:token}),{headers:headers}).map(res => res.json());    
    }
    public register(email:string,password:string,passwordComfirm:string,location:string){
        const url = this.app.api();
        const body:string = JSON.stringify({email:email,password:password,passwordComfirm:passwordComfirm,location:location});
        const headers = new Headers();
        headers.append('Content-Type','application/json');
        return this.http.post(this.app.api()+'/auth/submit_register',body,{headers:headers}).map(res => res.json());
    }

    public login(data:any){ 
      const headers = new Headers();
      headers.append('Content-Type','application/json');  
      return this.http.post(this.app.api()+'/auth/local_login',this.app.body(data),{headers:headers}).map(response => response.json());
    }
    public getLocation(){
        return this.http.get('http://ip-api.com/json').map(res => res.json());
    }
    public activated(uid:string,token:string){
        const headers = new Headers();
        headers.append('Content-Type','application/json'); 
        return this.http.post(this.app.api()+'/auth/confirm',this.app.body({uid:uid,token:token}),{headers:headers}).map(response => response.json());

    }
    public getUser(token:string){ 
       
        const headers = new Headers();
        headers.append('Content-Type','application/json');
        return this.http.post(this.app.api()+'/auth/getUser',this.app.body({access_token:token}),{headers:headers}).map(response => response.json());
    }
}