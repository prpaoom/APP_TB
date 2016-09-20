import { Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder,Validators,REACTIVE_FORM_DIRECTIVES} from '@angular/forms'
import {UserSV} from './../../../../service/user';
import {AppFn} from './../../../../appfn';
@Component({
  
  templateUrl: './resetpass.html',
  providers:[UserSV],
  directives:[REACTIVE_FORM_DIRECTIVES]
})
export class ResetpassCP {
    app = new AppFn;
    constructor(
        private router: Router,
        private users:UserSV,
        private formBuilder:FormBuilder
    ){}
    formNewPassword:any
    uid: string
    token: string
    message: string
    password: string
    passwordConfirm: string
    site_url = this.app.local_url();
    public ngOnInit(){
        this.formNewPassword = this.formBuilder.group({
            password: ['',Validators.compose([Validators.required,Validators.minLength(8),Validators.maxLength(20)])],
            passwordConfirm : ['',Validators.compose([Validators.required,Validators.minLength(8),Validators.maxLength(20)])]
        })
        this.router.routerState.queryParams.subscribe(params => {
            this.uid = params['uid'];
            this.token = params['token'];
            this.users.reset(this.uid, this.token).subscribe(
                data => { 
                    if(data.message != 'success'){
                        this.router.navigate(['/login']);
                    } 
                }, error => console.error(error)
            )
        })
       
    }

    public submitReset(){
        
        if(this.formNewPassword.status != 'INVALID' && this.formNewPassword.value.password == this.formNewPassword.value.passwordConfirm){
            this.users.submit_reset(this.uid, this.formNewPassword.value.password,this.formNewPassword.value.passwordConfirm).subscribe(
                data => {
                    console.log(data);
                    if(data.status){
                        this.message = 'เปลี่ยนรหัสผ่านสำเร็จ...';
                        this.router.navigate(['/login']);   
                    }else{
                        this.message = data.message;   

                    }
                }, error => console.error(error)
            )
        }  
        
    }
}
