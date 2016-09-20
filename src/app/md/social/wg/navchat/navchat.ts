import { Component,OnInit,Output,EventEmitter,ViewChild,AfterViewInit } from '@angular/core';
import {UserSV} from './../../../../service/user';
import {ChatSV} from './../../../../service/chat';
import {FilterGroup} from './../../../../pipe/filter_group';
import {BoxChatCP} from './../boxchat/boxchat';
import {Filter} from './../../../../pipe/filter_pipe';
import {ModalChatCP} from './../modalchat/modalchat';
import {DropzonetestCP} from "./../../../../to/dropzonetest";
import {InfiniteScrollDirective} from './../../../../Directive/InfiniteScroll/InfiniteScrollDirective';
import {AppFn} from './../../../../appfn';
//let x = require('./../../../../../../node_modules/ng2-sweetalert2/src/index.js');
import {FILE_UPLOAD_DIRECTIVES,FileUploader} from 'ng2-file-upload';

//declare var $:any
//declare var jQuery: any;
declare var openPhotoSwipe: any; 
// declare var window:any;
// declare var swal:any;
declare var require: (moduleId: string) => any;
let PhotoSwipe = require('./../../../../../../node_modules/photoswipe/dist/photoswipe.min.js');
let PhotoSwipeUI_Default = require('./../../../../../../node_modules/photoswipe/dist/photoswipe-ui-default.min.js');

@Component({
  selector: 'navchat',
  templateUrl: './navchat.html',
  directives:[BoxChatCP, ModalChatCP,DropzonetestCP,InfiniteScrollDirective,FILE_UPLOAD_DIRECTIVES],
  providers:[UserSV,ChatSV],
  pipes:[Filter,FilterGroup],
  styles:[`[infinite] {
    overflow: auto;
    position: relative;
    height: 432px;
    }
   
   `]
})
 //height: 432px;


export class NavchatCP implements OnInit,AfterViewInit {
    app = new AppFn();
    private _dropzone: Dropzone;
    @Output() dataChat = new EventEmitter<string>();
   colors = [
        { color:'#09aefb' },
        { color:'#0992fb' },
        { color:'#095efb' },
        { color:'#028f6f' },
        { color:'#02b48c' },
        { color:'#06beab' },
        { color:'#fc9e07' },
        { color:'#fc8505' },
        { color:'#f44f07' },
        { color:'#f72660' },
        { color:'#eb585c' },
        { color:'#f46695' },
        { color:'#fa3c7b' },
        { color:'#f00880' },
        { color:'#9005c4' },
        { color:'#7211cd' },
        { color:'#5603a4' },
        { color:'#000000' },
        { color:'#dc1f2e' }
        ];
  constructor(
     private users:UserSV,
     private chat:ChatSV
  ){}
  token:string;
  listFriend:any=[];
  listFriend1:any = [];
  listFriendGroup:any = [];
  addFriendData:any = [];
  listGroup:any=[];
  listActivities:any=[];
  boxChatList:any = [];
  boxChatqu:any = [];
  position:number = 210;
  stateFulPipeOutput = new Promise((resolve,reject) => {
      setTimeout(() => {
          resolve('Date is there!')
      },2000)
  });
  api:string = this.app.api();
  gid:string;
  user_id:string;
  modalType:string;
  groupData = {group_name:'',picture:'',df:''};
  newGroup:string
  //group_name:string
  socket:any = this.app.connectSocket();
  loadingInProgress:boolean = false;
  messageLoad:any;
  endOfList:boolean
  limit: number = 11;
  offset: number = 0;

  check: number = 0;
  send_message:any = 0;
  check_message:any;
  sound_message:any;

  color_message:any;
  set_color:any;

  color_part:any;


  img:string = 'https://im.bazarn.com/90x90/assets/images/blank_user.png';
  //img:string = 'https://im.bazarn.com/90x90/assets/images/blank_user.png'; 
  public uploader:FileUploader = new FileUploader({url: this.app.api()+'/chat/uploadGroup',withCredentials:false});
  public uploaderCreateGroup:FileUploader = new FileUploader({url: this.app.api()+'/chat/createGroup',withCredentials:false});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;



  public ngAfterViewInit(){
    
  }
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
  
