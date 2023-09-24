import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct, IProductsList } from '../models/productModel';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _https:HttpClient) { }
  
  URL=environment.baseURL

  getCategory(category_type:string):Observable<Object>{
    return this._https.get(this.URL + 'products/' + 'category/' + category_type)
  }

  getCategoryList():Observable<Object>{
    return this._https.get(this.URL+ 'products/' + 'categories')
  }
}