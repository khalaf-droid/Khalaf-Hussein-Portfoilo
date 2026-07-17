import { Component, ElementRef, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';

@Component({
  selector: 'app-loading-screen',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #loaderContainer class="loader-container">
      <div class="loader-content">
        <div class="loader-text-wrapper">
          <span #text class="loader-text">KH.</span>
        </div>
        <div class="loader-progress-bar">
          <div #progress class="loader-progress"></div>
        </div>
        <div class="loader-percentage" #percentage>0%</div>
      </div>
      <!-- Decorative background elements -->
      <div class="loader-bg-overlay"></div>
    </div>
  `,
  styleUrls: ['./loading-screen.component.scss']
})
export class LoadingScreenComponent implements OnInit {
  @ViewChild('loaderContainer', { static: true }) loaderContainer!: ElementRef;
  @ViewChild('progress', { static: true }) progress!: ElementRef;
  @ViewChild('percentage', { static: true }) percentage!: ElementRef;
  @ViewChild('text', { static: true }) text!: ElementRef;

  @Output() loadingComplete = new EventEmitter<void>();

  ngOnInit(): void {
    // Disable scrolling while loading
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        this.loadingComplete.emit();
        // Hide loader from DOM after animation
        gsap.set(this.loaderContainer.nativeElement, { display: 'none' });
      }
    });

    // 1. Initial state
    gsap.set(this.text.nativeElement, { yPercent: 100, opacity: 0 });
    gsap.set(this.progress.nativeElement, { scaleX: 0, transformOrigin: 'left center' });

    // 2. Animate text in
    tl.to(this.text.nativeElement, {
      yPercent: 0,
      opacity: 1,
      duration: 1,
      ease: 'power4.out'
    });

    // 3. Simulate loading progress
    const dummyObject = { value: 0 };
    tl.to(dummyObject, {
      value: 100,
      duration: 2.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        const p = Math.round(dummyObject.value);
        this.percentage.nativeElement.innerText = p + '%';
        gsap.set(this.progress.nativeElement, { scaleX: p / 100 });
      }
    });

    // 4. Animate out
    tl.to([this.text.nativeElement, this.percentage.nativeElement, '.loader-progress-bar'], {
      y: -50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.in'
    }, '+=0.2');

    // 5. Slide curtains up
    tl.to(this.loaderContainer.nativeElement, {
      yPercent: -100,
      duration: 1.2,
      ease: 'expo.inOut'
    }, '-=0.4');
  }
}
