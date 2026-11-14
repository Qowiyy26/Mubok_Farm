(function () {
  'use strict';
  // Replace this public submission endpoint with the URL from the WebForms dashboard.
  // Add and confirm mubokfarms1215@gmail.com as the email destination in that dashboard.
  var WEBFORMS_ENDPOINT = 'https://send.webforms.to/wft_your_key';



  /* ── NAVBAR ────────────────────────────────────────────── */
  var navbar = document.getElementById('navbar');

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    var total = document.documentElement.scrollHeight - window.innerHeight;
    var pct   = total > 0 ? (window.scrollY / total) * 100 : 0;
    document.body.style.setProperty('--scroll-pct', pct.toFixed(1) + '%');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();


  /* ── HAMBURGER MENU ─────────────────────────────────────── */
  var hamburger = document.getElementById('hamburger');
  var navLinks  = document.getElementById('navLinks');

  function closeMenu() {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function () {
    var isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });


  /* ── SMOOTH SCROLL ──────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      var navH = 70;
      var top  = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });


  /* ── SCROLL REVEAL ──────────────────────────────────────── */
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var siblings = Array.from(
        entry.target.parentElement.querySelectorAll('[data-aos]')
      );
      var index = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = (index * 90) + 'ms';
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('[data-aos]').forEach(function (el) {
    revealObserver.observe(el);
  });


  /* ── CONTACT FORM ───────────────────────────────────────── */
  var form       = document.getElementById('contactForm');
  var successMsg = document.getElementById('formSuccess');

  if (!form) return;

  if (!WEBFORMS_ENDPOINT.endsWith('/wft_your_key')) form.action = WEBFORMS_ENDPOINT;

  var startTimeField = document.getElementById('webformsStartTime');
  var pageField = document.getElementById('webformsPage');
  if (startTimeField) startTimeField.value = String(Date.now());
  if (pageField) pageField.value = window.location.href;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var name    = document.getElementById('name').value.trim();
    var email   = document.getElementById('email').value.trim();
    var phone   = document.getElementById('phone').value.trim();
    var message = document.getElementById('message').value.trim();

    /* — Client-side validation — */
    clearError();

    if (!name) {
      showError('Please enter your full name.');
      document.getElementById('name').focus();
      return;
    }
    if (!email || !isValidEmail(email)) {
      showError('Please enter a valid email address.');
      document.getElementById('email').focus();
      shakeEl(document.getElementById('email'));
      return;
    }
    if (!message) {
      showError('Please write a message before sending.');
      document.getElementById('message').focus();
      return;
    }


    if (WEBFORMS_ENDPOINT.endsWith('/wft_your_key')) {
      showError('The WebForms endpoint still needs to be added. Please email us directly for now:');
      addMailFallback({ name: name, email: email, phone: phone, message: message });
      return;
    }

    /* — Send — */
    var btn  = form.querySelector('button[type="submit"]');
    var text = btn.querySelector('.btn-text');

    btn.disabled    = true;
    text.textContent = 'Sending…';

    var replyTo = document.getElementById('webformsReplyTo');
    if (replyTo) replyTo.value = email;
    var params = {
      name: name,
      email: email,
      phone: phone || 'Not provided',
      message: message,
      _subject: 'New enquiry from the Mubok Farm website',
      _replyto: email,
      _start_time: startTimeField ? startTimeField.value : String(Date.now()),
      _page: pageField ? pageField.value : window.location.href,
      _gotcha: document.getElementById('webformsWebsite').value
    };

    fetch(WEBFORMS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(params)
    })
      .then(function (response) {
        return response.json().then(function (data) {
          if (!response.ok || !data.ok) throw new Error(data.message || 'Submission failed');
          return data;
        });
      })
      .then(function () {
        text.textContent        = 'Message Sent';
        btn.style.background    = 'var(--c-green-lt)';
        successMsg.classList.add('visible');
        form.reset();

        setTimeout(function () {
          btn.disabled        = false;
          text.textContent    = 'Send Message';
          btn.style.background = '';
          successMsg.classList.remove('visible');
        }, 5000);
      })
      .catch(function (err) {
        console.error('WebForms submission failed:', err);
        text.textContent = 'Failed — try again';
        btn.disabled     = false;
        showError('Message failed to send. Please email us directly:');
        addMailFallback({ name: name, email: email, phone: phone, message: message });

        setTimeout(function () {
          text.textContent = 'Send Message';
        }, 3500);
      });
  });


  /* ── HELPERS ────────────────────────────────────────────── */
  function showError(msg) {
    var el = form.querySelector('.form-error');
    if (!el) {
      el = document.createElement('p');
      el.className = 'form-error';
      form.querySelector('button[type="submit"]').insertAdjacentElement('afterend', el);
    }
    el.textContent  = msg;
    el.style.display = 'block';
  }

  function clearError() {
    var el = form.querySelector('.form-error');
    if (el) {
      el.style.display = 'none';
      var fallback = el.querySelector('.mail-fallback');
      if (fallback) fallback.remove();
    }
  }

  function addMailFallback(details) {
    var error = form.querySelector('.form-error');
    if (!error) return;
    var subject = encodeURIComponent('Mubok Farm — New Enquiry');
    var body = encodeURIComponent(
      'Name: ' + details.name + '\nEmail: ' + details.email +
      '\nPhone: ' + (details.phone || 'Not provided') + '\n\n' + details.message
    );
    var link = document.createElement('a');
    link.className = 'mail-fallback';
    link.href = 'mailto:mubokfarms1215@gmail.com?subject=' + subject + '&body=' + body;
    link.textContent = 'Open an email to Mubok Farms';
    link.style.cssText = 'display:block;margin-top:.45rem;color:inherit;font-weight:700;text-decoration:underline';
    error.appendChild(link);
  }

  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }

  function shakeEl(el) {
    el.style.animation = '';
    // Force reflow so animation restarts
    void el.offsetWidth;
    el.style.animation = 'shake .45s ease';
    el.addEventListener('animationend', function () {
      el.style.animation = '';
    }, { once: true });
  }

  /* Shake keyframe */
  var styleTag = document.createElement('style');
  styleTag.textContent = [
    '@keyframes shake {',
    '  0%,100% { transform: translateX(0); }',
    '  20%     { transform: translateX(-9px); }',
    '  40%     { transform: translateX(9px); }',
    '  60%     { transform: translateX(-5px); }',
    '  80%     { transform: translateX(5px); }',
    '}'
  ].join('\n');
  document.head.appendChild(styleTag);


  /* ── FOOTER YEAR ────────────────────────────────────────── */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

})();
