import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IProduct } from '../models/productModel';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http:HttpClient) { }

  URL=environment.baseURL
  subject=new BehaviorSubject<IProduct|null>(null);

  getProducts(){
    return this._http.get(this.URL + 'products/')
  }

  getProduct(id:number){
    return this._http.get(this.URL + 'products/'+ id)
  }

  sendProduct(product:IProduct){
    this.subject.next(product)
  }

  recieveProduct():Observable<IProduct|null>{
    return this.subject.asObservable();
  }
}
