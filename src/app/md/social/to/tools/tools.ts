import {Component, Input, OnInit} from '@angular/core';
import {ToolsSV} from './../../../../service/tools';

@Component({
    selector: 'tools',
    templateUrl: '/tools.html',
    providers: [ToolsSV],
})

export class ToolsCP{
    constructor(
        private sv_tools: ToolsSV
    ){}
 
    @Input() type:any;
    @Input() postid:any;
    @Input() rpid:any;
    @Input() commentid:any;
    send_to:any;

    sumComment:string;
    sumSubComment:string;
    sumLikeComment:string;
    sumLikePost:string;
    sumSharePost:string; 
    sumNoti:string;

    ngOnInit(){ 
        if(this.type == 'comment'){
            this.sv_tools.countComment(this.postid).subscribe(
                data => { 
                    if(data.sum_comment != 0){
                        this.sumComment = data.sum_comment+' ความคิดเห็น';
                    }else{
                        this.sumComment = '';
                    }
                }
            );
        }else if(this.type == 'subcomment'){
            this.sv_tools.countSubComment(this.postid, this.rpid).subscribe(
                data => {
                    if(data.sum_comment != 0){
                        this.sumSubComment = 'ตอบกลับ ('+data.sum_comment+' ความคิดเห็น)';
                    }else{
                        this.sumSubComment = '';
                    }
                }
            );
        }else if(this.type == 'likecomment'){
            this.sv_tools.countLikeComment(this.commentid).subscribe(
                data => {
                    if(data.sum_likecomment != 0){
                        this.sumLikeComment = '('+data.sum_likecomment+') ถูกใจ-comment';
                    }else{
                        this.sumLikeComment = '';
                    }
                }
            );
        }else if(this.type == 'likepost'){
            this.sv_tools.countLikePost(this.postid).subscribe(
                data => {
                    if(data.sum_likecomment != 0){
                        this.sumLikePost = '('+data.sum_likepost+') ถูกใจ-post';
                    }else{
                        this.sumLikePost = '';
                    }
                }
            );
        }else if(this.type == 'sharepost'){
            this.sv_tools.countSharePost(this.postid).subscribe(
                data => {
                    if(data.sum_likecomment != 0){
                        this.sumSharePost = '('+data.sum_sharepost+') แชร์';
                    }else{
                        this.sumSharePost = '';
                    }
                }
            );
        } 
    }
}