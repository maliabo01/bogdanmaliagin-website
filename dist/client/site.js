const projects=[
 {slug:'high-ground',title:'High Ground',kind:'Mountains & people',cover:'hero',photos:['hero','climb','peaks','twilight','rainbow','people']},
 {slug:'dirt-roads',title:'Dirt Roads',kind:'Riders & overland',cover:'ride',photos:['ride','road','tracks','motorcycle']},
 {slug:'by-the-water',title:'By the Water',kind:'Coasts & travel',cover:'coastal',photos:['coastal','bridge','sail','harbor','skyline']}
];
const titles={hero:'A lone figure above the turquoise fjord',climb:'A climber on a rock face',peaks:'Star-filled sky above the peaks',twilight:'Mountain ridgeline at twilight',rainbow:'A rainbow above the mountains',people:'A bride on a rocky overlook',ride:'Off-road rider in the woods',road:'A 4×4 below a sunset sky',tracks:'A dusty trail behind a 4×4',motorcycle:'Motorcyclist at dusk',coastal:'Ferry passengers silhouetted in golden light',bridge:'A bridge along the coast',sail:'A sailboat seen from above',harbor:'Harbor-side buildings',skyline:'A figure looking across the city skyline'};
const page=document.body.dataset.page;
const main=document.querySelector('main');
const pic=(name,lazy=true)=>`<img src="photos/${name}.jpg" alt="${titles[name]}" ${lazy?'loading="lazy"':''}>`;
const cards=()=>`<div class="grid">${projects.map(p=>`<a class="card" href="projects.html?collection=${p.slug}">${pic(p.cover)}<h3>${p.title}</h3><span class="meta">${p.kind}</span></a>`).join('')}</div>`;
const nav=document.querySelector('nav');
nav.querySelector('[data-nav="'+page+'"]')?.setAttribute('aria-current','page');
if (page === 'home') {
  const featured = projects.map(project => `
    <a class="card" href="projects.html?collection=${project.slug}">
      ${pic(project.slug === 'high-ground' ? 'climb' : project.cover)}
      <h3>${project.title}</h3>
      <span class="meta">${project.kind}</span>
    </a>
  `).join('');

  main.innerHTML = `
    <section class="hero" aria-labelledby="home-title">
      <figure class="opening-photo">
        <a href="projects.html?collection=high-ground">
          <img src="photos/hero.jpg" width="1200" height="800" fetchpriority="high" alt="${titles.hero}">
        </a>
        <figcaption>High Ground</figcaption>
      </figure>
      <div class="opening-copy">
        <h1 id="home-title">Adventure<br>photography</h1>
        <div>
          <p class="intro">People and landscapes, photographed in the field. Available throughout Finland and internationally.</p>
          <a class="textbtn" href="projects.html">Explore projects</a>
        </div>
      </div>
    </section>
    <section class="section">
      <h2>Selected projects</h2>
      <div class="grid opening-projects">${featured}</div>
    </section>
  `;
}
const project=projects.find(p=>p.slug===new URLSearchParams(location.search).get('collection'));
if(page==='projects' && project){document.title=project.title+' | Bogdan Maliagin';main.innerHTML=`<div class="head"><a class="textbtn" href="projects.html">All projects</a><h1>${project.title}</h1><p class="intro">${project.kind}</p></div><section class="section gallery">${project.photos.map(n=>`<button data-photo="${n}" title="Enlarge photograph">${pic(n)}</button>`).join('')}</section>`;}
else if(page==='projects')main.innerHTML=`<div class="head"><div class="label">Bogdan Maliagin</div><h1>Projects</h1></div><section class="section">${cards()}</section>`;
if(page==='pricing') main.innerHTML=`<div class="head"><div class="label">Working together</div><h1>Pricing</h1><p class="intro">Tell me where the shoot will take place, what you have in mind, and how you plan to use the photographs so I can quote for your project.</p></div>${[['Personal sessions','Outdoor portraits for individuals, couples, and riders.'],['Outdoor & travel stories','Location photography for destinations, guides, and tourism operators.'],['Brand assignments','Campaign photography for outdoor, adventure, and motorsport brands.']].map(([title,desc])=>`<div class="price"><div><h2>${title}</h2><p>${desc}</p></div><button class="textbtn" data-inquire="${title}">Request a quote</button></div>`).join('')}`;
// The local preview stores test inquiries on this Mac. Hosted sites use the portfolio form.
if (!['localhost', '127.0.0.1', '[::1]'].includes(location.hostname)) {
  for (const button of document.querySelectorAll('button[data-inquire]')) {
    const link = document.createElement('a');
    link.href = 'https://portfolio.bogdanmaliagin.com/contact';
    link.className = button.className;
    link.textContent = button.textContent;
    button.replaceWith(link);
  }
}
const dialog=document.querySelector('#inquiry'), viewer=document.querySelector('#viewer'), form=dialog.querySelector('form');
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.hasAttribute('data-inquire')){form.elements.type.value=b.dataset.inquire||'';form.querySelector('output').textContent='';dialog.showModal()}if(b.dataset.photo){const i=viewer.querySelector('img');i.src='photos/'+b.dataset.photo+'.jpg';i.alt=titles[b.dataset.photo];viewer.showModal()}if(b.classList.contains('close'))b.closest('dialog').close()});
form.addEventListener('submit',async e=>{e.preventDefault();const submit=form.querySelector('[type=submit]'),out=form.querySelector('output');submit.disabled=true;try{const r=await fetch('/inquiries',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(form)))});if(!r.ok)throw Error();form.reset();out.textContent='Inquiry saved on this Mac.'}catch{out.textContent='Your inquiry could not be saved. Please try again.'}finally{submit.disabled=false}});
const logo=document.querySelector('.brand img');
function paintLogo(){const canvas=document.querySelector('.brand canvas'),ctx=canvas.getContext('2d'),buffer=document.createElement('canvas');buffer.width=logo.naturalWidth;buffer.height=logo.naturalHeight;const c=buffer.getContext('2d');c.drawImage(logo,0,0);const pixels=c.getImageData(0,0,buffer.width,buffer.height);let left=buffer.width,right=0,top=buffer.height,bottom=0;for(let y=0;y<buffer.height;y++){for(let x=0;x<buffer.width;x++){let i=(y*buffer.width+x)*4;if(pixels.data[i+3]>64){left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y)}pixels.data[i]=pixels.data[i+1]=pixels.data[i+2]=244}}c.putImageData(pixels,0,0);canvas.width=right-left+1;canvas.height=bottom-top+1;ctx.drawImage(buffer,left,top,canvas.width,canvas.height,0,0,canvas.width,canvas.height)}if(logo.complete&&logo.naturalWidth)paintLogo();else logo.onload=paintLogo;
