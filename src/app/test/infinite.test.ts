import {Component, ViewChild, ViewContainerRef} from '@angular/core';
import {InfiniteScrollDirective} from './../Directive/InfiniteScroll/InfiniteScrollDirective';

@Component({
  selector: 'my-app',
  providers: [],
  templateUrl: `
  <ul infinite  (endVisible)="loadMore()">
  <li *ngFor="let item of list1">{{item+1}}</li>
  <div infinite-end>
    <div *ngIf="loadingInProgress">Loading</div>
    <div *ngIf="endOfList">End Of List</div>
  </div>
</ul>
loading in progress : {{loadingInProgress}}

<div infinite class="horizontal"
  (endVisible)="loadMore()">
  <div *ngFor="let item of list1">{{item+1}}</div>
  <div infinite-end>
    &nbsp;
    <div *ngIf="loadingInProgress">Loading</div>
    <div *ngIf="endOfList">End Of List</div>
  </div>
</div>
loading in progress : {{loadingInProgress}}
  `,
  directives: [InfiniteScrollDirective],
  styles:[`body, html  {
  height; 100%;
}

[infinite] {
  overflow: auto;
  border: 10px solid #333;
  height: 200px;
  position: relative;
}
[infinite] > * {
  min-height: 20px
}

[infinite] > *:nth-child(odd) {
  background-color: #eee
}

.horizontal {
  height: 100px;
  white-space: nowrap;
  overflow-y: hidden;
}
.horizontal > div {
  border: 1px solid #666;
  width: 50px;
  height: 80px;
  display: inline-block;
  margin: 10px;
  vertical-align: top;
}`]
})
export class AppInfiniteCP {
  limit: number = 10;
  offset: number = 0;
  loadingInProgress: boolean = false;
  endOfList:any;
  list1:any = [];
  loadMore():void {
    
    if (!this.loadingInProgress) {
      if (this.offset > 59) {
        this.endOfList = true;
      } else {
        
        this.loadingInProgress = true;
        setTimeout(() => {
          let max = this.offset + this.limit;
          for (let i = this.offset; i < max; i++) {
            this.list1.push(i);
          }
          this.offset = max;
          this.loadingInProgress = false;
        }, 1000);
      }
    }
  }
}