import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { IProduct, IProductsList } from '../models/productModel';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{


  categoriesArray:String[]=['smartphones','laptops','skincare']
  product:IProductsList
  categoriesListArray:IProductsList[]=[]

  constructor(private categoryService:CategoryService, private router:Router, private productService:ProductService){}

  //outer ngfor to go through all categories
  //inter for to display all products inside a category

  ngOnInit(): void {
    this.getCategoryLists()
    this.getCategory('smartphones')
    this.getCategory('laptops')
    this.getCategory('fragrances')
  }
  // product_smartphone:IProductsList
  // product_laptops:IProductsList
  // product_fragrances:IProductsList

  // displayProduct(){
  //   console.log(this.product_fragrances,this.product_laptops,this.product_smartphone)
  // }

  getCategoryLists(){
    this.categoryService.getCategoryList().subscribe(
      (success:any)=>{
        this.categoriesArray=success
        //console.log(this.categoriesArray)
      },
      (error)=>{
        console.log('home:',error)
      }
    )
  }

  getCategory(category:string='smartphones'){
    this.categoryService.getCategory(category).subscribe((success:IProductsList)=>{
      // if(category=='smartphones')
      // {
      //   this.product_smartphone=success
      // }else if(category=='laptops'){
      //   this.product_laptops=success
      // }else if(category=='fragrances'){
      //   this.product_fragrances=success
      // }
      this.categoriesListArray.push(success)
      console.log('here',this.categoriesListArray)
    })
  }

  message(mess:string){
    console.log(mess)
  }

  sendCategory(category_type:string){
    this.router.navigate(['/category/'+ category_type])
  }

  sendProduct(sendProduct:IProduct){
    //console.log('send',sendProduct)
    this.productService.sendProduct(sendProduct)
  }

}
