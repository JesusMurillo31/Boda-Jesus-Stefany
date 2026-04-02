// ==============================================================
// ====== Script que crea el mensaje y boton de bienvenida ======
// ==============================================================
document.body.classList.add("modal-activo");
function entrarInvitacion(){

    const bienvenida = document.getElementById("Bienvenida");

    bienvenida.style.opacity = "0";
    bienvenida.style.transition = "opacity 2.3s ease";

    audio.play();
    boton.innerHTML = "❚❚ Detener";

    setTimeout(()=>{
        bienvenida.style.display = "none";
        document.body.classList.remove("modal-activo");
    },1800);

}

// ==========================================================
// ====== Reproduccion de musica despues de bienvenida ======
// ==========================================================
var audio = document.getElementById("musica");
var boton = document.getElementById("botonMusica");

function toggleMusica(){

    if(audio.paused){
        audio.play().catch(()=>{}); // Maneja el error si el navegador bloquea la reproducción automática
        boton.innerHTML = "❚❚ Detener"; // icono pausa
    }
    else{
        audio.pause();
        boton.innerHTML = "Reproducir"; // icono play
    }

}

// =====================================================
// ====== Galeria de fotos tipo slide con botones ======
// =====================================================
const slides = document.querySelector(".slides_galeria");
const slideList = document.querySelectorAll(".slide");

slideList.length

let index = 0;

function moverSlide(direccion){

  index += direccion;

  if(index < 0){
    index = slideList.length - 1;
  }

  if(index >= slideList.length){
    index = 0;
  }

  slides.style.transform = `translateX(-${index * 100}%)`;
}

// =======================================================
// ====== Cuenta regresiva para la fecha del evento ======
// =======================================================
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
  let timer = setInterval(tick, 1000);

  // (Opcional) Pausa si la pestaña no está visible para ahorrar batería
  document.addEventListener('visibilitychange', () => {
    if(document.hidden){
      clearInterval(timer);
    }else{
      tick();
      timer = setInterval(tick, 1000);
    }
  });
})();

// =============================================================
// ====== Abrir formulario para confirmacion de invitados ======
// =============================================================
function abrirFormulario(){
    const modal = document.getElementById('modalFormulario');
    modal.classList.add('activo');
}

// ==============================================================
// ====== Cerrar formulario para confirmacion de invitados ======
// ==============================================================
function cerrarFormulario(event){
  if(event) event.stopPropagation(); // Evita que el clic se propague al modal
    const modal = document.getElementById('modalFormulario');
    modal.classList.remove('activo');
}

// ==========================================================
// ====== Funcionamiento del boton de lluvia de sobres ======
// ==========================================================
const botonSobres = document.querySelector(".botonSobres");
const SobresNota = document.getElementById("SobresNota");
const CerrarNota = SobresNota.querySelector(".CerrarNota");

botonSobres.addEventListener("click", () => {
  SobresNota.classList.add("activo");
});

SobresNota.addEventListener("click", (e) => {
  if (e.target === SobresNota) {
    SobresNota.classList.remove("activo");
  }
});

CerrarNota.addEventListener("click", () => {
  SobresNota.classList.remove("activo");
});

// ================================================
// ====== Animacion de texto al hacer scroll ======
// ================================================
document.addEventListener("DOMContentLoaded", () => {
    const elementos = document.querySelectorAll(".reveal, .reveal-img");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("activo");
                observer.unobserve(entry.target); // solo animar una vez
            }
        });
    }, {
        threshold: 0.05
    });

    elementos.forEach(el => observer.observe(el));
});
