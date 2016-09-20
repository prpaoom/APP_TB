import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent } from './app/app.component';
import { APP_ROUTER_PROVIDERS } from './app.routes';
import {HTTP_PROVIDERS} from '@angular/http'; 
import {CookieService} from 'angular2-cookie/core';
import {disableDeprecatedForms,provideForms} from '@angular/forms';
//import FileDroppa  from 'file-droppa';


if (process.env.ENV === 'production') {
  enableProdMode();
}

bootstrap(AppComponent, [
  APP_ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  CookieService,
  disableDeprecatedForms(),
  provideForms(),
  

  ]);
