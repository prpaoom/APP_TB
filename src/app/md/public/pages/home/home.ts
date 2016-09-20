import { Component,OnInit} from '@angular/core';
import { Router,ROUTER_DIRECTIVES } from '@angular/router';
import {UserSV} from './../../../../service/user';
import {UploadWG} from './../../../../wg/upload/upload';
import { NotificationCP } from './../../../../to/notification/notification';
import { NotificationSV } from './../../../../service/notification';
import {UseronlineCP} from './../../../../to/useronline/useronline'; 
import { UseronlineSV } from './../../../../service/useronline';
// import { ToolsCP } from './../../../social/pages/to/tools/tools'; 

declare var $:any;
declare var document:any
declare var window:any
declare var getData:any
import links from "./../../../../to/links";
import {DropzonetestCP} from "./../../../../to/dropzonetest";

/**************/

@Component({
  selector: 'bzn-app',
  templateUrl: './home.html',
  providers:[UserSV, NotificationSV, UseronlineSV],
  directives:[ROUTER_DIRECTIVES,UploadWG,DropzonetestCP, NotificationCP, UseronlineCP]
})

export class HomeCP implements OnInit { 

    constructor(
        private router: Router,
        private users:UserSV,
        private noti:NotificationSV,
        private online:UseronlineSV
     
    ){}
    message:string = "Hello";
    upload = false;
    today: string = moment().locale('th').format('llll'); 
    sumComment:any;
    public ngOnInit(){  
        this.online.setUseronline('5771fe53f0d71d43048b4567').subscribe();

        // this.tools.countComment('574416b0f0d71df7728b4567').subscribe(
        //     data => {
        //         this.sumComment = data.sum_comment
        //     }
        // );

      if(this.users.getToken()){
        this.users.getUser(this.users.getToken()).subscribe(data =>{
          if(data.first_name && data.last_name ){
            this.message = 'Hi '+data.first_name;
          }
        },error => console.error(error))
      }
      
    }
    public load(){
      this.upload = true;
     // this.loader.loadAsRoot(UploadWG,'#container',this._injector); .find('p')
    }
    
    public addNoti(){   
        var host_id = '56e273eff0d71dff138b4567'; //user_id || shop_id
        var send_to = '57835f55f0d71d8f518b4567'; //user_id only
        //var post_id = '56e26fe0f0d71dd70c8b4567'; //shop_id
        // var message = 'ถูกใจโพสต์ "Hi Bazarn Thailand"';
        var message = 'ยกเลิกการซื้อขายสินค้ากับร้าน <b>Fancy Shop</b>';
        var photo = 'uploads/shoplogo_56e2f3b8f0d71d66718b4567_812136735.jpeg';
        var link = 'google.com'; 

        this.noti.addNoti(host_id, send_to, message, photo, link).subscribe(); 
    } 
}

// function linkify(text:string):string {
//     return Autolinker.link(text);
// }

interface LinkifyOptions {
    skipMediaLinks:boolean;
}

function linkify(text:string, options:LinkifyOptions):string {
    var autolinker = new Autolinker({
        urls: {
            schemeMatches: true,
            wwwMatches: true,
            tldMatches: true
        },
        email: true,
        phone: true,
        twitter: false,
        hashtag: false,

        stripPrefix: true,
        newWindow: true,

        truncate: {
            length: 60,
            location: "end"
        },

        className: ""
    });

    var res = autolinker.link(text);
    if (options && options.skipMediaLinks) {
        return res;
    }
    try {
        return links.processMediaLinks(res);
    } catch (err) {
        log.error(err);
        return res;
    }
}


