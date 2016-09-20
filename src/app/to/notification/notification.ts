import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { NotificationSV } from './../../service/notification';

@Component({
    selector: 'notification',
    templateUrl: '/notification.html', 
    providers: [NotificationSV],
})

export class NotificationCP{
    constructor(
        private noti: NotificationSV
    ){} 
    data_noti:any = [];
    @Input() send_to:any; 
    ngOnInit(){  
        var send_to = '57835f55f0d71d8f518b4567'; 
        this.getNoti(send_to);
    }  
    
    public getNoti(send_to:any){
        this.noti.getNoti(send_to).subscribe(
            data => {  
                this.data_noti = data;  
            }
        )
    }

    public readNoti(id:any){
        this.noti.readNoti(id).subscribe(
            data => {
                console.log(data);
            }
        ) 
    }

    public readAll(uid:any){
        this.noti.readAll(uid).subscribe(
            data => {
                console.log(data);
                
            }
        )
    } 
}