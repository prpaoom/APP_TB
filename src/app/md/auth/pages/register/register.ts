import {ROUTER_DIRECTIVES, Router} from '@angular/router'; 
import {ControlGroup,Control} from '@angular/common';
import { REACTIVE_FORM_DIRECTIVES, FormBuilder, Validators } from '@angular/forms';
import {Component, OnInit} from '@angular/core'; 
import {UserSV} from './../../../../service/user';
import {AppFn} from './../../../../appfn';
import {FacebookCP} from './../facebook/facebook';

@Component({
    selector: 'register', 
    templateUrl: './register.html',
    directives: [ROUTER_DIRECTIVES,REACTIVE_FORM_DIRECTIVES,FacebookCP],
    providers: [UserSV]
    
})


export class RegisterCP implements OnInit{
    app = new AppFn();
    formRegister:any
    email:string 
    password:string
    passwordComfirm:string
    message:string
    checkUserLogin:boolean
    fname:string
    lname:string
    //formRegister:ControlGroup
    user = {email:'',password:'',confirmPassword:''};
    // success:string
    // error
    site_url = this.app.local_url();
    location:string
    gender = '1';

    constructor(
        private users:UserSV,
        private router:Router,
        private formBuilder:FormBuilder
    ){}

    public ngOnInit():any{

         this.users.getLocation().subscribe(data => {
             console.log(data)
                        this.location = data.country;
                    },error => console.error(error))
        if(this.users.getToken()){
            this.users.getUser(this.users.getToken()).subscribe(data => {
                if(!data.first_name && !data.last_name){
                    this.checkUserLogin = true;     
                }else{
                    this.checkUserLogin = false;
                }       
            },error => console.error(error))
        }
        
        this.formRegister = this.formBuilder.group({
            'email': ['',Validators.compose([Validators.required,emailValidator])],
            'password':['',Validators.compose([Validators.required,Validators.maxLength(20),Validators.minLength(8)])],
            'confirmPassword':['',Validators.compose([Validators.required])]
        })
       // this.checkUserLogin = this.users.checkLogin()
       
    }
    
    public updateName(){
       // const current = this.router.hostComponent.name
       
        this.users.updateName(this.users.getToken(),this.fname,this.lname,this.gender).subscribe(
            data => {
                if(data.status){
                    this.message = data.message;
                    
                    setTimeout(() => {
                        
                        this.router.navigate(['']);
                    }, 2000);    
                }else{
                    this.message = data.message;
                }
             
            },error => console.error(error)
        )
    }

    public register(){
        console.log(this.formRegister);
        
         if(this.formRegister.status != 'INVALID' && this.formRegister.value.password == this.formRegister.value.confirmPassword){
            this.user = this.formRegister.value;
            
            this.users.register(this.user.email,this.user.password,this.user.confirmPassword,this.location).subscribe(
                data => {
                     
                   if(data.status){
                        // this.success = true;
                        // this.error = false;
                        this.users.setToken(data.token);
                        setTimeout(() => {
                            window.location.href = this.app.local_url()+"/wall";
                            //this.router.navigate(['/login']);
                        }, 2000);
                   }else{
                    //this.error = true;
                      
                   }   
                },error => console.error(error)
            )
        }else{
           // this.success = false;
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

function passwordValidator(control:any){
    ///(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])/
    if(control.value.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])/)){
        return null;
    }else{
       return { 'invalidPassword': true }; 
    }
}
