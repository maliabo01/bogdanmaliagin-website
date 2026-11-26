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
  {id:'porsche-purple',width:600,height:1066,alt:'Front view of a purple Porsche',portfolioAsset:'fc4bf1db-5d14-41f7-a825-36a3829bb9b8_rw_600.jpg?h=a82282dd1fc1b935cb96ce37437c7688'},
  {id:'porsche-under-bridge',width:600,height:900,alt:'A Porsche parked on a city street beneath a bridge',portfolioAsset:'18de602c-d5d1-40f8-9ef6-2bffcedc44ee_rw_600.jpg?h=6c33ed56e5ea10479f38c8f1c63de4b5'},
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
photoLibrary.rainbow = {id:'rainbow',width:1200,height:800,alt:'A rainbow crossing sunlit mountain slopes beneath dark clouds'};
for (const [id, alt] of Object.entries(ktmPhotoTitles)) {
  photoLibrary[id] = {id, alt, width:640, height:portraitPhotos.has(id) ? 1138 : 360, widths:[640,1280,1920]};
}
const ktmProject = {
  slug: 'ktm-shoot',
  title: 'KTM shoot',
  kind: 'Motorcycle photography',
  cover: 'ktm-DSC04224',
  frames: [
    {layout: 'wide', photos: ['ktm-DSC04224']},
    {layout: 'pair', photos: ['ktm-DSC03946', 'ktm-DSC03947']},
    {layout: 'portrait-first', photos: ['ktm-DSC04086', 'ktm-DSC04123']},
    {layout: 'solo', photos: ['ktm-DSC04254']},
    {layout: 'portrait-last', photos: ['ktm-DSC04300', 'ktm-DSC04250']},
    {layout: 'wide', photos: ['ktm-DSC04396']}
  ]
};
ktmProject.photos = ktmProject.frames.flatMap(frame => frame.photos);

