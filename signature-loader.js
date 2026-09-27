/**
 * AbhiFY — Premium Signature-Drawing Animation Controller
 * Sequential handwriting animation using SVG stroke-dasharray & stroke-dashoffset
 */

(() => {
  'use strict';

  function initSignatureLoader() {
    const loader = document.getElementById('abhify-signature-loader');
    if (!loader) return;

    // Check if animation should be shown
    const urlParams = new URLSearchParams(window.location.search);
    const forceReplay = urlParams.has('replay') || urlParams.has('preview');
    const hasSeen = sessionStorage.getItem('abhify_sig_loaded');

    // Reduce motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasSeen && !forceReplay) {
      loader.classList.add('loader-hidden');
      setTimeout(() => loader.remove(), 100);
      return;
    }

    if (prefersReducedMotion) {
      setTimeout(() => {
        loader.classList.add('loader-hidden');
        sessionStorage.setItem('abhify_sig_loaded', 'true');
        setTimeout(() => loader.remove(), 800);
      }, 500);
      return;
    }

    // Safety fallback: if anything stalls, force reveal after 4.8 seconds
    const safetyTimer = setTimeout(() => {
      if (loader && !loader.classList.contains('loader-hidden')) {
        loader.classList.add('loader-hidden');
        sessionStorage.setItem('abhify_sig_loaded', 'true');
      }
    }, 4800);

    // Stroke execution list with precise handwriting timings (delays & durations in ms)
    const strokeSteps = [
      { id: 'path-A1', delay: 150, duration: 420, ease: 'cubic-bezier(0.4, 0, 0.2, 1)' }, // A ascent
      { id: 'path-A2', delay: 480, duration: 380, ease: 'cubic-bezier(0.4, 0, 0.2, 1)' }, // A descent
      { id: 'path-A3', delay: 780, duration: 320, ease: 'cubic-bezier(0.25, 1, 0.5, 1)' }, // A crossbar
      { id: 'path-b',  delay: 1020, duration: 360, ease: 'cubic-bezier(0.35, 0, 0.25, 1)' }, // b cursive
      { id: 'path-h',  delay: 1320, duration: 380, ease: 'cubic-bezier(0.35, 0, 0.25, 1)' }, // h cursive
      { id: 'path-i',  delay: 1640, duration: 240, ease: 'cubic-bezier(0.25, 1, 0.5, 1)' }, // i stem
      { id: 'dot-i',   delay: 1820, isDot: true },                                          // i dot
      { id: 'path-F1', delay: 1900, duration: 280, ease: 'cubic-bezier(0.25, 1, 0.5, 1)' }, // F top bar
      { id: 'path-F2', delay: 2120, duration: 320, ease: 'cubic-bezier(0.4, 0, 0.2, 1)' },  // F stem
      { id: 'path-F3', delay: 2380, duration: 220, ease: 'cubic-bezier(0.25, 1, 0.5, 1)' }, // F cross
      { id: 'path-Y1', delay: 2540, duration: 240, ease: 'cubic-bezier(0.25, 1, 0.5, 1)' }, // Y left
      { id: 'path-Y2', delay: 2720, duration: 360, ease: 'cubic-bezier(0.4, 0, 0.2, 1)' },  // Y long slash
      { id: 'path-swoosh', delay: 2980, duration: 620, ease: 'cubic-bezier(0.22, 1, 0.36, 1)' }, // Underline swoosh
      { id: 'path-plane1', delay: 3520, duration: 220, ease: 'ease-out' },                    // Plane outer
      { id: 'path-plane2', delay: 3680, duration: 200, ease: 'ease-out' }                     // Plane fold
    ];

    // Initialize all SVG paths
    strokeSteps.forEach(step => {
      const el = document.getElementById(step.id);
      if (!el) return;

      if (step.isDot) {
        el.style.opacity = '0';
        el.style.transform = 'scale(0)';
      } else {
        const len = el.getTotalLength ? el.getTotalLength() : 300;
        el.style.strokeDasharray = `${len + 2} ${len + 2}`;
        el.style.strokeDashoffset = `${len + 2}`;
        el.style.opacity = '0';
      }
    });

    // Animate each stroke in sequential handwriting rhythm
    strokeSteps.forEach(step => {
      setTimeout(() => {
        const el = document.getElementById(step.id);
        if (!el) return;

        if (step.isDot) {
          el.style.opacity = '1';
          el.style.transform = 'scale(1)';
        } else {
          const len = el.getTotalLength ? el.getTotalLength() : 300;
          el.style.opacity = '1';
          el.style.transition = `stroke-dashoffset ${step.duration}ms ${step.ease}`;
          el.style.strokeDashoffset = '0';
        }
      }, step.delay);
    });

    // Hold complete signature for ~0.65 seconds, then smooth fade out
    setTimeout(() => {
      const sigGroup = document.querySelector('.signature-group');
      if (sigGroup) sigGroup.classList.add('signature-complete');

      setTimeout(() => {
        clearTimeout(safetyTimer);
        loader.classList.add('loader-hidden');
        sessionStorage.setItem('abhify_sig_loaded', 'true');
        setTimeout(() => {
          if (loader.parentNode) loader.parentNode.removeChild(loader);
        }, 800);
      }, 650);
    }, 3950);
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSignatureLoader);
  } else {
    initSignatureLoader();
  }
})();