  public ngOnInit(){


       

    this.socket.on('updateFullGroup',(data:any) => {
        
        this.loadlistGroup((dataGroup:any) => {
           let dataGroupindex:any = [];
           let indexFriendGroup = dataGroup.map((x:any)=>{return x.gid}).indexOf(data.gid);
           indexFriendGroup != -1 ? dataGroupindex = dataGroup[indexFriendGroup]:'' 
            data.now == 'delall' ? this.delBox(data.gid):'';
            data.now == 'add' ? this.user_id == data.friend_id ? this.setBox(dataGroupindex):''  : this.user_id == data.friend_id ? this.delBox(data.gid):'';
            if(dataGroupindex){
                this.groupData.picture = dataGroupindex.picture;
                this.groupData.group_name = dataGroupindex.name;
                this.groupData.df = dataGroupindex.picture;
            }
            this.listGroup = dataGroup;
        })
    });
    
    this.socket.on('addActivities',(friend_id:string)=>{
        if(this.user_id == friend_id){
            
            this.loadlistFriend((data:any) => {
                data.forEach((f:any) => {
                    f.group_type = 'p'
                });
                this.listFriend = data;
            });
            
        }
    });
    this.socket.on('MessageLoad',(data:any) => {
       
        this.messageLoad = data
	});

    this.socket.on('getChat',(data:any)=>{
        
        let listFriend = this.listFriend.filter((f:any) => {return f.gid == data.gid});
        let listGroup = this.listGroup.filter((g:any) => {return g.gid == data.gid});
        let listActivities = this.listActivities.filter((a:any) => {return a.gid == data.gid});
        if(listFriend[0]){
            this.setBox(listFriend[0])    
        }else if(listGroup[0]){
            this.setBox(listGroup[0]) 
        }else if(listActivities[0]){
            this.setBox(listActivities[0]);
        }
        
    });
    this.socket.on('createGroup',(friend:any) => {
        
        if(friend.id == this.user_id || friend.user_id == this.user_id || friend.friend_id == this.user_id){
            this.loadlistGroup((data:any) =>{
                data.forEach((f:any) => {
                    f.group_type = 'g'
                });
                this.listGroup = data;
                let groupData = this.listGroup.filter((data:any)=>{ return friend.gid == data.gid });
                if(groupData[0]){
                    this.setBox(groupData[0])
                }
            });
        }
    });
        this.users.getUser(this.users.getToken()).subscribe(data => {
            this.user_id = data._id 
             if("access_chat" in data){
                    this.send_message = data.access_chat.send_message;
                    this.check_message = data.access_chat.check_message;
                    this.sound_message = data.access_chat.sound_message;
                    this.color_message = data.access_chat.color_message;

                    //this.color_part = '<div class="box-color" [ngStyle]="{"background": color_message}"></div>';
                }
                else{
                    this.send_message = null;
                    this.check_message = null;
                    this.sound_message = null;
                    this.color_message = null;
                }        
            
        
        },err => console.error(err))


        //this.users.checkLogin();
        this.users.checkLoginCP((checkLogin:any)=>{
            this.token = this.users.getToken();
            this.loadlistFriend((data:any) => {
                data.forEach((f:any) => {
                    f.group_type = 'p'
                });
                this.listFriend = data;
                
            })
            this.loadlistGroup((data:any) =>{
                data.forEach((f:any) => {
                    f.group_type = 'g'
                });
                this.listGroup = data;
            
            })
            this.loadlistActivities((data:any) =>{
                 data.forEach((f:any) => {
                    f.group_type = 'p'
                });
                this.listActivities = data;        
            })
        })
         
       
    }
    
    public loadMore():void {
        
        setTimeout(() => {
           
        if(!this.loadingInProgress) {
            if(this.offset > this.listFriend.length) {
                this.endOfList = true;
            }else{
                this.loadingInProgress = true;
                
                let max = this.offset + this.limit;
                
                for (let i = this.offset; i < max; i++) {
                    if(this.listFriend[i]){
                        this.listFriend1.push(this.listFriend[i]);
                    }
                    
                }
                this.offset = max;
                this.loadingInProgress = false;
                
            }
        }
    }, 2000);
       
    }
    public setBox(data:any){
        
        let checkbox = this.boxChatList.filter((boxchat:any) =>{
            return data.gid == boxchat.gid;
        })
       
        if(checkbox.length == 0){//เช็คว่ามี box นี้อยู่ใน list ?
            
            if(this.boxChatList.length >= 3){
                let checkbox1 = this.boxChatqu.filter((boxchat:any) =>{
                    return data.gid == boxchat.gid;
                })
                if(checkbox1.length == 1){
                    let index = getIndex(data.gid,this.boxChatqu);
                    this.boxChatqu.splice(index,1);
                   
                }
                this.boxChatqu.push(this.boxChatList[2]);
                data.position = 790;
               
                this.boxChatList[2] = data;
                
               
                
            }else{
               
                this.boxChatList.push(data)
                this.calBox();
               
            }
           
        }
        
        
    }
    
