import { Injectable, NgZone } from '@angular/core';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private lenis!: Lenis;

  constructor(private ngZone: NgZone) {}

  public init(): void {
    // Run outside Angular zone to prevent triggering change detection on every frame
    this.ngZone.runOutsideAngular(() => {
      this.lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      // Synchronize Lenis scrolling with GSAP ScrollTrigger
      this.lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time: number) => {
        this.lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    });
  }

  public destroy(): void {
    if (this.lenis) {
      this.lenis.destroy();
    }
  }

  public scrollTo(target: string | HTMLElement, offset: number = 0): void {
    if (this.lenis) {
      this.lenis.scrollTo(target, { offset });
    }
  }
}
