/**
 * ContactPage.tsx
 * Premium contact page with:
 *  - EmailJS-powered contact form
 *  - Paper airplane send animation
 *  - Confetti on success
 *  - Toast notifications
 *  - Full validation + accessibility
 */

import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useId,
} from 'react';
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti';
import FadeIn from '../components/FadeIn';
import { Mail, Phone, MapPin } from 'lucide-react';

/* ─────────────────────────────────────────────
   📌 EMAILJS CONFIG — replace with your real values
   Get them from: https://www.emailjs.com/
   ───────────────────────────────────────────── */
const EMAILJS_SERVICE_ID  = 'service_tfbrrvl';   // ← your Service ID
const EMAILJS_TEMPLATE_ID = 'template_4b03jcp';   // ← your Template ID
const EMAILJS_PUBLIC_KEY  = 'r_qcLniSu8nM3USYM';  // ← your Public Key

/* ─────────────────────────────────────────────
   Contact details
   ───────────────────────────────────────────── */
const MY_EMAIL         = 'shivansh0962@gmail.com';
const MY_PHONE         = '+918081654984';
const MY_PHONE_DISPLAY = '+91 8081 654 984';
const MY_WHATSAPP      = 'https://wa.me/918081654984';
const MY_GITHUB        = 'https://github.com/TITAN247';
const MY_LINKEDIN      = 'https://www.linkedin.com/in/shivansh-chaurasiya-2345722a9/';

/* ─────────────────────────────────────────────
   Types
   ───────────────────────────────────────────── */
type SendState = 'idle' | 'sending' | 'success' | 'error';

interface FormFields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface Toast {
  id: number;
  type: 'success' | 'error';
  message: string;
  exiting?: boolean;
}

/* ─────────────────────────────────────────────
   Inline SVG Icons
   ───────────────────────────────────────────── */
interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

const Github: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const WhatsApp: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
    viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

/* Paper airplane SVG */
const PaperAirplane: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M22 2L11 13"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    />
    <path
      d="M22 2L15 22L11 13L2 9L22 2Z"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

