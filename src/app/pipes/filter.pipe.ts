import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    standalone: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any[],args: any[]): any[]{
    const filterString=args[0] 
    const propName=args[1] //has to be title
    const result:string[]=[]

    if(value?.length==0||filterString===''||propName===''){
      return value
    }

    for(const productItem of value){
      if((productItem[propName].toLowerCase()).includes(filterString.toLowerCase())){
        result.push(productItem)
      }
    }

    return result
  }

}
