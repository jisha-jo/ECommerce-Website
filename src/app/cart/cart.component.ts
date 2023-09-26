import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ICart } from '../models/cartModel';
import { IUser } from '../models/userModel';
import { IProduct } from '../models/productModel';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  

  // cartProduct
  // cartItemsList=[]
  // total
  // shipping
  // subtotal=0
   cartItem:ICart
   currentUser:IUser
  shipping:number
  total:number
  // //product

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

  // // recieveProductToCart(){
  // //   this.cartService.recieveItemToCart().subscribe(
  // //     (success)=>{

  // //       this.cartProduct=success
  // //       console.log('Product recieved in cart')
  // //       this.addProductsInCartArray()

  // //     },
  // //     (error)=>{
  // //       console.log(error)
  // //     }
  // //   )
  // // }

  // // addProductsInCartArray(){
  // //   this.cartItemsList.push(this.cartProduct)
  // //   console.log('Items in Cart:',this.cartItemsList)
  // // }

  // getCartFromLocalStorage(){
  //   let i
  //   this.cartItemsList=JSON.parse(localStorage.getItem('cartLocal'))
  //   //console.log('cart items:',this.cartItemsList)

  //   for(i=0;i<this.cartItemsList.length;i++){
  //     if (this.cartItemsList[i].userid===this.currentUser.id){
  //       console.log('found required:',this.cartItemsList[i])
  //       this.cartItem=this.cartItemsList[i]
  //       this.getPrice()
  //     }
  //   }
  // }

  // getPrice(){
  //    (this.cartItem.products).map((a:any)=>{
  //     this.subtotal+=a.price
  //     console.log('price:',a.price)
  //    })

  //    this.shipping=10

  //    this.total=this.shipping+this.subtotal
  //    console.log(this.subtotal, this.shipping,this.total)
  // }

  // deleteCartProduct(deleteProduct){

  //   let i, j
  //   this.cartItemsList=JSON.parse(localStorage.getItem('cartLocal'))
  //   console.log('im here')
  //   for(i=0;i<this.cartItemsList.length;i++){
  //     if (this.cartItemsList[i].userid===this.currentUser.id){
  //       console.log('found required:',this.cartItemsList[i])
  //       for(j=0;j<this.cartItemsList[i].products.length;j++){
  //           if(JSON.stringify(this.cartItemsList[i].products[j]) === JSON.stringify(deleteProduct)){
  //             //console.log('element to be deleted is found')
  //             this.cartItemsList[i].products.splice(j,1)
  //           }
  //       }
  //     }
  //   }

  //   localStorage.setItem('cartLocal', JSON.stringify(this.cartItemsList))
  //   //console.log(this.cartItemsList)

  // }


}
