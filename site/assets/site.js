/* ===========================================================
   BremCare — shared site chrome + interactions
   Injects header & footer, handles nav, mobile menu, reveals.
   Each page sets <body data-page="..."> to mark the active link.
   =========================================================== */
(function(){
  "use strict";

  var EMAIL = "placements@bremcareltd.com";
  var PHONE_DISPLAY = "07842 016389";
  var PHONE_HREF = "+447842016389";

  var NAV = [
    {id:"home",     label:"Home",            href:"index.html"},
    {id:"about",    label:"About",           href:"about.html"},
    {id:"support",  label:"Who We Support",  short:"Support", href:"support.html"},
    {id:"homes",    label:"Our Homes",       short:"Homes",   href:"homes.html"},
    {id:"quality",  label:"Quality",         href:"quality.html"},
    {id:"referrals",label:"Referrals",       href:"referrals.html"},
    {id:"careers",  label:"Careers",         href:"careers.html"},
    {id:"contact",  label:"Contact",         href:"contact.html"}
  ];

  var page = document.body.getAttribute("data-page") || "home";

  function navLinksHTML(){
    return NAV.map(function(n){
      var active = n.id === page ? " class=\"active\"" : "";
      return '<li><a href="'+n.href+'"'+active+'>'+(n.short||n.label)+'</a></li>';
    }).join("");
  }
  function mobileLinksHTML(){
    return NAV.map(function(n){
      return '<a href="'+n.href+'">'+n.label+'</a>';
    }).join("");
  }

  /* ---------- header ---------- */
  var header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML =
    '<div class="wrap"><nav class="nav">'
    + '<a class="nav-logo" href="index.html" aria-label="BremCare home"><img src="assets/bremcare-logo.png" alt="BremCare"></a>'
    + '<ul class="nav-links">'+navLinksHTML()+'</ul>'
    + '<div class="nav-cta">'
    +   '<a class="nav-phone" href="tel:'+PHONE_HREF+'">'+PHONE_DISPLAY+'</a>'
    +   '<a class="btn btn-primary" href="referrals.html">Make a referral <span class="arr">&rarr;</span></a>'
    +   '<button class="burger" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>'
    + '</div>'
    + '</nav></div>';

  var mobile = document.createElement("div");
  mobile.className = "mobile-menu";
  mobile.innerHTML = mobileLinksHTML()
    + '<a class="btn btn-primary" href="referrals.html">Make a referral &rarr;</a>'
    + '<a class="btn btn-outline" href="tel:'+PHONE_HREF+'" style="margin-top:12px;">Call '+PHONE_DISPLAY+'</a>';

  document.body.insertBefore(mobile, document.body.firstChild);
  document.body.insertBefore(header, document.body.firstChild);

  /* burger toggle */
  var burger = header.querySelector(".burger");
  function setMenu(open){
    burger.classList.toggle("open", open);
    mobile.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
  }
  burger.addEventListener("click", function(){ setMenu(!mobile.classList.contains("open")); });
  mobile.querySelectorAll("a").forEach(function(a){ a.addEventListener("click", function(){ setMenu(false); }); });
  window.addEventListener("resize", function(){ if(window.innerWidth > 1000) setMenu(false); });

  /* scrolled state */
  function onScroll(){ header.classList.toggle("scrolled", window.scrollY > 12); }
  onScroll();
  window.addEventListener("scroll", onScroll, {passive:true});

  /* ---------- footer ---------- */
  var year = new Date().getFullYear();
  var footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML =
    '<div class="wrap">'
    + '<div class="footer-top">'
    +   '<div class="footer-col footer-brand">'
    +     '<img src="assets/bremcare-logo-white.png" alt="BremCare">'
    +     '<p>Supported accommodation and mentoring for young people aged 16 and over across North London. Transforming young people\u2019s future.</p>'
    +     '<div class="footer-badge"><span class="s">Ofsted</span><span class="x">Registered supported<br>accommodation provider<br>URN 2753118</span></div>'
    +   '</div>'
    +   '<div class="footer-col">'
    +     '<h5>Explore</h5>'
    +     '<a href="about.html">About BremCare</a>'
    +     '<a href="support.html">Who we support</a>'
    +     '<a href="homes.html">Our homes</a>'
    +     '<a href="quality.html">Quality &amp; safeguarding</a>'
    +   '</div>'
    +   '<div class="footer-col">'
    +     '<h5>Work with us</h5>'
    +     '<a href="referrals.html">How to refer</a>'
    +     '<a href="careers.html">Careers</a>'
    +     '<a href="contact.html">Contact</a>'
    +   '</div>'
    +   '<div class="footer-col">'
    +     '<h5>Get in touch</h5>'
    +     '<a href="tel:'+PHONE_HREF+'">'+PHONE_DISPLAY+'</a>'
    +     '<a href="mailto:'+EMAIL+'">'+EMAIL+'</a>'
    +     '<a href="https://bremcareltd.com" target="_blank" rel="noopener">bremcareltd.com</a>'
    +     '<p>North London, England</p>'
    +   '</div>'
    + '</div>'
    + '<div class="footer-bottom">'
    +   '<span>&copy; '+year+' BremCare Ltd. All rights reserved.</span>'
    +   '<span class="dots"><span class="d1"></span><span class="d2"></span><span class="d3"></span><span class="d4"></span><span class="d5"></span></span>'
    +   '<span>Transforming young people\u2019s future</span>'
    + '</div>'
    + '</div>';
  document.body.appendChild(footer);

  /* ---------- mobile bottom tab bar (app-like) ---------- */
  var TABS = [
    {id:"home",     label:"Home",    href:"index.html",
     icon:'<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>'},
    {id:"support",  label:"Support", href:"support.html",
     icon:'<circle cx="12" cy="8" r="3.2"/><path d="M5.5 20a6.5 6.5 0 0 1 13 0"/>'},
    {id:"homes",    label:"Homes",   href:"homes.html",
     icon:'<path d="M4 11.5 12 5l8 6.5"/><path d="M6 10.5V20h12v-9.5"/><path d="M10 20v-5h4v5"/>'},
    {id:"referrals",label:"Refer",   href:"referrals.html",
     icon:'<path d="M12 5v14"/><path d="M5 12h14"/>'},
    {id:"contact",  label:"Contact", href:"contact.html",
     icon:'<path d="M4 5h16v14H4z"/><path d="m4 6 8 6 8-6"/>'}
  ];
  var activeTab = TABS.some(function(t){return t.id===page;}) ? page : "home";
  var tabbar = document.createElement("nav");
  tabbar.className = "tabbar";
  tabbar.setAttribute("aria-label", "Primary");
  tabbar.innerHTML = TABS.map(function(t){
    var on = t.id===activeTab ? " active" : "";
    return '<a class="tab'+on+'" href="'+t.href+'">'
      + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">'+t.icon+'</svg>'
      + '<span>'+t.label+'</span></a>';
  }).join("");
  document.body.appendChild(tabbar);

  /* ---------- reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if("IntersectionObserver" in window && reveals.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
    }, {threshold:.12, rootMargin:"0px 0px -8% 0px"});
    reveals.forEach(function(el){ io.observe(el); });
  } else {
    reveals.forEach(function(el){ el.classList.add("in"); });
  }

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion:reduce)").matches;

  /* ---------- scroll progress bar ---------- */
  var bar = document.createElement("div");
  bar.className = "scroll-progress";
  document.body.appendChild(bar);

  /* ---------- back-to-top ---------- */
  var toTop = document.createElement("button");
  toTop.className = "to-top";
  toTop.setAttribute("aria-label", "Back to top");
  toTop.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>';
  toTop.addEventListener("click", function(){ window.scrollTo({top:0, behavior: reduce ? "auto" : "smooth"}); });
  document.body.appendChild(toTop);

  function onScrollFx(){
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    bar.style.width = pct + "%";
    toTop.classList.toggle("show", h.scrollTop > 600);
  }
  onScrollFx();
  window.addEventListener("scroll", onScrollFx, {passive:true});

  /* ---------- count-up stats ---------- */
  function countUp(el){
    var raw = el.getAttribute("data-count") || el.textContent.trim();
    var m = raw.match(/^(\d+(?:\.\d+)?)(.*)$/s);   // must START with a number
    if(!m){ return; }
    var target = parseFloat(m[1]);
    var suffix = m[2] || "";
    var decimals = (m[1].split(".")[1] || "").length;
    if(reduce){ el.textContent = raw; return; }
    var dur = 1300, t0 = null;
    function step(ts){
      if(!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = target * eased;
      el.textContent = (decimals ? val.toFixed(decimals) : Math.round(val)) + suffix;
      if(p < 1){ requestAnimationFrame(step); }
      else { el.textContent = raw; }
    }
    requestAnimationFrame(step);
  }
  var nums = document.querySelectorAll(".stat .n");
  if("IntersectionObserver" in window && nums.length){
    var nio = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ countUp(e.target); nio.unobserve(e.target); } });
    }, {threshold:.6});
    nums.forEach(function(el){ nio.observe(el); });
  }

  /* ---------- accordion (FAQ) ---------- */
  document.querySelectorAll(".acc").forEach(function(acc){
    var q = acc.querySelector(".acc-q");
    var body = acc.querySelector(".acc-body");
    if(!q || !body) return;
    q.addEventListener("click", function(){
      var open = acc.classList.toggle("open");
      body.style.maxHeight = open ? body.firstElementChild.scrollHeight + "px" : "0px";
      q.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  /* ---------- home gallery thumbnails ---------- */
  document.querySelectorAll("[data-gallery]").forEach(function(gal){
    var main = gal.parentElement.querySelector("[data-main]");
    if(!main) return;
    gal.querySelectorAll(".thumb").forEach(function(btn){
      btn.addEventListener("click", function(){
        var src = btn.getAttribute("data-src");
        if(!src || src === main.getAttribute("src")) return;
        gal.querySelectorAll(".thumb").forEach(function(b){ b.classList.remove("active"); });
        btn.classList.add("active");
        main.classList.add("swapping");
        var pre = new Image();
        pre.onload = function(){ main.setAttribute("src", src); main.classList.remove("swapping"); };
        pre.src = src;
      });
    });
  });

  /* ---------- rotating ethos band ---------- */
  var ethos = document.querySelector(".ethos .track");
  if(ethos){
    var lines = [].slice.call(ethos.querySelectorAll(".line"));
    var dotsWrap = document.querySelector(".ethos-dots");
    var idx = 0, timer = null;
    lines.forEach(function(_, i){
      if(dotsWrap){
        var b = document.createElement("button");
        b.setAttribute("aria-label", "Statement " + (i+1));
        b.addEventListener("click", function(){ go(i); restart(); });
        dotsWrap.appendChild(b);
      }
    });
    var dots = dotsWrap ? [].slice.call(dotsWrap.children) : [];
    function go(n){
      lines[idx].classList.remove("on"); if(dots[idx]) dots[idx].classList.remove("on");
      idx = n % lines.length;
      lines[idx].classList.add("on"); if(dots[idx]) dots[idx].classList.add("on");
    }
    function restart(){ if(timer) clearInterval(timer); timer = setInterval(function(){ go(idx+1); }, 4600); }
    go(0);
    if(!reduce && lines.length > 1) restart();
  }

})();
