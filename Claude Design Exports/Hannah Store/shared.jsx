// Shared visual primitives across all 3 directions.
// Placeholder product tiles rendered in CSS — no real images.
// Each variant returns a styled tile keyed by category.

// Colorful gradient placeholder for products, with a tiny illustrative motif.
function ProductTile({ kind, palette, style, radius = 12 }) {
  const p = palette || ['#FFD166','#EF476F','#06D6A0','#118AB2','#F8961E'];
  const seed = (kind || 'x').charCodeAt(0) % p.length;
  const a = p[seed], b = p[(seed + 2) % p.length];
  const motifs = {
    painting: (
      <g>
        <rect x="22" y="22" width="56" height="56" fill="rgba(255,255,255,.85)" stroke="rgba(0,0,0,.25)" strokeWidth="2"/>
        <circle cx="42" cy="44" r="9" fill={p[(seed+1)%p.length]}/>
        <path d="M 30 70 Q 50 50 70 70" stroke={p[(seed+3)%p.length]} strokeWidth="3" fill="none"/>
      </g>
    ),
    ceramic: (
      <g>
        <ellipse cx="50" cy="74" rx="22" ry="6" fill="rgba(0,0,0,.15)"/>
        <path d="M 32 38 Q 32 30 50 30 Q 68 30 68 38 L 64 70 Q 50 76 36 70 Z" fill="rgba(255,255,255,.9)" stroke="rgba(0,0,0,.3)" strokeWidth="2"/>
        <path d="M 38 46 Q 50 50 62 46" stroke={p[(seed+1)%p.length]} strokeWidth="2.5" fill="none"/>
      </g>
    ),
    jewelry: (
      <g>
        <circle cx="50" cy="50" r="20" fill="none" stroke="rgba(255,255,255,.95)" strokeWidth="3"/>
        <circle cx="50" cy="30" r="4" fill={p[(seed+1)%p.length]} stroke="rgba(0,0,0,.3)" strokeWidth="1.5"/>
        <circle cx="62" cy="42" r="3" fill={p[(seed+3)%p.length]}/>
        <circle cx="38" cy="42" r="3" fill={p[(seed+2)%p.length]}/>
      </g>
    ),
    print: (
      <g>
        <rect x="26" y="20" width="48" height="60" fill="rgba(255,255,255,.9)" stroke="rgba(0,0,0,.25)" strokeWidth="2"/>
        <rect x="32" y="26" width="36" height="36" fill={p[(seed+1)%p.length]} opacity="0.7"/>
        <rect x="32" y="68" width="22" height="3" fill="rgba(0,0,0,.5)"/>
      </g>
    ),
    candle: (
      <g>
        <rect x="34" y="34" width="32" height="42" rx="3" fill="rgba(255,255,255,.85)" stroke="rgba(0,0,0,.3)" strokeWidth="2"/>
        <path d="M 50 22 Q 46 30 50 34 Q 54 30 50 22" fill={p[(seed+1)%p.length]}/>
        <rect x="38" y="48" width="24" height="12" fill={p[(seed+2)%p.length]} opacity=".5"/>
      </g>
    ),
  };
  const motif = motifs[kind] || motifs.painting;
  return (
    <div style={{ position:'relative', width:'100%', height:'100%', borderRadius:radius, overflow:'hidden', background:`radial-gradient(circle at 30% 25%, ${a}, ${b})`, ...style }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}>
        {motif}
      </svg>
    </div>
  );
}

// Small confetti scatter helper — random shapes & colors in an absolute layer.
function ConfettiScatter({ count = 30, palette, seed = 1, style }) {
  const colors = palette || ['#FF4D6D','#FFB703','#06D6A0','#118AB2','#8338EC','#FF8FA3'];
  const shapes = [];
  // Deterministic pseudo-random
  let s = seed * 9301 + 49297;
  const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  for (let i = 0; i < count; i++) {
    const x = rand() * 100;
    const y = rand() * 100;
    const c = colors[Math.floor(rand() * colors.length)];
    const r = rand() * 8 + 4;
    const rot = rand() * 360;
    const kind = Math.floor(rand() * 4);
    shapes.push(
      <div key={i} style={{
        position:'absolute', left:`${x}%`, top:`${y}%`, width:r, height:r,
        background: kind < 2 ? c : 'transparent',
        border: kind === 2 ? `2px solid ${c}` : 'none',
        borderRadius: kind === 0 ? '50%' : kind === 3 ? '0' : '2px',
        clipPath: kind === 3 ? 'polygon(50% 0,100% 50%,50% 100%,0 50%)' : 'none',
        transform:`rotate(${rot}deg)`,
        opacity: 0.9,
      }} />
    );
  }
  return <div style={{ position:'absolute', inset:0, pointerEvents:'none', overflow:'hidden', ...style }}>{shapes}</div>;
}

// Hand-drawn squiggle / star / sparkle SVGs.
// Each takes a `float` prop (default true) that adds a gentle, randomized floating animation.
let __floatSeed = 0;
const nextFloatVariant = () => (__floatSeed++ % 6) + 1;

