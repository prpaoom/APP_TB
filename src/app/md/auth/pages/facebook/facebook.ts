import {Component,Input,OnInit} from '@angular/core';
import {UserSV} from './../../../../service/user';
declare const FB:any;
@Component({
    selector:'facebook',
    templateUrl:'./facebook.html',
    providers:[UserSV]
})
export class FacebookCP implements OnInit {
    constructor(private users:UserSV) {
        FB.init({
            appId      : '859792680761155',
            cookie     : false,  // enable cookies to allow the server to access
                                // the session
            xfbml      : true,  // parse social plugins on this page
            version    : 'v2.5' // use graph api version 2.5
        });
    }
    @Input() redirect:boolean = true;
    @Input() title_button:string;
    public ngOnInit(){
        
        FB.getLoginStatus((response:any) => {
            this.statusChangeCallback(response);
        });
        
    }
    statusChangeCallback(resp:any) {
        
        if (resp.status === 'connected') {
            
            // connect here with your server for facebook login by passing access token given by facebook
        }else if (resp.status === 'not_authorized') {
            
        }else {
            
        }
    };
    onFacebookLoginClick() {
        FB.login((facebook:any) =>{
                console.log(facebook);
               FB.api('/me?fields=id,birthday,first_name,last_name,gender,picture.type(large),cover,email', (data:any) => {
                
                    if(facebook.status != 'not_authorized'){
                        this.users.loginFacebook(data).subscribe(data => {
                        
                            if(data.status){
                                this.users.setToken(data.token);
                                console.log(data.token);
                                if(this.redirect){
                                    window.location.href = 'http://localhost:3000/home';
                                }else{
                                    window.location.reload();    
                                }
                                
                            }
                        
                        },error => console.error(error))

                    }
                    
                
               
            });
            
            
        },{scope: 'public_profile,email,user_birthday'});
        
    }

 }