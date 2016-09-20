import { Component, ViewChild, OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import '../../assets/css/styles.css'; // main Style


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  directives:[ROUTER_DIRECTIVES]
})
export class AppComponent {
}