const projects = [
  ktmProject,
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
const photoWidths = photo => (photo.portfolioAsset ? [photo.width] : photo.widths) || [...new Set([Math.min(480,photo.width),Math.min(960,photo.width),photo.width])];
const portfolioCdn = 'https://cdn.myportfolio.com/275451db-8226-4a72-a144-2fb75a46ba93';
const photoSource = (photo, width = photoWidths(photo)[0]) => photo.portfolioAsset
  ? `${portfolioCdn}/${photo.portfolioAsset}`
  : `photos/${photo.id}-${width}.webp`;
const photoSources = photo => photoWidths(photo)
  .map(width => `${photoSource(photo,width)} ${width}w`).join(', ');
const pic = (name, sizes = 'calc(100vw - 40px)', eager = false) => {
  const photo=photoLibrary[name];
  return `<img src="${photoSource(photo)}" srcset="${photoSources(photo)}"
    sizes="${sizes}" width="${photo.width}" height="${photo.height}" alt="${photo.alt}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
};
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
menuDrawer.insertAdjacentHTML('beforeend', '<button type="button" class="btn drawer-contact" data-inquire>Contact</button><a class="text-link drawer-whatsapp" href="https://wa.me/358440325505" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>');
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
const essayPhotographs = [
  {asset:'6fdab0d7-c331-4b70-b5ea-ec45875282c0_rw_1200.jpg?h=e4630edf175593d15c81da164af9b9e8', ratio:1778, alt:'A motorcyclist among the trees'},
  {asset:'6fdb4aaf-ee8e-49a2-a3db-ce0da0a76db6_rw_1200.jpg?h=a2ed47da2c39678142fbeffc4e71dc2a', ratio:1778, alt:'A coastal rock formation in evening light'},
  {asset:'dea3028e-69c7-4a9e-a149-a9252c0bd053_rw_600.jpg?h=eb8a8a346e9f32d5e7f2b4fcc2157570', ratio:563, alt:'A drink being prepared at a bar'},
  {asset:'01c3da5e-5a51-44fb-a488-57a3f8252f34_rw_1200.jpg?h=027ced196ff586944157b988e818765f', ratio:1779, alt:'A flag silhouetted against an orange sunset'},
  {asset:'e1b60733-f32b-4860-858b-169e077065af_rw_1200.jpg?h=883988b4fa82ca94260ecccab300aa80', ratio:1778, alt:'A rocky mountain valley beneath a twilight sky'},
  {asset:'74213495-e5b5-4044-aaa3-e0864b49d6d0_rw_600.jpg?h=387b04257f784efc8a2899d750403e05', ratio:800, alt:'A rocky coastline seen from above at sunset'},
  {asset:'bca2cdb8-23bd-4cbc-bb2d-6f0d9c1ad493_rw_600.jpg?h=228b487d71ebe36a9925f32f5b5f7426', ratio:1000, alt:'Sunlight falling through a dense forest'},
  {asset:'2d1706f8-4a05-4210-bda2-83fc2b8eb67f_rw_1200.jpg?h=ed80a5b587a129bcb88e3f04154483e4', ratio:1501, alt:'A sheep standing on a rocky hillside'},
  {asset:'e8e70973-c27d-4243-9965-e5c1f3d08ce7_rw_1200.jpg?h=35149be9e25539ce61693253daed9b70', ratio:1778, alt:'The Milky Way framed by trees'}
];

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
        <h1 id="home-title">Adventure photography</h1>
        <p class="hero-summary">Outdoor portraits, travel stories<br>and photography for adventure brands.</p>
      </div>
    </section>
    <div class="home-content">
      <section id="photo-sequence" class="photo-essay" aria-labelledby="photo-sequence-title">
        <div class="essay-opening">
          <div class="opening-copy">
            <h2 id="photo-sequence-title" class="visually-hidden">Selected photographs</h2>
            <p>People and landscapes, photographed in the field. Available throughout Finland and internationally.</p>
          </div>
          <figure class="essay-climber">
            <img src="photos/climber-feature-640.webp"
                 srcset="photos/climber-feature-640.webp 640w, photos/climber-feature-1280.webp 1280w"
                 sizes="min(72vw, 420px)" width="900" height="1599" loading="lazy" decoding="async"
                 alt="A climber in a blue jacket on a rock face against snowy peaks">
            <figcaption>Jegihorn, 2024</figcaption>
          </figure>
        </div>
        <ul class="essay-strip" aria-label="Portfolio photographs" tabindex="0">
          ${essayPhotographs.map(({asset, ratio, alt}) => `
            <li style="--photo-ratio: ${ratio / 1000}">
              <img src="${portfolioCdn}/${asset}" alt="${alt}" loading="lazy" decoding="async">
            </li>`).join('')}
        </ul>
        <div class="essay-action">
          <a class="project-cta" href="projects.html"><span>Explore projects</span></a>
          <button type="button" class="project-cta" data-inquire><span>Inquire about a shoot</span></button>
        </div>
      </section>
      <section id="selected-work" class="selected-work" aria-labelledby="selected-title">
        <div class="section-heading"><h2 id="selected-title">A sense of being there.</h2><p>People, landscapes and life outdoors.<br>A selection of photographs by Bogdan Maliagin.</p></div>
        <div class="selected-grid">${selectedPhotographs.map(photo => `<figure><button type="button" data-photo="${photo.id}" data-selection="home" aria-label="Enlarge: ${photo.alt}">${pic(photo.id,'(max-width: 640px) calc((100vw - 44px) / 2), (max-width: 1000px) 44vw, 29vw')}</button></figure>`).join('')}</div>
        <a class="text-link" href="projects.html">Explore the collections</a>
      </section>
      <section class="home-services" aria-labelledby="services-title">
        <div class="home-services-intro">
          <h2 id="services-title">Make something<br>out there.</h2>
          <p>Portraits, travel stories and brand assignments. Start with an idea; we’ll work through the details.</p>
        </div>
        <div>
          <div class="service-summary">
            ${services.map(service => `<article><h3>${service.title}</h3><p>${service.description}</p></article>`).join('')}
          </div>
          <div class="home-services-action">
            <button type="button" class="project-cta" data-inquire><span>Plan the shoot</span></button>
          </div>
        </div>
      </section>
    </div>`;
}

const project = projects.find(entry => entry.slug === new URLSearchParams(location.search).get('collection'));
if (page === 'projects' && project) {
  document.title = `${project.title} | Bogdan Maliagin`;
  const frames = project.frames ?? project.photos.map(name => ({layout: 'wide', photos: [name]}));
  main.innerHTML = `
    <header class="projects-heading">
      <a class="text-link" href="projects.html">All projects</a>
      <h1>${project.title}</h1>
      <p>${project.kind}</p>
      ${project.description ? `<p class="project-description">${project.description}</p>` : ''}
    </header>
    <section class="project-sequence" aria-label="${project.title} photographs">
      ${frames.map(({layout, photos}, index) => `
        <div class="project-frames project-frames--${layout}">
          ${photos.map(name => `
            <button type="button" class="project-frame" data-photo="${name}"
              aria-label="Enlarge photograph: ${photoLibrary[name].alt}">
              ${pic(name, photos.length === 1 ? 'calc(100vw - 40px)' : '46vw', index === 0)}
            </button>
          `).join('')}
        </div>
      `).join('')}
    </section>`;
} else if (page === 'projects') {
  main.innerHTML = `
    <header class="projects-heading"><h1>Projects</h1></header>
    <div class="project-features">
      <article>
        <a class="project-feature" href="projects.html?collection=${ktmProject.slug}" aria-label="View project: ${ktmProject.title}">
          ${pic(ktmProject.cover, 'calc(100vw - 40px)', true)}
          <div class="project-feature-caption">
            <div><h2>${ktmProject.title}</h2><p>${ktmProject.kind}</p></div>
            <span>View project</span>
          </div>
        </a>
      </article>
    </div>`;
}

if (page === 'pricing') {
  main.innerHTML = `
    <header class="services-heading">
      <h1>Let’s make<br>something together.</h1>
      <p class="intro">Personal sessions, travel stories and brand photography. Each shoot is quoted around the location, the scope and how the photographs will be used.</p>
    </header>
    <section class="services-list" aria-label="Photography services">
      ${services.map(service => `
        <article class="price">
          <div><h2>${service.title}</h2><p>${service.description}</p></div>
          <button type="button" class="project-cta" data-inquire="${service.title}"><span>Plan a shoot</span></button>
        </article>
      `).join('')}
    </section>
    <section class="services-section" aria-labelledby="booking-title">
      <h2 id="booking-title">From an idea to a shoot.</h2>
      <ol class="booking-steps">
        <li><h3>Share your idea</h3><p>Tell me what you have in mind, your preferred location and dates, and how you plan to use the photographs.</p></li>
        <li><h3>Agree on the details</h3><p>We’ll discuss the scope and quote, including the shoot, image delivery and usage, before making plans.</p></li>
        <li><h3>Make the photographs</h3><p>With the brief in place, we can focus on the people, the setting and the moments worth photographing.</p></li>
      </ol>
    </section>
    <section class="services-section" aria-labelledby="quote-title">
      <h2 id="quote-title">What goes into a quote?</h2>
      <p>The location and travel involved, time on the shoot, the photographs you need and their intended use. Include what you know in your inquiry—we can work through the rest together.</p>
      <p>Delivery timing and usage are agreed for your project before the shoot.</p>
    </section>
    <section class="services-section" aria-labelledby="inquiry-heading">
      <h2 id="inquiry-heading">Let’s plan your next shoot.</h2>
      <p>Tell me about the person, place or story you have in mind.</p>
      <div class="services-actions">
        <button type="button" class="project-cta" data-inquire><span>Plan a shoot</span></button>
        <a class="text-link" href="https://wa.me/358440325505" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
        <a class="text-link" href="mailto:bogdan.maliagin@gmail.com">bogdan.maliagin@gmail.com</a>
      </div>
    </section>`;
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
  image.srcset = photoSources(photo);
  image.src = photoSource(photo);
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
