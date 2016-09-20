import { provideRouter, RouterConfig }  from '@angular/router';
import { Err404CP } from './app/to/err404/err404';

import { HomeCP } from './app/md/public/pages/home/home';

import { LoginCP } from './app/md/auth/pages/login/login';

import { RegisterCP } from './app/md/auth/pages/register/register';
import { ForgotCP } from './app/md/auth/pages/forgot/forgot';
import { ResendCP } from './app/md/auth/pages/resend/resend';
import { ResetpassCP } from './app/md/auth/pages/resetpass/resetpass';
import { NeedmailCP } from './app/md/auth/pages/needmail/needmail';
import { ResetsuccessCP } from './app/md/auth/pages/resetsuccess/resetsuccess';
import { ResendsuccessCP } from './app/md/auth/pages/resendsuccess/resendsuccess';
import { ActivateCP } from './app/md/auth/pages/activate/activate';
import { AddmoreCP } from './app/md/auth/pages/addmore/addmore';
import {UploadWG} from './app/wg/upload/upload';




import { WallCP } from './app/md/social/pages/wall/wall';
import {Emojione} from './app/test/emojiones';


import { SocialCP } from './app/md/social/pages/social/social';

import { ProfileCP } from './app/md/social/pages/profile/profile';
import { NavCP } from './app/md/social/wg/nav/nav';


//this is import for test you can remove it if you want but you need to ask Pbird First
import {scrolltotest} from './app/test/scrollto.test';
import {AppInfiniteCP} from './app/test/infinite.test';
import {PhotoswipeComponent} from './app/test/photoswipe';
import {PhotoswipeCP} from './app/photoswipe/photoswipe';

const routes: RouterConfig = [
  { path: '',component:HomeCP },
  { path: 'home',component:HomeCP, children:[
    {path:''},
    {path:'upload',component:UploadWG}
  ] },
  { path: 'login', component: LoginCP },
  { path: 'register', component: RegisterCP},
  { path: 'forgot', component: ForgotCP },
  { path: 'resend', component: ResendCP },
  { path: 'resetpass', component: ResetpassCP },
  { path: 'needmail', component: NeedmailCP },
  { path: 'resetsuccess', component: ResetsuccessCP },
  { path: 'resendsuccess', component: ResendsuccessCP },
  { path: 'activate', component: ActivateCP },
  { path: 'addmore', component: AddmoreCP },
  {path : 'emojione',component:Emojione},
  
  { path: 'social', component: SocialCP,
    children:[
      { path: '', component: WallCP },
      { path: 'wall', component: WallCP },
      { path: 'profile', component: ProfileCP }
    ]},
  // this is route for test app 

  { path: 'scrolltotest', component: scrolltotest },
  { path: 'infinitetest', component: AppInfiniteCP },
  { path: 'photoswipe', component: PhotoswipeComponent },
  { path: 'pee_test', component: PhotoswipeCP },

  
  {path: '**', component: Err404CP} // Redirect to Error 404 pages if page not found 
];
export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