    public calBox(){
         this.boxChatList.forEach((data:any,index:number)=> {
                
                if(index == 0){
                    data.position = this.position;
                }else{
                    let sum = this.boxChatList[index-1].position + 290
                    data.position = sum;
                }
                
       });
    }
    public delBox(gid:string){
        
        let main_box = this.boxChatList.filter((data:any) => {
            return data.gid == gid;
        })
        let qu_box = this.boxChatqu.filter((data:any)=>{
            return data.gid == gid;
        })
        if(main_box.length != 0){
            let index = getIndex(gid,this.boxChatList);
            this.boxChatList.splice(index,1);
            if(this.boxChatList.length <= 2 && this.boxChatqu.length >= 1){
                this.boxChatList.push(this.boxChatqu[0]);
                this.boxChatqu.splice(0,1);
            }
            this.calBox()
            
            
        }else if(qu_box.length != 0){
            let index = getIndex(gid,this.boxChatqu);
            this.boxChatqu.splice(index,1);    
        }
    } 
    public UploadSuccess(data:any){
        let dataMessage = {id:data.chat.group_id,ids:this.user_id,gid:data.chat.group_id,data_chat:data.chat};
        this.socket.emit('sendChat',dataMessage);
        
    }
    public deleteBox(gid:string){
        this.delBox(gid);
    }
    public modalUpload(gid:string){
        
        this.modalType = 'upload_chat';
        this.gid = gid
         setTimeout(()=>{
            this.launchModal(gid,this.checkdvwidth());
        })    

    }

