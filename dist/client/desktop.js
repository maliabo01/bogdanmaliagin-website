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
const projects = [
  {slug:'ktm-shoot',title:'KTM shoot',kind:'Motorcycle photography',cover:'ktm-DSC04224',photos:Object.keys(ktmPhotoTitles)}
];
const page = document.body.dataset.page;
const main = document.querySelector('main');
const pic = name => `<img src="photos/${name}-preview.jpg" alt="${ktmPhotoTitles[name]}" loading="lazy">`;
const cards = () => `<div class="grid">${projects.map(project => `
  <a class="card" href="projects.html?collection=${project.slug}">
    ${pic(project.cover)}
    <h3>${project.title}</h3>
    <span class="meta">${project.kind}</span>
  </a>
`).join('')}</div>`;

function photoMarquee() {
  // Adobe Portfolio's public grid supplies the asset IDs, variant hashes and proportions.
  const photographs = `
fc4bf1db-5d14-41f7-a825-36a3829bb9b8 a82282dd1fc1b935cb96ce37437c7688 563
6fdab0d7-c331-4b70-b5ea-ec45875282c0 e4630edf175593d15c81da164af9b9e8 1778
6db4a7c3-88fa-4d45-a347-de3ff4d650fb e03c84ce5ee8e3c025dc71f5a337152e 563
5a86c5e6-619b-4b61-ba86-55fc366f4d59 5a95e7d8e06e0e4bef62402b30bbbf6b 1779
82ebf0cf-6092-48eb-9714-42b1dcf55e95 9c6c91f5e951b2347230ca2ec1e0fd50 563
444ed196-d5ee-4745-948f-a75b43448039 9dc938005eed81a4e414256dbbf0e533 563
895f73d9-b7e0-4d67-81ce-ea54f7c960f3 a351ae8c7948baf96d2ce766873d8cc7 563
3c4e66c6-5ac1-4f6a-bb52-e49cb0868c68 8992e82a4c10bd6e729571f338a72d8c 563
6fdb4aaf-ee8e-49a2-a3db-ce0da0a76db6 a2ed47da2c39678142fbeffc4e71dc2a 1778
a79ec128-646f-411a-856a-d41e9e7122de abaa21cba5e2ccc059a3e982ca792c77 1000
0f60137e-5e33-4ef8-a657-b8ce6a1c6668 822e8a8663ce93f80973559fa9820c4a 1000
7ab483ff-d56d-42f9-8b60-92c7f7a7b3d3 6aeadeb4415695fae24579ca3092bd3b 563
dea3028e-69c7-4a9e-a149-a9252c0bd053 eb8a8a346e9f32d5e7f2b4fcc2157570 563
d2629e83-0aeb-4d94-9847-5680e7e674a6 0c5b8a5653b55e3fef6f30c690ac04c9 1778
3d453d05-4040-4bb6-9d22-fe7d97dd36cb 649b8dcad12aae0dbf11101dfd776718 563
01c3da5e-5a51-44fb-a488-57a3f8252f34 027ced196ff586944157b988e818765f 1779
afdbf49c-70c8-48d7-81b1-35ac1c031d0c 5e2d4f852453503cdefc8e711886dd09 563
101b3f21-7f31-41ec-8320-826ee88c8b65 e9db18c106a36eb4d40b3f66fa041cd9 1778
e1b60733-f32b-4860-858b-169e077065af 883988b4fa82ca94260ecccab300aa80 1778
0df46818-1f5d-456c-975c-96528b71bac4 f56e3b374903fa52425826714e6a8c1c 1778
8ae8cd97-8740-4f9e-9438-95bc321820f6 6e60922cad2e793dad1a254123213891 1500
a61756ca-5fcb-4c08-ba85-488f11afe3c5 8f47c87951fea8077783c8b370ac60cb 1501
74213495-e5b5-4044-aaa3-e0864b49d6d0 387b04257f784efc8a2899d750403e05 800
195de7ec-636c-40e9-bb26-34ea69702e2e c81ff26a1a5d5ea61ee31b5af3cb04f7 1501
5fda060d-13b9-48f6-80a6-8b5f576b6333 a953525bb3994bc91c8367fa8da53334 1501
dcfc5a99-bcc1-44c5-8c5b-9d5a9410e96d 94c02009c0703b31fe38e9d5775a8b8e 1501
6d26271c-405e-4214-8c81-26f55b344119 527cf1fb144c92b46bd815e16d0b8018 1501
82edce80-e940-47c9-8f58-841206b1e8a0 d47a90097c10ba2e60c0f80f0890e5b2 563
e73a5b66-264e-4ec8-9288-f542f08f02f7 bd26875a09f15aa7716400056b5f9edf 563
c6353f48-5ab8-4a99-ada4-8b3e660b618f d5b831a5d96d5194a361a6adc4e5006b 1778
e833d3dc-a597-4fcc-b9ff-5643e04a3e7f 4e81774d2dbd57a7464ef8c3d10e00e3 1000
a879a8c1-59ae-4614-831b-f9bb3749db84 ea7310778fe1b2c18af4723c3fb9bcad 563
2b0ed6fe-3a68-4cd7-8a43-391f8f7d77fa a7d22eef1d9aedb8f0cbece9d1711b37 1500
dbc6aab4-5600-4f8b-a1cc-97b0ee94121d 2ed311165989e489eecde8fc23358754 667
0e5f214a-2cab-44be-a66a-1ad3b6d0a40b d6924c914c3d9e46d5d4aa0540011ada 1500
17b15627-394a-4179-ada2-79931fb14b09 abc115903be953e20dcbbe89d55a655f 1500
18de602c-d5d1-40f8-9ef6-2bffcedc44ee 6c33ed56e5ea10479f38c8f1c63de4b5 667
bafcaf9b-d673-4c0b-844e-14d85ba5fb91 6c3f440c22d1a8209c4951507eced1ef 1500
bca2cdb8-23bd-4cbc-bb2d-6f0d9c1ad493 228b487d71ebe36a9925f32f5b5f7426 1000
c992b050-3d26-43f6-8d2c-b80452a3a9d5 7b50d008c4dd0fdcb82e86b3e629d246 1500
026eee43-d510-4239-898a-202121c27911 bcf5e6b5a4d89d1a6e8c00d0b9965791 1500
60e49606-d45a-4b7c-b3ed-c372ca0967b9 09859e6f4f439c131c6ac373651274d4 1500
98e706c4-2f6f-4150-a99a-b042450cf2de 86e229bd9a6eba7eb8098297437fb611 667
2d1706f8-4a05-4210-bda2-83fc2b8eb67f ed80a5b587a129bcb88e3f04154483e4 1501
9b9e2ad0-dfe7-45c6-a098-eb8507526bd2 bad73dc71ba8bc4952e510cdff149e20 1778
eda14f3d-9598-4040-ad26-371aabdcc890 7ff2fe8a3f63d0f7521190f70ced565b 563
bd191000-a9ab-4973-80ba-a19e0a15a99b 41ddd4ace40a19c49f5c1b3fe072aae1 1778
f1023785-5239-4387-8f38-87f1b8957361 c8e60a69afe3ca6b61996d0415a061b6 1778
76585886-f312-48b3-90e1-f76a7ec3f53c 2f1938b5603191364fffd49c286c8885 562
bbace15e-2e35-4592-b5bd-f0eadba6e81a 508b22846795879b707ace0ca90dc10c 563
e5492d81-ff95-4a62-9cec-3eb50fa62396 4c9bc77a10001f2e97143f20ba22a563 667
a446a320-4356-4c7f-9835-fc620a364b2b 8b7c3ea82c24a986c94ed467889a3486 1500
bf57d01c-ff30-4af1-a814-19c1ac4fb3f9 01bf461f5678afd7fa40f1359da4f9ca 667
d66fc9b7-8360-46fc-a83e-1d6e29f0b157 f69079797bbb3a9eb28326b7f04b6fa9 563
342c784d-51fd-4c7b-a9a5-b9e9a4b67996 4bd1898d74b62d857e9471c26291e6a7 667
c83a9dd9-46e4-4247-a857-0bfe4b21baa8 530233372a3c94804f048378edabf72f 1778
15c43437-f616-42dd-8987-e50a8dc352cf 877d6de32ba013c61c41674795d7eb2f 563
bee0f106-cbb8-4049-8e76-b8aefd33def7 7d9ef53a46a97f67fdc6a08d07fb4992 1778
387b19f6-c90c-46fd-b421-f32f812580bd 87eb33887a03f09a7c00af1207190fb2 1501
f55759ff-668d-4056-92cf-b4e9397f745c cc3e56863f9296c5bee5ca2f47d8f591 1501
cf7b1a89-247f-4a44-9a19-5b4b73705c69 66fea0c00cb94011759f3959901c38ee 1000
e8e70973-c27d-4243-9965-e5c1f3d08ce7 35149be9e25539ce61693253daed9b70 1778
b89bc269-a633-4f0e-813a-f5633bbbb6df b21661b50d5186be6cfe0f02af7f80c7 1000
5cfe7828-3c57-4faf-8602-92d631d8614a 7b03345fabc69e8123b776398e585800 1500
07b0a34f-9809-4f14-974b-c09383a7075e 9ef61db0be6ec96c9a63892e14adb6df 1778
656bacd9-a4ca-468a-b15c-b778e7cc59f1 2643aa14dd6b4c0b41bb736d4bf8b28b 1778
6cf537ad-c3bf-433d-a827-000cce33840c c813b8e1b7a75e8457491f611f5c36cf 1779
a8035699-267f-4e5c-8b5b-a346255a5971 ea227301ad5504ceab2370fa966c2358 1799
cea0ba1c-ae52-4736-9807-b493ff8fdc30 8cbddfa87cd76ba5fcd22429688b2d05 563
5db0d044-70db-42ce-92d9-07bdf99eb8ed 00d0d0a45377b833a0f69b59583ccbf2 563
25afb99c-7329-4114-9307-1935ea8f0a3f 39c81162db8feec5fd836a8d91f7852c 563
e3a7b21f-b72c-4e5f-b4c0-75e637457993 b0f19c911fb8fee3d5df68e85b5a55c5 1779
1690dc59-9b06-4b7f-8355-34bc65d1d37b f3bcfe4f49dad3e9dc998111343b7bf6 1778
  `.trim().split('\n');
  const rows = [0, 1, 2].map(index => photographs.filter((_, photoIndex) => photoIndex % 3 === index));
  const portfolioCdn = 'https://cdn.myportfolio.com/275451db-8226-4a72-a144-2fb75a46ba93';

  return `<div class="photo-marquee" id="portfolio-roll" aria-label="Portfolio photographs" role="region">
    ${rows.map((row, index) => {
      const frames = row.map(photo => {
        const [id, hash, ratio] = photo.split(' ');
        const width = Number(ratio) >= 1400 ? 1200 : 600;
        const source = `${portfolioCdn}/${id}_rw_${width}.jpg?h=${hash}`;
        return `<li class="photo-frame"><img data-src="${source}" alt="Portfolio photograph"
          style="aspect-ratio:${ratio}/1000" decoding="async"></li>`;
      }).join('');
      return `<div class="photo-marquee-row" role="group" aria-label="Photo row ${index + 1}"><div class="photo-marquee-track">
        <ul class="photo-marquee-strip" role="list">${frames}</ul>
        <ul class="photo-marquee-strip" aria-hidden="true">${frames}</ul>
      </div></div>`;
    }).join('')}
  </div>`;
}

