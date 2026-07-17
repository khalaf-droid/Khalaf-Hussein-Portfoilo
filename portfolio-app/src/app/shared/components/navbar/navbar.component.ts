import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagneticDirective } from '../../../core/directives/magnetic.directive';
import gsap from 'gsap';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MagneticDirective],
  template: `
    <nav class="navbar" [class.scrolled]="isScrolled" [class.hidden]="isHidden">
      <div class="container-wide nav-container">
        
        <a href="#home" class="logo" appMagnetic [magneticStrength]="0.2">
          <span class="logo-text">KH.</span>
          <span class="logo-dot"></span>
        </a>

        <div class="desktop-menu">
          <a *ngFor="let link of links" [href]="link.url" class="nav-link" appMagnetic [magneticStrength]="0.3">
            {{ link.name }}
          </a>
          <a href="#contact" class="btn btn-primary nav-btn" appMagnetic [magneticStrength]="0.5">Let's Talk</a>
        </div>

        <button class="mobile-menu-btn" (click)="toggleMobileMenu()" [class.active]="isMobileMenuOpen">
          <span></span>
          <span></span>
        </button>

      </div>
    </nav>

    <!-- Mobile Menu Overlay -->
    <div class="mobile-menu-overlay" [class.active]="isMobileMenuOpen">
      <div class="mobile-nav-links">
        <a *ngFor="let link of links; let i = index" 
           [href]="link.url" 
           class="mobile-nav-link" 
           (click)="closeMobileMenu()"
           [style.animation-delay]="i * 0.1 + 's'">
          {{ link.name }}
        </a>
        <a href="#contact" class="btn btn-primary" style="margin-top: 2rem" (click)="closeMobileMenu()">
          Let's Talk
        </a>
      </div>
    </div>
  `,
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public isScrolled = false;
  public isHidden = false;
  public isMobileMenuOpen = false;
  private lastScrollY = 0;

  public links = [
    { name: 'Home', url: '#home' },
    { name: 'Experience', url: '#experience' },
    { name: 'Education', url: '#education' },
    { name: 'Skills', url: '#skills' },
    { name: 'Projects', url: '#projects' }
  ];

  ngOnInit(): void {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScrollY = window.scrollY;
    
    // Add background when scrolled
    this.isScrolled = currentScrollY > 50;

    // Hide on scroll down, show on scroll up
    if (currentScrollY > this.lastScrollY && currentScrollY > 200 && !this.isMobileMenuOpen) {
      this.isHidden = true;
    } else {
      this.isHidden = false;
    }
    
    this.lastScrollY = currentScrollY;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = '';
  }
}
