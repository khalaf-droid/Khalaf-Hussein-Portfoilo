import { Directive, ElementRef, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { AnimationService } from '../services/animation.service';
import ScrollTrigger from 'gsap/ScrollTrigger';

@Directive({
  selector: '[appReveal]',
  standalone: true
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  @Input('appReveal') type: 'fade' | 'stagger' | 'text' = 'fade';
  @Input() revealDelay: number = 0;
  @Input() revealOffset: number = 50;
  @Input() staggerSelector: string = '.stagger-item';

  constructor(
    private el: ElementRef<HTMLElement>,
    private animationService: AnimationService
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      switch (this.type) {
        case 'fade':
          this.animationService.revealFade(this.el.nativeElement, this.revealDelay, this.revealOffset);
          break;
        case 'stagger':
          this.animationService.revealStagger(this.el.nativeElement, this.staggerSelector);
          break;
        case 'text':
          this.animationService.revealText(this.el.nativeElement);
          break;
      }
    }, 100);
  }

  ngOnDestroy(): void {
    const triggers = ScrollTrigger.getAll().filter(t => t.trigger === this.el.nativeElement);
    triggers.forEach(t => t.kill());
  }
}
