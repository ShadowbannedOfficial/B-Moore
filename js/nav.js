/* Mobile menu + background video pause / unmute. Shared by every page. */
(function(){
  var btn = document.querySelector(".menu-btn");
  if (btn){
    btn.addEventListener("click", function(){
      var open = document.body.classList.toggle("menu-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("keydown", function(e){
      if (e.key === "Escape" && document.body.classList.contains("menu-open")){
        document.body.classList.remove("menu-open");
        btn.setAttribute("aria-expanded", "false");
        btn.focus();
      }
    });
  }
  var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll("video[data-bg]").forEach(function(v){
    var wrap = v.parentNode;
    var t = wrap.querySelector(".vid-toggle");
    var s = wrap.querySelector(".vid-sound");
    if (still){ v.removeAttribute("autoplay"); v.pause(); }
    function label(){ if (t) t.textContent = v.paused ? "Play" : "Pause"; }
    function soundLabel(){
      if (!s) return;
      var on = !v.muted;
      s.textContent = on ? "Mute" : "Unmute";
      s.setAttribute("aria-pressed", on ? "true" : "false");
    }
    if (t){
      t.addEventListener("click", function(){ if (v.paused) v.play(); else v.pause(); label(); });
      v.addEventListener("play", label); v.addEventListener("pause", label);
      label();
    }
    if (s){
      s.addEventListener("click", function(){
        v.muted = !v.muted;
        if (!v.muted && v.paused) v.play();
        soundLabel();
      });
      soundLabel();
    }
  });
})();
