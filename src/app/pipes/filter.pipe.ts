import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[],args: any[]): any[]{
    const filterString=args[0]
    const propName=args[1]

    return
  }

}