$(document).on('paste blur', '.filterLinkT', function(e:any) {
    var gid = $(this).data('id');
    
    var contents = $('#sendMessage'+gid).html();
     var pastedData ='';
    
  
    setTimeout(()=>{
        
        //$('.filterLinkT').html($('.filterLinkT').html().replace(pastedData,''));
         if (contents != $('#sendMessage'+gid).html()){
             
            contents = linkify($('#sendMessage'+gid).html(),{skipMediaLinks: true});
            //contents = linkify(pastedData,{skipMediaLinks: true});
            //$('.filterLinkT').insertAtCaret(contents)
           // $('.filterLinkT').insertAtCaret(contents);
           $('#sendMessage'+gid).html(contents)
           setEndOfContenteditable($(this)[0])
           
            //pasteHtmlAtCaret('xxxx');
            //$('#username').setCursorPosition(1);
            //$('.filterLinkT').focus();
            //setCursorx($('.filterLinkT').html(), $('.filterLinkT').html().length);
        }
    },1000)
})
// $(document).on('blur click ', '.filterLinkT', function(e:any) {
//     var pastedData ='';
//     if(e.originalEvent.clipboardData){
//          pastedData = e.originalEvent.clipboardData.getData('text/plain');
//     }
//     console.log(pastedData);
  
//     setTimeout(()=>{
        
//         $('.filterLinkT').html($('.filterLinkT').html().replace(pastedData,''));
//          if (contents != $(this).html()){
             
//             //contents = linkify($(this).html(),{skipMediaLinks: true});
//             contents = linkify(pastedData,{skipMediaLinks: true});
            
//            // $('.filterLinkT').insertAtCaret(contents);
//            //$('.filterLinkT').html(contents)
//             pasteHtmlAtCaret(contents);
//             //$('#username').setCursorPosition(1);
//             //$('.filterLinkT').focus();
//             //setCursorx($('.filterLinkT').html(), $('.filterLinkT').html().length);
//         }
//     },1000)
   
// });
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
function setCursorx(elem:any, pos:any){
	
    if(elem.setSelectionRange){
      
      elem.focus();
      elem.setSelectionRange(pos, pos);
    
    }else if(elem.createTextRange){
      var range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }else{
        console.log('xxxxyyy')
    }
}
jQuery.fn.extend({
insertAtCaret: function(myValue:string){
  return this.each(function(i:number) {
    if (document.selection) {
      this.focus();
      let sel = document.selection.createRange();
      sel.text = myValue;
      this.focus();
    }
    else if (this.selectionStart || this.selectionStart == '0') {
      var startPos = this.selectionStart;
      var endPos = this.selectionEnd;
      var scrollTop = this.scrollTop;
      this.value = this.value.substring(0, startPos)+myValue+this.value.substring(endPos,this.value.length);
      this.focus();
      this.selectionStart = startPos + myValue.length;
      this.selectionEnd = startPos + myValue.length;
      this.scrollTop = scrollTop;
    } else {
      this.value += myValue;
      this.focus();
    }
  })
}
});
function pasteHtmlAtCaret(html:string) {
    var sel:any, range:any;
    if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();

            // Range.createContextualFragment() would be useful here but is
            // only relatively recently standardized and is not supported in
            // some browsers (IE9, for one)
            var el = document.createElement("div");
            el.innerHTML = html;
            var frag = document.createDocumentFragment(), node:any, lastNode:any;
            while ( (node = el.firstChild) ) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);

            // Preserve the selection
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    } else if (document.selection && document.selection.type != "Control") {
        // IE < 9
        document.selection.createRange().pasteHTML(html);
    }
}
var contents = $('.filterLink').html();
$(document).on('blur keyup paste focus', '.filterLink', function() {
    if (contents!=$(this).html()){
        contents = linkify($(this).html(),{skipMediaLinks: false});
        $('.filterLink').html(contents);
        
    }
});
$(document).on('paste ', '.chatboxp', (e:any) => {
       e.preventDefault(); 
            var text = (e.originalEvent || e).clipboardData.getData('text/plain');
            window.document.execCommand('insertText', false, text);
            $('[contenteditable]').trigger('keyup');
});

$(document).on('click', '.youtube', function(){
  var play_id = $(this).attr('id');
  links.playYoutube(play_id);
});
// $(document).on('focus',"[contenteditable]",function () {
// var val = this.value;
// var $this = $(this);
// $this.val("");
// setTimeout(function () {
//     $this.val(val);
// }, 1);
// });