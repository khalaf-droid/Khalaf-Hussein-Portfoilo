import { Component, ElementRef, HostListener, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import gsap from 'gsap';
import { CursorService, CursorState } from '../../../core/services/cursor.service';

@Component({
  selector: 'app-cursor',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #cursor class="cursor-dot"></div>
    <div #follower class="cursor-follower" [ngClass]="currentState">
      <span class="cursor-text" *ngIf="currentText">{{ currentText }}</span>
    </div>
  `,
  styleUrls: ['./cursor.component.scss']
})
export class CursorComponent implements OnInit, OnDestroy {
  @ViewChild('cursor', { static: true }) cursor!: ElementRef<HTMLDivElement>;
  @ViewChild('follower', { static: true }) follower!: ElementRef<HTMLDivElement>;

  public currentState: CursorState = 'default';
  public currentText: string = '';
  private subs = new Subscription();

  // Mouse position
  private mouseX = 0;
  private mouseY = 0;

  constructor(private cursorService: CursorService) {}

  ngOnInit(): void {
    // Hide default cursor on body
    document.body.style.cursor = 'none';

    // Subscribe to state changes
    this.subs.add(
      this.cursorService.state$.subscribe(state => {
        this.currentState = state;
        this.animateStateChange(state);
      })
    );

    this.subs.add(
      this.cursorService.text$.subscribe(text => {
        this.currentText = text;
      })
    );

    // Initial setup for GSAP quick setters (performance)
    gsap.set(this.cursor.nativeElement, { xPercent: -50, yPercent: -50 });
    gsap.set(this.follower.nativeElement, { xPercent: -50, yPercent: -50 });
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;

    // Dot follows instantly
    gsap.to(this.cursor.nativeElement, {
      x: this.mouseX,
      y: this.mouseY,
      duration: 0,
      ease: 'none'
    });

    // Follower has spring physics
    gsap.to(this.follower.nativeElement, {
      x: this.mouseX,
      y: this.mouseY,
      duration: 0.6,
      ease: 'power3.out'
    });
  }

  @HostListener('document:mousedown')
  onMouseDown(): void {
    gsap.to(this.follower.nativeElement, { scale: 0.8, duration: 0.2 });
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    const scale = this.getScaleForState(this.currentState);
    gsap.to(this.follower.nativeElement, { scale, duration: 0.4, ease: 'back.out(1.7)' });
  }

  @HostListener('document:mouseenter')
  onMouseEnter(): void {
    gsap.to([this.cursor.nativeElement, this.follower.nativeElement], { opacity: 1, duration: 0.3 });
  }

  @HostListener('document:mouseleave')
  onMouseLeave(): void {
    gsap.to([this.cursor.nativeElement, this.follower.nativeElement], { opacity: 0, duration: 0.3 });
  }

  private animateStateChange(state: CursorState): void {
    const el = this.follower.nativeElement;
    
    switch (state) {
      case 'pointer':
        gsap.to(el, { scale: 1.5, backgroundColor: 'rgba(0, 212, 255, 0.1)', borderColor: 'rgba(0, 212, 255, 0.5)', duration: 0.3 });
        break;
      case 'text':
        gsap.to(el, { scale: 3.5, backgroundColor: 'rgba(255, 255, 255, 1)', borderColor: 'transparent', duration: 0.3 });
        gsap.to(this.cursor.nativeElement, { opacity: 0, duration: 0.1 });
        break;
      case 'magnet':
        gsap.to(el, { scale: 0.5, backgroundColor: 'rgba(0, 212, 255, 0.8)', borderColor: 'transparent', duration: 0.3 });
        break;
      case 'hidden':
        gsap.to([this.cursor.nativeElement, el], { opacity: 0, duration: 0.3 });
        break;
      default:
        gsap.to(el, { scale: 1, backgroundColor: 'transparent', borderColor: 'rgba(255, 255, 255, 0.3)', duration: 0.3 });
        gsap.to(this.cursor.nativeElement, { opacity: 1, duration: 0.3 });
        break;
    }
  }

  private getScaleForState(state: CursorState): number {
    switch (state) {
      case 'pointer': return 1.5;
      case 'text': return 3.5;
      case 'magnet': return 0.5;
      default: return 1;
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    document.body.style.cursor = 'auto';
  }
}
