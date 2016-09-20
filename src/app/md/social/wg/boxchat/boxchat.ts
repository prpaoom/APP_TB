
import {Component,Input,OnInit,Output,EventEmitter,AfterViewInit,ElementRef,ViewChild} from '@angular/core';

import {ChatSV} from './../../../../service/chat';
import {UserSV} from './../../../../service/user';
import {Filter} from './../../../../pipe/filter_pipe';
import {AppFn} from './../../../../appfn';
import {DynamicHTMLOutlet} from './../../../../Directive/Dynamichtml';
import {TimeAgoPipe} from './../../../../pipe/time-ago.pipe';

import {Emojione} from './../../../../to/emojione/emojione';
declare var document:any;

declare var $:any
declare var jQuery: any;
declare var openPhotoSwipe: any;
declare var require: (moduleId: string) => any;
let PhotoSwipe = require('./../../../../../../node_modules/photoswipe/dist/photoswipe.min.js');
let PhotoSwipeUI_Default = require('./../../../../../../node_modules/photoswipe/dist/photoswipe-ui-default.min.js');

@Component({
    selector:'box-chat',
    templateUrl:'./boxchat.html',
    providers:[ChatSV,UserSV],
    directives:[DynamicHTMLOutlet,Emojione],
    pipes:[Filter,TimeAgoPipe]
})
export class BoxChatCP implements OnInit,AfterViewInit {
    app = new AppFn();
    constructor(
        private chat:ChatSV,
        private users:UserSV,
        myElement: ElementRef
    ) { }
   
    @Input() data:any = [];
    @Input() position_right:string;
    @Input() type:string;
    @Input() user_id:string;
    @Input() messageLoad:any;
    
    @Output() selectfriend = new EventEmitter();
    @Output() deleteBox = new EventEmitter();
    @Output() editName = new EventEmitter();
    @Output() editAddFriend = new EventEmitter();
    @Output() minthisBox = new EventEmitter();
    @Output() uploadBox = new EventEmitter();
    serverSite = this.app.api();
    token:string
    gid:string;
    name:string;
    chatMessage:any = [];
    last:boolean
    listFriend:any = [];
    lastRead:string = '';
    message:string;
    
    socket:any = this.app.connectSocket();
    
    
    public ngAfterViewInit():void{
       
         
    }
    public ngOnInit(){
        this.token = this.users.getToken();
         
        if(!this.data.gid){
            this.chat.addActivities(this.data._id,this.token).subscribe(data =>{
                this.data.gid = data._id
                console.log(this.data);
                this.socket.emit('addActivities',this.data._id);
            },err => console.error(err))
        }
        this.socket.on('getLastRead',(gid:string)=>{
            console.log('xxxx');
            this.getLastRead();
        });
        this.socket.on('updateFullGroup',(data:any) => {
            this.chat.getListGroup(this.token).subscribe(dataGroup => {
                let dataGroupindex:any = [];
                let indexFriendGroup = dataGroup.map((x:any)=>{return x.gid}).indexOf(data.gid);
                indexFriendGroup != -1 ? dataGroupindex = dataGroup[indexFriendGroup]:''
                 if(this.data.gid == data._id){
                    this.data.picture = dataGroupindex.picture;
                    this.data.name = dataGroupindex.name;
                } 
            });
           
            
            
        
        });
        this.socket.on('getChat',(data:any)=>{
            
            if(this.data.gid == data.gid){
                this.lastRead = '';
                this.updateChat(data.data_chat);
            }
            
        });
       

        
       
        if(this.type == 'boxchat'){
            
            if(this.data.gid){
                if(this.data.group_type == 'p'){
                    this.loadMessage(this.token,this.data.gid,(data:any)=>{
                        this.chatMessage = data;
                        this.getLastRead()
                        console.log(this.data.gid);
                        $(document).ready(()=>{ 
                            $('.boxchat'+this.data.gid).scrollTop($('.boxchat'+this.data.gid)[0].scrollHeight);
                            //$('.msgsc').scrollTop($('.msgsc')[0].scrollHeight);
                        });

                        
                    });
                }else{
                    this.loadGroupMessage(this.token,this.data.gid,(data:any) => {
                        this.chatMessage = data;
                        this.getLastRead()
                        $(document).ready(()=>{ 
                            $('.boxchat'+this.data.gid).scrollTop($('.boxchat'+this.data.gid)[0].scrollHeight);
                            //$('.msgsc').scrollTop($('.msgsc')[0].scrollHeight);
                        });    
                    });
                }
            }
        }
    }
    