const Sparkle = ({ size=24, color='#FF4D6D', style, float=true }) => {
  const v = float ? nextFloatVariant() : 0;
  const { transform, ...rest } = style || {};
  return (
    <span style={{ display:'inline-block', ...rest, transform }}>
      <svg width={size} height={size} viewBox="0 0 24 24" className={float ? `hh-float hh-float-${v}` : ''} style={{ display:'block' }}>
        <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" fill={color}/>
      </svg>
    </span>
  );
};

const Star5 = ({ size=24, color='#FFB703', style, float=true }) => {
  const v = float ? nextFloatVariant() : 0;
  const { transform, ...rest } = style || {};
  return (
    <span style={{ display:'inline-block', ...rest, transform }}>
      <svg width={size} height={size} viewBox="0 0 24 24" className={float ? `hh-float hh-float-${v}` : ''} style={{ display:'block' }}>
        <path d="M12 2 L14.5 9 L22 9.5 L16 14.5 L18 22 L12 17.5 L6 22 L8 14.5 L2 9.5 L9.5 9 Z" fill={color} stroke="rgba(0,0,0,.4)" strokeWidth="1" strokeLinejoin="round"/>
      </svg>
    </span>
  );
};

const Heart = ({ size=24, color='#FF4D6D', style, float=true }) => {
  const v = float ? nextFloatVariant() : 0;
  const { transform, ...rest } = style || {};
  return (
    <span style={{ display:'inline-block', ...rest, transform }}>
      <svg width={size} height={size} viewBox="0 0 24 24" className={float ? `hh-float hh-float-${v}` : ''} style={{ display:'block' }}>
        <path d="M12 21 C 6 16 2 12 2 8 A 5 5 0 0 1 12 6 A 5 5 0 0 1 22 8 C 22 12 18 16 12 21 Z" fill={color} stroke="rgba(0,0,0,.4)" strokeWidth="1.2"/>
      </svg>
    </span>
  );
};

const Squiggle = ({ width=80, color='#118AB2', strokeWidth=3, style, float=true }) => {
  const v = float ? nextFloatVariant() : 0;
  const { transform, ...rest } = style || {};
  return (
    <span style={{ display:'inline-block', ...rest, transform }}>
      <svg width={width} height={20} viewBox="0 0 80 20" className={float ? `hh-float hh-float-${v}` : ''} style={{ display:'block' }}>
        <path d="M 2 10 Q 12 0 22 10 T 42 10 T 62 10 T 78 10" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round"/>
      </svg>
    </span>
  );
};

const Dot = ({ size=12, color='#FF4D6D', style, float=true }) => {
  const v = float ? nextFloatVariant() : 0;
  const { transform, ...rest } = style || {};
  return (
    <span style={{ display:'inline-block', ...rest, transform }}>
      <span className={float ? `hh-float hh-float-${v}` : ''} style={{ display:'block', width:size, height:size, borderRadius:'50%', background:color }} />
    </span>
  );
};

