import { Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder,Validators,REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {UserSV} from './../../../../service/user';
@Component({
  
  templateUrl: './addmore.html',
  directives:[REACTIVE_FORM_DIRECTIVES],
  providers:[UserSV]
})
export class AddmoreCP implements OnInit {
    constructor(
        private router: Router,
        private formBuilder:FormBuilder,
        private users:UserSV
    ){}
    formProfile:any
    gender:string = '1'
    message:string
    public ngOnInit(){
        this.formProfile =  this.formBuilder.group({
            first_name : ['',Validators.compose([Validators.required,Validators.minLength(4),Validators.maxLength(30)])],
            last_name:  ['',Validators.compose([Validators.required,Validators.minLength(4),Validators.maxLength(30)])],
        })
    }
    public updateProfile(){
        console.log()
        if(this.formProfile.status != 'INVALID'){
            
            this.users.updateName(this.users.getToken(),this.formProfile.controls['first_name'].value,this.formProfile.controls['last_name'].value,this.gender).subscribe(
                data => {
                    console.log(data);
                    if(data.status){
                       
                        this.router.navigate(['/social/wall']);
                        
                    }else{
                        this.message = data.message;
                    }
                
                },error => console.error(error)
            )
        }else{
            this.message = 'ข้อมูลไม่ถูกต้อง';    
        }
        

    }

}