    public checkRead(){
        this.chat.readChat(this.data.gid,this.token).subscribe(data =>{
            this.socket.emit('getLastRead',this.data.gid);
        },err => console.error(err))
    }
    public escapeHtml(text:string) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }
    public escapeHtml2(text:string){
        return text.replace(/&lt;/g,'')
    }
    public escapeHtml1(text:string) {
    return text
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, "")
        .replace(/&#039;/g, "");
    }
     parseHtmlEnteties(str:string) {
        return str.replace(/&#([0-9]{1,3});/gi, function(match, numStr) {
            var num = parseInt(numStr, 10); // read num as normal number
            return String.fromCharCode(num);
        });
    }
     decodeHtmlEntity(str:string) {
       let str1 = str.replace(/[<]br[^>]*[>]/gi,"");
       //let str2 = str1.replace(/img(?![^<]*<\/img>)/g,'');
       return this.escapeHtml1(str1.replace(/[&]nbsp[;]/gi," ")); 
        // return str.replace(/&#(\d+);/g, function(match, dec) {
        //     return String.fromCharCode(dec);
        // });
    };
    public updateChat(chatMessage:string){
        this.chatMessage.push(chatMessage) ;
        // setTimeout(()=>{
        //     $(document).ready(function(){ 
        //         $('.msgsc').scrollTop($('.msgsc')[0].scrollHeight);
        //  });  
        // },1000)
         $(document).ready(()=>{ 
                 $('.boxchat'+this.data.gid).scrollTop($('.boxchat'+this.data.gid)[0].scrollHeight);
         });  
         
          
    }
    public clear(){
        $('#sendMessage'+this.data.gid).empty();    
    }
    public addGroup(user_id:string,friend_id:string){
        
        this.chat.addGroup(user_id,friend_id,this.token).subscribe(data => {
            
            data = {id:this.user_id,user_id:user_id,friend_id:friend_id,gid:data._id};
            this.socket.emit('createGroup',data);
            
        },error => console.error(error))
    }
    public fucusInput(){
        let message = $('#sendMessage'+this.data.gid).html();
        console.log(message);
        if(message){
            this.socket.emit('MessageLoad', {gid:this.data.gid,user_id:this.user_id,fucus:true});
        }else{
            this.socket.emit('MessageLoad', {gid:this.data.gid,user_id:this.user_id,fucus:false});
 	    }
    }
    public sendMessage(e:any){

        let message = $('#sendMessage'+this.data.gid).html();
       

        //$('#sendMessage'+this.data.gid).empty();
       
        
            if(e.keyCode == 13 && !e.shiftKey){
                
            if(strip(message).length != 0){
                this.chat.sendChatMessage(this.token,this.data.gid,message,'').subscribe(data => {
                     data.chat.picture = data.picture;
                     $('#sendMessage'+this.data.gid).empty();
                    let dataMessage = {id:this.data.gid,ids:this.user_id,gid:this.data.gid,data_chat:data.chat};
                    this.socket.emit('sendChat',dataMessage);
                },error => console.error(error));
               
                
                
            }else{
                $('#sendMessage'+this.data.gid).empty();
                
            }
            
        }
    }
    public getPicuteGroup(picture:string){
        
        if(picture){
		    return this.app.api()+picture;
	    }else{
		    return 'https://im.bazarn.com/90x90/assets/images/blank_user.png';
	    }
    }
    public getLastRead(){
        let read = '';
        let text = '';
        this.chat.lastRead(this.data.gid).subscribe(data => {
            if(data != null && data.length != 0){
                if(data.length > 2){
                    read = data[0].fname+','+data[1].fname;
                    text = ' และคนอื่นๆอีก '+(data.length - 2);
                }else{
                    read = data[0].fname;
                }
                this.lastRead = read+text;
            }

            console.log(this.lastRead );
        },err => console.error(err))
    }
    public loadMessage(token:string,gid:string,cb:any){
        this.chat.chatMessage(token,gid).subscribe(data => {
            cb(data);
        },err => console.error(err))
    }
    public loadGroupMessage(token:string,gid:string,cb:any){
        this.chat.chatGroupMessage(token,gid).subscribe(data => {
            cb(data);
        },err =>console.error(err))
    }
    public findFriend(gid:string){
       
        $('.friend'+gid).slideToggle('fast');
    }
    public inputFriend(friend:string,gid:string,user_id:string){
        var text = friend;
      
        if(text.length <= 1){
           
            this.chat.findFriend(this.token,text,user_id).subscribe(
                data => {
                    if(!data){
                        $('.friendlist'+gid).css('display','none');
                    }
                    this.listFriend = data;
                },err =>console.error(err))
            $('.friendlist'+gid).css('display','block');
        }
        // else{
           
        //     $('.friendlist'+gid).css('display','none');
        // }
    }
    public openEmo(gid:string){
        var menu = $('.emoj'+gid).siblings('.emo-open'+gid);
        
        if (menu.hasClass('is-openx')) {
            menu.removeClass('is-openx');
            $('.emoj'+gid).html('<i class="fa fa-smile-o"></i>');
        } else {
            menu.addClass('is-openx');
            $('.emoj'+gid).html('<i class="fa fa-times"></i>');
        }
    }
    public closeFriend(gid:string){
        
        $('.friend'+gid).slideToggle('fast');
    }
    
    public editNameEvent(gid:string){
        console.log(this.data);
        this.editName.emit(this.data);
       
    }
    public uploadEvent(gid:string){
        this.uploadBox.emit(gid);
    }
    public editAddFriendEvent(gid:string){
        this.editAddFriend.emit(gid);
    }
    public dropdownSetting(gid:string){
       
        $('.s'+gid).slideToggle('fast');  
        // setTimeout(()=>{
            
        // })
          
    }
    public delBox(gid:string){
        
        this.deleteBox.emit(gid);
      
    }
    public selectList(data:any){
        this.selectfriend.emit(data);
    }

    public minBox(gid:string){
        var chat_popup = $('#'+gid); '#'+ gid
        
        if (chat_popup.hasClass('currenthide')) {
            chat_popup.removeClass('currenthide');
                $('#'+ gid +' > .chatarea,#'+ gid +' > .chat_form,#'+ gid +' > .chat_control,#'+ gid +' > .chat-popup-cc,#'+ gid +' > .inchat-detail,#'+ gid +' > .ichatwith').css('display','block');
                $('#'+ gid +' > .name_head').css('display','none');
                $('#'+ gid).css({width:'280px', height:'400px'});
                $('#'+ gid +' > header').css('cursor','s-resize');
        } else {
            chat_popup.addClass('currenthide');
                $('#'+ gid +' > .chatarea,#'+ gid +' > .chat_form,#'+ gid +' > .chat_control,#'+ gid +' > .chat-popup-cc,#'+ gid +' > .inchat-detail,#'+ gid +' > .ichatwith').css('display','none');
                $('#'+ gid+' >.name_head').css('display','block');
                $('#'+ gid).css({width:'280px', height:'30px'});
                $('#'+ gid +' > header').css('cursor','n-resize');
        }
    }

    public photoSwipe(){
        var initPhotoSwipeFromDOM = function(gallerySelector:any) {
            let gid:any;
            let pid:any;

            
            // parse slide data (url, title, size ...) from DOM elements 
            // (children of gallerySelector)
            var parseThumbnailElements = function(el:any) {
                var thumbElements = el.childNodes,
                    numNodes = thumbElements.length,
                    items:any = [],
                    figureEl:any,
                    linkEl:any,
                    size:any,
                    item:any;

                for(var i = 0; i < numNodes; i++) {

                    figureEl = thumbElements[i]; // <figure> element

                    // include only element nodes 
                    if(figureEl.nodeType !== 1) {
                        continue;
                    }

                    linkEl = figureEl.children[0]; // <a> element

                    size = linkEl.getAttribute('data-size').split('x');

                    // create slide object
                    item = {
                        src: linkEl.getAttribute('href'),
                        w: parseInt(size[0], 10),
                        h: parseInt(size[1], 10)
                    };



                    if(figureEl.children.length > 1) {
                        // <figcaption> content
                        item.title = figureEl.children[1].innerHTML; 
                    }

                    if(linkEl.children.length > 0) {
                        // <img> thumbnail element, retrieving thumbnail url
                        item.msrc = linkEl.children[0].getAttribute('src');
                    } 

                    item.el = figureEl; // save link to element for getThumbBoundsFn
                    items.push(item);
                }

                return items;
            };

            // find nearest parent element
            var closest = function closest(el:any, fn:any):any {
                return el && ( fn(el) ? el : closest(el.parentNode, fn) );
            };

            // triggers when user clicks on thumbnail
            var onThumbnailsClick = function(e:any) {
                e = e || window.event;
                e.preventDefault ? e.preventDefault() : e.returnValue = false;

                var eTarget = e.target || e.srcElement;

                // find root element of slide
                var clickedListItem = closest(eTarget, function(el:any) {
                    return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
                });

                if(!clickedListItem) {
                    return;
                }

                // find index of clicked item by looping through all child nodes
                // alternatively, you may define index via data- attribute
                var clickedGallery = clickedListItem.parentNode,
                    childNodes = clickedListItem.parentNode.childNodes,
                    numChildNodes = childNodes.length,
                    nodeIndex = 0,
                    index:any;

                for (var i = 0; i < numChildNodes; i++) {
                    if(childNodes[i].nodeType !== 1) { 
                        continue; 
                    }

                    if(childNodes[i] === clickedListItem) {
                        index = nodeIndex;
                        break;
                    }
                    nodeIndex++;
                }



                if(index >= 0) {
                    // open PhotoSwipe if valid index found
                    openPhotoSwipe(index, clickedGallery );
                }
                return false;
            };

            // parse picture index and gallery index from URL (#&pid=1&gid=2)
            var photoswipeParseHash = function() {
                var hash = window.location.hash.substring(1),
                params:any = {};
                if(hash.length < 5) {
                    return params;
                }

                var vars = hash.split('&');
                for (var i = 0; i < vars.length; i++) {
                    if(!vars[i]) {
                        continue;
                    }
                    var pair = vars[i].split('=');  
                    if(pair.length < 2) {
                        continue;
                    }           
                    params[pair[0]] = pair[1];
                }

                if(params.gid) {
                    params.gid = parseInt(params.gid, 10);
                }

                return params;
            };

            var openPhotoSwipe:any = function(index:any, galleryElement:any, disableAnimation:any, fromURL:any) {
                
                var pswpElement = document.querySelectorAll('.pswp')[0],
                    gallery:any,
                    options:any,
                    items:any;

                items = parseThumbnailElements(galleryElement);
                
                // define options (if needed)
                options = {

                    // define gallery index (for URL)
                    galleryUID: galleryElement.getAttribute('data-pswp-uid'),

                    getThumbBoundsFn: function(index:any) {
                        // See Options -> getThumbBoundsFn section of documentation for more info
                        var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                            pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                            rect = thumbnail.getBoundingClientRect(); 

                        return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
                    }

                };

                // PhotoSwipe opened from URL
                if(fromURL) {
                    if(options.galleryPIDs) {
                        // parse real index when custom PIDs are used 
                        // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                        for(var j = 0; j < items.length; j++) {
                            if(items[j].pid == index) {
                                options.index = j;
                                break;
                            }
                        }
                    } else {
                        // in URL indexes start from 1
                        options.index = parseInt(index, 10) - 1;
                    }
                } else {
                    options.index = parseInt(index, 10);
                }

                // exit if index not found
                if( isNaN(options.index) ) {
                    return;
                }

                if(disableAnimation) {
                    options.showAnimationDuration = 0;
                }
                options.bgOpacity = 0.9;
                options.history = 0;
                options.shareEl = false;
                options.zoomEl = false;
                options.fullscreenEl = false;
                options.counterEl = true;
                options.captionEl = false;
                options.modal = true,
                options.clickToCloseNonZoomable = true;
                

                // Pass data to PhotoSwipe and initialize it
                gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
                gallery.init();
            };

            // loop through all gallery elements and bind events
            var galleryElements:any = document.querySelectorAll( gallerySelector );
            for(let i = 0, l = galleryElements.length; i < l; i++) {
                galleryElements[i].setAttribute('data-pswp-uid', i + 1);
                galleryElements[i].onclick = onThumbnailsClick;
            }

            // Parse URL and open gallery if it contains #&pid=3&gid=1
            var hashData = photoswipeParseHash();
            if(hashData.pid && hashData.gid) {
                openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
            }
        };

        // execute above function
        initPhotoSwipeFromDOM('.my-gallery');
    }

}
function strip(html:string){
    
    return html.replace(/\<(?!img|a).*?\>/g, '').replace(/&nbsp;/g,'');
	//return html.replace(/(<([^>]+)>)/ig, '');
}
function setEndOfContenteditable(contentEditableElement:any)
{

    var range:any,selection:any;
    if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
    {
       
        range = document.createRange();//Create a range (a range is a like the selection but invisible)
        
        range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        selection = window.getSelection();//get the selection object (allows you to change selection)
        selection.removeAllRanges();//remove any selections already made
        selection.addRange(range);//make the range you have just created the visible selection
    }
    else if(document.selection)//IE 8 and lower
    { 
        range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
        range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        range.select();//Select the range (make it the visible selection
    }
}

