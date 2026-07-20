import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPassword {

  loading = false;
  submitted = false;

  formData={

username:'',

fullName:'',

phone:''

};

constructor(

private authService:AuthService,

private router:Router

){}
onSubmit(){

if(

!this.formData.username ||

!this.formData.fullName ||

!this.formData.phone

){

return;

}

this.loading=true;

this.authService

.forgotPassword(this.formData)

.subscribe({

next:(res)=>{

this.loading=false;

Swal.fire({

icon:'success',

title:'Temporary Password',

html:`

<div style="padding:10px">

<p>

Use this password to login.

</p>

<h1
id="tempPassword"

style="

font-size:48px;

letter-spacing:8px;

color:#5c334a;

margin:20px 0;

">

${res.temporaryPassword}

</h1>

<button

id="copyBtn"

style="

padding:10px 18px;

border:none;

border-radius:8px;

background:#5c334a;

color:white;

cursor:pointer;

">

Copy Password

</button>

<br><br>

<small>

This password will disappear in 20 seconds.

After login you must change it.

</small>

</div>

`,

timer:20000,

timerProgressBar:true,

allowOutsideClick:false,

didOpen:()=>{

const btn=

document.getElementById("copyBtn");

btn?.addEventListener(

"click",

()=>{

navigator.clipboard.writeText(

res.temporaryPassword

);

Swal.showValidationMessage(

"Password copied."

);

}

);

}

}).then(()=>{

this.router.navigate(

['/login']

);

});

},

error:(err)=>{

this.loading=false;

Swal.fire(

'Failed',

err.error,

'error'

);

}

});

}

}