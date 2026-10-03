(function () {
  var WA = 'https://wa.me/972532405999?text=' + encodeURIComponent('היי דרור, אשמח לקבוע תור לעיסוי 🙂');
  document.querySelectorAll('[data-wa]').forEach(function (a) {
    a.href = WA; a.target = '_blank'; a.rel = 'noopener';
  });

  var nav = document.getElementById('nav');
  var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 30); };
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  var burger = document.getElementById('burger'), links = document.getElementById('links');
  if (burger) {
    burger.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      burger.setAttribute('aria-expanded', open);
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); burger.setAttribute('aria-expanded', false); });
    });
  }

  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      e.target.querySelectorAll('[data-count]').forEach(count);
      io.unobserve(e.target);
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.rv-up').forEach(function (el) { io.observe(el); });

  function count(el) {
    var to = +el.dataset.count, t0 = null;
    function step(t) {
      t0 = t0 || t; var p = Math.min(1, (t - t0) / 1400);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + (p === 1 && el.hasAttribute('data-plus') ? '+' : '');
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var hero = document.getElementById('heroimg');
  if (hero && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', function () {
      var y = Math.min(window.scrollY, 600);
      hero.style.transform = 'scale(' + (1.04 + y / 6000) + ') translateY(' + (y / 14) + 'px)';
    }, { passive: true });
  }

  var DATA = {
    neck: { t: 'צוואר וכתפיים', p: 'ישיבה ממושכת מול מחשב, טלפון ומתח יומיומי נאגרים בעיקר בצוואר ובכתפיים. התוצאה: נוקשות, הגבלה בתנועה ולפעמים גם כאבי ראש.', r: 'עיסוי רקמות עמוק · טריגר פוינט' },
    upper: { t: 'גב עליון', p: 'עומס בין השכמות ותחושת "קשר" שלא משתחרר, בדרך כלל בגלל יציבה לקויה או מאמץ חוזר.', r: 'עיסוי רקמות עמוק · כוסות רוח' },
    lower: { t: 'גב תחתון', p: 'שחרור עומסים שנובעים מישיבה ממושכת, הרמה לא נכונה או מאמץ. המטרה היא להחזיר לגב תנועה חופשית ונוחה.', r: 'עיסוי רקמות עמוק · טריגר פוינט · אבנים חמות' },
    legs: { t: 'רגליים ושרירים תפוסים', p: 'החזרת טווחי התנועה וגמישות השריר, אחרי אימונים, עמידה ממושכת או עומס.', r: 'עיסוי ספורטאים · עיסוי תאילנדי' },
    stress: { t: 'מתח וסטרס', p: 'הפגת מתחים פיזיים ונפשיים שמצטברים בגוף. שעה שכולה שלכם, שבה הגוף והראש נרגעים.', r: 'עיסוי שוודי · עיסוי באבנים חמות' },
    rehab: { t: 'שיקום ותחזוקה שוטפת', p: 'תמיכה בתהליכי החלמה, או פשוט תחזוקה שוטפת לגוף שעובד קשה. מומלץ במסגרת כרטיסייה.', r: 'שילוב מותאם אישית' }
  };
  var answer = document.getElementById('answer');
  function show(z) {
    var d = DATA[z]; if (!d) return;
    answer.innerHTML = '<div class="fade-swap"><h3>' + d.t + '</h3><p>' + d.p + '</p><p class="rec">מומלץ: <b>' + d.r + '</b></p>' +
      '<a class="btn btn-wa" style="margin-top:20px" target="_blank" rel="noopener" href="https://wa.me/972532405999?text=' +
      encodeURIComponent('היי דרור, אשמח לקבוע תור. אני סובל/ת מ' + d.t) + '">לקביעת תור לטיפול בזה</a></div>';
    document.querySelectorAll('.chip').forEach(function (c) { c.classList.toggle('on', c.dataset.z === z); });
    document.querySelectorAll('.spot').forEach(function (c) { c.classList.toggle('on', c.dataset.z === z); });
  }
  document.querySelectorAll('.chip,.spot').forEach(function (el) {
    el.addEventListener('click', function () { show(el.dataset.z); });
    el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(el.dataset.z); } });
  });
  show('neck');

  var yr = document.getElementById('yr'); if (yr) yr.textContent = new Date().getFullYear();
})();
