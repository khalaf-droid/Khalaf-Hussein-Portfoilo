import { Injectable, ElementRef } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  /**
   * Fade in element as it scrolls into view
   */
  public revealFade(element: HTMLElement, delay: number = 0, yOffset: number = 50): void {
    gsap.fromTo(
      element,
      { y: yOffset, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }

  /**
   * Staggered fade in for a list of elements
   */
  public revealStagger(container: HTMLElement, childrenSelector: string): void {
    const children = container.querySelectorAll(childrenSelector);
    if (!children.length) return;

    gsap.fromTo(
      children,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }

  /**
   * Parallax effect for backgrounds or images
   */
  public parallax(element: HTMLElement, speed: number = 0.5): void {
    gsap.to(element, {
      y: () => -100 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  /**
   * Complex text reveal animation (requires splitting text into spans)
   */
  public revealText(element: HTMLElement): void {
    // Basic implementation (assumes letters are wrapped in spans via a directive)
    const letters = element.querySelectorAll('.char');
    if (!letters.length) return;

    gsap.fromTo(
      letters,
      { y: '100%', opacity: 0, rotateY: 90 },
      {
        y: '0%',
        opacity: 1,
        rotateY: 0,
        duration: 0.8,
        stagger: 0.02,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
        }
      }
    );
  }
}
