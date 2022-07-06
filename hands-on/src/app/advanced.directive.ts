import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[appAdvanced]'
})
export class AdvancedDirective {

  constructor(private el: ElementRef, private renderer:Renderer2, private domSanitizer:DomSanitizer) { }

  @Input() defaultColor: string = "";
  @Input('appAdvanced') highlightColor: string = "";

  @HostBinding('style.color') color = "yellow";

  @HostListener('mouseenter')
    onMouseEnter() {
      this.highlight(this.highlightColor || this.defaultColor || "yellow");
    }

  @HostListener('mouseleave')
    onMouseLeave() {
      this.highlight("transparent");
    }

  private highlight(color: string): void {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', color);
  }
}
