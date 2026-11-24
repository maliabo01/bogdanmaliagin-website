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
const projects=[
 {slug:'high-ground',title:'High Ground',kind:'Mountains & people',cover:'hero',photos:['hero','climb','peaks','twilight','rainbow','people']},
 {slug:'dirt-roads',title:'Dirt Roads',kind:'Riders & overland',cover:'ride',photos:['ride','road','tracks','motorcycle']},
 {slug:'by-the-water',title:'By the Water',kind:'Coasts & travel',cover:'coastal',photos:['coastal','bridge','sail','harbor','skyline']},
 {slug:'ktm-shoot',title:'KTM shoot',kind:'Motorcycle photography',cover:'ktm-DSC04224',photos:Object.keys(ktmPhotoTitles),showOnHome:false}
];
const titles={hero:'A lone figure above the turquoise fjord',climb:'A climber on a rock face',peaks:'Star-filled sky above the peaks',twilight:'Mountain ridgeline at twilight',rainbow:'A rainbow above the mountains',people:'A bride on a rocky overlook',ride:'Off-road rider in the woods',road:'A 4×4 below a sunset sky',tracks:'A dusty trail behind a 4×4',motorcycle:'Motorcyclist at dusk',coastal:'Ferry passengers silhouetted in golden light',bridge:'A bridge along the coast',sail:'A sailboat seen from above',harbor:'Harbor-side buildings',skyline:'A figure looking across the city skyline'};
const page=document.body.dataset.page;
const main=document.querySelector('main');
Object.assign(titles, ktmPhotoTitles);
const previewSource = name => `photos/${name}${Object.hasOwn(ktmPhotoTitles, name) ? '-preview' : ''}.jpg`;
const pic=(name,lazy=true)=>`<img src="${previewSource(name)}" alt="${titles[name]}" ${lazy?'loading="lazy"':''}>`;
const cards=()=>`<div class="grid">${projects.map(p=>`<a class="card" href="projects.html?collection=${p.slug}">${pic(p.cover)}<h3>${p.title}</h3><span class="meta">${p.kind}</span></a>`).join('')}</div>`;

function photoMarquee() {
  const rows = [
    [['carousel-greece', 16, 9, 'A road above the Greek coastline at sunset'],
     ['people', 2, 3], ['ktm-DSC03947', 16, 9], ['bridge', 3, 2],
     ['climb', 9, 16], ['road', 3, 2], ['ktm-DSC04254', 9, 16],
     ['harbor', 3, 2], ['ktm-DSC04396', 16, 9]],
    [['ktm-DSC04224', 16, 9], ['carousel-model', 9, 16, 'A woman in a floral dress in a lane by the sea'],
     ['hero', 3, 2], ['ktm-DSC04086', 9, 16], ['sail', 3, 2],
     ['twilight', 16, 9], ['ride', 9, 16], ['ktm-DSC04123', 16, 9], ['skyline', 3, 2]],
    [['peaks', 16, 9], ['couple', 9, 16, 'A portrait of a couple'],
     ['ktm-DSC04300', 16, 9], ['coastal', 16, 9], ['motorcycle', 1, 1],
     ['rainbow', 3, 2], ['ktm-DSC04250', 9, 16], ['tracks', 16, 9], ['ktm-DSC03946', 16, 9]]
  ];

  return `<div class="photo-marquee" aria-label="Portfolio photographs" role="region">
    <div class="photo-marquee-controls">
      <button class="photo-marquee-toggle" type="button">Pause motion</button>
    </div>
    ${rows.map((row, index) => {
      const frames = row.map(([name, width, height, caption]) => {
        return `<li class="photo-frame"><img src="${previewSource(name)}" alt="${caption ?? titles[name]}"
          style="aspect-ratio:${width}/${height}" loading="lazy" decoding="async"></li>`;
      }).join('');
      return `<div class="photo-marquee-row" role="group" aria-label="Photo row ${index + 1}"><div class="photo-marquee-track">
        <ul class="photo-marquee-strip" role="list">${frames}</ul>
        <ul class="photo-marquee-strip" aria-hidden="true">${frames}</ul>
      </div></div>`;
    }).join('')}
  </div>`;
}

