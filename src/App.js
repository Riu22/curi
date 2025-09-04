import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Utilidades ---
const pick = (arr, avoid) => {
  if (!arr.length) return null;
  let choice = arr[Math.floor(Math.random() * arr.length)];
  // evita repetir el mismo mensaje/variant consecutivo
  if (avoid && arr.length > 1) {
    while (choice === avoid) choice = arr[Math.floor(Math.random() * arr.length)];
  }
  return choice;
};

// --- Mensajes motivadores ---
const MESSAGES = [
  "Eres más fuerte de lo que piensas 💖",
  "Respira hondo: lo estás haciendo bien ✨",
  "Poquito a poquito: todo mejora 🐾",
  "Tu sonrisa cambia el día de alguien ☀️",
  "Hoy mereces una dosis extra de mimos 💕",
  "Nada es para siempre: las nubes también pasan ⛅",
  "Orgullx de ti por seguir intentándolo 🌸",
  "Tómate tu tiempo, tú importas 🌟",
  "Eres luz, aunque hoy no lo sientas 🔆",
  "Tu corazón es un lugar seguro 🫶",
];

// --- Variantes de gatito kawaii (SVG) ---
function KawaiiCat({ variant = "tabby", onClick }) {
  const palette = {
    tabby: { fill: "#F8C77E" },
    white: { fill: "#FFF8EF" },
    gray: { fill: "#D9DEE8" },
    peach: { fill: "#FFD6C9" },
  }[variant];

  return (
    <motion.svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      className="w-48 h-48 sm:w-56 sm:h-56 drop-shadow-lg cursor-pointer"
      initial={{ scale: 0.9, rotate: -2 }}
      animate={{ scale: [0.95, 1, 0.95], rotate: [-2, 2, -2] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* cuerpo */}
      <motion.ellipse cx="100" cy="110" rx="70" ry="60" fill={palette.fill} />
      {/* orejas */}
      <path d="M55 70 L80 30 L95 70 Z" fill={palette.fill} />
      <path d="M105 70 L120 30 L145 70 Z" fill={palette.fill} />
      {/* carita */}
      <circle cx="80" cy="105" r="6" fill="#4B4B4B" />
      <circle cx="120" cy="105" r="6" fill="#4B4B4B" />
      <path d="M95 115 Q100 122 105 115" stroke="#4B4B4B" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* mejillas */}
      <circle cx="70" cy="118" r="7" fill="#F9A8D4" opacity="0.8" />
      <circle cx="130" cy="118" r="7" fill="#F9A8D4" opacity="0.8" />
      {/* patitas */}
      <rect x="65" y="150" width="20" height="15" rx="6" fill={palette.fill} />
      <rect x="115" y="150" width="20" height="15" rx="6" fill={palette.fill} />
      {/* cola */}
      <motion.path
        d="M165 135 q15 10 0 25 q-10 10 -20 0"
        fill="none"
        stroke={palette.fill}
        strokeWidth="12"
        strokeLinecap="round"
        initial={{ rotate: -10, originX: 160, originY: 140 }}
        animate={{ rotate: [ -10, 10, -10 ] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* parpadeo */}
      <AnimatePresence>
        <motion.rect
          x="74" y="100" width="12" height="12" rx="3" fill="#F8C77E"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 1, 0] }}
          transition={{ duration: 5, repeat: Infinity, times: [0, 0.85, 0.9, 1] }}
        />
        <motion.rect
          x="114" y="100" width="12" height="12" rx="3" fill="#F8C77E"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 1, 0] }}
          transition={{ duration: 5, repeat: Infinity, times: [0, 0.85, 0.9, 1] }}
        />
      </AnimatePresence>
    </motion.svg>
  );
}

// Estrellitas/partículas flotando de fondo
function FloatingBits() {
  const items = useMemo(() =>
    Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 8 + Math.random() * 10,
      delay: Math.random() * 4,
      duration: 6 + Math.random() * 6,
      char: Math.random() > 0.5 ? "★" : "✦",
    })), []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((it) => (
        <motion.div
          key={it.id}
          className="absolute opacity-40"
          style={{ left: `${it.x}%`, fontSize: it.size }}
          initial={{ y: "110%", rotate: -10 }}
          animate={{ y: "-10%", rotate: 10 }}
          transition={{ duration: it.duration, delay: it.delay, repeat: Infinity, ease: "linear" }}
        >
          {it.char}
        </motion.div>
      ))}
    </div>
  );
}

// Corazones que salen al hacer click en el gato
function TapHearts({ taps }) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <AnimatePresence>
        {taps.map((t) => (
          <motion.div
            key={t.id}
            className="absolute"
            style={{ left: t.x, top: t.y }}
            initial={{ y: 0, opacity: 1, scale: 0.6 }}
            animate={{ y: -80, opacity: 0, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <span className="select-none">💗</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const [message, setMessage] = useState(pick(MESSAGES));
  const [variant, setVariant] = useState(pick(["tabby", "white", "gray", "peach"]));
  const [last, setLast] = useState({ msg: message, var: variant });
  const [taps, setTaps] = useState([]);

  useEffect(() => {
    setLast({ msg: message, var: variant });
  }, [message, variant]);

  const refresh = () => {
    setMessage(pick(MESSAGES, last.msg));
    setVariant(pick(["tabby", "white", "gray", "peach"], last.var));
  };

  const handleCatClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Math.random().toString(36).slice(2);
    setTaps((prev) => [...prev, { id, x, y }]);
    // limpiar corazón después de la animación
    setTimeout(() => setTaps((prev) => prev.filter((p) => p.id !== id)), 1300);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4"
      style={{
        background: "linear-gradient(180deg, #FFE6F1 0%, #EAF3FF 60%, #F5EEFF 100%)",
      }}
    >
      <FloatingBits />

      <div className="max-w-xl w-full text-center relative">
        <motion.div
          className="mx-auto relative"
          onClick={handleCatClick}
        >
          <KawaiiCat variant={variant} />
          <TapHearts taps={taps} />
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.p
            key={message}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="mt-6 text-lg sm:text-xl md:text-2xl font-medium text-neutral-700"
          >
            {message}
          </motion.p>
        </AnimatePresence>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={refresh}
            className="px-5 py-2 rounded-2xl bg-white/70 backdrop-blur border border-white/80 shadow-sm text-sm md:text-base"
          >
            Otro mensajito ✨
          </motion.button>
          <motion.a
            whileTap={{ scale: 0.96 }}
            href="#"
            onClick={(e) => { e.preventDefault(); refresh(); }}
            className="px-5 py-2 rounded-2xl bg-pink-100/80 border border-pink-200 shadow-sm text-sm md:text-base"
          >
            Abrazito virtual 🐱💞
          </motion.a>
        </div>

        <p className="mt-5 text-xs text-neutral-500">Haz clic en el gatito para enviar corazones.</p>
      </div>

      {/* brillo suave radial */}
      <div className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(600px 300px at 50% 20%, rgba(255,255,255,0.65), transparent)",
        }}
      />
    </div>
  );
}
