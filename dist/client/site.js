const ktmPhotoTitles = {
  'ktm-DSC03946': 'KTM rider descending a trail through the woods',
  'ktm-DSC03947': 'KTM rider kicking up dirt on a forest trail',
  'ktm-DSC04086': 'KTM rider in tall grass at the edge of the woods',
  'ktm-DSC04123': 'KTM rider rounding a bend between pine trees',
  'ktm-DSC04224': 'KTM rider stopped on a sunlit woodland trail',
  'ktm-DSC04250': 'KTM rider approaching through tall grass',
  'ktm-DSC04254': 'Head-on view of the KTM rider framed by a dark foreground',
  'ktm-DSC04300': 'KTM rider passing a barn on a rural road',
  'ktm-DSC04396': 'Panning photograph of the KTM rider among birch trees'
};
const selectedPhotographs = [
  {id:'rainbow',width:1200,height:800,alt:'A rainbow crossing sunlit mountain slopes beneath dark clouds'},
  {id:'people',width:600,height:900,alt:'A couple in wedding clothes on a broad rock ledge above a mountain fjord'},
  {id:'harbor',width:1200,height:799,alt:'An aerial view of a red waterside cabin and a road along a clear turquoise inlet'},
  {id:'climb',width:600,height:1066,alt:'A climber in a blue jacket holding onto a rock face above snowy mountains'},
  {id:'coastal',width:1200,height:675,alt:'Passengers silhouetted inside a boat as the sun sets over a waterfront town'},
  {id:'sail',width:1200,height:799,alt:'A small white sailboat surrounded by deep green water, photographed from above'},
  {id:'carousel-model',width:540,height:960,alt:'A woman in a floral dress standing in a narrow sunlit street'},
  {id:'tracks',width:1200,height:675,alt:'A four-wheel-drive vehicle raising dust on a forest track in evening light'},
  {id:'bridge',width:1200,height:799,alt:'A long bridge crossing turquoise coastal shallows below green mountains'},
  {id:'motorcycle',width:600,height:600,alt:'A rider seated on a motorcycle at a viewpoint in warm evening light'},
  {id:'twilight',width:1200,height:675,alt:'Snow-covered mountain peaks beneath the first stars of the evening'},
  {id:'couple',width:600,height:1066,alt:'A couple embracing beside a window in a wooden room'}
];
const portraitPhotos = new Set(['ktm-DSC04086', 'ktm-DSC04250', 'ktm-DSC04254']);
const photoLibrary = Object.fromEntries(selectedPhotographs.map(photo => [photo.id, photo]));
for (const [id, alt] of Object.entries(ktmPhotoTitles)) {
  photoLibrary[id] = {id, alt, width:640, height:portraitPhotos.has(id) ? 1138 : 360, widths:[640,1280,1920]};
}
const projects = [
  {slug:'ktm-shoot',title:'Riding the forest trails',kind:'Motorcycle photography',cover:'ktm-DSC04224',photos:Object.keys(ktmPhotoTitles),description:'A rider, forest trails and the roads between them. Action frames sit alongside quieter moments, with the woodland landscape running through the series.'},
  {slug:'travel-landscapes',title:'From the coast to the mountains',kind:'Travel & landscapes',cover:'bridge',photos:['rainbow','harbor','sail','bridge','twilight','coastal','climb'],description:'Open water, mountain weather and places seen from above. A selection of photographs following the changing light and scale of the outdoors.'},
  {slug:'people-places',title:'People & places',kind:'Portraits',cover:'carousel-model',photos:['carousel-model','couple','motorcycle','people'],description:'A quiet street, a room by a window, a pause on the journey. Portraits and small moments that keep people connected to their surroundings.'}
];
const services = [
  {title:'Personal sessions',description:'Outdoor portraits for individuals, couples and riders. Bring a person, a place or an idea you want to remember.'},
  {title:'Outdoor & travel stories',description:'Location photography for destinations, guides and tourism operators. People, landscapes and the experience of being there.'},
  {title:'Brand assignments',description:'Photography for outdoor, adventure and motorsport brands. Share the brief, the setting and where the images will appear.'}
];
const page = document.body.dataset.page;
const main = document.querySelector('main');
const photoWidths = photo => photo.widths || [...new Set([Math.min(480,photo.width),Math.min(960,photo.width),photo.width])];
const photoSources = name => photoWidths(photoLibrary[name]).map(width => `photos/${name}-${width}.webp ${width}w`).join(', ');
const pic = (name, sizes='(max-width: 640px) calc(100vw - 44px), (max-width: 1000px) 45vw, 700px') => {
  const photo=photoLibrary[name];
  return `<img src="photos/${name}-${photoWidths(photo)[0]}.webp" srcset="${photoSources(name)}"
    sizes="${sizes}" width="${photo.width}" height="${photo.height}" alt="${photo.alt}" loading="lazy" decoding="async">`;
};
const cards = () => `<div class="grid">${projects.map(project => `
  <a class="card" href="projects.html?collection=${project.slug}">
    ${pic(project.cover)}
    <h2>${project.title}</h2>
    <p class="project-kind">${project.kind} · ${project.photos.length} photographs</p>
  </a>