/* Loading spinner */
const Spinner: React.FC = () => (
  <svg
    className="animate-spin"
    width="20" height="20" viewBox="0 0 24 24"
    fill="none" xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

/* ─────────────────────────────────────────────
   Toast component
   ───────────────────────────────────────────── */
interface ToastItemProps {
  toast: Toast;
  onDismiss: (id: number) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onDismiss }) => {
  const isSuccess = toast.type === 'success';
  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`toast-enter ${toast.exiting ? 'toast-exit' : ''}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '14px 20px',
        borderRadius: '14px',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        background: isSuccess
          ? 'rgba(16, 185, 129, 0.12)'
          : 'rgba(239, 68, 68, 0.12)',
        border: `1px solid ${isSuccess ? 'rgba(16,185,129,0.35)' : 'rgba(239,68,68,0.35)'}`,
        boxShadow: isSuccess
          ? '0 8px 32px rgba(16,185,129,0.18)'
          : '0 8px 32px rgba(239,68,68,0.18)',
        color: '#D7E2EA',
        fontSize: '14px',
        fontWeight: 500,
        minWidth: '280px',
        maxWidth: '380px',
        cursor: 'pointer',
      }}
      onClick={() => onDismiss(toast.id)}
    >
      {/* Icon */}
      <span style={{ flexShrink: 0 }}>
        {isSuccess ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="10" fill="rgba(16,185,129,0.2)" />
            <path d="M7 13l3 3 7-7" stroke="#10b981" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="10" fill="rgba(239,68,68,0.2)" />
            <path d="M12 8v5M12 16h.01" stroke="#ef4444" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span style={{ flex: 1 }}>{toast.message}</span>
      {/* Close X */}
      <span style={{ opacity: 0.5, fontSize: '16px', lineHeight: 1 }} aria-hidden="true">✕</span>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Success overlay shown after airplane animation
   ───────────────────────────────────────────── */
const SuccessOverlay: React.FC = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      padding: '40px 24px',
      textAlign: 'center',
    }}
    aria-live="polite"
  >
    {/* Animated green circle + check */}
    <div
      style={{
        width: 72, height: 72,
        borderRadius: '50%',
        background: 'rgba(16,185,129,0.12)',
        border: '2px solid rgba(16,185,129,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'scale-pop 0.55s cubic-bezier(0.34,1.56,0.64,1) forwards',
      }}
    >
      <svg width="38" height="38" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M5 13l4 4L19 7"
          stroke="#10b981"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="100"
          strokeDashoffset="100"
          style={{ animation: 'check-draw 0.5s ease-out 0.3s forwards' }}
        />
      </svg>
    </div>

    <h3
      style={{
        fontSize: '1.3rem',
        fontWeight: 700,
        color: '#D7E2EA',
        letterSpacing: '-0.02em',
      }}
    >
      Message Sent Successfully!
    </h3>
    <p style={{ color: 'rgba(215,226,234,0.55)', fontSize: '0.9rem', lineHeight: 1.6 }}>
      I'll get back to you soon. 🚀
    </p>
  </div>
);

/* ─────────────────────────────────────────────
   Validation helper
   ───────────────────────────────────────────── */
function validateForm(fields: FormFields): FormErrors {
  const errors: FormErrors = {};
  if (!fields.name.trim()) {
    errors.name = 'Please enter your name.';
  } else if (fields.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!fields.email.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!emailRegex.test(fields.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!fields.subject.trim()) {
    errors.subject = 'Please enter a subject.';
  } else if (fields.subject.trim().length < 3) {
    errors.subject = 'Subject must be at least 3 characters.';
  }

  if (!fields.message.trim()) {
    errors.message = 'Please enter your message.';
  } else if (fields.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }

  return errors;
}

/* ─────────────────────────────────────────────
   Confetti burst helper
   ───────────────────────────────────────────── */
function fireConfetti() {
  const count = 180;
  const defaults = { startVelocity: 30, spread: 360, ticks: 70, zIndex: 9999 };

  const randomInRange = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  confetti({ ...defaults, particleCount: Math.floor(count * 0.4), origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
  confetti({ ...defaults, particleCount: Math.floor(count * 0.4), origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
  setTimeout(() =>
    confetti({ ...defaults, particleCount: Math.floor(count * 0.2), origin: { x: 0.5, y: -0.1 } }),
    200
  );
}

/* ─────────────────────────────────────────────
   Reusable input field component
   ───────────────────────────────────────────── */
interface FieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

const FormField: React.FC<FieldProps> = ({ id, label, error, required, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
    <label
      htmlFor={id}
      style={{
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'rgba(215,226,234,0.45)',
      }}
    >
      {label}
      {required && <span style={{ color: '#e8a830', marginLeft: '3px' }} aria-hidden="true">*</span>}
    </label>
    {children}
    {error && (
      <p
        id={`${id}-error`}
        role="alert"
        style={{
          fontSize: '11px',
          color: '#f87171',
          marginTop: '2px',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="10" stroke="#f87171" strokeWidth="2" />
          <path d="M12 8v5M12 16h.01" stroke="#f87171" strokeWidth="2" strokeLinecap="round" />
        </svg>
        {error}
      </p>
    )}
  </div>
);

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px 16px',
  borderRadius: '12px',
  border: '1px solid rgba(215,226,234,0.1)',
  background: 'rgba(215,226,234,0.04)',
  color: '#D7E2EA',
  fontSize: '14px',
  fontFamily: "'Kanit', sans-serif",
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s, background 0.2s',
};

const inputErrorStyle: React.CSSProperties = {
  ...inputStyle,
  borderColor: 'rgba(248,113,113,0.5)',
};

/* ─────────────────────────────────────────────
   AirplaneOverlay — full-screen canvas contrail animation
   ───────────────────────────────────────────── */
interface AirplaneOverlayProps {
  startX: number;
  startY: number;
  onComplete: () => void;
}

const AirplaneOverlay: React.FC<AirplaneOverlayProps> = ({ startX, startY, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const planeRef  = useRef<HTMLDivElement>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const plane  = planeRef.current;
    if (!canvas || !plane) return;

    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d')!;

    /* Destination: top-right, well off-screen */
    const endX = W + 300;
    const endY = -300;

    /* ⏱ 8 seconds — slow, dramatic, sweeping curves */
    const FLIGHT_MS = 8000;
    let startTime: number | null = null;

    /* Trail history */
    const trail: { x: number; y: number }[] = [];
    const MAX_TRAIL = 350; // Long trailing tail

    /* Persistent sparkles */
    const sparkles: { x: number; y: number; r: number; alpha: number; decay: number }[] = [];

    /* ── Calculate parametric flight path (Cubic Bezier) ── */
    const getPos = (t: number) => {
      // P0: Start at button
      const p0 = { x: startX, y: startY };
      // P1: Swoop up towards the left side of navbar
      const p1 = { x: W * 0.2, y: 60 };
      // P2: Glide across the navbar towards the right
      const p2 = { x: W * 0.8, y: 60 };
      // P3: Exit top-right
      const p3 = { x: endX, y: endY };

      const u = 1 - t;
      const tt = t * t;
      const uu = u * u;
      const uuu = uu * u;
      const ttt = tt * t;

      const x = uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x;
      const y = uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y;

      return { x, y };
    };


    const animate = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const rawP    = Math.min(elapsed / FLIGHT_MS, 1); // linear 0→1

      /*
       * Easing:
       * Slow takeoff → Smooth cruise → Gentle exit
       */
      let p: number;
      if (rawP < 0.2) {
        // ease-in
        p = (rawP / 0.2) * (rawP / 0.2) * 0.15;
      } else if (rawP < 0.8) {
        // near-linear cruise
        const t = (rawP - 0.2) / 0.6;
        p = 0.15 + t * 0.7;
      } else {
        // ease-out
        const t = (rawP - 0.8) / 0.2;
        p = 0.85 + (1 - (1 - t) * (1 - t)) * 0.15;
      }

      /* Current position on the curved path */
      const current = getPos(p);
      const cx = current.x;
      const cy = current.y;

      /* ── Dynamic Rotation Calculation ── */
      // Look slightly behind to find the exact angle of the trajectory curve
      const prevP = Math.max(0, p - 0.005);
      const prev = getPos(prevP);
      let angle = Math.atan2(cy - prev.y, cx - prev.x);
      
      // If we are at the very start, look slightly ahead instead
      if (p === 0) {
        const next = getPos(0.005);
        angle = Math.atan2(next.y - cy, next.x - cx);
      }

      /* 
       * The SVG airplane naturally points at -45 degrees (top-right).
       * We add 45 degrees to offset it so 0deg = pointing right.
       * Plus a gentle wobble for turbulence.
       */
      const wobble = Math.sin(rawP * Math.PI * 8) * 8;
      const rotation = (angle * 180 / Math.PI) + 45 + wobble;

      /* Scale: plane grows slightly as it flies mid-flight */
      const scale = 1 + Math.sin(rawP * Math.PI) * 0.2;

      /* Opacity: fully visible until the very end */
      const opacity = rawP > 0.92 ? 1 - (rawP - 0.92) / 0.08 : 1;

      /* ── Update trail ── */
      trail.push({ x: cx, y: cy });
      if (trail.length > MAX_TRAIL) trail.shift();

      /* ── Spawn sparkles near the plane tip ── */
      if (Math.random() < 0.6 && opacity > 0.1) {
        sparkles.push({
          x:     cx + (Math.random() - 0.5) * 16,
          y:     cy + (Math.random() - 0.5) * 16,
          r:     Math.random() * 3.5 + 1,
          alpha: Math.random() * 0.8 + 0.4,
          decay: Math.random() * 0.015 + 0.008,
        });
      }

      /* Age sparkles */
      for (let i = sparkles.length - 1; i >= 0; i--) {
        sparkles[i].alpha -= sparkles[i].decay;
        if (sparkles[i].alpha <= 0) sparkles.splice(i, 1);
      }

      /* ── Draw ── */
      ctx.clearRect(0, 0, W, H);

      /* — Contrail: drawn back-to-front so newer = brighter — */
      if (trail.length > 1) {
        for (let i = 1; i < trail.length; i++) {
          const t  = i / trail.length;     // 0=oldest, 1=newest
          const a  = t * opacity;          // older points fade
          const lw = t * 7;               // taper: thin at tail, thick near plane

          /* Wide soft outer glow (subtle) */
          ctx.beginPath();
          ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
          ctx.lineTo(trail[i].x, trail[i].y);
          ctx.strokeStyle = `rgba(232, 150, 20, ${a * 0.1})`;
          ctx.lineWidth   = lw * 3.5;
          ctx.lineCap     = 'round';
          ctx.lineJoin    = 'round';
          ctx.stroke();

          /* Medium amber mid-glow */
          ctx.beginPath();
          ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
          ctx.lineTo(trail[i].x, trail[i].y);
          ctx.strokeStyle = `rgba(255, 190, 60, ${a * 0.25})`;
          ctx.lineWidth   = lw * 1.5;
          ctx.stroke();

          /* Bright core - slightly duller now */
          ctx.beginPath();
          ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
          ctx.lineTo(trail[i].x, trail[i].y);
          ctx.strokeStyle = `rgba(255, 235, 140, ${a * 0.45})`;
          ctx.lineWidth   = lw * 0.5;
          ctx.stroke();
        }
      }

      /* — Sparkles — */
      for (const sp of sparkles) {
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 245, 180, ${sp.alpha})`;
        ctx.fill();
      }

      /* ── Move the airplane div ── */
      plane.style.left      = `${cx}px`;
      plane.style.top       = `${cy}px`;
      plane.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`;
      plane.style.opacity   = String(Math.max(0, opacity));

      if (rawP < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, W, H);
        onComplete();
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [startX, startY, onComplete]);

  return (
    <>
      {/* Full-viewport canvas for contrail + sparkles */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 9990,
        }}
      />

      {/* Airplane icon — JS-positioned over the canvas */}
      <div
        ref={planeRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9991,
          /* Removed glowing filter, replaced with simple structural shadow */
          filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))',
          willChange: 'transform, opacity',
        }}
      >
        {/* Smaller plane — 42px base size */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          width="42"
          height="42"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Fold-line highlight */}
          <path
            d="M22 2L11 13"
            stroke="#fff8d0"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Main body */}
          <path
            d="M22 2L15 22L11 13L2 9L22 2Z"
            stroke="#f5c842"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="rgba(245,200,66,0.30)"
          />
        </svg>
      </div>
    </>
  );
};

/* ─────────────────────────────────────────────
   Main ContactPage component
   ───────────────────────────────────────────── */
const ContactPage: React.FC = () => {
  /* ── Form state ── */
  const [fields, setFields] = useState<FormFields>({
    name: '', email: '', subject: '', message: '',
  });
  const [errors, setErrors]       = useState<FormErrors>({});
  const [touched, setTouched]     = useState<Record<string, boolean>>({});
  const [sendState, setSendState] = useState<SendState>('idle');
  const [toasts, setToasts]       = useState<Toast[]>([]);
  const [btnShake, setBtnShake]   = useState(false);
  const [airplaneActive, setAirplaneActive] = useState(false);
  const [planeStart, setPlaneStart] = useState<{ x: number; y: number } | null>(null);

  /* Prevent duplicate submissions */
  const submittingRef = useRef(false);
  const toastCounterRef = useRef(0);
  const btnRef = useRef<HTMLButtonElement>(null);

  /* Unique IDs for accessibility */
  const uid = useId();
  const nameId    = `${uid}-name`;
  const emailId   = `${uid}-email`;
  const subjectId = `${uid}-subject`;
  const msgId     = `${uid}-message`;

  /* ── Toast helpers ── */
  const addToast = useCallback((type: 'success' | 'error', message: string) => {
    const id = ++toastCounterRef.current;
    setToasts(prev => [...prev, { id, type, message }]);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t));
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 320);
    }, 5000);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t));
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 320);
  }, []);

  /* ── Field change handler ── */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFields(prev => ({ ...prev, [name]: value }));

      // Re-validate on change once field has been touched
      if (touched[name]) {
        setErrors(prev => {
          const next = { ...prev };
          const tempFields = { ...fields, [name]: value };
          const newErrs = validateForm(tempFields);
          if (newErrs[name as keyof FormErrors]) {
            next[name as keyof FormErrors] = newErrs[name as keyof FormErrors];
          } else {
            delete next[name as keyof FormErrors];
          }
          return next;
        });
      }
    },
    [fields, touched]
  );

  /* ── Field blur handler (mark as touched) ── */
  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name } = e.target;
      setTouched(prev => ({ ...prev, [name]: true }));
      const newErrs = validateForm({ ...fields, [name]: fields[name as keyof FormFields] });
      setErrors(prev => ({
        ...prev,
        [name]: newErrs[name as keyof FormErrors],
      }));
    },
    [fields]
  );

  /* ── Focus ring style for inputs ── */
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const getInputStyle = (fieldName: string): React.CSSProperties => {
    const hasError = !!errors[fieldName as keyof FormErrors];
    const isFocused = focusedField === fieldName;
    return {
      ...(hasError ? inputErrorStyle : inputStyle),
      borderColor: isFocused
        ? hasError ? 'rgba(248,113,113,0.7)' : 'rgba(232,168,48,0.6)'
        : hasError ? 'rgba(248,113,113,0.5)' : 'rgba(215,226,234,0.1)',
      boxShadow: isFocused
        ? hasError
          ? '0 0 0 3px rgba(248,113,113,0.12)'
          : '0 0 0 3px rgba(232,168,48,0.12)'
        : 'none',
      background: isFocused ? 'rgba(215,226,234,0.07)' : 'rgba(215,226,234,0.04)',
    };
  };

  /* ── Form submission ── */
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      // Prevent duplicate submissions
      if (submittingRef.current || airplaneActive) return;

      // Mark all fields as touched and validate
      setTouched({ name: true, email: true, subject: true, message: true });
      const formErrors = validateForm(fields);
      setErrors(formErrors);

      if (Object.keys(formErrors).length > 0) {
        // Shake button on invalid form
        setBtnShake(true);
        setTimeout(() => setBtnShake(false), 600);
        return;
      }

      // Lock submission
      submittingRef.current = true;
      setSendState('sending');

      // ✈️ LAUNCH AIRPLANE IMMEDIATELY — email sends in background while plane flies
      if (btnRef.current) {
        const rect = btnRef.current.getBoundingClientRect();
        setPlaneStart({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      }
      setAirplaneActive(true);

      // Fire email in the background (no await — animation plays simultaneously)
      emailjs
        .send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            from_name:  fields.name.trim(),
            from_email: fields.email.trim(),
            subject:    fields.subject.trim(),
            message:    fields.message.trim(),
            reply_to:   fields.email.trim(),
          },
          { publicKey: EMAILJS_PUBLIC_KEY }
        )
        .then(() => {
          // ✅ Email sent — show success AFTER plane finishes crossing the screen (~8.5s)
          setTimeout(() => {
            setSendState('success');
            fireConfetti();
            addToast('success', "✉️ Message sent! I'll get back to you soon.");
            setFields({ name: '', email: '', subject: '', message: '' });
            setTouched({});
            setErrors({});
          }, 8500);

          // Reset everything after 13s total
          setTimeout(() => {
            setSendState('idle');
            setAirplaneActive(false);
            setPlaneStart(null);
            submittingRef.current = false;
          }, 13000);
        })
        .catch((err: unknown) => {
          console.error('EmailJS error:', err);

          // ❌ Abort airplane, restore button, show error
          setAirplaneActive(false);
          setPlaneStart(null);
          setSendState('error');
          setBtnShake(true);
          addToast('error', '⚠️ Failed to send. Please try again or email me directly.');

          setTimeout(() => {
            setBtnShake(false);
            setSendState('idle');
            submittingRef.current = false;
          }, 700);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fields, airplaneActive, addToast]
  );

  /* ── Keyboard: allow Enter to submit from inputs ── */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        btnRef.current?.click();
      }
    },
    []
  );

  /* ── Cleanup on unmount ── */
  useEffect(() => {
    return () => {
      submittingRef.current = false;
    };
  }, []);

  /* ── Derived button state ── */
  const isSending = sendState === 'sending';
  const isSuccess = sendState === 'success';

  /* ─────────────────────────────────────────────
     Render
     ───────────────────────────────────────────── */
  return (
    <>
      {/* ── Toast Container (bottom-right) ── */}
      <div
        aria-live="polite"
        aria-atomic="false"
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '24px',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          pointerEvents: 'none',
        }}
      >
        {toasts.map(toast => (
          <div key={toast.id} style={{ pointerEvents: 'auto' }}>
            <ToastItem toast={toast} onDismiss={dismissToast} />
          </div>
        ))}
      </div>

      {/* ── Airplane overlay — rendered at TOP LEVEL so position:fixed is not clipped
           by backdropFilter on the form card (backdropFilter creates a new containing block) ── */}
      {airplaneActive && planeStart && (
        <AirplaneOverlay
          startX={planeStart.x}
          startY={planeStart.y}
          onComplete={() => { /* success state handled by setTimeout in handleSubmit */ }}
        />
      )}

      {/* ── Main page ── */}
      <main
        id="contact-page-main"
        className="flex-1 w-full bg-[#0C0C0C] text-[#D7E2EA] px-6 md:px-12 pt-32 pb-16 md:pt-36 md:pb-24 max-w-7xl mx-auto"
        aria-labelledby="contact-page-heading"
      >
        {/* Page Title */}
        <div className="flex flex-col items-center text-center gap-6 mb-16 md:mb-24">
          <FadeIn delay={0.1} y={30}>
            <h1
              id="contact-page-heading"
              className="hero-heading font-black uppercase leading-none tracking-tight"
              style={{ fontSize: 'clamp(3rem, 8vw, 120px)' }}
            >
              Get In Touch
            </h1>
          </FadeIn>
          <FadeIn delay={0.2} y={30}>
            <p className="text-[#D7E2EA]/60 max-w-lg text-sm md:text-base font-light uppercase tracking-wider">
              Have a project in mind, want to collaborate, or just say hello?
            </p>
          </FadeIn>
        </div>

        {/* Content Layout: 5 col info | 7 col form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* ── LEFT: Contact info ── */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <FadeIn delay={0.3} y={20} className="border-b border-[#D7E2EA]/10 pb-4">
              <h2
                className="text-xl md:text-2xl font-bold uppercase tracking-wider"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Contact Info
              </h2>
            </FadeIn>

            <div className="flex flex-col gap-8">
              {/* Email */}
              <FadeIn delay={0.4} x={-20} className="flex items-start gap-4">
                <div className="p-3.5 bg-[#D7E2EA]/5 rounded-2xl text-[#e8a830]">
                  <Mail size={24} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-wider font-semibold text-[#D7E2EA]/40 mb-1">Email Me</h3>
                  <a
                    href={`mailto:${MY_EMAIL}`}
                    className="text-base sm:text-lg font-medium hover:text-[#e8a830] transition-colors"
                    aria-label={`Send email to ${MY_EMAIL}`}
                  >
                    {MY_EMAIL}
                  </a>
                </div>
              </FadeIn>

              {/* Phone */}
              <FadeIn delay={0.5} x={-20} className="flex items-start gap-4">
                <div className="p-3.5 bg-[#D7E2EA]/5 rounded-2xl text-[#e8a830]">
                  <Phone size={24} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-wider font-semibold text-[#D7E2EA]/40 mb-1">Call / WhatsApp</h3>
                  <a
                    href={`tel:${MY_PHONE}`}
                    className="text-base sm:text-lg font-medium hover:text-[#e8a830] transition-colors"
                    aria-label={`Call ${MY_PHONE_DISPLAY}`}
                  >
                    {MY_PHONE_DISPLAY}
                  </a>
                </div>
              </FadeIn>

              {/* Location */}
              <FadeIn delay={0.6} x={-20} className="flex items-start gap-4">
                <div className="p-3.5 bg-[#D7E2EA]/5 rounded-2xl text-[#e8a830]">
                  <MapPin size={24} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-wider font-semibold text-[#D7E2EA]/40 mb-1">Location</h3>
                  <p className="text-base sm:text-lg font-medium text-[#D7E2EA]">
                    Mohali, Chandigarh Punjab
                  </p>
                </div>
              </FadeIn>
            </div>

            {/* Social Links */}
            <FadeIn delay={0.7} y={20}>
              <h3 className="text-xs uppercase tracking-wider font-semibold text-[#D7E2EA]/40 mb-4">
                Social Networks
              </h3>
              <div className="flex gap-4">
                <a
                  href={MY_GITHUB}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#D7E2EA]/5 rounded-full text-[#D7E2EA]/60 hover:text-[#e8a830] hover:bg-[#D7E2EA]/10 transition-all"
                  aria-label="GitHub profile"
                >
                  <Github size={20} />
                </a>
                <a
                  href={MY_LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#D7E2EA]/5 rounded-full text-[#D7E2EA]/60 hover:text-[#e8a830] hover:bg-[#D7E2EA]/10 transition-all"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href={MY_WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#D7E2EA]/5 rounded-full text-[#25D366]/70 hover:text-[#25D366] hover:bg-[#D7E2EA]/10 transition-all"
                  aria-label="WhatsApp chat"
                >
                  <WhatsApp size={20} />
                </a>
              </div>
            </FadeIn>

            {/* Availability badge */}
            <FadeIn delay={0.8} y={20}>
              <div className="flex items-center gap-3 px-1">
                <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <p className="text-xs uppercase tracking-widest text-[#D7E2EA]/40 font-medium">
                  Available for new opportunities
                </p>
              </div>
            </FadeIn>
          </div>

          {/* ── RIGHT: Contact form ── */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <FadeIn delay={0.3} y={20} className="border-b border-[#D7E2EA]/10 pb-4">
              <h2
                className="text-xl md:text-2xl font-bold uppercase tracking-wider"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Send a Message
              </h2>
            </FadeIn>

            <FadeIn delay={0.4} y={30}>
              {/* Glassmorphism form card */}
              <div
                style={{
                  background: 'rgba(215,226,234,0.03)',
                  border: '1px solid rgba(215,226,234,0.08)',
                  borderRadius: '24px',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  padding: '32px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Subtle top-left glow accent */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: '-60px',
                    left: '-40px',
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(232,168,48,0.07) 0%, transparent 70%)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Success state replaces the form */}
                {isSuccess ? (
                  <SuccessOverlay />
                ) : (
                  <form
                    id="contact-form"
                    onSubmit={handleSubmit}
                    noValidate
                    aria-label="Contact form"
                    style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                  >
                    {/* Row 1: Name + Email */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}
                      className="grid-cols-contact">
                      <FormField id={nameId} label="Name" error={touched.name ? errors.name : undefined} required>
                        <input
                          id={nameId}
                          name="name"
                          type="text"
                          autoComplete="name"
                          placeholder="John Doe"
                          value={fields.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          onFocus={() => setFocusedField('name')}
                          onKeyDown={handleKeyDown}
                          disabled={isSending}
                          aria-required="true"
                          aria-invalid={touched.name && !!errors.name}
                          aria-describedby={touched.name && errors.name ? `${nameId}-error` : undefined}
                          style={getInputStyle('name')}
                        />
                      </FormField>

                      <FormField id={emailId} label="Email" error={touched.email ? errors.email : undefined} required>
                        <input
                          id={emailId}
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="john@example.com"
                          value={fields.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          onFocus={() => setFocusedField('email')}
                          onKeyDown={handleKeyDown}
                          disabled={isSending}
                          aria-required="true"
                          aria-invalid={touched.email && !!errors.email}
                          aria-describedby={touched.email && errors.email ? `${emailId}-error` : undefined}
                          style={getInputStyle('email')}
                        />
                      </FormField>
                    </div>

                    {/* Subject */}
                    <FormField id={subjectId} label="Subject" error={touched.subject ? errors.subject : undefined} required>
                      <input
                        id={subjectId}
                        name="subject"
                        type="text"
                        placeholder="Project collaboration / Freelance / Just saying hi!"
                        value={fields.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onFocus={() => setFocusedField('subject')}
                        onKeyDown={handleKeyDown}
                        disabled={isSending}
                        aria-required="true"
                        aria-invalid={touched.subject && !!errors.subject}
                        aria-describedby={touched.subject && errors.subject ? `${subjectId}-error` : undefined}
                        style={getInputStyle('subject')}
                      />
                    </FormField>

                    {/* Message */}
                    <FormField id={msgId} label="Message" error={touched.message ? errors.message : undefined} required>
                      <textarea
                        id={msgId}
                        name="message"
                        rows={6}
                        placeholder="Tell me about your project or idea..."
                        value={fields.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onFocus={() => setFocusedField('message')}
                        onBlur={(e) => { setFocusedField(null); handleBlur(e); }}
                        disabled={isSending}
                        aria-required="true"
                        aria-invalid={touched.message && !!errors.message}
                        aria-describedby={touched.message && errors.message ? `${msgId}-error` : undefined}
                        style={{
                          ...getInputStyle('message'),
                          resize: 'vertical',
                          minHeight: '140px',
                          lineHeight: '1.6',
                        }}
                      />
                    </FormField>

                    {/* ── SEND BUTTON ── */}
                    <div style={{ position: 'relative', display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>

                      <button
                        ref={btnRef}
                        id="contact-send-btn"
                        type="submit"
                        disabled={isSending || airplaneActive}
                        aria-disabled={isSending || airplaneActive}
                        aria-label={isSending ? 'Sending message, please wait…' : 'Send message'}
                        className={`${btnShake ? 'btn-shake' : ''} ${isSending ? 'btn-glow-loading' : ''}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '15px 34px',
                          borderRadius: '14px',
                          border: '1px solid rgba(232,168,48,0.35)',
                          background: isSending
                            ? 'rgba(232,168,48,0.08)'
                            : 'linear-gradient(135deg, rgba(232,168,48,0.15) 0%, rgba(232,168,48,0.08) 100%)',
                          backdropFilter: 'blur(12px)',
                          WebkitBackdropFilter: 'blur(12px)',
                          color: '#e8a830',
                          fontSize: '15px',
                          fontWeight: 600,
                          fontFamily: "'Kanit', sans-serif",
                          letterSpacing: '0.05em',
                          cursor: airplaneActive ? 'default' : isSending ? 'not-allowed' : 'pointer',
                          opacity: airplaneActive ? 0 : isSending ? 0.75 : 1,
                          pointerEvents: airplaneActive ? 'none' : 'auto',
                          transform: airplaneActive ? 'scale(0.85)' : 'scale(1)',
                          transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                          position: 'relative',
                          overflow: 'hidden',
                          boxShadow: '0 0 0 0 rgba(232,168,48,0)',
                        }}
                        onMouseEnter={e => {
                          if (!isSending && !airplaneActive) {
                            (e.currentTarget as HTMLButtonElement).style.background =
                              'linear-gradient(135deg, rgba(232,168,48,0.25) 0%, rgba(232,168,48,0.15) 100%)';
                            (e.currentTarget as HTMLButtonElement).style.boxShadow =
                              '0 0 20px 4px rgba(232,168,48,0.18), 0 4px 20px rgba(232,168,48,0.12)';
                            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                          }
                        }}
                        onMouseLeave={e => {
                          if (!isSending) {
                            (e.currentTarget as HTMLButtonElement).style.background =
                              'linear-gradient(135deg, rgba(232,168,48,0.15) 0%, rgba(232,168,48,0.08) 100%)';
                            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 0 0 rgba(232,168,48,0)';
                            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                          }
                        }}
                      >
                        {/* Button inner content — hidden when plane is in flight */}
                        {airplaneActive ? null : isSending ? (
                          <>
                            <Spinner />
                            <span>Sending…</span>
                          </>
                        ) : (
                          <>
                            <PaperAirplane width="18" height="18" />
                            <span>Send Message</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Privacy note */}
                    <p
                      style={{
                        fontSize: '11px',
                        color: 'rgba(215,226,234,0.3)',
                        textAlign: 'right',
                        letterSpacing: '0.04em',
                      }}
                    >
                      🔒 Your info is private and never shared.
                    </p>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>

        </div>
      </main>

      {/* Responsive grid fix for small screens */}
      <style>{`
        @media (max-width: 560px) {
          .grid-cols-contact {
            grid-template-columns: 1fr !important;
          }
        }
        textarea:focus {
          outline: none;
        }
        input:focus {
          outline: none;
        }
      `}</style>
    </>
  );
};

export default ContactPage;
