import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../core/services/data.service';
import { MagneticDirective } from '../../core/directives/magnetic.directive';
import { RevealDirective } from '../../core/directives/reveal.directive';
import { TiltDirective } from '../../core/directives/tilt.directive';
import { CursorService } from '../../core/services/cursor.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, MagneticDirective, RevealDirective, TiltDirective],
  template: `
    <section id="home" class="hero-section">
      <div class="container hero-container">
        
        <div class="hero-content">
          <div class="hero-badge" appReveal="fade" [revealDelay]="0.2">
            <span class="badge-dot"></span>
            <span class="badge-text">{{ personalInfo.subtitle }}</span>
          </div>

          <h1 class="hero-title" appReveal="fade" [revealDelay]="0.4">
            I'm <span class="text-gradient">{{ personalInfo.name }}</span>
          </h1>

          <p class="hero-description" appReveal="fade" [revealDelay]="0.6">
            {{ personalInfo.title }}
          </p>

          <div class="hero-actions" appReveal="fade" [revealDelay]="0.8">
            <a href="#projects" class="btn btn-primary" appMagnetic [magneticStrength]="0.4"
               (mouseenter)="setCursorText('View')" (mouseleave)="clearCursor()">
              View My Work
            </a>
            <a href="#contact" class="btn btn-secondary" appMagnetic [magneticStrength]="0.4"
               (mouseenter)="setCursorText('Contact')" (mouseleave)="clearCursor()">
              Get In Touch
            </a>
          </div>

          <div class="hero-stats" appReveal="stagger" staggerSelector=".stat-item">
            <div class="stat-item" *ngFor="let stat of personalInfo.stats" appTilt>
              <div class="stat-number text-gradient-reverse">{{ stat.number }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>
        </div>

        <div class="hero-visual" appReveal="fade" [revealDelay]="1">
          <div class="visual-glow"></div>
          <div class="image-wrapper" appTilt [tiltMax]="10" [tiltScale]="1.02">
            <!-- Ensure you have an image in public/images/ -->
            <img src="images/Khalaf Hussein Professional.jpg" alt="{{ personalInfo.name }}" class="hero-image" />
            <div class="image-overlay"></div>
          </div>
        </div>

      </div>

      <div class="scroll-indicator" appReveal="fade" [revealDelay]="1.5">
        <div class="mouse">
          <div class="wheel"></div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  personalInfo: any;

  constructor(
    private dataService: DataService,
    private cursorService: CursorService
  ) {
    this.personalInfo = this.dataService.personalInfo;
  }

  ngOnInit(): void {}

  setCursorText(text: string): void {
    this.cursorService.setState('text');
    this.cursorService.setText(text);
  }

  clearCursor(): void {
    this.cursorService.setState('default');
    this.cursorService.clearText();
  }
}
