import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  subject=new BehaviorSubject(null)

  sendItemToCart(cartProduct){

    this.subject.next(cartProduct)
    console.log('product send to card')
  }

  recieveItemToCart(){

    return this.subject.asObservable()

  }

}
