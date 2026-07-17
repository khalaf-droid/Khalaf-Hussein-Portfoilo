import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, Education } from '../../core/services/data.service';
import { RevealDirective } from '../../core/directives/reveal.directive';
import { TiltDirective } from '../../core/directives/tilt.directive';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, RevealDirective, TiltDirective],
  template: `
    <section id="education" class="section">
      <div class="container">
        
        <div class="section-header" appReveal="fade">
          <h2 class="section-title">Academic <span class="text-gradient">Education</span></h2>
          <p class="subtitle">Building a strong academic foundation in Computer Science & Information Technology</p>
        </div>

        <div class="education-grid" appReveal="stagger" staggerSelector=".education-card">
          <div class="education-card glass-card" *ngFor="let edu of education" appTilt [tiltMax]="8">
            <div class="card-icon-wrapper">
              <span class="card-icon">🎓</span>
              <div class="icon-glow"></div>
            </div>

            <div class="card-content">
              <h3 class="degree">{{ edu.degree }}</h3>
              <p class="institution">{{ edu.institution }}</p>
              
              <div class="meta text-gradient-reverse">
                <span class="period">{{ edu.period }}</span>
                <span class="grade">{{ edu.grade }}</span>
              </div>

              <p class="description">{{ edu.description }}</p>

              <ul class="highlights">
                <li *ngFor="let highlight of edu.highlights">
                  <span class="bullet"></span>
                  {{ highlight }}
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  `,
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {
  education: Education[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.education = this.dataService.education;
  }
}
