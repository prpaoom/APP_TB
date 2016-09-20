import { Component, Input, OnInit} from '@angular/core';
import { NotificationSV } from './../../../../service/notification';
import { UserSV } from './../../../../service/user';
import { TimeAgoPipe } from './../../../../pipe/time-ago.pipe';

@Component({
  selector: 'md-notificationlist',
  templateUrl: 'notificationlist.html',
  providers: [NotificationSV, UserSV],
  pipes: [TimeAgoPipe],
})

export class NotificationlistCP{
    constructor(
        private noti: NotificationSV,
        private user: UserSV
    ){} 

    notiResult:any = []; 
    ngOnInit(){  
        this.user.getUser(this.user.getToken()).subscribe(
            data => {  
              this.getNoti(data._id, (dataCB:any) => {
                 this.notiResult = dataCB;
              });
            }
        );  
    }  
    
    public getNoti(send_to:any, cb:any){
        this.noti.getNoti(send_to).subscribe(
            data => {   
              cb(data);
            }
        )
    }

    public readNoti(id:any){
        this.noti.readNoti(id).subscribe();
    }

    public readAll(uid:any){
        this.user.getUser(this.user.getToken()).subscribe(
            data => {  
                this.noti.readAll(data._id).subscribe(data_noti => {
                    this.getNoti(data._id,(dataCB:any) => { 
                        this.notiResult = dataCB;
                    }); 
                },err => console.error(err)); 
            }
        );   
    } 
}
