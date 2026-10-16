/*
 * Pyra flotante: la mascota de Pyraxis en la esquina de cualquier web.
 * Uso: <script src="https://pyraxisagency.com/pyra/pyra.js" data-marca="itm" defer></script>
 * (data-marca="itm" = colores y textos de la alianza con Impulsa Tu Marca).
 * Cualquier enlace a "#pyra" o con el atributo data-pyra también abre el asistente;
 * data-pyra="precios" lo abre directo en la lista de precios.
 */
(function () {
  "use strict";
  if (window.__pyra) return;
  window.__pyra = true;
  var script = document.currentScript;
  var marca = (script && script.getAttribute("data-marca")) || "";
  var base = script ? new URL(".", script.src).href : "https://pyraxisagency.com/pyra/";
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var KEY = "pyra_globo_cerrado";

  var css = "" +
    ".pyra-fab{position:fixed;right:18px;bottom:18px;z-index:2147483000;display:flex;align-items:flex-end;gap:10px;font-family:Inter,system-ui,sans-serif}" +
    ".pyra-btn{width:68px;height:68px;border-radius:50%;border:0;padding:0;cursor:pointer;background:radial-gradient(circle at 30% 25%,#2a4a85,#0B1B33);box-shadow:0 14px 34px -10px rgba(0,0,0,.6),0 0 0 3px rgba(198,161,91,.55);display:grid;place-items:center;transition:transform .3s cubic-bezier(.34,1.56,.64,1);animation:pyraFloat 4s ease-in-out infinite}" +
    ".pyra-itm .pyra-btn{background:radial-gradient(circle at 30% 25%,#8a2a46,#2A0A14)}" +
    ".pyra-btn:hover{transform:scale(1.08) rotate(-4deg)}" +
    ".pyra-btn svg{width:54px;height:54px}" +
    ".pyra-bubble{position:relative;max-width:230px;background:#FFFDF8;color:#16213A;border-radius:16px 16px 4px 16px;padding:11px 32px 11px 14px;font-size:14px;line-height:1.4;box-shadow:0 14px 34px -12px rgba(0,0,0,.45);cursor:pointer;opacity:0;transform:translateY(8px) scale(.95);transition:all .4s cubic-bezier(.34,1.56,.64,1);pointer-events:none;margin-bottom:22px}" +
    ".pyra-bubble.show{opacity:1;transform:none;pointer-events:auto}" +
    ".pyra-bubble b{display:block;font-size:14.5px;margin-bottom:2px}" +
    ".pyra-bubble button{position:absolute;top:6px;right:6px;border:0;background:none;color:#6B7488;font-size:17px;line-height:1;cursor:pointer;padding:2px 5px}" +
    ".pyra-ping{position:absolute;top:2px;right:2px;width:14px;height:14px;border-radius:50%;background:#FF7A59;border:2px solid #fff}" +
    ".pyra-ov{position:fixed;inset:0;z-index:2147483001;background:rgba(5,12,24,.6);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:20px;opacity:0;transition:opacity .3s}" +
    ".pyra-ov.show{opacity:1}" +
    ".pyra-frame{width:min(820px,100%);height:min(860px,100%);border:0;border-radius:22px;box-shadow:0 30px 80px -20px rgba(0,0,0,.7);background:#0B1B33;transform:translateY(24px) scale(.97);transition:transform .45s cubic-bezier(.34,1.56,.64,1)}" +
    ".pyra-ov.show .pyra-frame{transform:none}" +
    "@media(max-width:640px){.pyra-ov{padding:0}.pyra-frame{width:100%;height:100%;border-radius:0}.pyra-fab{right:12px;bottom:12px}.pyra-btn{width:60px;height:60px}.pyra-btn svg{width:48px;height:48px}.pyra-bubble{max-width:200px;font-size:13.5px}}" +
    "@keyframes pyraFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}" +
    "@media (prefers-reduced-motion:reduce){.pyra-btn{animation:none}.pyra-bubble,.pyra-ov,.pyra-frame{transition:none}}";

  var cara = '<svg viewBox="0 0 120 120" aria-hidden="true"><path d="M60 8 L104 33 V87 L60 112 L16 87 V33 Z" fill="#14294D" stroke="#C6A15B" stroke-width="5" stroke-linejoin="round"/>' +
    '<path d="M60 18 C 52 28, 50 34, 56 40 C 60 34, 66 32, 64 22 Z" fill="#E4CE9A"/>' +
    '<g class="pyra-eye" data-cx="44" data-cy="62"><ellipse cx="44" cy="62" rx="10" ry="11" fill="#fff"/><circle class="pyra-pu" cx="44" cy="62" r="5" fill="#0B1B33"/></g>' +
    '<g class="pyra-eye" data-cx="76" data-cy="62"><ellipse cx="76" cy="62" rx="10" ry="11" fill="#fff"/><circle class="pyra-pu" cx="76" cy="62" r="5" fill="#0B1B33"/></g>' +
    '<path d="M50 84 Q60 92 70 84" stroke="#E4CE9A" stroke-width="4" fill="none" stroke-linecap="round"/></svg>';

  function iniciar() {
    var st = document.createElement("style");
    st.textContent = css;
    document.head.appendChild(st);

    var fab = document.createElement("div");
    fab.className = "pyra-fab" + (marca === "itm" ? " pyra-itm" : "");
    var en = function () { return (document.documentElement.lang || "").toLowerCase().indexOf("en") === 0; };
    fab.innerHTML = '<div class="pyra-bubble" role="status"><button type="button" aria-label="×">×</button><b></b><span></span></div>' +
      '<button type="button" class="pyra-btn" aria-label="Abrir a Pyra, la asistente de servicios y precios">' + cara + '<span class="pyra-ping"></span></button>';
    document.body.appendChild(fab);
    var bubble = fab.querySelector(".pyra-bubble"), btn = fab.querySelector(".pyra-btn"), ping = fab.querySelector(".pyra-ping");
    function textos() {
      bubble.querySelector("b").textContent = en() ? "Hi! I'm Pyra 👋" : "¡Hola! Soy Pyra 👋";
      bubble.querySelector("span").textContent = en() ? "Want help choosing a service and seeing prices?" : "¿Te ayudo a elegir tu servicio y ver precios?";
      btn.setAttribute("aria-label", en() ? "Open Pyra, the services and pricing assistant" : "Abrir a Pyra, la asistente de servicios y precios");
    }
    textos();
    new MutationObserver(textos).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });

    var cerrado = false;
    try { cerrado = sessionStorage.getItem(KEY) === "1"; } catch (e) {}
    if (cerrado) ping.style.display = "none";
    else setTimeout(function () { bubble.classList.add("show"); }, 3500);
    bubble.querySelector("button").addEventListener("click", function (e) {
      e.stopPropagation();
      bubble.classList.remove("show");
      try { sessionStorage.setItem(KEY, "1"); } catch (er) {}
    });
    bubble.addEventListener("click", function () { abrir(); });
    btn.addEventListener("click", function () { abrir(); });

    // los ojos siguen el cursor
    addEventListener("pointermove", function (e) {
      var r = btn.getBoundingClientRect(), k = r.width / 120 * 0.8;
      fab.querySelectorAll(".pyra-eye").forEach(function (g) {
        var cx = r.left + r.width * 0.1 + g.getAttribute("data-cx") * k, cy = r.top + r.height * 0.1 + g.getAttribute("data-cy") * k;
        var a = Math.atan2(e.clientY - cy, e.clientX - cx), d = Math.min(4, Math.hypot(e.clientX - cx, e.clientY - cy) / 40);
        g.querySelector(".pyra-pu").setAttribute("transform", "translate(" + (Math.cos(a) * d).toFixed(2) + " " + (Math.sin(a) * d).toFixed(2) + ")");
      });
    }, { passive: true });

    var ov = null, antes = null;
    function abrir(ver) {
      if (ov) return;
      antes = document.activeElement;
      bubble.classList.remove("show");
      ping.style.display = "none";
      try { sessionStorage.setItem(KEY, "1"); } catch (e) {}
      ov = document.createElement("div");
      ov.className = "pyra-ov";
      ov.setAttribute("role", "dialog");
      ov.setAttribute("aria-modal", "true");
      ov.setAttribute("aria-label", "Pyra: servicios y precios");
      // Pyra habla el idioma que tenga la página en ese momento (las dos webs cambian <html lang> con su botón ES/EN).
      var lang = (document.documentElement.lang || navigator.language || "es").toLowerCase().indexOf("en") === 0 ? "en" : "es";
      var src = base + "?embed=1&lang=" + lang + (marca ? "&marca=" + encodeURIComponent(marca) : "") + (ver ? "&ver=" + encodeURIComponent(ver) : "");
      ov.innerHTML = '<iframe class="pyra-frame" title="Pyra: servicios y precios" src="' + src + '"></iframe>';
      ov.addEventListener("click", function (e) { if (e.target === ov) cerrar(); });
      document.body.appendChild(ov);
      document.documentElement.style.overflow = "hidden";
      requestAnimationFrame(function () { ov.classList.add("show"); ov.querySelector("iframe").focus(); });
    }
    function cerrar() {
      if (!ov) return;
      var o = ov; ov = null;
      o.classList.remove("show");
      document.documentElement.style.overflow = "";
      setTimeout(function () { o.remove(); }, reduced ? 0 : 300);
      if (antes && antes.focus) antes.focus();
    }
    addEventListener("message", function (e) { if (e.data === "pyra:cerrar") cerrar(); });
    addEventListener("keydown", function (e) { if (e.key === "Escape") cerrar(); });
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href="#pyra"],[data-pyra]');
      if (!a) return;
      e.preventDefault();
      abrir(a.getAttribute("data-pyra") || "");
    });
    window.Pyra = { abrir: abrir, cerrar: cerrar };
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
