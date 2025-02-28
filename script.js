// DOM Elements
const header = document.querySelector('header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const backToTopBtn = document.getElementById('backToTop');
const categoryBtns = document.querySelectorAll('.category-btn');
const productCards = document.querySelectorAll('.product-card');
const contactForm = document.getElementById('contactForm');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dots = document.querySelectorAll('.dot');
const body = document.body;

// Scroll Event Listener
window.addEventListener('scroll', () => {
  // Header scroll effect
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // Back to top button
  if (window.scrollY > 500) {
    backToTopBtn.classList.add('active');
  } else {
    backToTopBtn.classList.remove('active');
  }

  // Reveal animations on scroll
  const revealElements = document.querySelectorAll('.reveal-from-left, .reveal-from-right, .reveal-from-bottom');
  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (elementTop < windowHeight - 100) {
      element.classList.add('reveal-active');
    }
  });
});

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
  body.classList.toggle('menu-open');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
    body.classList.remove('menu-open');
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('active') && 
      !e.target.closest('.nav-links') && 
      !e.target.closest('.menu-toggle')) {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
    body.classList.remove('menu-open');
  }
});

// Back to Top Button
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Product Category Filter
categoryBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    categoryBtns.forEach(b => b.classList.remove('active'));
    // Add active class to clicked button
    btn.classList.add('active');
    
    const category = btn.getAttribute('data-category');
    
    // Filter products
    productCards.forEach(card => {
      if (category === 'all' || card.getAttribute('data-category') === category) {
        card.classList.remove('hide');
      } else {
        card.classList.add('hide');
      }
    });
  });
});

// Contact Form Submission
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send the form data to a server
    // For demo purposes, we'll just log it and show an alert
    console.log({ name, email, phone, subject, message });
    
    // Show success message
    alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
    
    // Reset form
    contactForm.reset();
  });
}

// Testimonials Slider
let currentTestimonial = 0;

function showTestimonial(index) {
  // Hide all testimonials
  testimonialCards.forEach(card => {
    card.classList.remove('active');
  });
  
  // Remove active class from all dots
  dots.forEach(dot => {
    dot.classList.remove('active');
  });
  
  // Show the selected testimonial
  testimonialCards[index].classList.add('active');
  
  // Add active class to the corresponding dot
  dots[index].classList.add('active');
  
  // Update current testimonial index
  currentTestimonial = index;
}

// Next button click
nextBtn.addEventListener('click', () => {
  currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
  showTestimonial(currentTestimonial);
});

// Previous button click
prevBtn.addEventListener('click', () => {
  currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
  showTestimonial(currentTestimonial);
});

// Dot click
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showTestimonial(index);
  });
});

// Swipe functionality for testimonials on mobile
let touchStartX = 0;
let touchEndX = 0;
const testimonialsSlider = document.querySelector('.testimonials-slider');

if (testimonialsSlider) {
  testimonialsSlider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, false);
  
  testimonialsSlider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, false);
  
  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      // Swipe left, show next
      nextBtn.click();
    } else if (touchEndX > touchStartX + 50) {
      // Swipe right, show previous
      prevBtn.click();
    }
  }
}

// Auto slide testimonials
let testimonialInterval = setInterval(() => {
  currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
  showTestimonial(currentTestimonial);
}, 5000);

// Stop auto slide on hover or touch
if (testimonialsSlider) {
  testimonialsSlider.addEventListener('mouseenter', () => {
    clearInterval(testimonialInterval);
  });
  
  testimonialsSlider.addEventListener('mouseleave', () => {
    testimonialInterval = setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
      showTestimonial(currentTestimonial);
    }, 5000);
  });
  
  testimonialsSlider.addEventListener('touchstart', () => {
    clearInterval(testimonialInterval);
  });
}

// Newsletter Form Submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get email value
    const email = newsletterForm.querySelector('input').value;
    
    // Here you would typically send the email to a server
    // For demo purposes, we'll just log it and show an alert
    console.log({ email });
    
    // Show success message
    alert('تم الاشتراك في النشرة الإخبارية بنجاح!');
    
    // Reset form
    newsletterForm.reset();
  });
}

// Fix for iOS 100vh issue
function setVhProperty() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Set the property on initial load
setVhProperty();

// Update the property on resize
window.addEventListener('resize', () => {
  setVhProperty();
});

// Initialize the page
window.addEventListener('DOMContentLoaded', () => {
  // Show first testimonial
  showTestimonial(0);
  
  // Trigger scroll event to check for elements in view on page load
  window.dispatchEvent(new Event('scroll'));
  
  // Add active class to the first nav link
  document.querySelector('.nav-links a').classList.add('active');
  
  // Update active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
  
  // Fix for images not loading properly on some mobile devices
  const allImages = document.querySelectorAll('img');
  allImages.forEach(img => {
    img.addEventListener('error', function() {
      this.src = 'https://images.unsplash.com/photo-1618022325802-7e5e732d97a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    });
  });
});

// Prevent zoom on double tap for iOS devices
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
  const now = Date.now();
  if (now - lastTouchEnd <= 300) {
    e.preventDefault();
  }
  lastTouchEnd = now;
}, false);