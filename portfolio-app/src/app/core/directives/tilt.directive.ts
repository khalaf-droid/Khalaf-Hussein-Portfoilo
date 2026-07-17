import { Directive, ElementRef, HostListener, Input, OnInit, OnDestroy } from '@angular/core';
import gsap from 'gsap';

@Directive({
  selector: '[appTilt]',
  standalone: true
})
export class TiltDirective implements OnInit, OnDestroy {
  @Input() tiltMax: number = 15;
  @Input() tiltPerspective: number = 1000;
  @Input() tiltScale: number = 1.05;

  private xTo!: gsap.QuickToFunc;
  private yTo!: gsap.QuickToFunc;
  private scaleTo!: gsap.QuickToFunc;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    const target = this.el.nativeElement;
    
    // Set perspective
    gsap.set(target, { transformPerspective: this.tiltPerspective, transformStyle: 'preserve-3d' });

    this.xTo = gsap.quickTo(target, 'rotationY', { duration: 0.5, ease: 'power2.out' });
    this.yTo = gsap.quickTo(target, 'rotationX', { duration: 0.5, ease: 'power2.out' });
    this.scaleTo = gsap.quickTo(target, 'scale', { duration: 0.5, ease: 'power2.out' });
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    const target = this.el.nativeElement;
    const rect = target.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -this.tiltMax;
    const rotateY = ((x - centerX) / centerX) * this.tiltMax;

    this.yTo(rotateX);
    this.xTo(rotateY);
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.scaleTo(this.tiltScale);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.xTo(0);
    this.yTo(0);
    this.scaleTo(1);
  }

  ngOnDestroy(): void {
    gsap.killTweensOf(this.el.nativeElement);
  }
}
