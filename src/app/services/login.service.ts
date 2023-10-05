import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ILogin } from '../models/loginModel';
import { IUser } from '../models/userModel';
import { ICart } from '../models/cartModel';
import { IProduct } from '../models/productModel';
import { ToastrService } from 'ngx-toastr';
import { IWishList } from '../models/wishlistModel';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userProfile
  currentUser

  constructor(private _https:HttpClient, private toastr:ToastrService) { }

  baseURL=environment.baseURL
  isAuthorised:boolean=false

  checkLogin(formValues:ILogin){
    return this._https.post(this.baseURL + 'auth/login', formValues)
  }

   getUsersDetails():IUser{
     return JSON.parse(sessionStorage.getItem('user'))
   }

  setCurrentUser(){

     this.currentUser=JSON.parse(sessionStorage.getItem('user'))

   }

   userLogout(){
    sessionStorage.removeItem('user')
   }

   getCart(id:number){
    return JSON.parse(sessionStorage.getItem(id+'_cart'))
   }

   getWishList(id:number){
    return JSON.parse(sessionStorage.getItem(id+'_wishlist'))
   }

   createCart(id:number){

    sessionStorage.setItem(id+'_cart', JSON.stringify({
      userId: id,
      products: [],
      totalItems: 0,
      total: 0
    }))

   }

   createWishListCart(id:number){
    sessionStorage.setItem(id+'_wishlist', JSON.stringify({
      userId: id,
      products: []
    }))

   }

   getCartStatus(id:number){
    if (sessionStorage.getItem(id + '_cart'))
      return true
    else
      return false
   }

   getWishListStatus(id:number){
    if (sessionStorage.getItem(id + '_wishlist'))
      return true
    else
      return false
   }

   addToCart(id:number, product:IProduct){
    let currentCart: ICart = JSON.parse(sessionStorage.getItem(id + '_cart'))

    let index=-1

    //checking if a duplicate product is being added
    for(let i=0;i<currentCart.products.length;i++){
      if (currentCart.products[i].product.id == product.id) {
        index = i
        break
      }
    }

    if(index!=-1){
      console.log('duplicate item')
      if(currentCart.products[index].quantity<2){
        currentCart.products[index].quantity += 1
        currentCart.products[index].total += product.price
        currentCart.total += product.price
        currentCart.totalItems += 1
        this.toastr.success('Item added to cart successfully!')
      }else{
        this.toastr.warning('Maximum cart capacity is 2!')
      }
    }else{
      console.log('new item')
      currentCart.products.push({product:product, quantity:1, total:product.price})
      currentCart.total += product.price
      currentCart.totalItems += 1
      this.toastr.success('Item added to cart successfully!')

    }

    sessionStorage.setItem(id+'_cart',JSON.stringify(currentCart))
  }

  addToCartfromWishList(id:number, product:IProduct){
    let currentCart: ICart = JSON.parse(sessionStorage.getItem(id + '_cart'))

    let index=-1

    //checking if a duplicate product is being added
    for(let i=0;i<currentCart.products.length;i++){
      if (currentCart.products[i].product.id == product.id) {
        index = i
        break
      }
    }

    if(index!=-1){
      console.log('duplicate item')
      if(currentCart.products[index].quantity<2){
        currentCart.products[index].quantity += 1
        currentCart.products[index].total += product.price
        currentCart.total += product.price
        currentCart.totalItems += 1
        this.toastr.success('Item added to cart successfully!')
        this.deleteWishListItem(id, product.id)
      }else{
        this.toastr.warning('Maximum cart capacity is 2!')
      }
    }else{
      console.log('new item')
      currentCart.products.push({product:product, quantity:1, total:product.price})
      currentCart.total += product.price
      currentCart.totalItems += 1
      this.toastr.success('Item added to cart successfully!')
      this.deleteWishListItem(id, product.id)

    }

    sessionStorage.setItem(id+'_cart',JSON.stringify(currentCart))

  }

  addToWishList(id:number, product:IProduct){

    let currentWishList: IWishList = JSON.parse(sessionStorage.getItem(id + '_wishlist'))

    //checking if a duplicate product is being added
    let index=-1

    for(let i=0;i<currentWishList.products.length;i++){
      if (currentWishList.products[i].id == product.id) {
        //duplicate exists
        index=i
        break
      }
    }

    if(index!=-1){
      console.log('duplicate item')
      this.toastr.warning('Item is already present in wishlist!')
    }else{
      console.log('new item')
      currentWishList.products.push(product)
      this.toastr.success('Item added to wishlist successfully!')

    }

    sessionStorage.setItem(id+'_wishlist',JSON.stringify(currentWishList))



  }

   deleteItem(userId:number, productId:number){

    let currentCart: ICart = JSON.parse(sessionStorage.getItem(userId + '_cart'))

    let index = -1;

    for (let i = 0; i < currentCart.products.length; i++) {
      if (currentCart.products[i].product.id == productId) {
        index = i
        break
      }
    }

    if (index != -1) {
      currentCart.total -= currentCart.products[index].total
      currentCart.totalItems -= currentCart.products[index].quantity
      currentCart.products.splice(index, 1)
      this.toastr.warning('Item removed from cart!')
   }

   sessionStorage.setItem(userId + '_cart', JSON.stringify(currentCart))
  }

  deleteWishListItem(userId:number, productId:number){
    let currentWishList: IWishList = JSON.parse(sessionStorage.getItem(userId + '_wishlist'))

    let index=-1

    for(let i=0;i<currentWishList.products.length;i++){
      if (currentWishList.products[i].id == productId) {
        //item exists at index i
        index=i
        break
      }
    }

    if (index != -1) {
      currentWishList.products.splice(index, 1)
   }

   sessionStorage.setItem(userId + '_wishlist', JSON.stringify(currentWishList))

  }

  addProductQuantity(id: number, product:IProduct){
    let currentCart:ICart=JSON.parse(sessionStorage.getItem(id+'_cart'))

    let index=-1

    for(let i=0;i<currentCart.products.length;i++){
      if(currentCart.products[i].product.id==product.id){
        index=i
        break
      }
    }

    if(index!=-1){
      if(currentCart.products[index].quantity>=2){
        this.toastr.warning('Maximum Quantity is 2!')
      }
      else if(currentCart.products[index].quantity<2){
        currentCart.products[index].quantity+=1
        currentCart.products[index].total+=product.price
        currentCart.total+=product.price
        currentCart.totalItems += 1
        this.toastr.success("Successfully added additional product!")
      }
    }
    sessionStorage.setItem(id+'_cart',JSON.stringify(currentCart))
  }

  deleteProductQuantity(id: number, product:IProduct){
    let currentCart:ICart=JSON.parse(sessionStorage.getItem(id+'_cart'))

    let index=-1

    for(let i=0;i<currentCart.products.length;i++){
      if(currentCart.products[i].product.id==product.id){
        index=i
        break
      }
    }

    if(index!=-1){

        currentCart.products[index].quantity-=1
        currentCart.products[index].total-=product.price
        currentCart.total-=product.price
        currentCart.totalItems -= 1
        this.toastr.success("Successfully removed  product from cart!")
        
    }
    sessionStorage.setItem(id+'_cart',JSON.stringify(currentCart))
  }

  getQuantityOfCart(userid:number){
    let cart: ICart = JSON.parse(sessionStorage.getItem(userid + '_cart'))
    if(cart!=null){
      return cart.totalItems
    }
    else{
      return 0
    }
    
  }

   
}
