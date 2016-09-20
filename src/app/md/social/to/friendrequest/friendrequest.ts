import { Component, OnInit} from '@angular/core';
import { NotificationSV } from './../../../../service/notification';
import { UserSV } from './../../../../service/user';
import { BtnFriendCP } from './../../wg/btn_friend/btn_friend';
// <<<<<<< HEAD


// @Component({
//   selector: 'md-friendrequest',
//   templateUrl: './friendrequest.html',
//   directives: [BtnFriendCP],
//   providers: [NotificationSV, UserSV]
// })
// export class FriendrequestCP {

//   reqestFriend:any
//   acpAll:any
//   alluser:any

//   constructor(
//     private sv_noti:NotificationSV,
//     private sv_user:UserSV
//   ){}

//   public ngOnInit(){
//     this.acpAll = 0;
//     this.sv_user.getUser(this.sv_user.getToken()).subscribe(
//         data => {   
//           this.sv_noti.requestFriend(data._id).subscribe(
//             data3 => { 
//               this.reqestFriend = data3;
//             }
//           );
//         }
//     );

//     this.sv_noti.getUser().subscribe(
//       dataUser => {
//         this.alluser = dataUser;
//       }
//     );
//   }

//   public acceptAll(){
//     this.sv_user.getUser(this.sv_user.getToken()).subscribe(
//         user => {  
//           this.sv_noti.acceptAll(user._id).subscribe(
//             data => {
//               this.acpAll = 1;
//             }  
//           );
//         }
//     );
//   }
// =======
@Component({
  selector: 'md-friendrequest',
  templateUrl: './friendrequest.html',
  directives:[BtnFriendCP],
  providers: [NotificationSV, UserSV]
})
export class FriendrequestCP implements OnInit{

  constructor(
    private noti:NotificationSV,
    private users:UserSV
  ){}

  token:any;
  user_id:string;
  recommend:any = [];
  association:any = [];
  reqestFriend:any
  acpAll:any
  alluser:any

  public ngOnInit(){
      this.users.getUser(this.users.getToken()).subscribe(
        data => {
          this.user_id = data._id
          this.getRecommend(this.user_id);
          //this.getAssociation(this.user_id);
        },error => console.log(error)
      )

       this.acpAll = 0;
        this.users.getUser(this.users.getToken()).subscribe(
            data => {   
              this.noti.requestFriend(data._id).subscribe(
                data3 => { 
                  this.reqestFriend = data3;
                }
              );
            }
        );

        this.noti.getUser().subscribe(
          dataUser => {
            this.alluser = dataUser;
          }
        );
    }      
  
  public acceptAll(){
    this.users.getUser(this.users.getToken()).subscribe(
        user => {  
          this.noti.acceptAll(user._id).subscribe(
            data => {
              this.acpAll = 1;
            }  
          );
        }
    );
  }

  public getRecommend(uid:string){
    this.noti.recommendFriend(uid).subscribe(
        data => {
          this.recommend = data.data;
        },error => console.log(error)
      )
  }

  public getAssociation(uid:string){
    this.noti.associateFriend(uid).subscribe(
        data => {
          this.association = data.data;
        },error => console.log(error)
      )
  }


}
