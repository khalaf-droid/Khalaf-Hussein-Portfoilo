import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, Project } from '../../core/services/data.service';
import { RevealDirective } from '../../core/directives/reveal.directive';
import { TiltDirective } from '../../core/directives/tilt.directive';
import { MagneticDirective } from '../../core/directives/magnetic.directive';
import { CursorService } from '../../core/services/cursor.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RevealDirective, TiltDirective, MagneticDirective],
  template: `
    <section id="projects" class="section">
      <div class="container-wide">
        
        <div class="section-header" appReveal="fade">
          <h2 class="section-title">Featured <span class="text-gradient">Projects</span></h2>
          <p class="subtitle">Production-ready applications built with clean architecture and modern technologies</p>
        </div>

        <div class="projects-grid" appReveal="stagger" staggerSelector=".project-card">
          <div class="project-card" *ngFor="let project of projects" appTilt [tiltMax]="5" [tiltScale]="1.01">
            <div class="card-inner glass-card">
              
              <div class="project-visual">
                <div class="project-icon">{{ project.imageIcon }}</div>
                <div class="visual-bg"></div>
              </div>

              <div class="project-content">
                <h3 class="project-title">{{ project.title }}</h3>
                <p class="project-description">{{ project.description }}</p>
                
                <div class="project-tags">
                  <span class="tag" *ngFor="let tag of project.tags">{{ tag }}</span>
                </div>

                <div class="project-links">
                  <a *ngFor="let link of project.links" [href]="link.url" target="_blank" class="link-btn" appMagnetic [magneticStrength]="0.3"
                     (mouseenter)="setCursorText('Go')" (mouseleave)="clearCursor()">
                    {{ link.label }} <span class="arrow">→</span>
                  </a>
                </div>
              </div>
              
            </div>
          </div>
        </div>

      </div>
    </section>
  `,
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];

  constructor(
    private dataService: DataService,
    private cursorService: CursorService
  ) {}

  ngOnInit(): void {
    this.projects = this.dataService.projects;
  }

  setCursorText(text: string): void {
    this.cursorService.setState('text');
    this.cursorService.setText(text);
  }

  clearCursor(): void {
    this.cursorService.setState('default');
    this.cursorService.clearText();
  }
}
