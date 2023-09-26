import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { IUser } from '../models/userModel';
import { ICart } from '../models/cartModel';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

   //notifs:number
   currentUser:IUser

   constructor(private loginService:LoginService){
    //this.getNotifs()
   }
    
   logoutUser(){
     this.loginService.userLogout()
   }

   checkLoggedIn(){

    if(this.loginService.getUsersDetails()){
      this.currentUser=JSON.parse(sessionStorage.getItem('user'))
    }
     return this.loginService.getUsersDetails()
   }

  //  getNotifs(){
  //     if(!(this.currentUser=this.loginService.getUsersDetails())){
  //       this.notifs=this.loginService.getQuantityOfCart(this.currentUser?.id)
  //     }
      

     //need to send it using behaviour subject
   }
