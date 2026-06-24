import { createRoot } from "react-dom/client";

function App() {
  return (
    <main className="page">
      <section className="stage stage-fly" aria-hidden="true">
        <div className="stage-content"></div>
      </section>

      <section className="stage stage-photo">
        <div className="stage-content stage-photo-content">
          <div className="caption-block">
            <div className="photo-caption">Você está convidado pro meu aniversário</div>
          </div>
          <div className="photo-card">
            <img src="imagens/luan-santana3.jpg" alt="Luan Santana" />
          </div>
        </div>
      </section>

      <section className="stage stage-details">
        <div className="balloons" aria-hidden="true">
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} className="balloon"></span>
          ))}
        </div>
        <div className="stage-content">
          <div className="details-layout">
            <div className="details-header">
              <div className="details-title">Giovana faz 20</div>
              <div className="details-subtitle">Luan Santana Edition</div>
            </div>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Data</span>
                <span className="detail-value">24/05/26</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Horário</span>
                <span className="detail-value">A partir das 12h</span>
              </div>
              <div className="detail-item detail-item--full">
                <span className="detail-label">Local</span>
                <span className="detail-value">
                  R. Orlando Pacini, 336
                  <br />
                  <span className="detail-value-compact">Vila Melo, Mogi Mirim - SP</span>
                </span>
              </div>
            </div>
            <div className="detail-item detail-item--actions">
              <div className="detail-actions" style={{ width: "100%", justifyContent: "center", gap: "24px", flexWrap: "wrap" }}>
                <button className="detail-action-btn" id="btn-calendar" aria-label="Adicionar ao calendário" style={{ margin: "0" }}>
                  <div className="detail-action-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                      <line x1="8" y1="14" x2="8" y2="14" />
                    </svg>
                  </div>
                  <span className="detail-action-label">Adicionar ao<br />calendário</span>
                </button>
                <button className="detail-action-btn" id="btn-copy" aria-label="Copiar endereço">
                  <div className="detail-action-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                  </div>
                  <span className="detail-action-label">Copiar<br />endereço</span>
                </button>
                <a className="detail-action-btn" id="btn-map" href="#" aria-label="Abrir no mapa">
                  <div className="detail-action-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <span className="detail-action-label">Abrir<br />mapa</span>
                </a>
              </div>
            </div>
            <div className="details-card">
              <div className="details-footer">
                <div className="footer-note">
                  Traga <strong>roupa de banho</strong> e, se quiser beber, traga seu <strong>copo</strong> e a sua <strong>bebida alcoólica</strong>.
                </div>
                <div className="footer-photo">
                  <img src="imagens/luan-na-piscina.jpg" alt="Luan Santana na piscina" className="active" />
                  <img src="imagens/luan-na-piscina2.jpg" alt="Luan Santana na piscina" />
                  <img src="imagens/luan-na-piscina3.webp" alt="Luan Santana na piscina" />
                </div>
              </div>
            </div>
            <div className="details-card">
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "24px 18px" }}>
                <div className="footer-note" style={{ textAlign: "center", marginBottom: "0", fontSize: "1.15rem" }}>
                  Confirme sua presença até <strong>20/05</strong>.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);

// ── lógica de interação ──
const fly          = document.querySelector(".luan-fly");
const audio        = document.getElementById("luan-audio");
const openInvite   = document.getElementById("open-invite");
const soundToggle  = document.getElementById("sound-toggle");
const miniPlayer   = document.getElementById("mini-player");
const miniPlayToggle = document.getElementById("mini-play-toggle");
const pauseBar1    = document.getElementById("pause-bar-1");
const pauseBar2    = document.getElementById("pause-bar-2");
const playTriangle = document.getElementById("play-triangle");
let audioUnlocked  = false;

const setPlayIcon = (playing) => {
  if (!pauseBar1 || !pauseBar2 || !playTriangle) return;
  pauseBar1.style.display    = playing ? "" : "none";
  pauseBar2.style.display    = playing ? "" : "none";
  playTriangle.style.display = playing ? "none" : "";
  miniPlayToggle?.setAttribute("aria-label", playing ? "Pausar" : "Tocar");
};

const unlockAudio = () => {
  if (audioUnlocked) return Promise.resolve();
  audioUnlocked = true;
  audio.muted = true;
  return (audio.play() || Promise.resolve())
    .catch(() => {})
    .finally(() => {
      audio.pause();
      audio.currentTime = 0;
      audio.muted = false;
    });
};

const startAudio = () => {
  const doPlay = () => {
    audio.currentTime = Math.min(6, audio.duration || 0);
    const p = audio.play();
    if (p) p.catch(() => { if (soundToggle) soundToggle.hidden = false; });
    setPlayIcon(true);
  };
  if (audio.readyState >= 3) {
    doPlay();
  } else {
    audio.addEventListener("canplay", doPlay, { once: true });
    audio.load();
  }
};

const beginSequence = () => {
  document.body.classList.add("started");
  startAudio();
};

openInvite?.addEventListener("click", () => unlockAudio().finally(() => beginSequence()));
document.addEventListener("touchstart", () => unlockAudio(), { once: true, passive: true });
soundToggle?.addEventListener("click", () => { soundToggle.hidden = true; startAudio(); });
miniPlayToggle?.addEventListener("click", () => {
  if (audio.paused) { audio.play(); setPlayIcon(true); }
  else              { audio.pause(); setPlayIcon(false); }
});

fly?.addEventListener("animationend", () => {
  if (miniPlayer) miniPlayer.hidden = false;
});

// slideshow das fotos da piscina
setTimeout(() => {
  const slides = document.querySelectorAll(".footer-photo img");
  if (slides.length > 1) {
    let current = 0;
    setInterval(() => {
      slides[current].classList.remove("active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("active");
    }, 2500);
  }
}, 200);

// delegação de eventos para os botões de ação
document.addEventListener("click", (e) => {
  const calBtn = e.target.closest("#btn-calendar");
  if (calBtn) {
    e.preventDefault();
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Giovana 20//PT",
      "BEGIN:VEVENT",
      "DTSTART:20260524T120000",
      "DTEND:20260524T210000",
      "SUMMARY:Giovana faz 20",
      "DESCRIPTION:Luan Santana Edition — Traga roupa de banho e sua bebida!",
      "LOCATION:R. Orlando Pacini\\, 336 - Vila Melo\\, Mogi Mirim - SP\\, 13800-382",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = "giovana-faz-20.ics";
    a.click();
    URL.revokeObjectURL(url);
  }

  const copyBtn = e.target.closest("#btn-copy");
  if (copyBtn) {
    const text = "R. Orlando Pacini, 336 - Vila Melo, Mogi Mirim - SP, 13800-382";
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
    copyBtn.classList.add("copied");
    const toast = document.getElementById("copy-toast");
    if (toast) {
      toast.classList.add("show");
      clearTimeout(toast._timer);
      toast._timer = setTimeout(() => {
        toast.classList.remove("show");
        copyBtn.classList.remove("copied");
      }, 2000);
    }
  }

  const mapBtn = e.target.closest("#btn-map");
  if (mapBtn) {
    e.preventDefault();
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const addr  = encodeURIComponent("R. Orlando Pacini, 336 - Vila Melo, Mogi Mirim - SP, 13800-382");
    window.location.href = isIOS
      ? "https://maps.apple.com/?q=" + addr
      : "https://maps.google.com/?q=" + addr;
  }
});

function fallbackCopy(text) {
  const el = document.createElement("textarea");
  el.value = text;
  el.style.position = "fixed";
  el.style.opacity  = "0";
  document.body.appendChild(el);
  el.focus();
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
}
