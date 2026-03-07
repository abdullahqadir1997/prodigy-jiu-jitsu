(function () {
  'use strict';

  /* ── STYLES ─────────────────────────────────────────────── */
  var css = `
    #fcm-overlay {
      position: fixed; inset: 0; z-index: 9000;
      background: rgba(0,0,0,0.88); backdrop-filter: blur(8px);
      display: flex; align-items: center; justify-content: center;
      padding: 1rem;
      opacity: 0; pointer-events: none;
      transition: opacity 0.35s cubic-bezier(0.16,1,0.3,1);
    }
    #fcm-overlay.fcm-open { opacity: 1; pointer-events: all; }

    #fcm-modal {
      background: #111111;
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 18px;
      width: 100%; max-width: 540px;
      max-height: 92vh; overflow-y: auto;
      transform: translateY(32px) scale(0.97);
      transition: transform 0.38s cubic-bezier(0.16,1,0.3,1);
      position: relative;
      scrollbar-width: none;
    }
    #fcm-modal::-webkit-scrollbar { display: none; }
    #fcm-overlay.fcm-open #fcm-modal { transform: translateY(0) scale(1); }

    /* Close */
    .fcm-close {
      position: absolute; top: 1rem; right: 1rem;
      background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1);
      border-radius: 50%; width: 36px; height: 36px;
      cursor: pointer; color: #aaa; font-size: 1rem;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.2s, color 0.2s; z-index: 2;
    }
    .fcm-close:hover { background: rgba(255,255,255,0.14); color: #fff; }

    /* Header */
    .fcm-header {
      padding: 2rem 2rem 1.5rem;
      border-bottom: 1px solid rgba(255,255,255,0.07);
    }
    .fcm-icon { font-size: 2.2rem; margin-bottom: 0.8rem; display: block; }
    .fcm-header h2 {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 2rem; font-weight: 800;
      letter-spacing: 0.03em; text-transform: uppercase;
      color: #fff; margin: 0 0 0.3rem;
    }
    .fcm-header p { font-size: 0.88rem; color: #888; margin: 0; }

    /* Steps */
    .fcm-steps {
      display: flex; align-items: flex-start;
      gap: 0; margin-top: 1.5rem;
    }
    .fcm-step { display: flex; flex-direction: column; align-items: center; }
    .fcm-step-dot {
      width: 30px; height: 30px; border-radius: 50%;
      border: 2px solid rgba(255,255,255,0.13);
      background: transparent; color: #555;
      font-size: 0.78rem; font-weight: 800;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
      font-family: 'Barlow Condensed', sans-serif;
    }
    .fcm-step.active .fcm-step-dot {
      border-color: #C0392B; background: #C0392B; color: #fff;
      box-shadow: 0 0 16px rgba(192,57,43,0.4);
    }
    .fcm-step.done .fcm-step-dot {
      border-color: #C0392B; background: #C0392B; color: #fff;
    }
    .fcm-step.done .fcm-step-dot::before { content: '✓'; font-size: 0.8rem; }
    .fcm-step.done .fcm-step-dot span { display: none; }
    .fcm-step-label {
      font-size: 0.62rem; color: #444; margin-top: 0.35rem;
      font-family: 'Barlow Condensed', sans-serif;
      letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700;
      white-space: nowrap;
    }
    .fcm-step.active .fcm-step-label { color: #ccc; }
    .fcm-step.done .fcm-step-label { color: #888; }
    .fcm-step-line {
      flex: 1; height: 2px;
      background: rgba(255,255,255,0.08);
      margin: 14px 0 0; min-width: 40px;
      transition: background 0.4s;
    }
    .fcm-step-line.done { background: #C0392B; }

    /* Body */
    .fcm-body { padding: 1.75rem 2rem 2rem; }

    /* Panels */
    .fcm-panel { display: none; }
    .fcm-panel.fcm-active {
      display: block;
      animation: fcmIn 0.38s cubic-bezier(0.16,1,0.3,1) both;
    }
    .fcm-panel.fcm-back-active {
      display: block;
      animation: fcmInBack 0.38s cubic-bezier(0.16,1,0.3,1) both;
    }
    @keyframes fcmIn {
      from { opacity: 0; transform: translateX(28px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes fcmInBack {
      from { opacity: 0; transform: translateX(-28px); }
      to   { opacity: 1; transform: translateX(0); }
    }

    /* Form */
    .fcm-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .fcm-group { margin-bottom: 1.1rem; }
    .fcm-group label {
      display: block; font-size: 0.78rem; font-weight: 600;
      color: #bbb; margin-bottom: 0.42rem; letter-spacing: 0.04em;
    }
    .fcm-group input {
      width: 100%; background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.11); border-radius: 9px;
      padding: 0.72rem 0.95rem; color: #fff; font-size: 0.92rem;
      font-family: inherit; outline: none; box-sizing: border-box;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .fcm-group input::placeholder { color: #444; }
    .fcm-group input:focus {
      border-color: rgba(192,57,43,0.55);
      box-shadow: 0 0 0 3px rgba(192,57,43,0.12);
    }
    .fcm-group.fcm-has-error input { border-color: #e74c3c; }
    .fcm-err {
      font-size: 0.72rem; color: #e74c3c;
      margin-top: 0.3rem; display: none;
    }
    .fcm-group.fcm-has-error .fcm-err { display: block; }

    .fcm-submit {
      width: 100%; padding: 0.95rem 1.5rem; margin-top: 0.5rem;
      background: #C0392B; color: #fff; border: none; border-radius: 9px;
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 1.05rem; font-weight: 800; letter-spacing: 0.1em;
      text-transform: uppercase; cursor: pointer;
      transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
    }
    .fcm-submit:hover {
      background: #a93226; transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(192,57,43,0.35);
    }
    .fcm-privacy {
      text-align: center; font-size: 0.75rem;
      color: #555; margin-top: 0.85rem;
    }

    /* Back */
    .fcm-back-btn {
      background: none; border: none; color: #777; cursor: pointer;
      font-size: 0.82rem; display: inline-flex; align-items: center;
      gap: 0.4rem; padding: 0; margin-bottom: 1.4rem;
      transition: color 0.2s; font-family: inherit;
    }
    .fcm-back-btn:hover { color: #fff; }

    /* Program Cards */
    .fcm-step2-title {
      font-size: 0.88rem; color: #888;
      margin-bottom: 1.25rem; line-height: 1.5;
    }
    .fcm-programs { display: flex; flex-direction: column; gap: 0.85rem; }
    .fcm-prog-card {
      display: flex; align-items: center; gap: 1.25rem;
      background: rgba(255,255,255,0.03);
      border: 1.5px solid rgba(255,255,255,0.08);
      border-radius: 12px; padding: 1.1rem 1.35rem;
      cursor: pointer;
      transition: all 0.28s cubic-bezier(0.16,1,0.3,1);
    }
    .fcm-prog-card:hover {
      border-color: rgba(192,57,43,0.5);
      background: rgba(192,57,43,0.06);
      transform: translateX(6px);
    }
    .fcm-prog-icon {
      font-size: 1.7rem; flex-shrink: 0;
      width: 50px; height: 50px;
      background: rgba(192,57,43,0.1);
      border: 1px solid rgba(192,57,43,0.2);
      border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
    }
    .fcm-prog-info { flex: 1; }
    .fcm-prog-info h4 {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 1.1rem; font-weight: 800;
      text-transform: uppercase; letter-spacing: 0.05em;
      color: #fff; margin: 0 0 0.18rem;
    }
    .fcm-prog-info p { font-size: 0.78rem; color: #666; margin: 0; }
    .fcm-prog-arrow {
      color: #C0392B; font-size: 1rem; flex-shrink: 0;
      opacity: 0; transform: translateX(-6px);
      transition: all 0.25s;
    }
    .fcm-prog-card:hover .fcm-prog-arrow {
      opacity: 1; transform: translateX(0);
    }

    /* Redirecting state */
    .fcm-redirecting {
      text-align: center; padding: 2rem 0;
    }
    .fcm-redirecting .fcm-spinner {
      width: 40px; height: 40px; border-radius: 50%;
      border: 3px solid rgba(255,255,255,0.1);
      border-top-color: #C0392B;
      animation: fcmSpin 0.7s linear infinite;
      margin: 0 auto 1rem;
    }
    @keyframes fcmSpin { to { transform: rotate(360deg); } }
    .fcm-redirecting p { color: #888; font-size: 0.88rem; }
    .fcm-redirecting strong { color: #fff; display: block; font-family: 'Barlow Condensed', sans-serif; font-size: 1.2rem; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 0.3rem; }

    @media (max-width: 480px) {
      .fcm-header, .fcm-body { padding-left: 1.25rem; padding-right: 1.25rem; }
      .fcm-form-row { grid-template-columns: 1fr; gap: 0; }
      .fcm-header h2 { font-size: 1.65rem; }
      .fcm-step-line { min-width: 24px; }
    }
  `;

  /* ── HTML ────────────────────────────────────────────────── */
  var html = `
  <div id="fcm-overlay" role="dialog" aria-modal="true" aria-labelledby="fcm-title">
    <div id="fcm-modal">
      <button class="fcm-close" id="fcm-close" aria-label="Close">&#10005;</button>

      <div class="fcm-header">
        <span class="fcm-icon">&#x1F94B;</span>
        <h2 id="fcm-title">Claim Your Free Class</h2>
        <p>Your first class is on us &mdash; no gear or experience needed.</p>
        <div class="fcm-steps" id="fcm-steps">
          <div class="fcm-step active" id="fcm-s1">
            <div class="fcm-step-dot"><span>1</span></div>
            <div class="fcm-step-label">Your Info</div>
          </div>
          <div class="fcm-step-line" id="fcm-line1"></div>
          <div class="fcm-step" id="fcm-s2">
            <div class="fcm-step-dot"><span>2</span></div>
            <div class="fcm-step-label">Program</div>
          </div>
          <div class="fcm-step-line" id="fcm-line2"></div>
          <div class="fcm-step" id="fcm-s3">
            <div class="fcm-step-dot"><span>3</span></div>
            <div class="fcm-step-label">Book</div>
          </div>
        </div>
      </div>

      <div class="fcm-body">

        <!-- STEP 1: Lead Form -->
        <div class="fcm-panel fcm-active" id="fcm-panel-1">
          <form id="fcm-form" novalidate autocomplete="on">
            <div class="fcm-form-row">
              <div class="fcm-group" id="fcm-g-name">
                <label for="fcm-name">Full Name *</label>
                <input type="text" id="fcm-name" name="name" placeholder="John Smith" required autocomplete="name" />
                <div class="fcm-err">Please enter your full name.</div>
              </div>
              <div class="fcm-group" id="fcm-g-phone">
                <label for="fcm-phone">Phone Number *</label>
                <input type="tel" id="fcm-phone" name="phone" placeholder="(555) 000-0000" required autocomplete="tel" />
                <div class="fcm-err">Please enter a valid phone number.</div>
              </div>
            </div>
            <div class="fcm-group" id="fcm-g-email">
              <label for="fcm-email">Email Address *</label>
              <input type="email" id="fcm-email" name="email" placeholder="john@example.com" required autocomplete="email" />
              <div class="fcm-err">Please enter a valid email address.</div>
            </div>
            <button type="submit" class="fcm-submit">Next: Choose Your Program &rarr;</button>
            <p class="fcm-privacy">&#128274; We respect your privacy. No spam, ever.</p>
          </form>
        </div>

        <!-- STEP 2: Program Picker -->
        <div class="fcm-panel" id="fcm-panel-2">
          <button class="fcm-back-btn" id="fcm-back">&larr; Back</button>
          <p class="fcm-step2-title">Which program are you interested in?</p>
          <div class="fcm-programs">
            <div class="fcm-prog-card" data-program="adult-jiu-jitsu" data-label="Adult Jiu-Jitsu">
              <div class="fcm-prog-icon">&#x1F94B;</div>
              <div class="fcm-prog-info">
                <h4>Adult Jiu-Jitsu</h4>
                <p>Gi &amp; No-Gi &middot; All skill levels welcome</p>
              </div>
              <span class="fcm-prog-arrow">&rarr;</span>
            </div>
            <div class="fcm-prog-card" data-program="kids-jiu-jitsu" data-label="Kids Jiu-Jitsu">
              <div class="fcm-prog-icon">&#x1F466;</div>
              <div class="fcm-prog-info">
                <h4>Kids Jiu-Jitsu</h4>
                <p>Ages 5&ndash;17 &middot; Confidence &amp; discipline</p>
              </div>
              <span class="fcm-prog-arrow">&rarr;</span>
            </div>
            <div class="fcm-prog-card" data-program="muay-thai" data-label="Adult Muay Thai">
              <div class="fcm-prog-icon">&#x1F94A;</div>
              <div class="fcm-prog-info">
                <h4>Adult Muay Thai</h4>
                <p>The Art of Eight Limbs &middot; Striking for all levels</p>
              </div>
              <span class="fcm-prog-arrow">&rarr;</span>
            </div>
          </div>
        </div>

        <!-- STEP 3: Redirecting -->
        <div class="fcm-panel" id="fcm-panel-3">
          <div class="fcm-redirecting">
            <div class="fcm-spinner"></div>
            <strong id="fcm-redir-label">Loading...</strong>
            <p>Taking you to the booking calendar&hellip;</p>
          </div>
        </div>

      </div>
    </div>
  </div>`;

  /* ── INIT ────────────────────────────────────────────────── */
  function init() {
    // Inject styles
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    // Inject HTML
    document.body.insertAdjacentHTML('beforeend', html);

    var overlay  = document.getElementById('fcm-overlay');
    var closeBtn = document.getElementById('fcm-close');
    var form     = document.getElementById('fcm-form');
    var backBtn  = document.getElementById('fcm-back');

    /* ── helpers ── */
    function setStep(n, dir) {
      var panels = [
        document.getElementById('fcm-panel-1'),
        document.getElementById('fcm-panel-2'),
        document.getElementById('fcm-panel-3')
      ];
      panels.forEach(function(p) {
        p.classList.remove('fcm-active', 'fcm-back-active');
      });

      var target = panels[n - 1];
      if (dir === 'back') {
        target.classList.add('fcm-back-active');
      } else {
        target.classList.add('fcm-active');
      }

      // Update step dots
      var steps = [
        document.getElementById('fcm-s1'),
        document.getElementById('fcm-s2'),
        document.getElementById('fcm-s3')
      ];
      var lines = [
        document.getElementById('fcm-line1'),
        document.getElementById('fcm-line2')
      ];
      steps.forEach(function(s, i) {
        s.classList.remove('active', 'done');
        if (i + 1 < n)  s.classList.add('done');
        if (i + 1 === n) s.classList.add('active');
      });
      lines.forEach(function(l, i) {
        l.classList.toggle('done', i < n - 1);
      });
    }

    function openModal() {
      setStep(1);
      // Clear errors
      ['fcm-g-name','fcm-g-phone','fcm-g-email'].forEach(function(id) {
        document.getElementById(id).classList.remove('fcm-has-error');
      });
      overlay.classList.add('fcm-open');
      document.body.style.overflow = 'hidden';
      setTimeout(function() {
        var n = document.getElementById('fcm-name');
        if (n) n.focus();
      }, 380);
    }

    function closeModal() {
      overlay.classList.remove('fcm-open');
      document.body.style.overflow = '';
    }

    // Expose globally so inline onclick can also use it
    window.openFreeClassModal = openModal;

    /* ── close handlers ── */
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closeModal();
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeModal();
    });

    /* ── form submit → step 2 ── */
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var valid = true;

      var nameEl  = document.getElementById('fcm-name');
      var phoneEl = document.getElementById('fcm-phone');
      var emailEl = document.getElementById('fcm-email');

      var gName  = document.getElementById('fcm-g-name');
      var gPhone = document.getElementById('fcm-g-phone');
      var gEmail = document.getElementById('fcm-g-email');

      gName.classList.remove('fcm-has-error');
      gPhone.classList.remove('fcm-has-error');
      gEmail.classList.remove('fcm-has-error');

      if (!nameEl.value.trim()) {
        gName.classList.add('fcm-has-error'); valid = false;
      }
      if (!phoneEl.value.trim() || phoneEl.value.replace(/\D/g,'').length < 7) {
        gPhone.classList.add('fcm-has-error'); valid = false;
      }
      if (!emailEl.value.trim() || !emailEl.value.includes('@') || !emailEl.value.includes('.')) {
        gEmail.classList.add('fcm-has-error'); valid = false;
      }

      if (!valid) return;
      setStep(2);
    });

    /* ── back button ── */
    backBtn.addEventListener('click', function() {
      setStep(1, 'back');
    });

    /* ── program card click → step 3 → redirect ── */
    document.querySelectorAll('.fcm-prog-card').forEach(function(card) {
      card.addEventListener('click', function() {
        var program = this.dataset.program;
        var label   = this.dataset.label;

        // Save to sessionStorage for booking page
        try {
          sessionStorage.setItem('fcm_program', program);
          sessionStorage.setItem('fcm_label',   label);
          sessionStorage.setItem('fcm_name',    document.getElementById('fcm-name').value);
          sessionStorage.setItem('fcm_email',   document.getElementById('fcm-email').value);
          sessionStorage.setItem('fcm_phone',   document.getElementById('fcm-phone').value);
        } catch(e) {}

        // Show step 3 (redirecting state)
        document.getElementById('fcm-redir-label').textContent = label;
        setStep(3);

        setTimeout(function() {
          window.location.href = 'booking.html';
        }, 600);
      });
    });

    /* ── intercept CTA buttons ── */
    function bindButtons() {
      document.querySelectorAll('a, button').forEach(function(el) {
        if (el.dataset.fcmBound) return;
        // Skip form submit buttons (homepage lead form, contact form)
        if (el.tagName === 'BUTTON' && el.closest('form')) return;

        var href    = (el.getAttribute('href') || '').toLowerCase();
        var text    = el.textContent.trim().toLowerCase();
        var classes = el.className || '';

        var isCTA = false;

        // The nav "Free Class" button on all pages
        if (classes.includes('nav-cta')) isCTA = true;

        // Any link to contact.html with a booking/free intent
        if (!isCTA && href.includes('contact') && (
          text.includes('free') || text.includes('book') ||
          text.includes('trial') || text.includes('claim') ||
          text.includes('enroll') || text.includes('start') ||
          text.includes('class')
        )) isCTA = true;

        // Explicit free-class text anywhere
        if (!isCTA && (
          text.includes('free class') || text.includes('free trial') ||
          text.includes('book a free') || text.includes('book free') ||
          text.includes('claim your free') || text.includes('start your free') ||
          text.includes('book your free') || text.includes('reserve a spot')
        )) isCTA = true;

        if (isCTA) {
          el.dataset.fcmBound = 'true';
          el.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
          });
        }
      });
    }

    bindButtons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
