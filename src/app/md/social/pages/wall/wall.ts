
import { Component,OnInit} from '@angular/core';
import { Router,ROUTER_DIRECTIVES } from '@angular/router';
import {UserSV} from './../../../../service/user';
import {ChatSV} from './../../../../service/chat';
import {CatalogSV} from './../../../../service/catalog';

declare var jQuery: any;
declare var openPhotoSwipe: any;
declare var require: (moduleId: string) => any;
let PhotoSwipe = require('./../../../../../../node_modules/photoswipe/dist/photoswipe.min.js');
let PhotoSwipeUI_Default = require('./../../../../../../node_modules/photoswipe/dist/photoswipe-ui-default.min.js');

@Component({
 
  templateUrl: './wall.html',
  directives:[ROUTER_DIRECTIVES],
  providers:[UserSV,ChatSV]

})
export class WallCP implements OnInit  {
    constructor(

        private router: Router,
        private users:UserSV
       
    ){}
    public ngOnInit(){
        this.users.checkLogin();
    } 

}
