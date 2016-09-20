import {Injectable} from '@angular/core';
import {Http, Response,Headers} from '@angular/http';
import {AppFn} from './../appfn';
@Injectable()
export class UseronlineSV {
    app = new AppFn();
    headers = new Headers();
    constructor(private http:Http) {
        this.headers.append('Content-Type','application/json');
    }

    public getUseronline(uid:any){ 
        return this.http.post(this.app.api()+'/useronline/getUseronline',this.app.body({'uid':uid}),{headers:this.headers}).map(res => res.json());
    }

    public setUseronline(uid:any){
        return this.http.post(this.app.api()+'/useronline/setUseronline',this.app.body({'uid':uid}),{headers:this.headers}).map(res => res.json()); 
    }
}
