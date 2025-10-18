import { Component, OnInit } from '@angular/core';
import { IUser } from '../models/userModel';
import { LoginService } from '../services/login.service';
import { IWishList } from '../models/wishlistModel';
import { IProduct } from '../models/productModel';

@Component({
    selector: 'app-wishlist',
    templateUrl: './wishlist.component.html',
    styleUrls: ['./wishlist.component.css'],
    standalone: false
})
export class WishlistComponent implements OnInit{

  currentUser:IUser
  wishListItem:IWishList
  productQty:number=1

  constructor(private loginService:LoginService){
    this.currentUser=this.loginService.getUsersDetails()
  }

  ngOnInit():void{

    if(this.currentUser){
      this.wishListItem=this.loginService.getWishList(this.currentUser.id)
    }
  }

  deleteWishListProduct(Productid:number){
    this.loginService.deleteWishListItem(this.currentUser.id, Productid)
    this.wishListItem=this.loginService.getWishList(this.currentUser.id)
  }

  addToCart(product:IProduct){

    for(let i=0;i<this.productQty;i++){
      this.loginService.addToCartfromWishList(this.currentUser.id, product)
    }

    this.wishListItem=this.loginService.getWishList(this.currentUser.id)

  }

}
