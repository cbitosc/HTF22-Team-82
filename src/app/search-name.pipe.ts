import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchName'
})
export class SearchNamePipe implements PipeTransform {

  transform(quizNames: string[], quizInputName: any): any {
    if(quizInputName == null) return quizNames;

   return quizNames.filter(function(qname){
     return qname.toLowerCase().indexOf(quizInputName) > -1;
   })

  }  
  
}
