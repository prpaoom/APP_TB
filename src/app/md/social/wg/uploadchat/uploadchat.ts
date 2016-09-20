import { Component} from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
@Component({
  templateUrl: './uploadchat.html',
  directives:[ROUTER_DIRECTIVES]
})
export class UploadchatCP {
    constructor(
        private router: Router
    ){}
}