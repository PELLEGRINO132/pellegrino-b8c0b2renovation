/* Pellegrino Rénovation — petits comportements du site */
(function () {
  'use strict';

  /* Menu mobile */
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  if (header && toggle) {
    toggle.addEventListener('click', function () {
      var open = header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* Agrandissement des photos */
  var box = document.getElementById('lightbox');
  if (box && typeof box.showModal === 'function') {
    var boxImg = box.querySelector('img');
    document.addEventListener('click', function (e) {
      var img = e.target.closest('.gallery img');
      if (img) {
        boxImg.src = img.src;
        boxImg.alt = img.alt;
        box.showModal();
      } else if (e.target === box) {
        box.close();
      }
    });
    box.querySelector('button').addEventListener('click', function () { box.close(); });
  }

  /* Formulaires (Formspree) : envoi sans quitter la page */
  document.querySelectorAll('form[data-formspree]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = form.querySelector('.form-status');
      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      status.className = 'form-status';
      status.textContent = 'Envoi en cours…';
      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      }).then(function (r) {
        if (!r.ok) throw new Error('envoi');
        form.reset();
        status.classList.add('is-ok');
        status.textContent = 'Message envoyé. Je vous réponds dès que possible.';
      }).catch(function () {
        status.classList.add('is-error');
        status.textContent = 'L’envoi a échoué. Appelez-moi au 06 48 06 18 92 ou écrivez à ericpellegrino@live.fr.';
      }).then(function () { btn.disabled = false; });
    });
  });
})();
