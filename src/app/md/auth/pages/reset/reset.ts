import {Component, OnInit} from '@angular/core'; 
import {UserSV} from './../../../../service/user';

import {Router} from '@angular/router';
//import {Nav} from './../../widgets/nav/nav';

@Component({
    selector: 'reset', 
    directives: [],
    providers: [UserSV],
    templateUrl: './reset.html'
})

export class ResetCP implements OnInit{
    uid: string
    token: string
    message: string

    password: string
    passwordConfirm: string

    constructor(
        private user:UserSV,
        
        private router:Router
    ){}

    public ngOnInit(){
        this.router.routerState.queryParams.subscribe(params =>{
            this.uid = params['uid'];
            this.token = params['token'];
            this.user.reset(this.uid, this.token).subscribe(
                data => { 
                    if(data.message != 'success'){
                        this.router.navigate(['/login']);
                    } 
                }, error => console.error(error)
            )
        })
        
    }

    public submitReset(){  
        this.user.submit_reset(this.uid, this.password, this.passwordConfirm).subscribe(
            data => {
                console.log(data);
                if(data == 'error1'){
                    this.message = 'กรุณากรอกข้อมูล...';
                }else if (data == 'error2') {
                    this.message = 'รหัสผ่านไม่ตรงกัน...';
                }else{
                    this.message = 'เปลี่ยนรหัสผ่านสำเร็จ...';
                    this.router.navigate(['/login']);

                }
            }, error => console.error(error)
        )
    }
}