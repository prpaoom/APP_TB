import { Component} from '@angular/core';
import { Router,ROUTER_DIRECTIVES } from '@angular/router';
import {UserSV} from './../../../../service/user';
import {AppFn} from './../../../../appfn';

@Component({
  
  templateUrl: './activate.html',
  directives:[ROUTER_DIRECTIVES],
  providers:[UserSV]
  
})
export class ActivateCP {
    app = new AppFn();
    constructor(
        private router: Router,
        private users:UserSV
    ){}
    uid:string
    token:string
    status:string
    fullname:string
    public ngOnInit(){
      this.router.routerState.queryParams.subscribe(params => {
            this.uid = params['uid'];
            this.token = params['token'];
            
            this.users.activated(this.uid,this.token).subscribe(
                
                data => {
                    if(data.status){
                        setTimeout(() =>{
                            this.users.checkLogin();
                            window.location.href = this.app.local_url()+'/'
                        },3000)
                        this.status = 'success';
                        this.users.getUser(this.users.getToken()).subscribe(data => {
                            if(data.statusLogin){
                                this.fullname = data.first_name +' '+ data.last_name;
                            }else{
                                this.fullname ='';
                            }
                            
                        },error => console.error(error))
                    
                        
                    }else{
                        this.status = 'error';  
                    }
                },
                error => console.error(error)
            )

        })
         
        
          
    }



    
}