function loadPhotoRow(row) {
  const track = row.querySelector('.photo-marquee-track');
  const [original, copy] = track.children;
  const copies = [...copy.querySelectorAll('img')];
  const rowBounds = row.getBoundingClientRect();

  original.querySelectorAll('img').forEach(async (image, index) => {
    const pair = [image, copies[index]];
    const nearViewport = pair.some(photo => {
      const bounds = photo.getBoundingClientRect();
      return bounds.right > rowBounds.left && bounds.left < rowBounds.right;
    });

    try {
      await Promise.all(pair.map(async photo => {
        photo.fetchPriority = nearViewport ? 'auto' : 'low';
        photo.src = photo.dataset.src;
        await photo.decode();
      }));
      pair.forEach(photo => photo.parentElement.setAttribute('data-loaded', ''));
    } catch {
      pair.forEach(photo => photo.parentElement.remove());
    }
  });
}

const nav=document.querySelector('nav');
nav.querySelector('[data-nav="'+page+'"]')?.setAttribute('aria-current','page');
if (page === 'home') {
  // Keep the two type treatments accessible through shareable preview URLs.
  if (new URLSearchParams(location.search).get('intro-font') === 'sans') {
    main.classList.add('intro-font-sans');
  }
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
            <img src="photos/climber-feature.jpg"
                 srcset="photos/climber-feature.jpg 900w, photos/climber-feature-1440.jpg 1440w"
                 sizes="(max-width: 640px) min(78vw, 360px), 420px"
                 width="900" height="1599" loading="lazy"
                 alt="A climber in a blue jacket on a rock face against snowy peaks">
            <figcaption>Jegihorn, 2024</figcaption>
          </figure>
        </div>
        ${photoMarquee()}
        <div class="essay-action">
          <a class="project-cta" href="projects.html"><span>Explore projects</span></a>
          <button type="button" class="project-cta" data-inquire><span>Inquire about a shoot</span></button>
        </div>
      </section>
    </div>
  `;

  const marquee = main.querySelector('.photo-marquee');
  const marqueeRows = marquee.querySelectorAll('.photo-marquee-row');
  const loadPhotos = () => marqueeRows.forEach(loadPhotoRow);

  if ('IntersectionObserver' in window) {
    const preloadObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      preloadObserver.disconnect();
      loadPhotos();
    }, { rootMargin: '800px 0px' });
    preloadObserver.observe(marquee);

    marquee.setAttribute('data-offscreen', '');
    const observer = new IntersectionObserver(([entry]) => {
      marquee.toggleAttribute('data-offscreen', !entry.isIntersecting);
    });
    observer.observe(marquee);
  } else loadPhotos();

  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
  const updateScrollFocus = () => {
    marqueeRows.forEach(row => {
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
const isLocalPreview = ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname);
const dialog=document.querySelector('#inquiry'), viewer=document.querySelector('#viewer'), form=dialog.querySelector('form');
dialog.querySelector('.note').hidden = !isLocalPreview;
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.hasAttribute('data-inquire')){form.elements.type.value=b.dataset.inquire||'';form.querySelector('output').textContent='';dialog.showModal()}if(b.dataset.photo){const i=viewer.querySelector('img');i.src='photos/'+b.dataset.photo+'.jpg';i.alt=ktmPhotoTitles[b.dataset.photo];viewer.showModal()}if(b.classList.contains('close'))b.closest('dialog').close()});
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
