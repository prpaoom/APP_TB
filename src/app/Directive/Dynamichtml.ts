import {
  Component,
  Directive,
  ComponentFactory,
  ComponentMetadata,
  ComponentResolver,
  Input,
  ReflectiveInjector,
  ViewContainerRef,
  
} from '@angular/core'

export function createComponentFactory(resolver: ComponentResolver, metadata: ComponentMetadata): Promise<ComponentFactory<any>> {
    const cmpClass = class DynamicComponent {};
    const decoratedCmp = Component(metadata)(cmpClass);
    return resolver.resolveComponent(decoratedCmp);
}

@Directive({
    selector: 'dynamicHTML',
})
export class DynamicHTMLOutlet {
  @Input() src: string;
  
  constructor(private vcRef: ViewContainerRef, private resolver: ComponentResolver) {
  }
  
  ngOnChanges() {
    if (!this.src) return;
    
    const metadata = new ComponentMetadata({
        selector: 'dynamic-html',
        template: this.src,
    });
    createComponentFactory(this.resolver, metadata)
      .then(factory => {
        const injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
        this.vcRef.createComponent(factory, 0, injector, []);
      });
  }
}