`).join('')}</div>`;
const process = () => `<section class="booking-process" aria-labelledby="booking-title">
  <h2 id="booking-title">From an idea to a shoot.</h2>
  <ol>
    <li><h3>Share your idea</h3><p>Tell me what you have in mind, your preferred location and dates, and how you plan to use the photographs.</p></li>
    <li><h3>Agree on the details</h3><p>We’ll discuss the scope and quote, including the shoot, image delivery and usage, before making plans.</p></li>
    <li><h3>Make the photographs</h3><p>With the brief in place, we can focus on the people, the setting and the moments worth photographing.</p></li>
  </ol>
</section>`;
const inquirySection = () => `<section class="inquiry-section" aria-labelledby="inquiry-heading">
  <div><h2 id="inquiry-heading">Let’s plan your next shoot.</h2><p>Tell me about the person, place or story you have in mind.</p></div>
  <div class="inquiry-actions"><button type="button" class="project-cta" data-inquire><span>Plan a shoot</span></button>
  <a class="text-link" href="https://wa.me/358440325505" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
  <a class="email-link" href="mailto:bogdan.maliagin@gmail.com">bogdan.maliagin@gmail.com</a></div>
</section>`;

const nav=document.querySelector('nav');
nav.querySelector('[data-nav="'+page+'"]')?.setAttribute('aria-current','page');
const masthead = document.querySelector('.masthead');
const menuToggle = masthead.querySelector('.menu-toggle');
masthead.setAttribute('data-menu-ready', '');
const menuDrawer = document.createElement('dialog');
menuDrawer.id = 'mobile-navigation';
menuDrawer.className = 'mobile-drawer';
menuDrawer.setAttribute('aria-label', 'Site navigation');
menuDrawer.innerHTML = `<div class="drawer-header"><span>Bogdan Maliagin</span>
  <button type="button" class="close" aria-label="Close navigation" autofocus>×</button></div>`;
