import { Directive, ElementRef, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { AnimationService } from '../services/animation.service';
import ScrollTrigger from 'gsap/ScrollTrigger';

@Directive({
  selector: '[appParallax]',
  standalone: true
})
export class ParallaxDirective implements AfterViewInit, OnDestroy {
  @Input('appParallax') speed: number = 0.5;

  constructor(
    private el: ElementRef<HTMLElement>,
    private animationService: AnimationService
  ) {}

  ngAfterViewInit(): void {
    // Slight delay to ensure layout is calculated
    setTimeout(() => {
      this.animationService.parallax(this.el.nativeElement, this.speed);
    }, 100);
  }

  ngOnDestroy(): void {
    // Cleanup scroll triggers for this element
    const triggers = ScrollTrigger.getAll().filter(t => t.trigger === this.el.nativeElement);
    triggers.forEach(t => t.kill());
  }
}
