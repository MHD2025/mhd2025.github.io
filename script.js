// تواريخ واجهة المستخدم
const now = new Date();
document.getElementById('year').textContent = now.getFullYear();
const fmt = new Intl.DateTimeFormat('ar-IQ', { dateStyle: 'long' });

// Drawer (mobile menu)
const drawer = document.getElementById('drawer');
const openMenu = document.getElementById('openMenu');
const closeMenu = document.getElementById('closeMenu');
closeMenu.addEventListener('click', () => toggleDrawer(false));
const toggleDrawer = (open) => { 
  drawer.style.display = open ? 'block' : 'none'; 
  drawer.setAttribute('aria-hidden', (!open).toString()); 
};
openMenu.addEventListener('click', () => toggleDrawer(true));
drawer.addEventListener('click', (e) => { 
  if(e.target === drawer) toggleDrawer(false); 
});

// تمرير ناعم
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').substring(1);
    const target = document.getElementById(id);
    if(target) { 
      e.preventDefault(); 
      target.scrollIntoView({behavior: 'smooth', block: 'start'}); 
      toggleDrawer(false); 
    }
  });
});

// Scroll reveal using IntersectionObserver
const io = new IntersectionObserver((entries) => {
  entries.forEach(en => { 
    if(en.isIntersecting) { 
      en.target.classList.add('in'); 
      io.unobserve(en.target); 
    } 
  })
},{threshold: .12, rootMargin: '0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));