const drawerNav = nav.cloneNode(true);
drawerNav.removeAttribute('id');
menuDrawer.append(drawerNav);
menuDrawer.insertAdjacentHTML('beforeend', '<button type="button" class="btn drawer-contact" data-inquire>Plan a shoot</button><a class="text-link drawer-whatsapp" href="https://wa.me/358440325505" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>');
document.body.append(menuDrawer);
function syncMenuState() {
  masthead.toggleAttribute('data-menu-open', menuDrawer.open);
  menuToggle.setAttribute('aria-expanded', String(menuDrawer.open));
  document.body.classList.toggle('menu-open', menuDrawer.open);
}
function closeMenu() {
  if (!menuDrawer.open || menuDrawer.classList.contains('is-closing')) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    menuDrawer.close();
    return;
  }
  menuDrawer.classList.add('is-closing');
}
menuToggle.addEventListener('click', () => {
  if (menuDrawer.open) return closeMenu();
  menuDrawer.classList.remove('is-closing');
  menuDrawer.showModal();
  syncMenuState();
});
menuDrawer.querySelector('.close').addEventListener('click', closeMenu);
menuDrawer.addEventListener('animationend', event => {
  if (event.target === menuDrawer && event.animationName === 'drawer-exit') menuDrawer.close();
});
menuDrawer.addEventListener('cancel', event => {
  event.preventDefault();
  closeMenu();
});
menuDrawer.addEventListener('keydown', event => {
  if (event.key !== 'Tab') return;
  const controls = [...menuDrawer.querySelectorAll('a[href], button:not([disabled])')];
  const first = controls[0], last = controls.at(-1);
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});
menuDrawer.addEventListener('close', () => {
  menuDrawer.classList.remove('is-closing');
  syncMenuState();
});
menuDrawer.addEventListener('click', event => {
  const bounds = menuDrawer.getBoundingClientRect();
  if (event.target === menuDrawer && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) closeMenu();
  if (event.target.closest('a, [data-inquire]')) menuDrawer.close();
});
matchMedia('(max-width: 640px)').addEventListener('change', () => menuDrawer.close());
matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', event => {
  if (event.matches && menuDrawer.classList.contains('is-closing')) menuDrawer.close();
});
if (page === 'home') {
  main.innerHTML = `
    <section class="hero" aria-labelledby="home-title">
      <figure class="opening-photo">
        <img src="photos/mountain-1440.webp"
             srcset="photos/mountain-768.webp 768w, photos/mountain-1440.webp 1440w, photos/mountain-2400.webp 2400w"
             sizes="max(100vw, 178dvh)" width="2400" height="1350" fetchpriority="high"
             alt="A rugged mountain ridge beneath a sky full of stars">
      </figure>
      <div class="hero-copy">
        <h1 id="home-title"><span>Adventure</span> <span>photography</span></h1>
        <p class="hero-summary">Outdoor portraits, travel stories<br>and photography for adventure brands.</p>
        <a class="hero-projects" href="#selected-work">Explore the photographs</a>
      </div>
    </section>
    <div class="home-content">
      <section id="selected-work" class="selected-work" aria-labelledby="selected-title">
        <div class="section-heading"><h2 id="selected-title">A sense of being there.</h2><p>People, landscapes and life outdoors.<br>A selection of photographs by Bogdan Maliagin.</p></div>
        <div class="selected-grid">${selectedPhotographs.map(photo => `<figure><button type="button" data-photo="${photo.id}" data-selection="home" aria-label="Enlarge: ${photo.alt}">${pic(photo.id,'(max-width: 640px) calc((100vw - 44px) / 2), (max-width: 1000px) 44vw, 29vw')}</button></figure>`).join('')}</div>
        <a class="text-link" href="projects.html">Explore the collections</a>
      </section>
      <section id="about" class="about-section" aria-labelledby="about-title">
        <figure><img src="photos/hero-480.webp" srcset="photos/hero-480.webp 480w, photos/hero-960.webp 960w, photos/hero-1200.webp 1200w" sizes="(max-width: 640px) 92vw, 45vw" width="1200" height="800" loading="lazy" decoding="async" alt="A hiker looking out over a blue fjord from a rocky mountain ledge"></figure>
        <div><h2 id="about-title">I’m Bogdan.</h2><p class="about-lead">I photograph people, landscapes and life outdoors.</p><p>My work moves between mountain paths, coastlines and forest trails, with an eye for the people and small moments along the way.</p><a class="text-link" href="https://www.instagram.com/bogdanmaliagin/">More photographs on Instagram</a></div>
      </section>
      <section class="home-services" aria-labelledby="services-title">
        <div class="section-heading"><h2 id="services-title">Make something<br>out there.</h2><p>Portraits, travel stories and brand assignments.<br>Start with an idea; we’ll work through the details.</p></div>
        <div class="service-summary">${services.map(service=>`<a href="pricing.html"><h3>${service.title}</h3><p>${service.description}</p><span class="text-link">About the shoot</span></a>`).join('')}</div>
      </section>
      ${inquirySection()}
    </div>`;
}
const project=projects.find(p=>p.slug===new URLSearchParams(location.search).get('collection'));
if(page==='projects' && project){
  document.title=project.title+' | Bogdan Maliagin';
  main.innerHTML=`<div class="head project-head"><a class="text-link" href="projects.html">All collections</a><h1>${project.title}</h1><p class="project-kind">${project.kind} · ${project.photos.length} photographs</p><p class="intro project-description">${project.description}</p></div><section class="section gallery" aria-label="${project.kind}">${project.photos.map(n=>`<button type="button" data-photo="${n}" aria-label="Enlarge: ${photoLibrary[n].alt}">${pic(n)}</button>`).join('')}</section><nav class="collection-nav" aria-label="More collections">${projects.filter(other=>other!==project).map(other=>`<a class="text-link" href="projects.html?collection=${other.slug}">${other.title}</a>`).join('')}</nav>${inquirySection()}`;
}else if(page==='projects'){
  main.innerHTML=`<div class="head"><h1>Photographic stories.</h1><p class="intro">Motorcycle trails, mountain light and people along the way. Explore the work, one collection at a time.</p></div><section class="section" aria-label="Photography collections">${cards()}</section>${inquirySection()}`;
}
if(page==='pricing') {
  document.title='Services | Bogdan Maliagin';
  main.innerHTML=`<div class="head"><h1>Let’s make<br>something together.</h1><p class="intro">Personal sessions, travel stories and brand photography. Each shoot is quoted around the location, the scope and how the photographs will be used.</p></div><section aria-label="Photography services">${services.map(service=>`<div class="price"><div><h2>${service.title}</h2><p>${service.description}</p></div><button type="button" class="project-cta" data-inquire="${service.title}"><span>Plan a shoot</span></button></div>`).join('')}</section>${process()}<section class="quote-details"><h2>What goes into a quote?</h2><p>The location and travel involved, time on the shoot, the photographs you need and their intended use. Include what you know in your inquiry—we can work through the rest together.</p><p>Delivery timing and usage are agreed for your project before the shoot.</p></section>${inquirySection()}`;
}
const isLocalPreview = ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname);
const dialog=document.querySelector('#inquiry'), viewer=document.querySelector('#viewer'), form=dialog.querySelector('form');
dialog.querySelector('.note').hidden = !isLocalPreview;
const syncModalScroll = () => document.body.classList.toggle('modal-open', !!document.querySelector('dialog[open]'));
for (const modal of [dialog, viewer]) modal.addEventListener('close', syncModalScroll);
let photoIndex = 0;
let activePhotos = project?.photos || selectedPhotographs.map(photo=>photo.id);
function showPhoto(index) {
  photoIndex = (index + activePhotos.length) % activePhotos.length;
  const name = activePhotos[photoIndex];
  const photo = photoLibrary[name];
  const image = viewer.querySelector('img');
  image.alt = photo.alt;
  image.sizes = photo.height > photo.width ? `min(100vw, ${Math.round(100*photo.width/photo.height)}dvh)` : '100vw';
  image.srcset = photoSources(name);
  image.src = `photos/${name}-${photoWidths(photo)[0]}.webp`;
  viewer.querySelector('#photo-position').textContent = `${photoIndex + 1} of ${activePhotos.length}`;
  viewer.querySelector('.viewer-caption').textContent = photo.alt;
}
document.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.hasAttribute('data-inquire')) {
    form.elements.type.value = button.dataset.inquire || '';
    form.querySelector('output').textContent = '';
    dialog.showModal();
    syncModalScroll();
  }
  if (button.dataset.photo) {
    activePhotos = button.dataset.selection === 'home' ? selectedPhotographs.map(photo=>photo.id) : project.photos;
    showPhoto(activePhotos.indexOf(button.dataset.photo));
    viewer.showModal();
    syncModalScroll();
  }
  if (button.dataset.photoStep) showPhoto(photoIndex + Number(button.dataset.photoStep));
  if (button.classList.contains('close')) button.closest('dialog').close();
});
viewer.addEventListener('keydown', event => {
  if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
  event.preventDefault();
  showPhoto(photoIndex + (event.key === 'ArrowRight' ? 1 : -1));
});
let swipeStart;
const stage = viewer.querySelector('.viewer-stage');
stage.addEventListener('pointerdown', event => {
  if (!event.isPrimary) return;
  swipeStart = { x: event.clientX, y: event.clientY };
  stage.setPointerCapture(event.pointerId);
});
stage.addEventListener('pointerup', event => {
  if (!swipeStart) return;
  const dx = event.clientX - swipeStart.x;
  const dy = event.clientY - swipeStart.y;
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) showPhoto(photoIndex + (dx < 0 ? 1 : -1));
  swipeStart = null;
});
stage.addEventListener('pointercancel', () => { swipeStart = null; });
form.addEventListener('submit', async event => {
  event.preventDefault();
  const submit = form.querySelector('[type=submit]');
  const status = form.querySelector('output');
  submit.disabled = true;
  status.textContent = 'Sending…';

  try {
    const response = await fetch(isLocalPreview ? '/inquiries' : '/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });
    if (!response.ok) throw Error();
    form.reset();
    status.textContent = isLocalPreview ? 'Inquiry saved on this Mac.' : 'Thanks. Your inquiry was sent.';
  } catch {
    status.textContent = 'Your inquiry could not be sent. Please try again.';
  } finally {
    submit.disabled = false;
  }
});
const logo = document.querySelector('.brand img');

function paintLogo() {
  const buffer = document.createElement('canvas');
  buffer.width = logo.naturalWidth;
  buffer.height = logo.naturalHeight;
  const context = buffer.getContext('2d');
  context.drawImage(logo, 0, 0);
  const pixels = context.getImageData(0, 0, buffer.width, buffer.height);
  let left = buffer.width, right = 0, top = buffer.height, bottom = 0;

  for (let y = 0; y < buffer.height; y++) {
    for (let x = 0; x < buffer.width; x++) {
      const i = (y * buffer.width + x) * 4;
      if (pixels.data[i + 3] > 64) {
        left = Math.min(left, x);
        right = Math.max(right, x);
        top = Math.min(top, y);
        bottom = Math.max(bottom, y);
      }
      pixels.data[i] = pixels.data[i + 1] = pixels.data[i + 2] = 244;
    }
  }

  context.putImageData(pixels, 0, 0);
  const width = right - left + 1;
  const height = bottom - top + 1;
  for (const canvas of document.querySelectorAll('.brand canvas, .footer-brand canvas')) {
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(buffer, left, top, width, height, 0, 0, width, height);
  }
}

if (logo.complete && logo.naturalWidth) paintLogo();
else logo.addEventListener('load', paintLogo, { once: true });
