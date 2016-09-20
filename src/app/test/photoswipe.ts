import { Component, Renderer,ElementRef } from '@angular/core';
declare var require: (moduleId: string) => any;
let PhotoSwipeUI_Default = require('./../../../node_modules/photoswipe/dist/photoswipe-ui-default.js');

declare var PhotoSwipe: any;


@Component({
    // selector: 'photoswipe',
    templateUrl: './photoswipe.html',
    styles:[`
    body {
  font-family: 'Bitter', Georgia, Times, sans-serif;
}

h1 {
  margin: 2em;
}

.pswp__caption__center {
  text-align: center;
}

figure {
  display: inline-block;
  width: 33.333%;
  float: left;
}

img {
  width: 100%;
}

.spacer {
  height: 5em;
}
    `]
})

export class PhotoswipeComponent  {
    constructor(private elementRef: ElementRef) { }
    //ngOnInit(){
        // $('#gallery').find('figure').each(function() {
        //         var $link = $(this).find('a'),
        //         item = {
        //             src: $link.attr('href'),
        //             w: $link.data('width'),
        //             h: $link.data('height'),
        //             title: $link.data('caption')
        //         };
        //         container.push(item);
        //     });
    //}
    // build items array
    // ngAfterViewInit() {
        
      
    // }
    public clicking(){
        var items = [
            {
                src: 'https://placekitten.com/600/400',
                w: 600,
                h: 400
            },
            {
                src: 'https://placekitten.com/1200/900',
                w: 1200,
                h: 900
            }
        ];
        // Define object and gallery options
        var $pswp = $('.pswp')[0],
        options = {
            index: 0,//$(this).parent('figure').index(),
            bgOpacity: 0.85,
            showHideOpacity: true,
            history: false
        };
        //console.log(container);
        // Initialize PhotoSwipe
        var gallery = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
        gallery.init();
        console.log('Already Click');
    }
}

// var container:any = [];
// $('a').click(function(event:any) {

//         // Prevent location change
//         //event.preventDefault();
//         var items = [
//             {
//                 src: 'https://placekitten.com/600/400',
//                 w: 600,
//                 h: 400
//             },
//             {
//                 src: 'https://placekitten.com/1200/900',
//                 w: 1200,
//                 h: 900
//             }
//         ];
//         // Define object and gallery options
//         var $pswp = $('.pswp')[0],
//         options = {
//             index: 0,//$(this).parent('figure').index(),
//             bgOpacity: 0.85,
//             showHideOpacity: true,
//             history: false
//         };
//         //console.log(container);
//         // Initialize PhotoSwipe
//         var gallery = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
//         gallery.init();
//     });