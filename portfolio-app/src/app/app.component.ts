import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ScrollService } from './core/services/scroll.service';
import { CursorComponent } from './shared/components/cursor/cursor.component';
import { LoadingScreenComponent } from './shared/components/loading-screen/loading-screen.component';
import { ParticleBgComponent } from './shared/components/particle-bg/particle-bg.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CursorComponent, LoadingScreenComponent, ParticleBgComponent, NavbarComponent],
  template: `
    <app-cursor></app-cursor>
    <app-particle-bg></app-particle-bg>
    <app-loading-screen (loadingComplete)="onLoadingComplete()"></app-loading-screen>
    
    <main [class.content-visible]="isLoaded">
      <app-navbar *ngIf="isLoaded"></app-navbar>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    main {
      min-height: 100vh;
      width: 100%;
      opacity: 0;
      transition: opacity 1s ease;
    }
    main.content-visible {
      opacity: 1;
    }
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  public isLoaded = false;

  constructor(private scrollService: ScrollService) {}

  ngOnInit(): void {
    // Initialize Lenis smooth scroll and GSAP ScrollTrigger sync
    this.scrollService.init();
  }

  onLoadingComplete(): void {
    this.isLoaded = true;
  }

  ngOnDestroy(): void {
    this.scrollService.destroy();
  }
}
