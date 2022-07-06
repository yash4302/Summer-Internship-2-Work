import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSimple]'
})
export class SimpleDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {
    // el.nativeElement.style.color = 'green'; // Good for Desktop browser
    renderer.setStyle(el.nativeElement, 'color', 'yellow'); // Recommonded because of Mobile users
    // Angular uses different rendere in Mobile browsers.
  }

}
