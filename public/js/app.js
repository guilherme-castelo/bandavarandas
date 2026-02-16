document.addEventListener('DOMContentLoaded', () => {
  fetchData();
});

async function fetchData() {
  try {
    const response = await fetch('/api/db');
    const db = await response.json();
    initializeApp(db);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function initializeApp(db) {
  if (db.globals) applyGlobals(db.globals);
  if (db.menu) renderHeader(db.menu, db.globals);
  if (db.footer) renderFooter(db.footer, db.globals, db.menu);

  const path = window.location.pathname;

  // Page specific rendering
  if (path === '/' || path.endsWith('index.html')) {
    renderHero(db.hero);
    if (db.about) renderAbout(db.about);
    if (db.stats) renderCounters(db.stats);
    if (db.portfolio) renderPortfolioPage(db.portfolio); // Render on Index
    if (db.team) renderTeam(db.team);
  } else if (path.includes('portfolio.html')) {
    // Redirect legacy portfolio
    window.location.href = '/index.html#about';
  } else if (path.includes('about.html')) {
    window.location.href = '/index.html';
  } else if (path.includes('contact.html')) {
    renderContactPage(db.contactPage);
  }

  // Initialize Observers and Animations
  initObservers();
  initAccessibility();

  // Dispatch event to signal that content is ready for plugins (OwlCarousel, MixItUp, etc.)
  setTimeout(() => {
    window.dispatchEvent(new Event('app:ready'));
  }, 100);
}

function initObservers() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.portfolio__item, .hero__text, .section-title').forEach(el => {
    el.classList.add('fade-in-up');
    observer.observe(el);
  });
}

function initAccessibility() {
  const filters = document.querySelectorAll('.portfolio__filter li');
  filters.forEach(filter => {
    filter.setAttribute('role', 'button');
    filter.setAttribute('tabindex', '0');
    filter.setAttribute('aria-pressed', filter.classList.contains('active'));

    filter.addEventListener('click', () => {
      filters.forEach(f => f.setAttribute('aria-pressed', 'false'));
      filter.setAttribute('aria-pressed', 'true');
    });

    filter.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        filter.click();
      }
    });
  });
}

/* ================= RENDER FUNCTIONS ================= */

function applyGlobals(globals) {
  document.title = globals.title;
}

function renderHeader(menu, globals) {
  const headerNav = document.querySelector('.header__nav__menu ul');
  const headerSocial = document.querySelector('.header__nav__social');

  if (headerNav) {
    headerNav.innerHTML = menu.map(item =>
      `<li class="${window.location.pathname.endsWith(item.url) || (item.url === '/index.html' && window.location.pathname === '/') ? 'active' : ''}"><a href="${item.url}">${item.label}</a></li>`
    ).join('');
  }

  if (headerSocial && globals.socials) {
    headerSocial.innerHTML = globals.socials.map(social =>
      `<a href="${social.url}" target="_blank"><i class="${social.icon}"></i></a>`
    ).join('');
  }
}

