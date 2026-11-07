var FRAMES = [
  { img:"img/frames/f05-transaction-black.jpg", thumb:"img/frames/thumb/f05-transaction-black.jpg", title:"Transaction", alt:"Transaction, nude torso photograph in an ornate black frame, shown on white." },
  { img:"img/frames/f06-femme-fatale.jpg", thumb:"img/frames/thumb/f06-femme-fatale.jpg", title:"Femme Fatale", alt:"Femme Fatale in a black glitter frame with red paint down one side, shown on white." },
  { img:"img/frames/f01-flower-gold.jpg", thumb:"img/frames/thumb/f01-flower-gold.jpg", title:"Flower", alt:"Flower framed, shown on white." },
  { img:"img/frames/f02-up-in-smoke-red.jpg", thumb:"img/frames/thumb/f02-up-in-smoke-red.jpg", title:"Up in Smoke", alt:"Up in Smoke framed, shown on white." },
  { img:"img/frames/f03-hospitality-silver.jpg", thumb:"img/frames/thumb/f03-hospitality-silver.jpg", title:"Hospitality", alt:"Hospitality framed, shown on white." },
  { img:"img/frames/f08-ski-mask-neon.jpg", thumb:"img/frames/thumb/f08-ski-mask-neon.jpg", title:"Ski Mask", alt:"Ski Mask framed, shown on white." },
  { img:"img/frames/f09-up-in-smoke-neon.jpg", thumb:"img/frames/thumb/f09-up-in-smoke-neon.jpg", title:"Up in Smoke", alt:"Up in Smoke framed, shown on white." }
];

(function(){
  var box = document.getElementById("fviewer");
  var stage = document.getElementById("fstage");
  var hero = document.getElementById("fhero");
  var capT = document.getElementById("fcap-title");
  var capF = document.getElementById("fcap-frame");
  var counter = document.getElementById("fcounter");
  var strip = document.getElementById("fstrip");
  var i = 0;

  FRAMES.forEach(function(f, n){
    var b = document.createElement("button");
    b.type = "button";
    b.setAttribute("role","tab");
    b.setAttribute("aria-label", f.title);
    var t = document.createElement("img");
    t.src = f.thumb;
    t.alt = "";
    b.appendChild(t);
    b.addEventListener("click", function(){ show(n, true); });
    strip.appendChild(b);
  });
  var buttons = strip.querySelectorAll("button");

  function show(n, scroll){
    i = (n + FRAMES.length) % FRAMES.length;
    var f = FRAMES[i];
    hero.src = f.img;
    hero.alt = f.alt;
    capT.textContent = f.title;
    if (capF){ capF.textContent = ""; capF.style.display = "none"; }
    counter.textContent = (i + 1) + " / " + FRAMES.length;
    for (var k = 0; k < buttons.length; k++){
      buttons[k].classList.toggle("on", k === i);
      buttons[k].setAttribute("aria-selected", k === i ? "true" : "false");
    }
    if (scroll && buttons[i]){
      var b = buttons[i];
      var left = b.offsetLeft - strip.clientWidth / 2 + b.offsetWidth / 2;
      strip.scrollTo({ left: left, behavior: "smooth" });
    }
    var nx = new Image(); nx.src = FRAMES[(i + 1) % FRAMES.length].img;
  }

  document.getElementById("fprev").addEventListener("click", function(){ show(i - 1, true); });
  document.getElementById("fnext").addEventListener("click", function(){ show(i + 1, true); });

  box.addEventListener("keydown", function(e){
    if (e.key === "ArrowLeft"){ show(i - 1, true); e.preventDefault(); }
    else if (e.key === "ArrowRight"){ show(i + 1, true); e.preventDefault(); }
  });

  var x0 = null, y0 = null;
  stage.addEventListener("touchstart", function(e){
    x0 = e.touches[0].clientX; y0 = e.touches[0].clientY;
  }, { passive: true });
  stage.addEventListener("touchend", function(e){
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)){ show(dx < 0 ? i + 1 : i - 1, true); }
    x0 = null;
  });

  show(0, false);
})();
