import { Component} from '@angular/core';
import { Router } from '@angular/router';
import {AppFn} from './../../../../appfn';
@Component({
  selector: 'bzn-app',
  templateUrl: './needmail.html'
})
export class NeedmailCP {
    constructor(
        private router: Router
    ){}
    app = new AppFn();
    site_url = this.app.local_url();
}
