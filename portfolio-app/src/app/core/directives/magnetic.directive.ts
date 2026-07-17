import { Directive, ElementRef, HostListener, Input, OnInit, OnDestroy } from '@angular/core';
import gsap from 'gsap';

@Directive({
  selector: '[appMagnetic]',
  standalone: true
})
export class MagneticDirective implements OnInit, OnDestroy {
  @Input() magneticStrength: number = 0.5;

  private xTo!: gsap.QuickToFunc;
  private yTo!: gsap.QuickToFunc;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    const target = this.el.nativeElement;
    
    // Use quickTo for high performance following
    this.xTo = gsap.quickTo(target, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' });
    this.yTo = gsap.quickTo(target, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' });
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    const target = this.el.nativeElement;
    const rect = target.getBoundingClientRect();
    
    // Calculate distance from center
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);

    this.xTo(relX * this.magneticStrength);
    this.yTo(relY * this.magneticStrength);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.xTo(0);
    this.yTo(0);
  }

  ngOnDestroy(): void {
    gsap.killTweensOf(this.el.nativeElement);
  }
}
