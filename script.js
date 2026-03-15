// ====== Movimiento de slides de galeria ======
const slides = document.querySelector(".slides_galeria");
const slide = document.querySelectorAll(".slide");

let index = 0;

function nextSlide(){
  index = (index + 1) % slide.length;
  slides.style.transform = `translateX(-${index * 100}%)`;
}

setInterval(nextSlide, 3500);

// ====== Cuenta regresiva elegante ======
(function(){
  const $ = (sel) => document.querySelector(sel);
  const el = $('#contador');
  
  if(!el) return;

  // Lee fecha/hora del dataset del HTML
  const fechaStr = el.getAttribute('data-fecha') || '2026-03-06'; // YYYY-MM-DD
  const horaStr  = el.getAttribute('data-hora')  || '22:15';      // HH:mm (24h)
  const zona     = el.getAttribute('data-zona')  || 'local';      // 'local' | 'utc'

  // Construye target en local o UTC
  // Para "local": new Date(Y, M-1, D, H, m)
  // Para "utc"  : Date.UTC(Y, M-1, D, H, m)
  const [Y,M,D] = fechaStr.split('-').map(Number);
  const [H,Min] = horaStr.split(':').map(Number);

  const target = (zona.toLowerCase() === 'utc')
    ? new Date(Date.UTC(Y, (M-1), D, H, Min, 0, 0))
    : new Date(Y, (M-1), D, H, Min, 0, 0);

  const out = {
    d: $('#cd-d'),
    h: $('#cd-h'),
    m: $('#cd-m'),
    s: $('#cd-s'),
    msg: $('#contador-msg')
  };

  // Formatea con cero a la izquierda
  const z2 = (n) => String(n).padStart(2, '0');

  function render(diffMs){
    const totalSec = Math.max(0, Math.floor(diffMs / 1000));
    const s = totalSec % 60;
    const m = Math.floor(totalSec / 60) % 60;
    const h = Math.floor(totalSec / 3600) % 24;
    const d = Math.floor(totalSec / 86400);

    if(out.d) out.d.textContent = d;
    if(out.h) out.h.textContent = z2(h);
    if(out.m) out.m.textContent = z2(m);
    if(out.s) out.s.textContent = z2(s);
  }

  function tick(){
    const now = new Date();
    const diff = target - now;
    if(diff <= 0){
      render(0);
      if(out.msg) out.msg.hidden = false;
      clearInterval(timer);
      return;
    }
    render(diff);
  }

  // Primer render inmediato y luego cada segundo
  tick();
  const timer = setInterval(tick, 1000);

  // (Opcional) Pausa si la pestaña no está visible para ahorrar batería
  document.addEventListener('visibilitychange', () => {
    if(document.hidden){
      clearInterval(timer);
    }else{
      tick();
      setInterval(tick, 1000);
    }
  });
})();

  // Abrir formulario de confirmacion
function abrirFormulario(){
    document.getElementById("modalFormulario").style.display = "block";
}

  // Cerrar formulario de confirmacion
function cerrarFormulario(){
    document.getElementById("modalFormulario").style.display = "none";
}