import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css'],
    standalone: false
})
export class LayoutComponent {

  constructor(private loginService:LoginService){}

  checkLoggedIn(){
    return this.loginService.getUsersDetails()
  }

}
