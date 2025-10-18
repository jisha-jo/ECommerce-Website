import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../models/productModel';

@Pipe({
    name: 'sort',
    standalone: false
})
export class SortPipe implements PipeTransform {

  transform(value: IProduct[],args: any[]): any[] {
    const sortField=args[0]
    const sortDirection=args[1]
    if(sortDirection=='desc'  || sortDirection=='none'){
      value.sort((a:any,b:any)=>{
        return b[sortField]-a[sortField]
      })
    }else if(sortDirection=='asec'){
      value.sort((a:any,b:any)=>{
        return a[sortField]-b[sortField]
      })
    }
    return value
  }
}
