import {Component,OnInit} from '@angular/core';
declare var $:any;
declare var Dropzone:any;
import {FILE_UPLOAD_DIRECTIVES, FileUploader}  from 'ng2-file-upload';
@Component({
    selector:'upload',
    directives:[FILE_UPLOAD_DIRECTIVES],
    templateUrl:'./upload.html'
})
export class UploadWG implements OnInit {
    constructor() {}
    public ngOnInit(){
      console.log(Dropzone);
      var myDropzone = new Dropzone(".x", { url: "/file/post"});
     
    }
    public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
}