import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

const PATHS: Record<string, string> = {
  home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
  film: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4"/>',
  landmark: '<path d="M3 21h18M5 21V10M19 21V10M9 21V10M15 21V10M2 10l10-7 10 7z"/>',
  server: '<rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 7.5h.01M7 16.5h.01"/>',
  gamepad: '<path d="M6 11h4M8 9v4"/><path d="M15 12h.01M18 10h.01"/><path d="M17.3 5H6.7a4 4 0 0 0-3.9 3.1l-1.2 6A3 3 0 0 0 7 16l1-2h8l1 2a3 3 0 0 0 5.4-1.9l-1.2-6A4 4 0 0 0 17.3 5z"/>',
  brain: '<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 1V5a3 3 0 0 0-3-1z"/><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 1"/>',
  check: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 12l3 3 5-6"/>',
  utensils: '<path d="M5 3v8a2 2 0 0 0 2 2v8M9 3v8M7 3v8"/><path d="M17 21V3c-2 1-4 4-4 8 0 2 1 3 4 3"/>',
  book: '<path d="M2 5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16a2 2 0 0 0-2-2H2z"/><path d="M22 5a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v16a2 2 0 0 1 2-2h8z"/>',
  graduation: '<path d="M22 9L12 4 2 9l10 5z"/><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/><path d="M22 9v6"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>',
  palette: '<path d="M12 3a9 9 0 1 0 0 18c1.5 0 2-1 1.5-2.2-.5-1.3.3-2.3 1.7-2.3H17a4 4 0 0 0 4-4c0-5-4-9.5-9-9.5z"/><path d="M7.5 11h.01M10 7.5h.01M14.5 7.5h.01"/>',
  database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
  bot: '<rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 8V4M9 13h.01M15 13h.01M9 17h6"/><circle cx="12" cy="3" r="1"/>',
  shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  wrench: '<path d="M14.7 6.3a4 4 0 0 0 5 5l-9.4 9.4a2.1 2.1 0 0 1-3-3l9.4-9.4a4 4 0 0 0-2-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  phone: '<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"/>',
  pin: '<path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  heart: '<path d="M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11z"/>'
};

@Component({
  selector: 'app-icon',
  standalone: true,
  template: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor"
    stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
    [innerHTML]="svg"></svg>`,
  styles: [`:host { display: inline-flex; align-items: center; justify-content: center; line-height: 1; } svg { display: block; }`]
})
export class IconComponent {
  svg: SafeHtml = '';
  constructor(private sanitizer: DomSanitizer) {}
  @Input() set name(value: string) {
    // PATHS is a static, trusted map defined in this file.
    this.svg = this.sanitizer.bypassSecurityTrustHtml(PATHS[value] ?? PATHS['wrench']);
  }
}
