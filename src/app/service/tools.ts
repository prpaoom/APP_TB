import {Injectable} from '@angular/core';
import {Http, Response,Headers} from '@angular/http';
import {AppFn} from './../appfn';
@Injectable()
export class ToolsSV {
    app = new AppFn();
    headers = new Headers();
    constructor(private http:Http) {
        this.headers.append('Content-Type','application/json');
    }

    public countComment(postid:any){   
        return this.http.post(this.app.api()+'/tools/countComment',this.app.body({'postid':postid}),{headers:this.headers}).map(res => res.json());
    }

    public countSubComment(postid:any, rpid:any){
        return this.http.post(this.app.api()+'/tools/countSubComment',this.app.body({'postid':postid, 'rpid':rpid}),{headers:this.headers}).map(res => res.json());
    }

    public countLikeComment(commentid:any){
        return this.http.post(this.app.api()+'/tools/countLikeComment',this.app.body({'commentid':commentid}),{headers:this.headers}).map(res => res.json());
    }

    public countLikePost(postid:any){
        return this.http.post(this.app.api()+'/tools/countLikePost',this.app.body({'postid':postid}),{headers:this.headers}).map(res => res.json());
    }

    public countSharePost(postid:any){
        return this.http.post(this.app.api()+'/tools/countSharePost',this.app.body({'postid':postid}),{headers:this.headers}).map(res => res.json());
    }
}
