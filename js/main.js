/* R4v3nB14ck · Portfolio — animations and interaction */
(function () {
  var rm = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reveal on scroll
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (x) {
      if (x.isIntersecting) {
        setTimeout(function () { x.target.classList.add('ver'); }, x.target.dataset.d || 0);
        io.unobserve(x.target);
      }
    });
  }, { threshold: .15 });
  document.querySelectorAll('.rev').forEach(function (el, i) {
    el.dataset.d = (i % 3) * 120;
    io.observe(el);
  });

  // Light that follows the cursor on cards
  document.querySelectorAll('.card').forEach(function (r) {
    r.addEventListener('pointermove', function (ev) {
      var b = r.getBoundingClientRect();
      r.style.setProperty('--x', (ev.clientX - b.left) + 'px');
      r.style.setProperty('--y', (ev.clientY - b.top) + 'px');
    });
  });

  // Scroll progress bar + nav shadow
  var bar = document.getElementById('progress');
  var nav = document.querySelector('nav');
  var heroWrap = document.querySelector('.hero .wrap');
  function onScroll() {
    var h = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = 'scaleX(' + (h > 0 ? scrollY / h : 0) + ')';
    nav.classList.toggle('scrolled', scrollY > 20);
    if (!rm && heroWrap && scrollY < innerHeight) {
      heroWrap.style.transform = 'translateY(' + (scrollY * .25) + 'px)';
      heroWrap.style.opacity = Math.max(0, 1 - scrollY / (innerHeight * .8));
    }
  }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (rm) return;

  // Torch light that follows the cursor across the whole page
  var torch = document.getElementById('torch');
  addEventListener('pointermove', function (e) {
    torch.style.setProperty('--mx', e.clientX + 'px');
    torch.style.setProperty('--my', e.clientY + 'px');
  });

  // 3D tilt on the featured project banners
  document.querySelectorAll('.banner').forEach(function (b) {
    b.addEventListener('pointermove', function (ev) {
      var r = b.getBoundingClientRect();
      var px = (ev.clientX - r.left) / r.width - .5;
      var py = (ev.clientY - r.top) / r.height - .5;
      b.style.setProperty('--ry', (px * 10) + 'deg');
      b.style.setProperty('--rx', (-py * 10) + 'deg');
    });
    b.addEventListener('pointerleave', function () {
      b.style.setProperty('--ry', '0deg');
      b.style.setProperty('--rx', '0deg');
    });
  });

  // Typewriter tagline
  var tag = document.querySelector('.hero .tagline');
  if (tag) {
    var full = tag.textContent;
    tag.textContent = '';
    var txt = document.createTextNode('');
    var caret = document.createElement('span');
    caret.className = 'caret';
    tag.appendChild(txt);
    tag.appendChild(caret);
    var n = 0;
    setTimeout(function type() {
      txt.nodeValue = full.slice(0, ++n);
      if (n < full.length) setTimeout(type, 45);
      else setTimeout(function () { caret.remove(); }, 2500);
    }, 1500);
  }

  // Golden embers, fireflies, cursor trail and click sparks
  var c = document.getElementById('embers');
  var g = c.getContext('2d');
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W, H, P = [], S = [];
  var mouse = { x: -999, y: -999 };

  function size() {
    W = innerWidth; H = innerHeight;
    c.width = W * dpr; c.height = H * dpr;
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  size();
  addEventListener('resize', size);

  // Pre-rendered glow sprite (cheaper than shadowBlur)
  var spr = document.createElement('canvas');
  spr.width = spr.height = 64;
  var sg = spr.getContext('2d');
  var gr = sg.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, 'rgba(255,250,225,1)');
  gr.addColorStop(.25, 'rgba(255,233,168,.85)');
  gr.addColorStop(1, 'rgba(255,233,168,0)');
  sg.fillStyle = gr;
  sg.fillRect(0, 0, 64, 64);

  function nueva(ini) {
    var fire = Math.random() < .18;
    return {
      x: Math.random() * W,
      y: ini ? Math.random() * H : H + 10,
      r: fire ? Math.random() * 3 + 3 : Math.random() * 2 + .8,
      v: fire ? Math.random() * .25 + .1 : Math.random() * .6 + .25,
      d: Math.random() * 2 - 1,
      o: fire ? .8 : Math.random() * .6 + .3,
      t: Math.random() * 6,
      fire: fire
    };
  }
  for (var i = 0; i < 80; i++) P.push(nueva(true));

  function spark(x, y, burst) {
    var a = Math.random() * 6.283;
    var s = burst ? Math.random() * 3.5 + 1 : Math.random() * .8;
    S.push({ x: x, y: y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - (burst ? 1 : .3), life: 1, r: burst ? Math.random() * 6 + 5 : Math.random() * 4 + 3 });
    if (S.length > 220) S.shift();
  }

  var moves = 0;
  addEventListener('pointermove', function (e) {
    mouse.x = e.clientX; mouse.y = e.clientY;
    if (++moves % 3 === 0) spark(e.clientX, e.clientY, false);
  });
  addEventListener('pointerdown', function (e) {
    for (var k = 0; k < 18; k++) spark(e.clientX, e.clientY, true);
  });
  addEventListener('pointerleave', function () { mouse.x = mouse.y = -999; });

  g.globalCompositeOperation = 'lighter';
  (function loop() {
    g.clearRect(0, 0, W, H);

    P.forEach(function (p, i) {
      p.y -= p.v; p.t += .02;
      p.x += Math.sin(p.t) * .4 + p.d * .1;
      // gently pushed away by the cursor
      var dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
      if (d2 < 12100 && d2 > 1) {
        var dist = Math.sqrt(d2), f = (1 - dist / 110) * 3;
        p.x += dx / dist * f; p.y += dy / dist * f;
      }
      var a = p.o * Math.min(1, p.y / (H * .5));
      if (p.fire) a *= .6 + .4 * Math.sin(p.t * 3);
      var s = p.r * 8;
      g.globalAlpha = Math.max(a, 0);
      g.drawImage(spr, p.x - s / 2, p.y - s / 2, s, s);
      if (p.y < -10) P[i] = nueva(false);
    });

    for (var j = S.length - 1; j >= 0; j--) {
      var q = S[j];
      q.x += q.vx; q.y += q.vy; q.vy += .05; q.vx *= .98; q.life -= .02;
      if (q.life <= 0) { S.splice(j, 1); continue; }
      var z = q.r * 2 * q.life + 2;
      g.globalAlpha = q.life;
      g.drawImage(spr, q.x - z / 2, q.y - z / 2, z, z);
    }

    g.globalAlpha = 1;
    requestAnimationFrame(loop);
  })();
})();
