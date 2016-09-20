import { Component} from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
@Component({
  templateUrl: './profile.html',
  directives:[ROUTER_DIRECTIVES]
})
export class ProfileCP {
    constructor(
        private router: Router
    ){}
}