import { IProduct } from "./productModel"

// wishlist needs a refernce to the product so when you click on the item in wishlist we just find that product and add it to Cart.

export interface IWishList{
  userid:number,
  products:IProduct[]
}
