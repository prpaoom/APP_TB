import {Injectable,ViewChild} from '@angular/core';
import {Http, Response,Headers} from '@angular/http';
import {AppFn} from './../AppFn';
@Injectable()
export class CatalogSV {
    app = new AppFn();
    headers = new Headers();
    
    constructor(private http: Http) {
        this.headers.append('Content-Type','application/json');
    }
    public createCatalog(cat_name:string){
        return this.http.post(this.app.api()+'/catalog/create',this.app.body({'cat_name':cat_name}),{headers:this.headers}).map(res => res.json());
        
    }
    public createSubCatalog(cat_name:string,cat_id:string,root:string){
        return this.http.post(this.app.api()+'/catalog/createSub',this.app.body({'cat_name':cat_name,'cat_id':cat_id,root:root}),{headers:this.headers}).map(res => res.json());    
    }
    public loadDataCatalogById(cat_id:string){
        return this.http.post(this.app.api()+'/catalog/loadDataId',this.app.body({'cat_id':cat_id}),{headers:this.headers}).map(res => res.json());
        
    }
    public getIdCatalogByname(name:string){
        console.log(name);
        return this.http.get(this.app.api()+'/catalog/getDataByName/'+name).map(res => res.json());
    }
    public getDataCatalog(){
        return this.http.get(this.app.api()+'/catalog/loadData').map(res => res.json());        
    }
}