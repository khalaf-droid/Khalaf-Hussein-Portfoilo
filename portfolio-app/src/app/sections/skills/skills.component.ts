import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, SkillCategory } from '../../core/services/data.service';
import { RevealDirective } from '../../core/directives/reveal.directive';
import { TiltDirective } from '../../core/directives/tilt.directive';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, RevealDirective, TiltDirective],
  template: `
    <section id="skills" class="section">
      <div class="container-wide">
        
        <div class="section-header" appReveal="fade">
          <h2 class="section-title">Skills <span class="text-gradient">& Technologies</span></h2>
          <p class="subtitle">A comprehensive toolkit for building modern web applications</p>
        </div>

        <div class="skills-grid" appReveal="stagger" staggerSelector=".skill-card">
          <div class="skill-card glass-card" *ngFor="let category of skillCategories" appTilt [tiltMax]="5">
            <div class="card-header">
              <span class="category-icon">{{ category.icon }}</span>
              <h3 class="category-title">{{ category.title }}</h3>
            </div>
            
            <div class="skill-items">
              <span class="skill-item" *ngFor="let skill of category.skills">{{ skill }}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  `,
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  skillCategories: SkillCategory[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.skillCategories = this.dataService.skills;
  }
}
