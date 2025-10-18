import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { IUser } from '../models/userModel';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    standalone: false
})
export class ProfileComponent implements OnInit{

  userDetails:IUser

  constructor(private loginService:LoginService){}

  ngOnInit(): void {
      this.getUsersProfile()
  }

  getUsersProfile(){
    this.userDetails=this.loginService.getUsersDetails()
  }

}
