import { Component} from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import './../../../../assets/css/err.css'; // main Style
@Component({
  templateUrl: './err404.html',
  directives:[ROUTER_DIRECTIVES]
})
export class Err404CP {}
