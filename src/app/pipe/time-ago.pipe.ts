import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'timeAgo'})
export class TimeAgoPipe implements PipeTransform {
  transform(value:number, args:string[]) : any {
   
    
    moment.locale('th');
    return moment(1000 * value).fromNow();
  }
}