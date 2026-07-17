import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagneticDirective } from '../../../core/directives/magnetic.directive';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MagneticDirective],
  template: `
    <footer class="footer">
      <div class="container-wide">
        <div class="footer-content">
          <div class="footer-logo" appMagnetic>
            <span>KH.</span>
          </div>
          
          <div class="footer-text">
            <p>&copy; 2026 Khalaf Hussein. All rights reserved.</p>
            <p class="subtitle">Designed & Built with <span class="heart">❤</span> Khalaf</p>
          </div>

          <div class="footer-nav">
            <a href="#home" class="nav-link" appMagnetic [magneticStrength]="0.2">Home</a>
            <a href="#projects" class="nav-link" appMagnetic [magneticStrength]="0.2">Projects</a>
            <a href="#contact" class="nav-link" appMagnetic [magneticStrength]="0.2">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    @use '../../../../styles/variables' as *;
    @use '../../../../styles/mixins' as *;

    .footer {
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      padding: 3rem 0;
      background: linear-gradient(to top, rgba(5, 5, 16, 0.9), transparent);
      position: relative;
      z-index: $z-base;
    }

    .footer-content {
      display: flex;
      justify-content: space-between;
      align-items: center;

      @include tablet {
        flex-direction: column;
        gap: 2rem;
        text-align: center;
      }
    }

    .footer-logo {
      font-family: $font-heading;
      font-weight: $fw-black;
      font-size: $fs-h3;
      letter-spacing: $ls-tight;
      color: $text-primary;
    }

    .footer-text {
      color: $text-secondary;
      font-size: $fs-small;

      p {
        margin: 0;
        margin-bottom: 0.25rem;
      }

      .subtitle {
        color: $text-tertiary;
      }

      .heart {
        color: $accent-pink;
        display: inline-block;
        animation: pulse-glow 2s infinite;
      }
    }

    .footer-nav {
      display: flex;
      gap: 1.5rem;

      .nav-link {
        color: $text-secondary;
        text-decoration: none;
        font-size: $fs-small;
        font-weight: $fw-medium;
        transition: color $transition-fast;

        &:hover {
          color: $accent-cyan;
        }
      }
    }
  `]
})
export class FooterComponent {

}
