import { Component } from '@angular/core';
import { HeroComponent } from '../../sections/hero/hero.component';
import { ExperienceComponent } from '../../sections/experience/experience.component';
import { EducationComponent } from '../../sections/education/education.component';
import { ProjectsComponent } from '../../sections/projects/projects.component';
import { SkillsComponent } from '../../sections/skills/skills.component';
import { ContactComponent } from '../../sections/contact/contact.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent, 
    ExperienceComponent, 
    EducationComponent, 
    ProjectsComponent, 
    SkillsComponent,
    ContactComponent,
    FooterComponent
  ],
  template: `
    <div class="home-page">
      <app-hero></app-hero>
      <app-experience></app-experience>
      <app-education></app-education>
      <app-skills></app-skills>
      <app-projects></app-projects>
      <app-contact></app-contact>
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .home-page {
      width: 100%;
    }
  `]
})
export class HomeComponent {

}
