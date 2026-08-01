import './style.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import * as THREE from 'three';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis
const lenis = new Lenis({
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
});

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Integrate Lenis with ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0, 0);

// Initialize Swiper
new Swiper('.testimonials-swiper', {
  modules: [Autoplay, Pagination],
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

// Animations (GSAP)
const initAnimations = () => {
  // Hero Text Reveal
  gsap.to('.reveal-text > span', {
    y: 0,
    opacity: 1,
    duration: 1.2,
    stagger: 0.1,
    ease: 'power4.out',
    delay: 0.5
  });

  // Hero Bottle Floating
  gsap.to('#hero-bottle', {
    y: -20,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
  
  // Hero Bottle Parallax
  gsap.to('#hero-bottle', {
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    },
    y: 100,
    scale: 1.1,
    ease: 'none'
  });

  // Sections Fade Up
  const glassPanels = document.querySelectorAll('.glass-panel');
  glassPanels.forEach((panel) => {
    gsap.from(panel, {
      scrollTrigger: {
        trigger: panel,
        start: 'top 85%',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
  });

  // Image Parallax
  gsap.to('.solution-image img', {
    scrollTrigger: {
      trigger: '.solution-image',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    },
    y: -50,
    scale: 1.1,
    ease: 'none'
  });
};

initAnimations();

// Three.js Background Subtil
const initThreeJS = () => {
  const container = document.getElementById('canvas-container');
  if (!container) return;

  const scene = new THREE.Scene();
  
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 200;
  
  const posArray = new Float32Array(particlesCount * 3);
  
  for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 15;
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  
  // Custom Material for soft glowing particles
  const material = new THREE.PointsMaterial({
    size: 0.05,
    color: 0xC28269,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  });
  
  const particlesMesh = new THREE.Points(particlesGeometry, material);
  scene.add(particlesMesh);

  // Mouse interaction
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) - 0.5;
    mouseY = (event.clientY / window.innerHeight) - 0.5;
  });

  const clock = new THREE.Clock();

  const animate = () => {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    particlesMesh.rotation.y = -elapsedTime * 0.05;
    particlesMesh.rotation.x = elapsedTime * 0.02;

    // Parallax effect on particles based on mouse
    particlesMesh.position.x += (mouseX * 2 - particlesMesh.position.x) * 0.05;
    particlesMesh.position.y += (-mouseY * 2 - particlesMesh.position.y) * 0.05;

    // Scroll effect
    particlesMesh.position.y = window.scrollY * 0.001;

    renderer.render(scene, camera);
  };

  animate();

  // Resize handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
};

initThreeJS();
