
import {Component,Output,OnInit,Inject,EventEmitter,ElementRef,ViewChild,AfterViewInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';



import {UserSV} from './../../../../service/user';

@Component({
    selector:'check_activated',
    directives:[ROUTER_DIRECTIVES],
    providers:[UserSV],
    templateUrl:'./check_activated.html'
    
})

export class CheckActivatedCP implements OnInit {
 
    
    constructor(
        
        private users:UserSV,
      
        private elementRef: ElementRef
    ) {
      
    }
  
    
    email = ''
   
    checkActivate:boolean
  
    public ngOnInit(){
        if(this.users.getToken()){
            this.users.getUser(this.users.getToken()).subscribe(data => {
                if(data.activated == 0 && data.email){
                   
                    this.checkActivate = true; 
                    this.email = data.email;  
                }
              
            },error => console.error(error))
        }else{
            this.checkActivate = false;    
        }    
    }
    public resendEmailNew(){
        this.users.resendNewEmail(this.users.getToken()).subscribe(data => {
            console.log(data);
        },err => console.error(err))
    }
    
}