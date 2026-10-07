// Relcon — interações do site institucional
(function () {
  'use strict';

  // E-mail que receberá as mensagens do formulário (via cliente de e-mail do visitante).
  // Para envio direto sem abrir o e-mail, use um serviço como Formspree e troque o handler abaixo.
  var CONTACT_EMAIL = 'contato@relcon.com.br';

  var header = document.querySelector('.header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('menu');

  // Ano no rodapé
  document.getElementById('ano').textContent = new Date().getFullYear();

  // Sombra no header ao rolar
  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Menu mobile
  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  }
  toggle.addEventListener('click', function () {
    setMenu(!nav.classList.contains('is-open'));
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  // Destaca o link da seção visível
  var links = nav.querySelectorAll('a[href^="#"]:not(.btn)');
  var sections = Array.prototype.map.call(links, function (a) {
    return document.querySelector(a.getAttribute('href'));
  });

  if ('IntersectionObserver' in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { if (s) sectionObserver.observe(s); });

    // Animação de entrada
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { revealObserver.observe(el); });

    // Contadores do hero
    var counterObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-count]').forEach(function (el) { counterObserver.observe(el); });
  } else {
    document.documentElement.classList.add('no-js');
    document.querySelectorAll('[data-count]').forEach(function (el) { el.textContent = el.dataset.count; });
  }

  function animateCount(el) {
    var target = parseInt(el.dataset.count, 10);
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { el.textContent = target; return; }
    var duration = 1400;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // Formulário de contato
  var form = document.getElementById('contact-form');
  var status = form.querySelector('.form__status');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var valid = true;
    form.querySelectorAll('[required]').forEach(function (field) {
      var ok = field.value.trim() !== '' && (field.type !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value));
      field.classList.toggle('is-invalid', !ok);
      if (!ok) valid = false;
    });

    if (!valid) {
      status.textContent = 'Por favor, preencha os campos obrigatórios corretamente.';
      status.className = 'form__status is-error';
      return;
    }

    var data = new FormData(form);
    var body = 'Nome: ' + data.get('nome') +
      '\nE-mail: ' + data.get('email') +
      '\nTelefone: ' + (data.get('telefone') || '-') +
      '\nEmpresa/segmento: ' + (data.get('empresa') || '-') +
      '\n\n' + data.get('mensagem');

    window.location.href = 'mailto:' + CONTACT_EMAIL +
      '?subject=' + encodeURIComponent('Contato pelo site - ' + data.get('nome')) +
      '&body=' + encodeURIComponent(body);

    status.textContent = 'Obrigado! Seu aplicativo de e-mail foi aberto para concluir o envio.';
    status.className = 'form__status is-success';
    form.reset();
  });
})();
