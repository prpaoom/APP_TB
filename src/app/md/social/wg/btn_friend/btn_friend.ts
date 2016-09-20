import { Component , OnInit, Input} from '@angular/core';
import { NotificationSV } from './../../../../service/notification';
import { UserSV } from './../../../../service/user';

@Component({
    selector: 'btn_friend',
    templateUrl: 'btn_friend.html',
    providers: [NotificationSV, UserSV]
})

export class BtnFriendCP{

    @Input() uid:any
    @Input() type:any
    chk_status:any
    btn_friend:any

    constructor(
        private sv_noti:NotificationSV,
        private sv_user:UserSV
    ){}

    public ngOnInit(){ 
        this.chk_status = 0;    
        this.sv_user.getUser(this.sv_user.getToken()).subscribe(
            session => { 
                this.sv_noti.defaultBtnFriend(session._id, this.uid).subscribe(
                    data => { 
                        if(data != ''){
                            if(data[0].status == 0){
                                this.btn_friend = 1;
                            }else{
                                this.btn_friend = 2;
                            } 
                            
                        }else{
                            this.btn_friend = 0;
                        }
                    }
                );
            }
        ); 
    }

    public addFriend(uid:any){
        this.sv_user.getUser(this.sv_user.getToken()).subscribe(
            session => {
                this.sv_noti.addFriend(session._id, uid).subscribe(
                    friend => {
                        this.checkBtnFriend(session._id, uid);

                        /* ---------------- template add noti ---------------- */
                        var host_id = session._id; //user_id || shop_id
                        var send_to = uid; //user_id only 
                        var message = 'ส่งคำขอเป็นเพื่อนกับคุณ';
                        var photo = '';
                        var link = 'page/'+session.username; 

                        this.sv_noti.addNoti(host_id, send_to, message, photo, link).subscribe(); 
                        /* ---------------- template add noti ---------------- */
                    }
                );
            }
        );
    }

    public delFriend(uid:any){
        this.sv_user.getUser(this.sv_user.getToken()).subscribe(
            session => {
                this.sv_noti.delFriend(session._id, uid).subscribe(
                    friend => {
                        this.btn_friend = 0;
                    }
                );
            }
        );
    }

    public acceptFriend(uid:any){
        this.sv_user.getUser(this.sv_user.getToken()).subscribe(
            session => {
                this.sv_noti.acceptFriend(uid, session._id).subscribe(
                    friend => {
                        this.checkBtnFriend(uid, session._id);

                        /* ---------------- template add noti ---------------- */
                        var host_id = session._id; //user_id || shop_id
                        var send_to = uid; //user_id only 
                        var message = 'รับคุณเป็นเพื่อนของเขาแล้ว';
                        var photo = '';
                        var link = 'page/'+session.username; 

                        this.sv_noti.addNoti(host_id, send_to, message, photo, link).subscribe(); 
                        /* ---------------- template add noti ---------------- */
                    }
                );
            }
        );
    }

    public checkBtnFriend(uid:any, uid_res:any){
        this.sv_noti.checkBtnFriend(uid, uid_res).subscribe(
            check => {   
                if(check != ''){
                    this.chk_status = check.status; 
                    this.btn_friend = 1;
                }else{
                    this.chk_status = 0;
                    this.btn_friend = 0;
                }
            }
        );
    } 
 
}