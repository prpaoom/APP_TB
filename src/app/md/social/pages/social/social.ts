import { Component, Output, ElementRef, EventEmitter, HostListener,trigger,state,transition,animate ,style} from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import {BoxChatCP} from './../../wg/boxchat/boxchat';
import { WallCP } from '../wall/wall';
import { NavCP } from '../../wg/nav/nav';
import { LeftmenuCP } from '../../wg/leftmenu/leftmenu';
import { NavchatCP } from '../../wg/navchat/navchat';

import { SmartsearchCP } from '../../to/smartsearch/smartsearch';
import { NotificationlistCP } from '../../to/notificationlist/notificationlist';
import { MyshoppingcartCP } from '../../to/myshoppingcart/myshoppingcart';
import { FriendrequestCP } from '../../to/friendrequest/friendrequest';
import { BazarnproductsCP } from '../../to/bazarnproducts/bazarnproducts';

@Component({
  templateUrl: './social.html',
  directives:[
      ROUTER_DIRECTIVES, 
      NavCP, 
      LeftmenuCP, 
      NavchatCP, 
      SmartsearchCP, 
      NotificationlistCP, 
      MyshoppingcartCP, 
      FriendrequestCP, 
      BazarnproductsCP,
      WallCP,
      BoxChatCP
],
  animations: [
        trigger('flyInOut', [
            state('in', style({ opacity: 1 })),
            transition('void => *', [
                style({
                    opacity: 0
                }),
                animate('0.5s ease-in')
            ]),
            transition('* => void', [
                animate('0.2s 10 ease-out', style({
                    opacity: 0
                }))
            ])
        ])
    ]
})
export class SocialCP {
    constructor(
        private router: Router,
        private _elementRef : ElementRef
    ){}
    listChat:any = [];
    @Output()
    public swMenu = new EventEmitter();
    public chatvisible:boolean = defaultdeviceWidthforchat();
    public visible:boolean = defaultdeviceWidth();
    public mldisplay:boolean = !defaultdeviceWidth();
    public mrdisplay:boolean = false;
    public ModalSearchisEnable:boolean = false;
    public ModalFriendReqisEnable:boolean = false;
    public ModalNotificationListisEnable:boolean = false;
    public ModalBazarnproductsisEnable:boolean = false;
    public ModalMyshoppingcartisEnable:boolean = false;
    @HostListener('click', ['$event'])
   
    
    
     
    public onClick(e:any) {
        if(e.target.className == 'has_count toggleRightChat'){
          this.chatvisible = !this.chatvisible;
          this.visible = true;
          this.mldisplay = true;
          this.mrdisplay = true;
        }
        if(e.target.className == 'toggleLeftMenu'){
          this.visible = !this.visible;
          this.chatvisible = true;
          this.mldisplay = true;
          this.mrdisplay = true;
        }
        if(e.target.className == 'navsearch'){
             this.ModalSearchisEnable = true;
             
        }
        if(e.target.className == 'has_count friendreq'){
             this.ModalFriendReqisEnable = true;
             
        }
        if(e.target.className == 'has_count notificationlist'){
             this.ModalNotificationListisEnable = true;
             
        }
        if(e.target.className == 'bazarnproducts'){
             this.ModalBazarnproductsisEnable = true;
             
        }
        if(e.target.className == 'myCart has_count myshoppingcart'){
             this.ModalMyshoppingcartisEnable = true;
             
        }
    }
    public selectList(data:any){
      
        this.listChat = data;
    }
    
    hideDialog(){
        this.ModalSearchisEnable = false;
        this.ModalFriendReqisEnable = false;
        this.ModalNotificationListisEnable = false;
        this.ModalBazarnproductsisEnable = false;
        this.ModalMyshoppingcartisEnable = false;
    }
}

function defaultdeviceWidth(){
    if(window.innerWidth >= 1024){
        return false;
    }else{
        return true;
    }
}

function defaultdeviceWidthforchat(){
    if(window.innerWidth >= 1260){
        return false;
    }else{
        return true;
    }
}