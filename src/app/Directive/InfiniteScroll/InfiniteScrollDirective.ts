import { Directive, ElementRef, Output, EventEmitter } from '@angular/core';
import { elementVisible } from './util';

@Directive({ selector: '[infinite]' })
export class InfiniteScrollDirective {

  @Output() endVisible = new EventEmitter();
  
  el: HTMLElement;
  endEl: Element;
  elementVisible:any;
  constructor(el: ElementRef) {
    this.el = el.nativeElement;
    this.elementVisible = elementVisible;
  }

  // setup list of sections
  ngOnInit(): void {
    this.endEl = this.el.querySelector('[infinite-end]');
    if (!this.endEl) { throw "Invalid 'infinite-end";}
    this.scrollListener();
    
    this.el.addEventListener('scroll', this.scrollListener);
   
    window.addEventListener('resize', this.scrollListener);
  }
  
  scrollListener = () => {
    let visible = this.elementVisible(this.endEl, this.el);
    if (visible.top || visible.bottom || visible.left || visible.right) {
      
      this.endVisible.emit(true); 
    }
  }
}