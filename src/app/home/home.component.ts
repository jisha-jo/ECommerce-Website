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


  //categoriesArray:String[]=['smartphones','laptops','skincare']
  product:IProductsList
  categoriesListArray:IProductsList[]=[]
  product_smartphone:IProductsList
  product_laptops:IProductsList
  product_fragrances:IProductsList
  
  constructor(private categoryService:CategoryService, private router:Router, private productService:ProductService){}

  ngOnInit(): void {
    this.getCategory('laptops')
    this.getCategory('smartphones')
    this.getCategory('fragrances') 
  }



  sendCategory(category_type:string){
    this.router.navigate(['/category/'+ category_type])
  }

  sendProduct(sendProduct:IProduct){
    this.productService.sendProduct(sendProduct)
  }
  getCategory(category:string){
    this.categoryService.getCategory(category).subscribe((success:IProductsList)=>{
      if(category=='smartphones')
      {
        this.product_smartphone=success
        console.log(category)
      }else if(category=='laptops'){
        this.product_laptops=success
        console.log(category)
      }else if(category=='fragrances'){
        this.product_fragrances=success
        console.log(category)
      }
      // this.categoriesListArray.push(success)
    })
  }

  // getCategoryLists(){
  //   this.categoryService.getCategoryList().subscribe(
  //     (success:any)=>{
  //       this.categoriesArray=success
  //       //console.log(this.categoriesArray)
  //     },
  //     (error)=>{
  //       console.log('home:',error)
  //     }
  //   )
  // }

  

}
