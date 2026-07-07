import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-my-profile',
  imports: [CommonModule,FormsModule],
  templateUrl: './my-profile.html',
  styleUrl: './my-profile.css',
})
export class MyProfile  implements OnInit {
  showEditModal=false;
  showPasswordModal=false;
  editData={

  fullName:'',

  phone:'',

  institution:''

};

passwordData={

  currentPassword:'',

  newPassword:'',

  confirmPassword:''

};
  
  farmer:any={};

ngOnInit(){

  this.loadProfile();

}

constructor(

private userService:UserService,

private cdr:ChangeDetectorRef

){}

loadProfile(){

this.userService

.getMyProfile()

.subscribe({

next:(res:any)=>{

this.farmer=res;

this.editData.fullName=res.fullName;

this.editData.phone=res.phone;
this.editData.institution =
res.institution;

this.cdr.detectChanges();

},

error:(err:any)=>{

console.log(err);

}

});

}

saveProfile(){

this.userService

.updateUser(

this.farmer.id,

{

...this.farmer,

fullName:this.editData.fullName,

phone:this.editData.phone,

institution:this.editData.institution

}

)

.subscribe({

next:(res:any)=>{

this.showEditModal=false;

this.loadProfile();

},

error:(err:any)=>{

console.log(err);

}

});

}

changePassword(){

if(

this.passwordData.newPassword

!==

this.passwordData.confirmPassword

){

alert("Passwords do not match");

return;

}

this.userService

.changePassword({

currentPassword:

this.passwordData.currentPassword,

newPassword:

this.passwordData.newPassword

})

.subscribe({

next:(res:any)=>{

alert("Password changed successfully");

this.showPasswordModal=false;

},

error:(err:any)=>{

alert(err.error);

}

});

}

}