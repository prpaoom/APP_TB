import { Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder,Validators,REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {UserSV} from './../../../../service/user';
import {AppFn} from './../../../../appfn';
@Component({
  
  templateUrl: './resend.html',
  directives:[REACTIVE_FORM_DIRECTIVES],
  providers:[UserSV]
})
export class ResendCP implements OnInit {
    constructor(
        private router: Router,
        private users: UserSV,
        private formBuilder:FormBuilder
    ){}
    app = new AppFn();
    site_url = this.app.local_url();
    formEmail:any;
    message:string;
    public ngOnInit(){
        this.users.checkLogin();
        this.users.getUser(this.users.getToken()).subscribe(data => {
            console.log(data);
            if(data.activated == 1){
                this.router.navigate(['/wall'])   
            }
        },error => console.error(error))
        this.formEmail = this.formBuilder.group({
            'email':['',emailValidator]   
        })

    }
    public resetEmail(){
        
        if(this.formEmail.status == 'VALID'){
            console.log(this.formEmail.value.email); 
            this.users.resetEmail(this.formEmail.value.email,this.users.getToken()).subscribe(
                data => {
                    if(data.status){
                        window.location.reload();
                        this.message = data.message;
                    }else{
                        this.message = data.message;
                    }
                    console.log(data);
                },error => console.error(error)
            )
           
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
