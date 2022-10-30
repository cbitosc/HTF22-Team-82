import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(quizzes: any, searchText: any): any {
    if(searchText == null) return quizzes;

   return quizzes.filter(function(quiz){
     return quiz.name.toLowerCase().indexOf(searchText) > -1;
   })
 }
}