function renderHero(heroData) {
  const heroSlider = document.querySelector('.hero__slider');
  if (!heroSlider || !heroData) return;

  const validSlides = Array.isArray(heroData) ? heroData : Object.values(heroData);

  heroSlider.innerHTML = validSlides.map(slide => `
        <div class="hero__item set-bg" data-setbg="${slide.image}" style="background-image: url('${slide.image}');">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="hero__text">
                            <span>${slide.subtitle}</span>
                            <h2>${slide.title}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function renderAbout(aboutData) {
  const aboutTitle = document.querySelector('.about__text .section-title');
  const aboutDesc = document.querySelector('.about__text__desc');
  const aboutServices = document.querySelector('.about__text .row');
  const aboutPic = document.querySelector('.about__pic .row');

  if (aboutTitle) {
    aboutTitle.innerHTML = `
            <span>${aboutData.subtitle}</span>
            <h2>${aboutData.title}</h2>
        `;
  }

  if (aboutDesc) {
    aboutDesc.innerHTML = `<p>${aboutData.description.replace(/\n/g, '<br>')}</p>`;
  }

  if (aboutServices && aboutData.highlights) {
    aboutServices.innerHTML = aboutData.highlights.map(item => `
            <div class="col-lg-6 col-md-6 col-sm-6">
                <a class="services__item" href="${item.link}" target="_blank">
                    <div class="services__item__icon">
                        <img src="${item.image}" alt="${item.title}">
                    </div>
                    <h4>${item.title}</h4>
                    <p style="font-size: 12px;">${item.description}</p>
                </a>
            </div>
        `).join('');
  }

  if (aboutPic && aboutData.images) {
    const imgs = aboutData.images;
    aboutPic.innerHTML = `
            <div class="col-lg-6 col-md-6 col-sm-6">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="about__pic__item set-bg" data-setbg="${imgs[0]}" style="background-image: url('${imgs[0]}');"></div>
                    </div>
                    <div class="col-lg-12">
                        <div class="about__pic__item set-bg" data-setbg="${imgs[1]}" style="background-image: url('${imgs[1]}');"></div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="about__pic__item set-bg" data-setbg="${imgs[2]}" style="background-image: url('${imgs[2]}');"></div>
                    </div>
                    <div class="col-lg-12">
                        <div class="about__pic__item set-bg" data-setbg="${imgs[3]}" style="background-image: url('${imgs[3]}');"></div>
                    </div>
                </div>
            </div>
         `;
  }
}

function renderCounters(stats) {
  const counterContainer = document.querySelector('.counter__content .row');
  if (!counterContainer || !stats) return;

  counterContainer.innerHTML = stats.map(stat => `
        <div class="col-lg-3 col-md-6 col-sm-6">
            <div class="counter__item">
                <div class="counter__item__text">
                    <img src="img/icons/ci-1.png" alt="" style="opacity:0.7">
                    <h2 class="counter_num">${stat.number}</h2>
                    <p>${stat.label}</p>
                </div>
            </div>
        </div>
    `).join('');
}

function renderTeam(teamData) {
  const teamContainer = document.querySelector('.team .row:nth-child(2)');
  if (!teamContainer || !teamData) return;

  teamContainer.innerHTML = teamData.map(member => `
        <div class="col-lg-3 col-md-6 col-sm-6 p-0">
            <div class="team__item set-bg" data-setbg="${member.image}" style="background-image: url('${member.image}');">
                <div class="team__item__text">
                    <h4>${member.name}</h4>
                    <p>${member.role}</p>
                    <div class="team__item__social">
                        ${member.socials && member.socials.map(s => `<a href="${s.url}"><i class="${s.icon}"></i></a>`).join('')}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function renderPortfolioPage(portfolioData) {
  const gallery = document.querySelector('.portfolio__gallery');
  if (!gallery || !portfolioData) return;

  gallery.innerHTML = portfolioData.map((item, index) => {
    const classes = item.category.join(' ');
    let bentoClass = 'bento-item';

    if (index % 7 === 0) bentoClass = 'bento-large';
    else if (index % 7 === 3) bentoClass = 'bento-wide';
    else if (index % 7 === 4) bentoClass = 'bento-item';
    else if (index % 7 === 5) bentoClass = 'bento-tall';

    let mediaContent = '';

    if (item.type === 'video') {
      mediaContent = `
                <div class="portfolio__item__video set-bg" data-setbg="${item.thumbnail}" style="background-image: url('${item.thumbnail}');">
                    <a href="${item.videoUrl}" class="play-btn video-popup"><i class="fa fa-play"></i></a>
                </div>`;
    } else if (item.type === 'spotify') {
      mediaContent = `
                <iframe style="border-radius:12px; margin-bottom: 0;" 
                    src="${item.spotifyEmbed}" 
                    width="100%" height="100%" frameBorder="0" allowfullscreen="" 
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy">
                </iframe>`;
    } else if (item.type === 'gallery') {
      const mainImg = item.mainImage;
      const group = item.group || 'default';
      const hiddenImgs = item.images && item.images.length > 1 ? item.images.slice(1).map(img =>
        `<a href="${img}" class="image-popup" data-group="${group}"></a>`
      ).join('') : '';

      mediaContent = `
                <div class="portfolio__item__media" style="height: 100%;">
                    <a href="${mainImg}" class="image-popup" data-group="${group}">
                        <img src="${mainImg}" alt="${item.title}" loading="lazy" style="height: 100%; object-fit: cover; width: 100%;">
                    </a>
                </div>
                <div class="hidden-images" style="display:none;">
                    ${hiddenImgs}
                </div>
            `;
    }

    return `
            <div class="mix ${classes} ${bentoClass}" data-order="${item.id}" style="padding: 0;">
                <div class="portfolio__item" data-group="${item.group || ''}">
                    ${mediaContent}
                    <div class="portfolio__item__text">
                        <h4>${item.title}</h4>
                        <p class="small text-white-50">${item.description.substring(0, 60)}...</p>
                        <div class="d-flex justify-content-between align-items-center mt-2">
                             <span class="badge badge-light" style="background: var(--primary);">${item.category[0]}</span>
                             <span class="small text-white">${item.year}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
  }).join('');
}

function renderFooter(footerData, globals, menu) {
  const footerSocial = document.querySelector('.footer__top__social');
  if (footerSocial && globals.socials) {
    footerSocial.innerHTML = globals.socials.map(social =>
      `<a href="${social.url}" target="_blank"><i class="${social.icon}"></i></a>`
    ).join('');
  }
}

function renderContactPage(contactData) {
  if (!contactData) return;

  const breadcrumbTitle = document.querySelector('.breadcrumb__text h2');
  const breadcrumbLink = document.querySelector('.breadcrumb__links span');
  if (breadcrumbTitle) breadcrumbTitle.textContent = contactData.title;
  if (breadcrumbLink) breadcrumbLink.textContent = contactData.breadcrumb;

  const widgetContainer = document.querySelector('.contact__widget__container');
  if (widgetContainer && contactData.info) {
    widgetContainer.innerHTML = Object.values(contactData.info).map(item => `
            <div class="col-lg-4 col-md-6 col-md-6 col-md-3">
                <div class="contact__widget__item">
                    <div class="contact__widget__item__icon">
                        <i class="${item.icon}"></i>
                    </div>
                    <div class="contact__widget__item__text">
                        <h4>${item.title}</h4>
                        <p>${item.text}</p>
                    </div>
                </div>
            </div>
        `).join('');
  }

  const mapContainer = document.querySelector('.contact__map');
  if (mapContainer && contactData.mapUrl) {
    mapContainer.innerHTML = `<iframe src="${contactData.mapUrl}" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`;
  }
}
