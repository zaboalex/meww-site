/* MEWW V2 preview enhancements — injects glass/bg elements at runtime.
   No markup in index.html is changed; preview.html loads this file. */
(function () {
  // --- background + overlay elements ---
  var bg = document.createElement('div');
  bg.className = 'site-bg';
  document.body.insertBefore(bg, document.body.firstChild);

  var progress = document.createElement('div');
  progress.className = 'scroll-progress';
  document.body.appendChild(progress);

  var cursor = document.createElement('div');
  cursor.className = 'cursor-glow';
  document.body.appendChild(cursor);

  // --- nav: live status replaces the plain location label ---
  var nav = document.querySelector('nav');
  var navRight = nav ? nav.querySelector('.nav-right') : null;
  if (navRight) {
    var status = document.createElement('div');
    status.className = 'nav-status';
    status.innerHTML = '<span class="dot"></span>Mtl &middot; Signal active';
    navRight.replaceWith(status);
  }

  // --- ghost index numbers on venture cards ---
  document.querySelectorAll('.venture-item:not(.classified) .venture-top').forEach(function (top) {
    var label = top.querySelector('.venture-label');
    if (label) top.setAttribute('data-num', label.textContent.trim());
  });

  // --- cursor light + hero parallax ---
  var heroGlow = document.querySelector('.hero-glow');
  document.addEventListener('mousemove', function (e) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    if (heroGlow) {
      var x = (e.clientX / window.innerWidth - 0.5) * 40;
      var y = (e.clientY / window.innerHeight - 0.5) * 40;
      heroGlow.style.transform = 'translate(calc(-50% + ' + x + 'px), calc(-50% + ' + y + 'px))';
    }
  });

  // --- scroll progress + glass nav toggle ---
  function onScroll() {
    var h = document.documentElement;
    var ratio = h.scrollTop / ((h.scrollHeight - h.clientHeight) || 1);
    progress.style.transform = 'scaleX(' + ratio + ')';
    if (nav) nav.classList.toggle('scrolled', h.scrollTop > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
