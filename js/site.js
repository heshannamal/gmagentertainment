const topbar = document.querySelector('.topbar');
const menuToggle = document.querySelector('.menu-toggle');
if (menuToggle && topbar) {
  menuToggle.addEventListener('click', () => topbar.classList.toggle('open'));
}

document.querySelectorAll('.navlinks a').forEach(link => {
  link.addEventListener('click', () => topbar?.classList.remove('open'));
});

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 35, 280)}ms`;
  observer.observe(item);
});

window.addEventListener('scroll', () => {
  if (!topbar) return;
  topbar.classList.toggle('scrolled', window.scrollY > 18);
});

const hero = document.querySelector('.hero, .page-hero');
if (hero) {
  hero.addEventListener('mousemove', (e) => {
    const bg = hero.querySelector('.bg');
    if (!bg) return;
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 18;
    bg.style.setProperty('--mx', `${x}px`);
    bg.style.setProperty('--my', `${y}px`);
  });
  hero.addEventListener('mouseleave', () => {
    const bg = hero.querySelector('.bg');
    if (!bg) return;
    bg.style.setProperty('--mx', '0px');
    bg.style.setProperty('--my', '0px');
  });
}

document.querySelectorAll('.gallery-item[data-lightbox]').forEach(item => {
  item.addEventListener('click', () => openLightbox(item.dataset.lightbox, item.dataset.caption || ''));
});

const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox img');
const lightboxCaption = document.querySelector('.lightbox .caption');
const lightboxClose = document.querySelector('.lightbox button');

function openLightbox(src, caption) {
  if (!lightbox || !lightboxImg) return;
  lightbox.classList.add('open');
  lightboxImg.src = src;
  lightboxCaption.textContent = caption;
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}
if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  lightboxClose?.addEventListener('click', closeLightbox);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

// lightweight magnetic hover
const magneticButtons = document.querySelectorAll('.btn, .button-link');
magneticButtons.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.03}px, ${y * 0.03 - 2}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});


// Signature progress line, fully visual, no external libraries required.
const scrollProgress = document.createElement('div');
scrollProgress.className = 'reading-progress';
scrollProgress.setAttribute('aria-hidden', 'true');
document.body.appendChild(scrollProgress);
const updateProgress = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.transform = `scaleX(${max > 0 ? Math.min(1,scrollY/max) : 0})`;
};
window.addEventListener('scroll',updateProgress,{passive:true});
window.addEventListener('resize',updateProgress);updateProgress();
if (menuToggle) {
  menuToggle.setAttribute('aria-expanded','false');
  menuToggle.addEventListener('click',()=>menuToggle.setAttribute('aria-expanded',String(topbar?.classList.contains('open'))));
}
// Trigger keyboard and touchscreen gallery activation without requiring mouse interaction.
document.querySelectorAll('.gallery-item[data-lightbox]').forEach(item => {
  item.setAttribute('tabindex','0');
  item.setAttribute('role','button');
  item.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();item.click()}});
});
