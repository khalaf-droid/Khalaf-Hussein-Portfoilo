import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, Experience } from '../../core/services/data.service';
import { RevealDirective } from '../../core/directives/reveal.directive';
import { MagneticDirective } from '../../core/directives/magnetic.directive';
import { TiltDirective } from '../../core/directives/tilt.directive';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, RevealDirective, MagneticDirective, TiltDirective],
  template: `
    <section id="experience" class="section">
      <div class="container">
        
        <div class="section-header" appReveal="fade">
          <h2 class="section-title">Experience <span class="text-gradient">& Internships</span></h2>
          <p class="subtitle">Building real-world expertise through professional training and hands-on roles</p>
        </div>

        <div class="timeline" appReveal="stagger" staggerSelector=".timeline-item">
          <div class="timeline-line"></div>
          
          <div class="timeline-item" *ngFor="let exp of experiences" appTilt [tiltMax]="5">
            <div class="timeline-dot"></div>
            <div class="timeline-content glass-card">
              
              <div class="timeline-header">
                <div>
                  <h3 class="role">{{ exp.role }}</h3>
                  <a *ngIf="exp.companyLink" [href]="exp.companyLink" target="_blank" class="company" appMagnetic [magneticStrength]="0.2">
                    {{ exp.company }} <span class="link-icon">↗</span>
                  </a>
                  <p *ngIf="!exp.companyLink" class="company">{{ exp.company }}</p>
                </div>
                <div class="meta text-gradient-reverse">
                  <span class="period">{{ exp.period }}</span>
                  <span class="location">{{ exp.location }}</span>
                </div>
              </div>

              <p class="description">{{ exp.description }}</p>

              <ul class="highlights">
                <li *ngFor="let highlight of exp.highlights">
                  <span class="bullet"></span>
                  {{ highlight }}
                </li>
              </ul>

              <div class="tags">
                <span class="tag" *ngFor="let tag of exp.tags">{{ tag }}</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  `,
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
  experiences: Experience[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.experiences = this.dataService.experience;
  }
}
