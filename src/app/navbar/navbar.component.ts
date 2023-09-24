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

  notifs:number
  currentUser:IUser

  constructor(private loginService:LoginService){
    
    let currentUser:IUser=this.loginService.getUsersDetails()
    this.notifs=loginService.getQuantityOfCart(currentUser.id)
    
  }

  logoutUser(){
    this.loginService.userLogout()
  }

  checkLoggedIn(){
    return this.loginService.getUsersDetails()
  }

  

}
