(() => {
  const desktopStyles = document.getElementById('desktop-styles');
  const mobileStyles = document.getElementById('mobile-styles');
  const desktopLayout = document.getElementById('desktop-layout');
  const desktop = window.matchMedia(desktopStyles.media);
  const isDesktop = desktop.matches;

  // Keep the active stylesheet in place until the page can switch layouts.
  desktopStyles.media = isDesktop ? 'all' : 'not all';
  mobileStyles.media = isDesktop ? 'not all' : 'all';

  if (isDesktop) {
    document.title = desktopLayout.dataset.title;
    document.body.replaceChildren(desktopLayout.content);
  } else {
    const sharedLayout = desktopLayout.content;
    const footer = sharedLayout.querySelector('footer');
    const footerAction = footer.querySelector('.project-cta');
    if (footerAction) footer.append(footerAction);
    document.querySelector('footer').replaceWith(footer);
    document.querySelector('#viewer').before(sharedLayout.querySelector('#inquiry'));
    desktopLayout.remove();
  }

  const script = document.createElement('script');
  script.src = isDesktop ? 'desktop.js' : 'site.js';
  document.body.append(script);

  // Let a visitor finish with the open dialog before switching layouts.
  function updateLayout() {
    if (desktop.matches !== isDesktop && !document.querySelector('dialog[open]')) {
      window.location.reload();
    }
  }

  desktop.addEventListener('change', updateLayout);
  document.addEventListener('close', updateLayout, true);
})();
