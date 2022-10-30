import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: string): string {
    //"2018073"
    return value.substr(6,1)+"-"+value.substr(4,2)+"-"+value.substr(0,4);
  }

}
