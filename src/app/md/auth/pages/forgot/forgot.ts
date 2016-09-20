
import { Component} from '@angular/core';
import {UserSV} from './../../../../service/user';
import {AppFn} from './../../../../appfn';

@Component({
    selector: 'forgot', 
    providers: [UserSV],
    templateUrl: './forgot.html'
})

export class ForgotCP {
    email: string
    message: string
    app = new AppFn();
    constructor(
        private user:UserSV
    ) {}
    site_url = this.app.local_url();
    public submitForgot(){  
        this.user.forgot(this.email).subscribe(
            data => {
               
                if(data.status){
                    this.message = data;    
                }else{
                    this.message = data;  
                }
                // if (data == 'error1') {
                //     this.message = "<p class='helpbox'>กรุณากรอกข้อมูล...<p>";
                // }else if (data == 'error2') {
                //     this.message = 'ไม่พบอีเมล์นี้ในระบบ...';
                // }else{
                //     this.message = 'สำเร็จ... กรุณาตรวจสอบอีเมล์ของคุณ';
                // }

            }, error => console.error(error)
        )   
    }
}
// =======
// import { Component} from '@angular/core';
// import { Router } from '@angular/router';
// @Component({
//   selector: 'bzn-app',
//   templateUrl: './app/md/auth/pages/forgot/forgot.html'
// })
// export class ForgotCP {
//     constructor(
//         private router: Router
//     ){}
// }
// >>>>>>> master