// Inject keyframes once.
if (typeof document !== 'undefined' && !document.getElementById('hh-float-style')) {
  const s = document.createElement('style');
  s.id = 'hh-float-style';
  s.textContent = `
    @keyframes hh-float-1 { 0%,100%{transform:translate(0,0) rotate(0deg)} 50%{transform:translate(0,-10px) rotate(8deg)} }
    @keyframes hh-float-2 { 0%,100%{transform:translate(0,0) rotate(0deg)} 50%{transform:translate(6px,-8px) rotate(-10deg)} }
    @keyframes hh-float-3 { 0%,100%{transform:translate(0,0) rotate(-4deg)} 50%{transform:translate(-5px,-12px) rotate(6deg)} }
    @keyframes hh-float-4 { 0%,100%{transform:translate(0,0) rotate(2deg)} 50%{transform:translate(8px,-6px) rotate(14deg)} }
    @keyframes hh-float-5 { 0%,100%{transform:translate(0,0) rotate(0deg)} 33%{transform:translate(-4px,-9px) rotate(-6deg)} 66%{transform:translate(5px,-4px) rotate(8deg)} }
    @keyframes hh-float-6 { 0%,100%{transform:translate(0,0) rotate(0deg)} 50%{transform:translate(-7px,-11px) rotate(-12deg)} }
    .hh-float { will-change: transform; display:inline-block; }
    .hh-float-1 { animation: hh-float-1 5.2s ease-in-out infinite; }
    .hh-float-2 { animation: hh-float-2 6.1s ease-in-out infinite; animation-delay:-1.3s; }
    .hh-float-3 { animation: hh-float-3 7.4s ease-in-out infinite; animation-delay:-2.1s; }
    .hh-float-4 { animation: hh-float-4 5.7s ease-in-out infinite; animation-delay:-0.6s; }
    .hh-float-5 { animation: hh-float-5 8.3s ease-in-out infinite; animation-delay:-3.2s; }
    .hh-float-6 { animation: hh-float-6 6.8s ease-in-out infinite; animation-delay:-1.8s; }
    @media (prefers-reduced-motion: reduce) { .hh-float { animation: none !important; } }

    /* ── Mobile responsive overrides ───────────────────────────────────
       Each page wraps in .hh-page. We use container queries so the
       layout collapses inside a narrow artboard on the canvas too. */
    .hh-page { container-type: inline-size; container-name: page; }

    @container page (max-width: 720px) {
      .hh-nav-bar { grid-template-columns: 1fr !important; gap: 14px !important; padding: 14px 20px !important; }
      .hh-nav-left, .hh-nav-right { justify-content: center !important; gap: 14px !important; font-size: 12px !important; }
      .hh-nav-logo { font-size: 26px !important; }
      .hh-announce { font-size: 11px !important; letter-spacing: .08em !important; padding: 8px 12px !important; }

      .hh-hero { padding: 36px 20px 50px !important; }
      .hh-hero-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
      .hh-hero h1 { font-size: 56px !important; }
      .hh-hero-subhead { font-size: 28px !important; }
      .hh-hero-stack { height: 360px !important; }

      .hh-marquee { font-size: 16px !important; gap: 24px !important; }

      .hh-section { padding: 48px 20px !important; }
      .hh-section h2 { font-size: 40px !important; }
      .hh-section-eyebrow { font-size: 22px !important; }

      .hh-grid-4 { grid-template-columns: 1fr 1fr !important; gap: 14px !important; }
      .hh-grid-3 { grid-template-columns: 1fr 1fr !important; gap: 14px !important; }

      .hh-collection-body { grid-template-columns: 1fr !important; gap: 24px !important; padding: 28px 20px 50px !important; }
      .hh-collection-header { padding: 32px 20px 36px !important; }
      .hh-collection-header h1 { font-size: 56px !important; }
      .hh-filterbar { padding: 14px 20px !important; flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }

      .hh-product-grid { grid-template-columns: 250px 1fr !important; gap: 28px !important; padding: 20px 20px 50px !important; }
      .hh-product-info h1 { font-size: 40px !important; }
      .hh-product-detail { grid-template-columns: 1fr !important; gap: 32px !important; }
      .hh-product-related-grid { grid-template-columns: 1fr 1fr !important; }

      .hh-footer { padding: 50px 20px 24px !important; }
      .hh-footer-row { flex-direction: column !important; gap: 30px !important; }
      .hh-footer-cols { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
    }

    @container page (max-width: 480px) {
      .hh-grid-4, .hh-grid-3, .hh-product-related-grid { grid-template-columns: 1fr !important; }
      .hh-product-grid { grid-template-columns: 1fr !important; }
      .hh-product-thumbs { flex-direction: row !important; overflow-x: auto !important; }
      .hh-hero h1 { font-size: 44px !important; }
      .hh-collection-header h1 { font-size: 44px !important; }
      .hh-section h2 { font-size: 32px !important; }
    }
  `;
  document.head.appendChild(s);
}

// Sample product data shared across all directions.
const SAMPLE_PRODUCTS = [
  { name: 'Sunshower Ceramic Mug',     artist: 'Lila Park',      price: '$42',   kind: 'ceramic'  },
  { name: 'Wildflower Field, 8×10',    artist: 'Mae Ortiz',      price: '$85',   kind: 'painting' },
  { name: 'Brass Petal Earrings',      artist: 'Juno Reyes',     price: '$58',   kind: 'jewelry'  },
  { name: 'Citrus Grove Risograph',    artist: 'Theo Bell',      price: '$28',   kind: 'print'    },
  { name: 'Speckled Stoneware Bowl',   artist: 'Lila Park',      price: '$36',   kind: 'ceramic'  },
  { name: 'Harbor Light, Original',    artist: 'Mae Ortiz',      price: '$220',  kind: 'painting' },
  { name: 'Pearl Drop Necklace',       artist: 'Juno Reyes',     price: '$74',   kind: 'jewelry'  },
  { name: 'Garden Hours Print Set',    artist: 'Theo Bell',      price: '$48',   kind: 'print'    },
  { name: 'Moss Glaze Planter',        artist: 'Sade Clarke',    price: '$54',   kind: 'ceramic'  },
  { name: 'Tangerine Sky, 11×14',      artist: 'Mae Ortiz',      price: '$140',  kind: 'painting' },
  { name: 'Twisted Wire Hoops',        artist: 'Juno Reyes',     price: '$46',   kind: 'jewelry'  },
  { name: 'Field Notes Letterpress',   artist: 'Theo Bell',      price: '$22',   kind: 'print'    },
];

const CATEGORIES = [
  { id:'paintings',  label:'Paintings',  count:24, kind:'painting' },
  { id:'ceramics',   label:'Ceramics',   count:18, kind:'ceramic'  },
  { id:'jewelry',    label:'Jewelry',    count:31, kind:'jewelry'  },
  { id:'prints',     label:'Prints',     count:14, kind:'print'    },
];

// Export all to window so other JSX scripts can use them.
Object.assign(window, {
  ProductTile, ConfettiScatter, Sparkle, Star5, Heart, Squiggle, Dot,
  SAMPLE_PRODUCTS, CATEGORIES,
});
