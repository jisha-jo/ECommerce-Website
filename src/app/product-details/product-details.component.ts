import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { MessageService } from '../services/message.service';
import { IProduct } from '../models/productModel';
import { ICart} from '../models/cartModel';
import { IUser } from '../models/userModel';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  product:IProduct|null
  cartLocalList:ICart
  currentUser:IUser
  cartLocal
  exisiting:boolean
  notifs:number

  productQty:number=1
  productId:string

  

  constructor(private route: ActivatedRoute, private productService:ProductService, private messageService:MessageService, private categoryService: CategoryService,private router:Router,private loginService:LoginService){

    this.currentUser = JSON.parse(sessionStorage.getItem('user'))

  }

  ngOnInit(): void {

    this.getProducts()
      
  }

  getSnapshot(){
    //getting data using snapshot

    this.productService.getProduct(this.route.snapshot.params['id']).subscribe((success:IProduct)=>
      {
         this.product=success
       },
       (error:any)=>{

       }
    )
  }

  getProducts(){
    this.productService.recieveProduct().subscribe((success:IProduct|null)=>
    {
      this.product=success;
      if(this.product===null){
        this.getSnapshot()
      }
    }, 
    (error:any)=>{
      console.log(error)
    })
  }

  getNotifs(){
    let currentUser:IUser=this.loginService.getUsersDetails()
     this.notifs=this.loginService.getQuantityOfCart(currentUser.id)

     //need to send it using behaviour subject
   }

  addToCart(product:IProduct){

    for(let i=0;i<this.productQty;i++){
      this.loginService.addToCart(this.currentUser.id, product)
    }
    this.getNotifs()
  }

  addToCartStorage(cartProduct:IProduct){

    // let i:number
    // this.currentUser=this.loginService.getUsersDetails()
    // this.cartItem={
    //   cart_product:cartProduct,
    //   total:cartProduct.price,
    //   quantity:1
    // }

    // this.cartLocalList={
    //   userid:this.currentUser.id,
    //   products:[this.cartItem],
    //   totalItems:this.cartItem.quantity,
    //   total:this.cartItem.total
    // }

    // this.cartLocal=sessionStorage.getItem('cartLocal')

    // if(this.cartLocal===null){

      

    // this.cartLocal=JSON.parse(sessionStorage.getItem('cartLocal'))

    

    //   sessionStorage.setItem('cartLocal',JSON.stringify([this.cartLocalList]))
    // }
    //   else{
        
    //     for(i=0;i<this.cartLocal.length;i++){
    //       if(this.cartLocalList.userid===this.cartLocal[i].userid){
    //         this.exisiting=true
    //         this.cartLocal[i].products.push(this.cartLocalList.products)
    //         this.cartLocal[i].total+=this.cartLocalList.total
    //         this.cartLocal[i].totalItems+=this.cartLocalList.totalItems

    //         sessionStorage.setItem('cartLocal',JSON.stringify(this.cartLocal))

    //       }
    //     }

    //     if(this.exisiting!=true){
    //       sessionStorage.setItem('cartLocal',JSON.stringify(this.cartLocalList))
    //     }
    //   }



  //     //getting currentUserId
  //     this.currentUser=this.loginService.getUsersDetails()

  //     //assigning values to cartLocalList:Icart
  //     this.cartLocalList.userid=this.currentUser.id      
  //     this.cartLocalList.products.push(this.cartItem)
  //     this.cartLocalList.totalItems+=this.cartItem.quantity
  //     this.cartLocalList.total+=this.cartItem.total

  //     //putting it into session storage

  //     sessionStorage.setItem('cartSession',JSON.stringify(this.cartLocalList))
  //   }
  // } 
  } 

}
