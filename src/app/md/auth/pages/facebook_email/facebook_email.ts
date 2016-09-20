import {Component,OnInit} from '@angular/core';
import {FormBuilder,Validators,REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
//import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router} from '@angular/router-deprecated';
import {Router} from '@angular/router'; 
import {UserSV} from '../../../../service/user';
import {AppFn} from '../../../../appfn';
@Component({
    templateUrl:'./facebook_email.html',
    providers:[UserSV],
    directives:[REACTIVE_FORM_DIRECTIVES]
})
export class New_emailCP implements OnInit {
    constructor(
        private formBuilder:FormBuilder,
        private users:UserSV,
        private route:Router
    ){}
    app = new AppFn();
    formNewEmail:any;
    email ='';
    message:string
    public ngOnInit(){
        console.log(this.app);
        this.formNewEmail = this.formBuilder.group({
            'email':['',emailValidator]   
        })
    }
    public newEmail(){
        if(this.formNewEmail.status == 'INVALID'){
            console.log('Invalid');
        }else{

            console.log(this.formNewEmail.value.email);
            
            this.users.newEmail(this.formNewEmail.value.email,this.users.getToken()).subscribe(data => {
                console.log(data);
                if(data.status){
                    window.location.href = this.app.local_url()+'/wall';  
                }else{
                    this.message = data.message;
                }
            },error => console.error(error));
            //console.log('Valid');
        }
    }
}
function emailValidator(control:any) {
   if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
       
      return null;
    } else {
       
        return { 'invalidEmailAddress': true };
      }
    } 