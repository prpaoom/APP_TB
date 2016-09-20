
import { Component,OnInit,Input} from '@angular/core';
import { Router,ROUTER_DIRECTIVES } from '@angular/router';
import {REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {FacebookCP} from './../facebook/facebook';
import {AppFn} from './../../../../appfn';
import {UserSV} from './../../../../service/user';
declare const FB:any;
@Component({
 
  templateUrl: './login.html',
  directives:[ROUTER_DIRECTIVES,FacebookCP],

  providers:[UserSV]

})
export class LoginCP {
    app = new AppFn
    constructor(
        private users: UserSV,
        private route: Router 
    ){}
    @Input() redirect:boolean = true;
    private email = '';
    private password = '';
    private message = '';
    site_url = this.app.local_url(); 
    public ngOnInit(){
        
        // FB.getLoginStatus(response => {
        //     this.statusChangeCallback(response);
        // });
        
    }
    statusChangeCallback(resp:any) {
        
        if (resp.status === 'connected') {
            
            // connect here with your server for facebook login by passing access token given by facebook
        }else if (resp.status === 'not_authorized') {
            
        }else {
            
        }
    };
   
    public getData(){
        this.users.checkButtonAuth();
        console.log('Success');
    }
    public login(){
        const data = {'email':this.email, 'password':this.password}; 
        this.users.login(data).subscribe(
            data => {
                if(data.statusLogin){
                    //this.route.navigate(['Home'])
                    if(this.redirect){
                        window.location.href = this.site_url;
                    }else{
                        window.location.reload();    
                    }
                    //window.location.href = 'http://localhost:3000/wall';
                    //this.message = data.message
                    this.users.setToken(data.token);

                }else{
                    this.message = data.message;
                }
            }, error => console.error(error)
        )
    }
}