    public modal(data:any){
        this.modalType = 'edit_name';
        let df = '';
        this.gid = data.gid;
        
        if(data.picture){
            df = data.picture
        }

        this.groupData = {group_name:data.name,picture:data.picture,df:df};
        this.chat.getListGroup(this.token).subscribe(dataGroup => {
            let index = dataGroup.map((g:any)=>{return g.gid}).indexOf(data.gid);
            let indexMe = dataGroup[index].user.map((x:any) =>{return x._id}).indexOf(this.user_id);
            indexMe != -1 ? dataGroup[index].user.splice(indexMe,1):'';
            index != -1 ? this.addFriendData = dataGroup[index].user:'';
            this.chat.getListFriend(this.token).subscribe(datax => {
            
                datax.forEach((sf:any) => {
                let check = data.user.map((x:any) =>{return x._id}).indexOf(sf._id);
                if(check == -1){
                        sf.show = true;  
                }else{
                    
                    sf.show = false;
                }
                
                });
                this.listFriendGroup = datax;

                
                // this.listFriendGroup.forEach((list:any) => {
                //     list.show = true;
                // })
                setTimeout(()=>{
                    this.launchModal(data.gid,this.checkdvwidth());
                });
            
            },err => console.error(err))
        });
        
        //  setTimeout(()=>{
        //     this.launchModal(data.gid,this.checkdvwidth());
           
           
        // })
    }
    public updateGroup(){
        this.chat.updateGroup(this.gid,this.groupData.group_name,this.token).subscribe(data => {
            //data.picture = data.pictureGroup;
            data.gid = data._id
            this.socket.emit('updateFullGroup',data);
        },err => console.error(err))    
    }
    
    
    public onChange(e:any,form:any){
        
       
    //    this.uploader.onBeforeUploadItem = (fileItem: any) => {
    //         fileItem.formData.push( { gid: this.gid } );
          
    //     }; 
        this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
            form.append('gid', this.gid);
            form.append('df', this.groupData.df);
            //form.append('someField2': this.someValue2);
        };
         this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            var responsePath = JSON.parse(response);
            responsePath.gid = responsePath._id; 
            this.socket.emit('updateFullGroup', responsePath);
           
        };
        setTimeout(()=>{
           
            this.uploader.queue[0].withCredentials = false;
            this.uploader.queue[0].options.removeAfterUpload = true;
         
            
            this.uploader.queue[0].upload()
        },1000)
       
    }
    
    public modalAddFriend(gid:string){
         this.modalType = 'edit_friend';
         this.gid = gid
         setTimeout(()=>{
            this.launchModal(gid,'320');
        })
    }
    public modalChatSetting(){
        
        this.modalType = 'chat_setting';
         setTimeout(()=>{
            this.launchModal(this.user_id,this.checkdvwidth());
        })
    }

    public modalCreateNewGroupChat(){
        this.modalType = 'create_group';
        this.addFriendData = [];
        this.chat.getListFriend(this.token).subscribe(data => {
            this.listFriendGroup = data;
            this.listFriendGroup.forEach((list:any) => {
                list.show = true;
            })
            setTimeout(()=>{
                this.launchModal(this.user_id,this.checkdvwidth());
            });
            
        },err => console.error(err))
         
    }
    public addFriend(data:any,type:string = ''){
        var index = this.addFriendData.map((x:any)=> {return x._id; }).indexOf(data._id);
        var indexList = this.listFriendGroup.map((x:any)=> {return x._id; }).indexOf(data._id);
        this.listFriendGroup[indexList].show = false 
        if(type == 'addnow'){
            
            this.chat.addFriendGroup(this.gid,data._id,this.token).subscribe(dataSuccess => {
                dataSuccess.gid = dataSuccess._id;
                dataSuccess.now = 'add';
                this.socket.emit('updateFullGroup',dataSuccess);
                
            },err => console.error(err))
        }
        
        if(index == -1){
            this.addFriendData.push(data);
            
        }
        
    }
    public delGroupMe(){
         this.chat.delUserGroup(this.gid,this.user_id,this.token).subscribe(dataSuccess => {
                this.socket.emit('updateFullGroup',dataSuccess);
                this.closeModal(this.gid);
            },err =>console.error(err))    
    }
    public delFriend(data:any,type:string = ''){
        swal({
            title: "คุณแน่ใจ",
            text: "คุณจะลบ "+data.name+" ออกจากกลุ่ม",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "ใช่",
            closeOnConfirm: false,
            html: false
            }, ()=>{
                    var index = this.addFriendData.map((x:any)=> {return x._id; }).indexOf(data._id);
                    var indexList = this.listFriendGroup.map((x:any)=> {return x._id; }).indexOf(data._id);
                    if(indexList != -1){
                        this.listFriendGroup[indexList].show = true;
                    }
                    this.addFriendData.splice(index,1);
                    
                    
                    if(type == 'delnow'){
                        this.chat.delUserGroup(this.gid,data._id,this.token).subscribe(dataSuccess => {
                        this.socket.emit('updateFullGroup',dataSuccess);
                        },err =>console.error(err))
                    }
                    swal("Deleted!","ลบข้อมูลสำเร็จ","success");
            }); 
       
    }
    
    public getImg(e:any){
        var reader = new FileReader();
        var file   = e.target.files[0];
        
        
        reader.onloadend =  (event:any) => {
           
            this.img = reader.result;
            ;
        }
        if (file) {
            reader.readAsDataURL(file);
            
        } else {
            this.img = "https://im.bazarn.com/90x90/assets/images/blank_user.png";
        }
        
       
    }
    public createNewGroup(e:any){
        
        if(this.uploaderCreateGroup.queue[0]){
           
            this.uploaderCreateGroup.queue[0].withCredentials = false;
            this.uploaderCreateGroup.queue[0].options.removeAfterUpload = true;
           
            this.uploaderCreateGroup.onBuildItemForm = (fileItem: any, form: any) => {
            form.append('user_id', this.user_id);
            form.append('listFriend', JSON.stringify(this.addFriendData));
            form.append('name', this.newGroup);
            form.append('access_token', this.token);
            
        };
        this.uploaderCreateGroup.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            var responsePath = JSON.parse(response);
            
            responsePath.gid = responsePath._id;
            responsePath.now = 'add'
            this.socket.emit('updateFullGroup', responsePath);
           
        };
        this.uploaderCreateGroup.queue[0].upload()
           
            
        }else{
            
            this.chat.createGroup(this.newGroup,this.addFriendData,this.user_id,this.token).subscribe(data => {
                data.gid = data._id;
                data.now = 'add';
                this.socket.emit('updateFullGroup',data);
            
            },err => console.error(err))
        }
        
    }

    

    public checkdvwidth(){
        let winswidth = $(window).width();
        let mdwidth:string;
        if(winswidth < 768){
            mdwidth = '320';
        }else{
            mdwidth = '480';
        }
        return mdwidth;
    }
    
    public selectFriend(data:any){
        this.setBox(data);
    }
    public getPicuteGroup(picture:string){
        
        if(picture){
		    return this.app.api()+picture;
	    }else{
		    return 'https://im.bazarn.com/90x90/assets/images/blank_user.png';
	    }
    }
    public loadlistActivities(cb:any){
        this.chat.getListActivities(this.token).subscribe(data => {
            
            cb(data);
        },error => console.error(error))    
    }

    public loadlistFriend(cb:any){
        this.chat.getListFriend(this.token).subscribe(data => {
            cb(data);
        },error => console.error(error))
    }
    public loadlistGroup(cb:any){
      this.chat.getListGroup(this.token).subscribe(data => {
        data.forEach((f:any) => {
            f.group_type = 'g'
        });
        cb(data);
      },error => console.error(error))  
    }
    public closeModal(data:any){
        $("." + data + " > .overlay_dialog,." + data + " > .overlay_dialog > .bzn_dialog,." + data + " > .overlay_dialog > .bzn_dialog .fade_dialog").fadeOut("slow", function() {
            $("." + data + " > .overlay_dialog,." + data + " > .overlay_dialog > .bzn_dialog").removeAttr("style");
            $("." + data + " > .overlay_dialog > .bzn_dialog").css("min-height", "90px");
        });
    }

    public launchModal(data:any, width:string){
        
        $("." + data + " > .overlay_dialog,." + data + " > .overlay_dialog > .bzn_dialog").css("opacity", 1);
        $("." + data + " > .overlay_dialog >.overlay_dialog").show();
        var mdheight = $("." + data + " >.fade_dialog").height();
        $("." + data + " > .overlay_dialog > .overlay_dialog,." + data + " > .overlay_dialog > .bzn_dialog").css("opacity", 0);
        /*Remove inline styles*/
        $("." + data + " > .overlay_dialog > .overlay_dialog,." + data + " > .overlay_dialog > .bzn_dialog").removeAttr("style");
        /*Set min height to 90px after mdheight has been set*/
        $("." + data + " > .overlay_dialog > .bzn_dialog").css("min-height", "90px");
        $("." + data + " > .overlay_dialog").show();
        
        $("." + data + " > .overlay_dialog > .bzn_dialog > .preload_dialog").html("<img src='./assets/images/loading.gif' class='loader'> ");
        
        $("." + data + " > .overlay_dialog > .bzn_dialog").css("width", "200").animate({"opacity" : 1,height : mdheight,width : width}, 600, function() {
        /*When animation is done show inside content*/
            $("." + data + " > .overlay_dialog > .bzn_dialog > .preload_dialog").empty();
            $("." + data + " > .overlay_dialog > .bzn_dialog > .fade_dialog").show();
        });
    }

    public chatSetting(state:number, val:any){
        switch(state){
            case 1:
                if(val!= this.check){
                    this.check = val;
                    this.chat.chatSetting(this.token, state, val).subscribe(
                        data => {
                            if(data.status == true){
                              
                            }
                            else{
                                
                            }
                        },error => console.error(error)
                    )    
                }
                break;
            case 2:
                var check = !hasClass(val, 'hover');
                    this.chat.chatSetting(this.token, state, check).subscribe(
                        data => {
                            if(data.status == true){
                               
                            }
                            else{
                               
                            }
                        },error => console.error(error)
                    )
                break; 
            case 3:
                var sound = !hasClass(val, 'hover');
                this.chat.chatSetting(this.token, state, sound).subscribe(
                        data => {
                            if(data.status == true){
                                
                            }
                            else{
                                
                            }
                        },error => console.error(error)
                    )
                break;
            case 4:
                var color = val;
                this.color_message = val;
                this.chat.chatSetting(this.token, state, color).subscribe(
                    data => {
                            if(data.status == true){

                               
                            }
                            else{
   
                            }
                           
                        },error => console.error(error)
                    )
                break;    
            default: 
        }
    }
    public test(){
        $('#checkBtn').click(function(){
           
        });
    }
}


function hasClass(element:any, cls:any) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}



function getIndex(gid:string,list:any){
    let i = 0;
    let x:number;
    list.forEach((data:any,index:number) => {
        if(data.gid+'' == gid+''){
             x = index;
        }
    });
    return x ;
}
function swap(data:any,x:any,y:any){
    var b = data[x];
    data[x] = data[y];
    data[y] = b;
    return data;    
}

$(document).ready(function(){
    
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
            //options.counterEl = false;
            options.modal = true
                   

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
});













