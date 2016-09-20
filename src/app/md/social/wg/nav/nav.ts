import { Component , OnInit} from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import {AppFn} from './../../../../appfn'; 
import { NotificationSV } from './../../../../service/notification';
import { UserSV } from './../../../../service/user';

@Component({
  selector: 'NavBar',
  templateUrl: './nav.html',
  providers: [NotificationSV, UserSV],
  directives:[ROUTER_DIRECTIVES],
})



export class NavCP{
  app = new AppFn;
  site_url = this.app.local_url(); 

  sum_noti:string
  sum_reqFriend:string 
  arr:any = [];
  constructor(
    private sv_noti:NotificationSV,
    private sv_user:UserSV
  ){} 
  
  public ngOnInit(){
      this.sv_user.getUser(this.sv_user.getToken()).subscribe(
        data => {  
          this.sv_noti.getNoti(data._id).subscribe(
            data2 => {  
              if(data2){
                  data2.forEach((n:any) => {
                  if(n.read == 0){
                    this.arr.push(n._id);
                  } 
                }); 

                this.sum_noti = this.arr.length;
              }
              
            }
          ); 
        }
      );

      this.sv_user.getUser(this.sv_user.getToken()).subscribe(
        data => {  
          this.sv_noti.requestFriend(data._id).subscribe(
            data2 => { 
              this.sum_reqFriend = data2.length;  
            }
          ); 
        }
      );
  }
}