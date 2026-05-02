document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const rtlToggle = document.getElementById('rtl-toggle');
  const htmlElement = document.documentElement;
  const body = document.body;

  // Dark/Light Mode
  themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', newTheme);
  });

  // LTR/RTL Toggle
  rtlToggle.addEventListener('click', () => {
    const currentDir = htmlElement.getAttribute('dir');
    const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
    htmlElement.setAttribute('dir', newDir);
    rtlToggle.textContent = newDir.toUpperCase();
    localStorage.setItem('dir', newDir);
    
    // Update body class for specific RTL styling if needed
    if(newDir === 'rtl') {
      body.classList.add('rtl-mode');
    } else {
      body.classList.remove('rtl-mode');
    }
  });

  // Load Saved Preferences
  const savedTheme = localStorage.getItem('theme') || 'dark';
  const savedDir = localStorage.getItem('dir') || 'ltr';

  body.setAttribute('data-theme', savedTheme);
  htmlElement.setAttribute('dir', savedDir);
  themeToggle.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  rtlToggle.textContent = savedDir.toUpperCase();

  // Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if(mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      mobileNav.classList.toggle('active');
    });
  }

  const mobileClose = document.querySelectorAll('.mobile-close-btn');
  mobileClose.forEach(btn => {
    btn.addEventListener('click', () => {
      mobileToggle.classList.remove('active');
      mobileNav.classList.remove('active');
    });
  });

  // Mobile Dropdown Callbacks
  document.querySelectorAll('.mobile-dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const group = toggle.closest('.mobile-nav-group');
      group.classList.toggle('active');
    });
  });

  // Close mobile menu only on FINAL link click (not dropdown toggles)
  document.querySelectorAll('.mobile-nav a:not(.mobile-dropdown-toggle)').forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.classList.remove('active');
      mobileNav.classList.remove('active');
    });
  });

  // Intersection Observer for Animations
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('section, .card, .hero-content').forEach(el => {
    observer.observe(el);
  });

  // Active Nav Highlighting
  const currentPath = window.location.pathname.split("/").pop() || 'index.html';
  
  // Desktop Nav
  document.querySelectorAll('.nav-link-item').forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
  });

  // Mobile Nav
  document.querySelectorAll('.mobile-nav a').forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
  });

  // Logo Animation (simple)
  const logo = document.querySelector('.logo-luxe');
  if(logo) {
    logo.style.opacity = '0';
    setTimeout(() => {
      logo.style.transition = 'opacity 1s ease';
      logo.style.opacity = '1';
    }, 100);
  }
});
