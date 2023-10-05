import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { MessageService } from '../services/message.service';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../models/userModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm:FormGroup
  currentUser:IUser


  constructor(private loginService:LoginService, private toastr:ToastrService, private formbuilder :FormBuilder, private route:Router, private messageService:MessageService){
    
  }

  get formControls(){
    return this.loginForm.controls 
  }

  ngOnInit(): void {

    this.loginForm = this.formbuilder.group({
      username: ['atuny0', Validators.required],
      password: ['9uQFF1Lh', Validators.required]
    })

    console.log('formcontrol:',this.loginForm.controls)
      
  }

  loginUser(){
    this.loginService.checkLogin(this.loginForm.value).subscribe(
      (success:IUser)=>{
        
        sessionStorage.setItem('user',JSON.stringify(success))
        this.loginService.setCurrentUser()
        
        this.toastr.success('Successfully logged in')

        this.route.navigate(['/home'])

        this.currentUser=success

        if(!this.loginService.getCartStatus(this.currentUser.id)){
          this.loginService.createCart(this.currentUser.id)
        }

        if(!this.loginService.getWishListStatus(this.currentUser.id)){
          this.loginService.createWishListCart(this.currentUser.id)
        }

      },
      error=>{

        this.toastr.warning('Error has occured')

      }
    )
  }

}
