import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { IProduct } from '../models/productModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  subject=new BehaviorSubject<string|null>(null);

  constructor() { }

  sendMessage(message:string){
    this.subject.next(message)
  }

  recieveMessage():Observable<string|null>{
    return this.subject.asObservable();
  }
}
