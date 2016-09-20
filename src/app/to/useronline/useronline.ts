import {Component, Input, OnInit} from '@angular/core';
import {UseronlineSV} from './../../service/useronline';

@Component({
    selector: 'useronline',
    templateUrl: '/useronline.html',
    providers: [UseronlineSV],
})

export class UseronlineCP{
    constructor(
        private sv_online: UseronlineSV
    ){}
    @Input() uid:any;
    @Input() type:any;

    message:string; 
    
    ngOnInit(){  
        this.sv_online.getUseronline(this.uid).subscribe(
            data => { 

                if(data.status == 1){
                    if(this.type == 'icon'){
                        this.message = 'icon-online';
                    }else if(this.type == 'button'){
                        this.message = 'btn-online';
                    }else{
                        this.message = 'online';
                    }
                    
                }else if(data.status == 2){
                    if(this.type == 'icon'){
                        this.message = 'icon-alway';
                    }else if(this.type == 'button'){
                        this.message = 'btn-alway';
                    }else{
                        this.message = 'alway';
                    } 

                }else{
                    if(this.type == 'icon'){
                        this.message = 'icon-offline';
                    }else if(this.type == 'button'){
                        this.message = 'btn-offline';
                    }else{
                        this.message = 'offline';
                    }  
                }
            }
        ); 
    }
}