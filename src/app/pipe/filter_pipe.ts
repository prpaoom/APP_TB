import {Pipe,PipeTransform,Injectable} from '@angular/core';
@Pipe({
    name:'filter',
    
})

export class Filter implements PipeTransform {
    transform(items: any[], args: string): any {
        let resultArray:any = []
        let listFilter:any;
        
        if(items && args){
            
            let filter = args.toLowerCase();
            resultArray = [];
            for(let list of items){
            if(list.name.toLowerCase().match('^'+args+'.*$')){
                
                resultArray.push(list)
            }
        }
        
        return resultArray;
       }else{
           return items;    
       }
        
    }
}