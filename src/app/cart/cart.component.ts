import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ICart } from '../models/cartModel';
import { IUser } from '../models/userModel';
import { IProduct } from '../models/productModel';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
    standalone: false
})
export class CartComponent {

  

   cartItem:ICart
   currentUser:IUser
  shipping:number
  total:number

   constructor(private loginService:LoginService){
    this.currentUser=this.loginService.getUsersDetails()
   }

  ngOnInit(): void {
    if(this.currentUser){
      this.cartItem=this.loginService.getCart(this.currentUser.id)
    }
    this.shipping=10
  }

  deleteCartProduct(Productid:number){
    this.loginService.deleteItem(this.currentUser.id, Productid)
    this.cartItem=this.loginService.getCart(this.currentUser.id)
  }

  addCartProductQuantity(product:IProduct){

    this.loginService.addProductQuantity(this.currentUser.id, product)
    this.cartItem=this.loginService.getCart(this.currentUser.id)

  }

  removeCartProductQuantity(product:IProduct){

    this.loginService.deleteProductQuantity(this.currentUser.id, product)
    this.cartItem=this.loginService.getCart(this.currentUser.id)
  }

}