$(document).on('click' , ".setting_list > li > a", function () {
    //Toggle the child but don't include them in the hide selector using .not()
    $('.dd_cog > .setting_list').not($(this).children(".setting_list").slideToggle('fast'));
});
        
$(document).on('click', '.dropup_stk > .dropup-opener', function(e:any) {
        e.preventDefault();
        var menu = $(this).siblings('.ddx-menu');
        if (menu.hasClass('is-openx')) {
            menu.removeClass('is-openx');
            $('.stk').html('<i class="fa fa-heart"></i>');
        } else {
            menu.addClass('is-openx');
            $('.stk').html('<i class="fa fa-times"></i>');
        }
});



$(document).on('click', '.emo-menu_close', function(e:any) {
    e.preventDefault();
        if ($('.emo-menu').hasClass('is-openx')) {
            $('.emo-menu').removeClass('is-openx');
            $('.emoj').html('<i class="fa fa-smile-o"></i>');
        } else {
            $('.emo-menu').addClass('is-openx');
            $('.emoj').html('<i class="fa fa-times"></i>');
        }
});

// $(document).on('click','.close_this_popup', function(){
//     $('.chat-popup').slideToggle('fast');
// });

// $(document).on('click','.chat-popup header',function(e:any) {
//     e.preventDefault();
//     var target = $(this).data('boxid');
//     var chat_popup = $('#'+target);
//     console.log(target);
    
