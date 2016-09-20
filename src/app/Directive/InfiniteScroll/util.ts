export function elementVisible(innerEl: HTMLElement, outerEl: HTMLElement | Window):
       {top: boolean, bottom: boolean, left: boolean, right: boolean} {
    let innerRect = innerEl.getBoundingClientRect();
    if (outerEl === window) {
      return {
        top:    innerRect.top > 0   && innerRect.top < window.innerHeight,
        bottom: innerRect.bottom > 0 && innerRect.bottom < window.innerHeight,
        left:   innerRect.left > 0  && innerRect.left < window.innerWidth,
        right:  innerRect.right > 0 && innerRect.left < window.innerWidth
      };
    } else {
      let outerRect = (<HTMLElement>outerEl).getBoundingClientRect();
      let defaultView = (innerEl.ownerDocument || document).defaultView;
      let computedStyle = defaultView.getComputedStyle(<HTMLElement>outerEl, null);
      let outerRectBorderTopWidth = parseInt(computedStyle.getPropertyValue('border-top-width'), 10);
      let outerRectBorderLeftWidth = parseInt(computedStyle.getPropertyValue('border-left-width'), 10);

      /* top is visible or bottom is visible */
      let topVisible = (
        innerRect.top >= outerRect.top
        && innerRect.top < outerRect.bottom
      );
      let bottomVisible = (
        innerRect.bottom > (outerRect.top + outerRectBorderTopWidth)
        && innerRect.bottom < outerRect.bottom
      );
      let leftVisible = (
        innerRect.left >= outerRect.left
        && innerRect.left < outerRect.right
      );
      let rightVisible = (
        innerRect.right > (outerRect.left + outerRectBorderLeftWidth)
        && innerRect.right < outerRect.right
      );
      return {
        top:    topVisible,
        bottom: bottomVisible,
        left:   leftVisible,
        right:  rightVisible
      };
    }
    
  }