const nav=document.querySelector('nav');
nav.querySelector('[data-nav="'+page+'"]')?.setAttribute('aria-current','page');
if (page === 'home') {
  // Keep the two type treatments accessible through shareable preview URLs.
  if (new URLSearchParams(location.search).get('intro-font') === 'sans') {
    main.classList.add('intro-font-sans');
  }
  const featured = projects[0];
  const projectUrl = `projects.html?collection=${featured.slug}`;

  main.innerHTML = `
    <section class="hero" aria-labelledby="home-title">
      <figure class="opening-photo">
        <img src="photos/mountain-1440.jpg"
             srcset="photos/mountain-768.jpg 768w, photos/mountain-1440.jpg 1440w,
                     photos/mountain-2400.jpg 2400w, photos/mountain-3200.jpg 3200w"
             sizes="max(100vw, 178dvh)"
             width="2400" height="1350" fetchpriority="high"
             alt="A rugged mountain ridge beneath a sky full of stars">
      </figure>
      <h1 id="home-title">Adventure photography</h1>
    </section>
    <div class="home-content">
      <section id="photo-sequence" class="photo-essay" aria-label="Selected photographs">
        <div class="essay-opening">
          <div class="opening-copy">
            <p class="intro">People and landscapes, photographed in the field. Available throughout Finland and internationally.</p>
          </div>
          <figure class="essay-climber">
            <a href="${projectUrl}">
              <img src="photos/climber-feature.jpg"
                   srcset="photos/climber-feature.jpg 900w, photos/climber-feature-1440.jpg 1440w"
                   sizes="(max-width: 640px) min(78vw, 360px), 420px"
                   width="900" height="1599" loading="lazy"
                   alt="A climber in a blue jacket on a rock face against snowy peaks">
              <span>Jegihorn, 2024</span>
            </a>
          </figure>
        </div>
        ${photoMarquee()}
        <div class="essay-action">
          <a class="project-cta" href="projects.html"><span>Explore projects</span></a>
        </div>
      </section>
      <section class="section">
        <h2>More projects</h2>
        <div class="grid opening-projects">
          ${projects.slice(1).filter(project => project.showOnHome !== false).map(project => `
            <a class="card" href="projects.html?collection=${project.slug}">
              ${pic(project.cover)}
              <h3>${project.title}</h3>
              <span class="meta">${project.kind}</span>
            </a>
          `).join('')}
        </div>
      </section>
    </div>
  `;

  const marquee = main.querySelector('.photo-marquee');
  const motionToggle = marquee.querySelector('.photo-marquee-toggle');
  motionToggle.addEventListener('click', () => {
    const paused = marquee.toggleAttribute('data-paused');
    motionToggle.textContent = paused ? 'Resume motion' : 'Pause motion';
  });

  if ('IntersectionObserver' in window) {
    marquee.setAttribute('data-offscreen', '');
    const observer = new IntersectionObserver(([entry]) => {
      marquee.toggleAttribute('data-offscreen', !entry.isIntersecting);
    });
    observer.observe(marquee);
  }

  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
  const updateScrollFocus = () => {
    marquee.querySelectorAll('.photo-marquee-row').forEach(row => {
      if (motionPreference.matches) row.setAttribute('tabindex', '0');
      else row.removeAttribute('tabindex');
    });
  };
  updateScrollFocus();
  motionPreference.addEventListener('change', updateScrollFocus);
}
const project=projects.find(p=>p.slug===new URLSearchParams(location.search).get('collection'));
if(page==='projects' && project){document.title=project.title+' | Bogdan Maliagin';main.innerHTML=`<div class="head"><a class="textbtn" href="projects.html">All projects</a><h1>${project.title}</h1><p class="intro">${project.kind}</p></div><section class="section gallery">${project.photos.map(n=>`<button data-photo="${n}" title="Enlarge photograph">${pic(n)}</button>`).join('')}</section>`;}
else if(page==='projects')main.innerHTML=`<div class="head"><div class="label">Bogdan Maliagin</div><h1>Projects</h1></div><section class="section">${cards()}</section>`;
if(page==='pricing') main.innerHTML=`<div class="head"><div class="label">Working together</div><h1>Pricing</h1><p class="intro">Tell me where the shoot will take place, what you have in mind, and how you plan to use the photographs so I can quote for your project.</p></div>${[['Personal sessions','Outdoor portraits for individuals, couples, and riders.'],['Outdoor & travel stories','Location photography for destinations, guides, and tourism operators.'],['Brand assignments','Campaign photography for outdoor, adventure, and motorsport brands.']].map(([title,desc])=>`<div class="price"><div><h2>${title}</h2><p>${desc}</p></div><button type="button" class="project-cta" data-inquire="${title}"><span>Request a quote</span></button></div>`).join('')}`;
// The local preview stores test inquiries on this Mac. Hosted sites use the portfolio form.
if (!['localhost', '127.0.0.1', '[::1]'].includes(location.hostname)) {
  for (const button of document.querySelectorAll('button[data-inquire]')) {
    const link = document.createElement('a');
    link.href = 'https://portfolio.bogdanmaliagin.com/contact';
    link.className = button.className;
    link.append(...button.childNodes);
    button.replaceWith(link);
  }
}
const dialog=document.querySelector('#inquiry'), viewer=document.querySelector('#viewer'), form=dialog.querySelector('form');
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.hasAttribute('data-inquire')){form.elements.type.value=b.dataset.inquire||'';form.querySelector('output').textContent='';dialog.showModal()}if(b.dataset.photo){const i=viewer.querySelector('img');i.src='photos/'+b.dataset.photo+'.jpg';i.alt=titles[b.dataset.photo];viewer.showModal()}if(b.classList.contains('close'))b.closest('dialog').close()});
form.addEventListener('submit',async e=>{e.preventDefault();const submit=form.querySelector('[type=submit]'),out=form.querySelector('output');submit.disabled=true;try{const r=await fetch('/inquiries',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(form)))});if(!r.ok)throw Error();form.reset();out.textContent='Inquiry saved on this Mac.'}catch{out.textContent='Your inquiry could not be saved. Please try again.'}finally{submit.disabled=false}});
const logo=document.querySelector('.brand img');
function paintLogo(){const canvas=document.querySelector('.brand canvas'),ctx=canvas.getContext('2d'),buffer=document.createElement('canvas');buffer.width=logo.naturalWidth;buffer.height=logo.naturalHeight;const c=buffer.getContext('2d');c.drawImage(logo,0,0);const pixels=c.getImageData(0,0,buffer.width,buffer.height);let left=buffer.width,right=0,top=buffer.height,bottom=0;for(let y=0;y<buffer.height;y++){for(let x=0;x<buffer.width;x++){let i=(y*buffer.width+x)*4;if(pixels.data[i+3]>64){left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y)}pixels.data[i]=pixels.data[i+1]=pixels.data[i+2]=244}}c.putImageData(pixels,0,0);canvas.width=right-left+1;canvas.height=bottom-top+1;ctx.drawImage(buffer,left,top,canvas.width,canvas.height,0,0,canvas.width,canvas.height)}if(logo.complete&&logo.naturalWidth)paintLogo();else logo.onload=paintLogo;
