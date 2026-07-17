import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../core/services/data.service';
import { RevealDirective } from '../../core/directives/reveal.directive';
import { MagneticDirective } from '../../core/directives/magnetic.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RevealDirective, MagneticDirective],
  template: `
    <section id="contact" class="section">
      <div class="container">
        
        <div class="section-header" appReveal="fade">
          <h2 class="section-title">Get In <span class="text-gradient">Touch</span></h2>
          <p class="subtitle">Let's work together to build something amazing.</p>
        </div>

        <div class="contact-grid">
          <div class="contact-info" appReveal="fade" [revealDelay]="0.2">
            <h3 class="info-title">Contact Information</h3>
            <p class="info-description">Feel free to reach out for collaborations, opportunities, or just to say hi!</p>

            <div class="info-items">
              <div class="info-item">
                <span class="info-icon">📧</span>
                <div class="info-text">
                  <span class="info-label">Email</span>
                  <a href="mailto:{{ personalInfo.email }}" class="info-value" appMagnetic [magneticStrength]="0.2">{{ personalInfo.email }}</a>
                </div>
              </div>

              <div class="info-item">
                <span class="info-icon">📱</span>
                <div class="info-text">
                  <span class="info-label">Phone</span>
                  <a href="tel:{{ personalInfo.phone }}" class="info-value" appMagnetic [magneticStrength]="0.2">{{ personalInfo.phone }}</a>
                </div>
              </div>

              <div class="info-item">
                <span class="info-icon">📍</span>
                <div class="info-text">
                  <span class="info-label">Location</span>
                  <span class="info-value">{{ personalInfo.location }}</span>
                </div>
              </div>
            </div>

            <div class="social-links">
              <a *ngIf="personalInfo.socials.linkedin" [href]="personalInfo.socials.linkedin" target="_blank" class="social-link" appMagnetic>IN</a>
              <a *ngIf="personalInfo.socials.github" [href]="personalInfo.socials.github" target="_blank" class="social-link" appMagnetic>GH</a>
              <a *ngIf="personalInfo.socials.instagram" [href]="personalInfo.socials.instagram" target="_blank" class="social-link" appMagnetic>IG</a>
              <a *ngIf="personalInfo.socials.facebook" [href]="personalInfo.socials.facebook" target="_blank" class="social-link" appMagnetic>FB</a>
            </div>
          </div>

          <div class="contact-form glass-card" appReveal="fade" [revealDelay]="0.4">
            <form (ngSubmit)="onSubmit($event)">
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" placeholder="John Doe" required>
              </div>
              
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" placeholder="john@example.com" required>
              </div>
              
              <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" rows="5" placeholder="Tell me about your project..." required></textarea>
              </div>
              
              <button type="submit" class="btn btn-primary submit-btn" appMagnetic [magneticStrength]="0.4">Send Message</button>
            </form>
          </div>
        </div>

      </div>
    </section>
  `,
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  personalInfo: any;

  constructor(private dataService: DataService) {
    this.personalInfo = this.dataService.personalInfo;
  }

  ngOnInit(): void {}

  onSubmit(e: Event): void {
    e.preventDefault();
    // In a real app, integrate EmailJS or a backend endpoint here
    alert("Thank you for your message! (Form submission is a UI demo in this version)");
  }
}
