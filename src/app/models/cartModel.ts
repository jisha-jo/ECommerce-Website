import { IProduct } from "./productModel"

export interface ICart{
  userid:number,
  products:[{
    product:IProduct,
    total:number,
    quantity:number
  }],
  totalItems:number,
  total:number
}
