import { IconComponent } from '../../shared/components/icon/icon.component';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { EMAILJS_CONFIG } from '../../core/config/emailjs.config';
import { DataService } from '../../core/services/data.service';
import { RevealDirective } from '../../core/directives/reveal.directive';
import { MagneticDirective } from '../../core/directives/magnetic.directive';

const notBlank = (c: AbstractControl): ValidationErrors | null =>
  typeof c.value === 'string' && c.value.length > 0 && c.value.trim().length === 0 ? { blank: true } : null;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [IconComponent, CommonModule, ReactiveFormsModule, RevealDirective, MagneticDirective],
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
                <span class="info-icon"><app-icon name="mail"></app-icon></span>
                <div class="info-text">
                  <span class="info-label">Email</span>
                  <a href="mailto:{{ personalInfo.email }}" class="info-value" appMagnetic [magneticStrength]="0.2">{{ personalInfo.email }}</a>
                </div>
              </div>

              <div class="info-item">
                <span class="info-icon"><app-icon name="phone"></app-icon></span>
                <div class="info-text">
                  <span class="info-label">Phone</span>
                  <a href="tel:{{ personalInfo.phone }}" class="info-value" appMagnetic [magneticStrength]="0.2">{{ personalInfo.phone }}</a>
                </div>
              </div>

              <div class="info-item">
                <span class="info-icon"><app-icon name="pin"></app-icon></span>
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
            <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
              <div class="form-group" [class.invalid]="invalid('name')">
                <label for="name">Name</label>
                <input type="text" id="name" formControlName="name" placeholder="John Doe" autocomplete="name"
                  [attr.aria-invalid]="invalid('name')" aria-describedby="name-error">
                <small class="field-error" id="name-error" *ngIf="invalid('name')">
                  <ng-container *ngIf="form.controls['name'].errors?.['required'] || form.controls['name'].errors?.['blank']">Please enter your name.</ng-container>
                  <ng-container *ngIf="form.controls['name'].errors?.['minlength']">Name must be at least 2 characters.</ng-container>
                  <ng-container *ngIf="form.controls['name'].errors?.['maxlength']">Name must be 80 characters or fewer.</ng-container>
                </small>
              </div>

              <div class="form-group" [class.invalid]="invalid('email')">
                <label for="email">Email</label>
                <input type="email" id="email" formControlName="email" placeholder="john@example.com" autocomplete="email"
                  [attr.aria-invalid]="invalid('email')" aria-describedby="email-error">
                <small class="field-error" id="email-error" *ngIf="invalid('email')">
                  <ng-container *ngIf="form.controls['email'].errors?.['required']">Please enter your email.</ng-container>
                  <ng-container *ngIf="form.controls['email'].errors?.['email'] || form.controls['email'].errors?.['pattern']">Please enter a valid email address.</ng-container>
                  <ng-container *ngIf="form.controls['email'].errors?.['maxlength']">Email is too long.</ng-container>
                </small>
              </div>

              <div class="form-group" [class.invalid]="invalid('message')">
                <label for="message">Message</label>
                <textarea id="message" formControlName="message" rows="5" placeholder="Tell me about your project..."
                  [attr.aria-invalid]="invalid('message')" aria-describedby="message-error"></textarea>
                <small class="field-error" id="message-error" *ngIf="invalid('message')">
                  <ng-container *ngIf="form.controls['message'].errors?.['required'] || form.controls['message'].errors?.['blank']">Please write a message.</ng-container>
                  <ng-container *ngIf="form.controls['message'].errors?.['minlength']">Message must be at least 10 characters.</ng-container>
                  <ng-container *ngIf="form.controls['message'].errors?.['maxlength']">Message must be 2000 characters or fewer.</ng-container>
                </small>
              </div>

              <!-- Honeypot: hidden from people, bots tend to fill it -->
              <input type="text" formControlName="website" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">

              <button type="submit" class="btn btn-primary submit-btn" [disabled]="status === 'sending'" appMagnetic [magneticStrength]="0.4">
                {{ status === 'sending' ? 'Sending...' : 'Send Message' }}
              </button>

              <p class="form-status success" *ngIf="status === 'success'" role="status">Thanks! Your message was sent. I will get back to you soon.</p>
              <p class="form-status error" *ngIf="status === 'error'" role="alert">{{ errorMessage }}</p>
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
  status: 'idle' | 'sending' | 'success' | 'error' = 'idle';
  errorMessage = '';
  private lastSent = 0;

  form = inject(FormBuilder).group({
    name: ['', [Validators.required, notBlank, Validators.minLength(2), Validators.maxLength(80)]],
    email: ['', [Validators.required, Validators.maxLength(120), Validators.email, Validators.pattern(EMAIL_RE)]],
    message: ['', [Validators.required, notBlank, Validators.minLength(10), Validators.maxLength(2000)]],
    website: [''],
  });

  constructor(private dataService: DataService) {
    this.personalInfo = this.dataService.personalInfo;
  }

  ngOnInit(): void {}

  invalid(name: string): boolean {
    const c = this.form.get(name)!;
    return c.invalid && (c.touched || c.dirty);
  }

  async onSubmit(): Promise<void> {
    if (this.status === 'sending') return;
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    const v = this.form.getRawValue();
    if (v.website) { // honeypot filled: pretend success
      this.status = 'success';
      this.form.reset();
      return;
    }
    if (Date.now() - this.lastSent < 30000) {
      this.status = 'error';
      this.errorMessage = 'Please wait a few seconds before sending another message.';
      return;
    }
    this.status = 'sending';
    try {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: EMAILJS_CONFIG.serviceId,
          template_id: EMAILJS_CONFIG.templateId,
          user_id: EMAILJS_CONFIG.publicKey,
          template_params: {
            from_name: v.name!.trim(),
            from_email: v.email!.trim(),
            reply_to: v.email!.trim(),
            message: v.message!.trim(),
            to_email: this.personalInfo.email,
          },
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      this.lastSent = Date.now();
      this.status = 'success';
      this.form.reset({ name: '', email: '', message: '', website: '' });
    } catch {
      this.status = 'error';
      this.errorMessage = 'Could not send your message. Please try again or email me directly at ' + this.personalInfo.email + '.';
    }
  }
}
