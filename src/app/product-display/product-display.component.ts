import { Component } from '@angular/core';
import { IProduct, IProductsList } from '../models/productModel';
import { CategoryService } from '../services/category.service';
import { MessageService } from '../services/message.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent {

  id:number
  Title:string=''
  searchTitle:string=''
  category:string
  products:IProductsList
  sortField:string
  sortDirection:string 

  constructor(private product: ProductService, private messageService:MessageService, private categoryService:CategoryService, private route: ActivatedRoute, private productService:ProductService){

  }

  ngOnInit(): void {
     this.getCategory(); //to subscribe to the behaviorsubject messages from categories
  }

  productsDisplay(){
    this.product.getProducts().subscribe(
      (success:IProductsList)=>{
        this.products=success;
      },
      (error)=>{
        console.log('error',error)
      }
    )
    }

  sendProduct(sendProduct:IProduct){
    //console.log('send',sendProduct)
    this.productService.sendProduct(sendProduct)
  }

  getCategory(){

    this.messageService.recieveMessage().subscribe(
      (success:string|null)=>{
        this.category=success
        console.log("category is:",this.category)
        //in case of all products
        if(this.category==='all'){

          this.productsDisplay()

        }
        //in case of refresh
        else if(this.category===null){

          this.categoryService.getCategory(this.route.snapshot.params['type']).subscribe((success:IProductsList)=>
          {
              if(this.route.snapshot.params['type']=='all'){
                this.productsDisplay()
              }else{
                this.products=success
              }

              
            
          },
          error=>{
            console.log('error',error)
          })
          //in case category exists through behaviour subject
        }else{
          this.getCategoryItemDetail(this.category)
        }
      },
      (error)=>{
        console.log('recieved error',error)
      }
    )
  }

  getCategoryItemDetail(category_type:string){
    this.categoryService.getCategory(category_type).subscribe((success:IProductsList)=>{
      this.products=success
    },
    (error)=>{
      console.log(error, 'error')
    })
  }

  setSortCategory(field:string, direction:string){
    this.sortField=field
    this.sortDirection=direction
  }

  search(){
    this.searchTitle=this.Title
  }

}
