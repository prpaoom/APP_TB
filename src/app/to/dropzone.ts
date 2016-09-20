import {Component, EventEmitter, Input, Output, ElementRef} from '@angular/core';

@Component({
    selector: 'respond-dropzone',
    template: '<form class="dropzone"></form>'
})

export class DropzoneCP {

  @Output() onAdd = new EventEmitter<any>();
  
  constructor (private elementRef: ElementRef) {}

  /**
   * Init
   */
  ngOnInit() {

    this.setupDropzone();

  }

  setupDropzone() {

    var el = this.elementRef.nativeElement.querySelector('.dropzone');

    var dropzone: any;

    // set dropzone options
    var options = {
      url: '/api/images/add',
      headers:''
    };

    // setup token headers
    //options.headers = {};
    //options.headers['X-AUTH'] = 'Bearer ' + localStorage.getItem('id_token');

    // create the dropzone
    dropzone = new Dropzone(el, options);

    var context = this;

    dropzone.on("complete", function(file:File) {
      dropzone.removeFile(file);
      context.onAdd.emit(null);
    });

  }

}