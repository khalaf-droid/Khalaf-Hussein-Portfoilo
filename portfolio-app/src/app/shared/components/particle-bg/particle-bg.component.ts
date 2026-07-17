import { Component, ElementRef, OnInit, OnDestroy, ViewChild, HostListener, NgZone } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-particle-bg',
  standalone: true,
  template: `<div #canvasContainer class="canvas-container"></div>`,
  styles: [`
    .canvas-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: -10;
      pointer-events: none;
      background: transparent;
    }
  `]
})
export class ParticleBgComponent implements OnInit, OnDestroy {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef<HTMLDivElement>;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private particlesMesh!: THREE.Points;
  private animationFrameId: number = 0;

  // Mouse interaction
  private mouseX = 0;
  private mouseY = 0;
  private targetX = 0;
  private targetY = 0;
  private windowHalfX = window.innerWidth / 2;
  private windowHalfY = window.innerHeight / 2;

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.initThreeJS();
  }

  private initThreeJS(): void {
    // 1. Setup Scene
    this.scene = new THREE.Scene();

    // 2. Setup Camera
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 30;

    // 3. Setup Renderer
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.canvasContainer.nativeElement.appendChild(this.renderer.domElement);

    // 4. Create Particles
    const particlesCount = 1500;
    const geometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);

    // Colors: Deep Blue and Purple
    const color1 = new THREE.Color(0x0284c7);
    const color2 = new THREE.Color(0x7e22ce);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position - spread particles across a wider volume
      posArray[i] = (Math.random() - 0.5) * 100;     // x
      posArray[i + 1] = (Math.random() - 0.5) * 100; // y
      posArray[i + 2] = (Math.random() - 0.5) * 50;  // z

      // Color - mix between cyan and purple based on position
      const mixRatio = Math.random();
      const mixedColor = color1.clone().lerp(color2, mixRatio);
      
      colorsArray[i] = mixedColor.r;
      colorsArray[i + 1] = mixedColor.g;
      colorsArray[i + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

    // Custom shader material for soft glowing particles
    const material = new THREE.PointsMaterial({
      size: 0.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.NormalBlending,
      sizeAttenuation: true
    });

    this.particlesMesh = new THREE.Points(geometry, material);
    this.scene.add(this.particlesMesh);

    // Add some subtle ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    // 5. Start Animation Loop outside Angular zone
    this.ngZone.runOutsideAngular(() => {
      this.animate();
    });
  }

  private animate = (): void => {
    // Calculate target rotation based on mouse position
    this.targetX = this.mouseX * 0.001;
    this.targetY = this.mouseY * 0.001;

    // Smoothly interpolate rotation (easing)
    this.particlesMesh.rotation.y += 0.002 + (this.targetX - this.particlesMesh.rotation.y) * 0.05;
    this.particlesMesh.rotation.x += 0.001 + (this.targetY - this.particlesMesh.rotation.x) * 0.05;

    // Slow continuous drift
    this.particlesMesh.position.y = Math.sin(Date.now() * 0.0005) * 2;

    this.renderer.render(this.scene, this.camera);
    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    // Calculate normalized mouse coordinates (-1 to +1)
    this.mouseX = (event.clientX - this.windowHalfX);
    this.mouseY = (event.clientY - this.windowHalfY);
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrameId);
    
    // Clean up Three.js resources
    this.particlesMesh.geometry.dispose();
    (this.particlesMesh.material as THREE.Material).dispose();
    this.renderer.dispose();
    
    if (this.canvasContainer.nativeElement.contains(this.renderer.domElement)) {
      this.canvasContainer.nativeElement.removeChild(this.renderer.domElement);
    }
  }
}