//     if (chat_popup.hasClass('currenthide')) {
//         chat_popup.removeClass('currenthide');
//             //$('.chatarea').slideToggle('fast');
//             $(chat_popup +' > .chatarea,'+ chat_popup +' > .chat_form,'+ chat_popup +' > .chat_control,'+ chat_popup +' > .chat-popup-cc,'+ chat_popup +' > .inchat-detail,'+ chat_popup +' > .ichatwith').css('display','block');
//             //$('.chat_control').slideToggle('fast');
//             //$('.chat-popup-cc').slideToggle('fast');
//             //$('.inchat-detail').slideToggle('fast');
//             //$('.ichatwith').css('display','block');
//             $(chat_popup+' > .name_head').css('display','none');
//             $(chat_popup).css({width:'280px', height:'400px'});
//             $(this).css('cursor','s-resize');
//     } else {
//         chat_popup.addClass('currenthide');
            
//             //$('.chatarea').slideToggle('fast');
//             $(chat_popup +' > .chatarea,'+ chat_popup +' > .chat_form,'+ chat_popup +' > .chat_control,'+ chat_popup +' > .chat-popup-cc,'+ chat_popup +' > .inchat-detail,'+ chat_popup +' > .ichatwith').css('display','none');
//             //$('.chat_form').css('display','none');
//             //$('.chat_control').slideToggle('fast');
//             //$('.chat-popup-cc').slideToggle('fast');
//             //$('.inchat-detail').slideToggle('fast');
//             //$('.ichatwith').css('display','none');
//             $(chat_popup+' >.name_head').css('display','block');
//             $(chat_popup).css({width:'280px', height:'30px'});
//             $(this).css('cursor','n-resize');
//     }

// });











