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
  // product:IProductsList
  // categoriesListArray:IProductsList[]=[]
  // product_smartphone:IProductsList
  // product_laptops:IProductsList
  // product_fragrances:IProductsList

  products:IProductsList
  categories:string[]
  
  constructor(private categoryService:CategoryService, private router:Router, private productService:ProductService){}

  ngOnInit(): void {
    this.productService.getProductwithoutLimit().subscribe(
      (success:IProductsList)=>{
        this.products=success
        console.log(this.products.products)
        this.categoryService.getCategoryList().subscribe(
          (success:string[])=>{
            this.categories=success
            console.log(this.categories.length)
          }
        )
      }
    )

    
}

  sendCategory(category_type:string){
    this.router.navigate(['/category/'+ category_type])
  }

  sendProduct(sendProduct:IProduct){
    this.productService.sendProduct(sendProduct)
  }

  filteredProducts(category:string){
    return this.products.products.filter(item => item.category === category)

  }

}
