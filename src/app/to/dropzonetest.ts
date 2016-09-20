import { Component, OnInit, AfterViewInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
    selector: 'respond-dropzone',
    template: `
        
        <div id="my-dropzone" class="row dropzone needsclick dz-clickable"></div>
        <div class="row m-b-sm m-t-sm">
          <button (click)="upload()" class="btn btn-primary pull-right">Upload</button>
        </div>   
    `
})
export class DropzonetestCP implements OnInit, AfterViewInit {
    private _dropzone: Dropzone;
    @Input() gid:string;
    @Input() user_id:string;
    @Input() token:string;
    @Input() url:string;
    
   
    @Output() dataUpload = new EventEmitter();
    group_id:string;
    constructor() { }

    ngOnInit() { 
        
        Dropzone.autoDiscover = false;
       
    }

    ngAfterViewInit(): void {
        
         console.log(this.gid)
        this._dropzone = new Dropzone('#my-dropzone', {  
            url: 'http://192.168.0.14:7777/chat/upload', // URL here
            addRemoveLinks: true,
            //params:{gid:this.gid,user_id:this.user_id},
            maxFiles: 12,
            maxFilesize: 5,
            parallelUploads: 10000,
            //headers: { "Content-Type": "application/json" },
            autoProcessQueue: false,
            clickable: true,
            uploadMultiple: true
        });
        this._dropzone.on('successmultiple',(file:any,data:any)=>{
            data.chat.picture = data.picture;
            this.dataUpload.emit(data)
            
        })
        this._dropzone.on("complete", (file:any)=> {
            this._dropzone.removeAllFiles();
        });
    }

    upload(): void {
        //this.ngAfterViewInit();
       // this.group_id = this.gid
        //console.log(this.gid);
        this._dropzone.on('sending', (file:any, xhr:any, formData:any) =>{
            formData.delete('gid');
            formData.delete('user_id');
            formData.append('user_id',this.user_id)
            formData.append('gid', this.gid);
        });
        this._dropzone.processQueue();
        
        
    }
}