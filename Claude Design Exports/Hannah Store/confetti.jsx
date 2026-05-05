// Direction A — Confetti Pop
// Bright multicolor, hand-drawn, playful. Pink/teal/yellow palette w/ confetti.

const confettiPalette = {
  cream: '#FFF4E0',
  pink: '#FF6B9D',
  hotPink: '#E63E62',
  yellow: '#FFD23F',
  teal: '#2EC4B6',
  tealDark: '#1A8B82',
  blue: '#118AB2',
  purple: '#8338EC',
  ink: '#23153C',
  pinkSoft: '#FFD6E0',
  yellowSoft: '#FFF1B6',
  tealSoft: '#B8F2EC',
};

const cFonts = {
  display: '"Caveat", cursive',
  bold: '"Caprasimo", "Fraunces", serif',
  body: '"Bricolage Grotesque", "Inter", sans-serif',
};

// ─── Top utility & nav bar ────────────────────────────────────────────
function ConfettiNav() {
  return (
    <div style={{ width:'100%', fontFamily:cFonts.body }}>
      <div className="hh-announce" style={{ background:confettiPalette.hotPink, color:'#fff', textAlign:'center', padding:'9px 0', fontSize:13, fontWeight:600, letterSpacing:'.15em' }}>
        ✶ FREE SHIPPING OVER $75 ✶ NEW SPRING PIECES IN THE SHOP ✶ HI, I'M HANNAH ✶
      </div>
      <div className="hh-nav-bar" style={{ background:'#fff', borderBottom:`3px solid ${confettiPalette.ink}`, padding:'20px 56px', display:'grid', gridTemplateColumns:'1fr auto 1fr', alignItems:'center', gap:32 }}>
        <nav className="hh-nav-left" style={{ display:'flex', gap:28, fontSize:14, fontWeight:600, color:confettiPalette.ink, textTransform:'uppercase', letterSpacing:'.1em', alignItems:'center', whiteSpace:'nowrap' }}>
          <span>Shop</span>
          <span>Studio</span>
          <span>Custom</span>
          <span>About</span>
        </nav>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:10 }}>
          <Heart size={20} color={confettiPalette.hotPink}/>
          <div className="hh-nav-logo" style={{ fontFamily:cFonts.bold, fontSize:32, color:confettiPalette.ink, lineHeight:1, letterSpacing:'-.02em', whiteSpace:'nowrap' }}>
            Hannah's <span style={{ color:confettiPalette.hotPink, fontFamily:'"Fraunces",serif', fontStyle:'italic', fontWeight:900 }}>Handiworks</span>
          </div>
          <Star5 size={18} color={confettiPalette.yellow}/>
        </div>
        <div className="hh-nav-right" style={{ display:'flex', justifyContent:'flex-end', alignItems:'center', gap:18, fontSize:14, fontWeight:600, color:confettiPalette.ink, textTransform:'uppercase', letterSpacing:'.1em' }}>
          <span>Search</span>
          <span>Account</span>
          <span style={{ background:confettiPalette.yellow, padding:'7px 14px', borderRadius:999, border:`2px solid ${confettiPalette.ink}`, lineHeight:1 }}>Cart · 2</span>
        </div>
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────
function ConfettiHero() {
  return (
    <div className="hh-hero" style={{ position:'relative', background:confettiPalette.pinkSoft, overflow:'hidden', borderBottom:`3px solid ${confettiPalette.ink}`, padding:'70px 56px 80px' }}>
      <div className="hh-hero-grid" style={{ display:'grid', gridTemplateColumns:'1.05fr 1fr', gap:48, maxWidth:1180, margin:'0 auto', alignItems:'center', position:'relative', zIndex:2 }}>
        {/* Headline — left */}
        <div style={{ color:confettiPalette.ink }}>
          <div className="hh-hero-subhead" style={{ fontFamily:cFonts.display, fontSize:42, color:confettiPalette.hotPink, fontWeight:700, transform:'rotate(-3deg)', display:'inline-block', marginBottom:-4 }}>
            hello, hi, hey ✿
          </div>
          <h1 style={{ fontFamily:cFonts.bold, fontSize:96, lineHeight:.92, margin:'10px 0 0', letterSpacing:'-.025em' }}>
            small art<br/>
            <span style={{ color:confettiPalette.tealDark }}>for </span>
            <span style={{ color:confettiPalette.hotPink, fontStyle:'italic', fontFamily:'"Fraunces",serif' }}>everyday</span>
            <span> </span>
            <span>rooms.</span>
          </h1>
          <p style={{ fontFamily:cFonts.body, fontSize:18, lineHeight:1.5, marginTop:24, maxWidth:460, color:'#3a2f4a' }}>
            Hi, I'm Hannah. I make paintings, ceramics, and jewelry from a small studio in Louisville, KY. Every piece here is one of a kind — and meant to be used.
          </p>
          <div style={{ display:'flex', gap:14, marginTop:32, flexWrap:'wrap' }}>
            <a style={{ background:confettiPalette.ink, color:'#fff', padding:'16px 28px', borderRadius:999, fontFamily:cFonts.body, fontWeight:700, fontSize:14, letterSpacing:'.08em', textTransform:'uppercase', boxShadow:'4px 4px 0 '+confettiPalette.hotPink }}>Shop everything →</a>
            <a style={{ background:'#fff', color:confettiPalette.ink, padding:'16px 28px', borderRadius:999, fontFamily:cFonts.body, fontWeight:700, fontSize:14, letterSpacing:'.08em', textTransform:'uppercase', border:`2.5px solid ${confettiPalette.ink}` }}>About me</a>
          </div>
        </div>

        {/* Image stack — right */}
        <div className="hh-hero-stack" style={{ position:'relative', height:520 }}>
          <div style={{ position:'absolute', left:30, top:50, width:300, height:380, background:confettiPalette.yellow, borderRadius:24, transform:'rotate(-3deg)', border:`3px solid ${confettiPalette.ink}` }}/>
          <div style={{ position:'absolute', left:60, top:70, width:300, height:380, background:confettiPalette.teal, borderRadius:24, transform:'rotate(2deg)', border:`3px solid ${confettiPalette.ink}` }}/>
          <div style={{ position:'absolute', left:90, top:90, width:300, height:380, background:'#fff', borderRadius:24, border:`3px solid ${confettiPalette.ink}`, padding:14, boxShadow:'8px 8px 0 '+confettiPalette.ink }}>
            <ProductTile kind="ceramic" palette={['#FFB6C9','#FFD23F','#2EC4B6','#FF6B9D']} radius={14}/>
          </div>
          <div style={{ position:'absolute', right:0, bottom:30, width:150, height:150, background:'#fff', borderRadius:18, border:`3px solid ${confettiPalette.ink}`, padding:10, transform:'rotate(6deg)', boxShadow:'5px 5px 0 '+confettiPalette.ink }}>
            <ProductTile kind="jewelry" palette={['#8338EC','#FFD23F']} radius={10}/>
          </div>
          <div style={{ position:'absolute', left:0, bottom:0, width:130, height:130, background:'#fff', borderRadius:18, border:`3px solid ${confettiPalette.ink}`, padding:8, transform:'rotate(-7deg)', boxShadow:'4px 4px 0 '+confettiPalette.ink }}>
            <ProductTile kind="painting" palette={['#FF6B9D','#FFD23F']} radius={8}/>
          </div>
          <Sparkle size={28} color={confettiPalette.hotPink} style={{ position:'absolute', right:30, top:30 }}/>
          <Star5 size={26} color={confettiPalette.yellow} style={{ position:'absolute', right:60, bottom:80 }}/>
        </div>
      </div>

      {/* Background sparkles */}
      <Sparkle size={36} color={confettiPalette.yellow} style={{ position:'absolute', left:34, top:36, transform:'rotate(15deg)' }}/>
      <Heart size={30} color={confettiPalette.hotPink} style={{ position:'absolute', left:80, bottom:90, transform:'rotate(-12deg)' }}/>
      <Squiggle width={120} color={confettiPalette.purple} style={{ position:'absolute', left:380, top:30 }}/>
      <Dot size={16} color={confettiPalette.purple} style={{ position:'absolute', left:480, bottom:60 }}/>
      <Dot size={12} color={confettiPalette.teal} style={{ position:'absolute', right:60, top:50 }}/>
      <Star5 size={22} color={confettiPalette.purple} style={{ position:'absolute', right:24, bottom:120 }}/>
    </div>
  );
}

// ─── Marquee strip ────────────────────────────────────────────────────
function ConfettiMarquee() {
  const items = ['Made by hand', 'One of a kind', 'Made in Louisville, KY', 'Small batch', 'Made with love'];
  return (
    <div className="hh-marquee" style={{ background:confettiPalette.ink, color:'#fff', padding:'18px 0', overflow:'hidden', borderBottom:`3px solid ${confettiPalette.ink}` }}>
      <div style={{ display:'flex', gap:48, fontFamily:cFonts.bold, fontSize:24, letterSpacing:'.04em', whiteSpace:'nowrap', alignItems:'center', justifyContent:'center' }}>
        {[...items, ...items, ...items].map((t,i) => (
          <span key={i} style={{ display:'inline-flex', alignItems:'center', gap:16 }}>
            <span style={{ color: i%3===0 ? confettiPalette.pink : i%3===1 ? confettiPalette.yellow : confettiPalette.teal }}>✦</span>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Featured collections ─────────────────────────────────────────────
function ConfettiCategories() {
  const cats = [
    { label:'Paintings',  bg:confettiPalette.tealSoft,   accent:confettiPalette.teal,    kind:'painting' },
    { label:'Ceramics',   bg:confettiPalette.yellowSoft, accent:confettiPalette.yellow,  kind:'ceramic' },
    { label:'Jewelry',    bg:confettiPalette.pinkSoft,   accent:confettiPalette.hotPink, kind:'jewelry' },
    { label:'Prints',     bg:'#E0D5FF',                  accent:confettiPalette.purple,  kind:'print' },
  ];
  return (
    <div className="hh-section" style={{ background:'#fff', padding:'80px 56px 60px', position:'relative' }}>
      <div style={{ textAlign:'center', marginBottom:50 }}>
        <div className="hh-section-eyebrow" style={{ fontFamily:cFonts.display, fontSize:36, color:confettiPalette.hotPink, transform:'rotate(-2deg)', display:'inline-block' }}>browse by</div>
        <h2 style={{ fontFamily:cFonts.bold, fontSize:64, color:confettiPalette.ink, margin:'4px 0 0', letterSpacing:'-.02em' }}>collections</h2>
      </div>
      <div className="hh-grid-4" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:24, maxWidth:1100, margin:'0 auto' }}>
        {cats.map((c,i) => (
          <div key={c.label} style={{ background:c.bg, border:`3px solid ${confettiPalette.ink}`, borderRadius:18, padding:18, transform:`rotate(${[-1.5,1.5,-1,1.2][i]}deg)`, boxShadow:`5px 5px 0 ${confettiPalette.ink}` }}>
            <div style={{ aspectRatio:'1', borderRadius:10, overflow:'hidden', border:`2px solid ${confettiPalette.ink}` }}>
              <ProductTile kind={c.kind} palette={[c.accent,'#fff']} radius={8}/>
            </div>
            <div style={{ marginTop:14, fontFamily:cFonts.bold, fontSize:24, color:confettiPalette.ink, textAlign:'center' }}>{c.label}</div>
            <div style={{ fontFamily:cFonts.body, fontSize:13, color:confettiPalette.ink, textAlign:'center', opacity:.7 }}>Shop now →</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── New arrivals grid ────────────────────────────────────────────────
function ConfettiProductCard({ p, i }) {
  const palettes = [
    ['#FFD6E0','#FF6B9D'], ['#FFF1B6','#FFD23F'], ['#B8F2EC','#2EC4B6'],
    ['#E0D5FF','#8338EC'], ['#FFD6E0','#E63E62'], ['#FFF1B6','#FF6B9D'],
  ];
  return (
    <div style={{ background:'#fff', borderRadius:18, border:`3px solid ${confettiPalette.ink}`, padding:12, boxShadow:`4px 4px 0 ${confettiPalette.ink}`, position:'relative' }}>
      {i === 0 && (
        <div style={{ position:'absolute', top:-12, left:-12, background:confettiPalette.yellow, border:`2.5px solid ${confettiPalette.ink}`, fontFamily:cFonts.display, fontSize:18, color:confettiPalette.ink, padding:'4px 12px', borderRadius:999, transform:'rotate(-8deg)', fontWeight:700, zIndex:2 }}>new!</div>
      )}
      <div style={{ aspectRatio:'1', borderRadius:10, overflow:'hidden', border:`2px solid ${confettiPalette.ink}`, background:confettiPalette.cream }}>
        <ProductTile kind={p.kind} palette={palettes[i % palettes.length]} radius={8}/>
      </div>
      <div style={{ padding:'12px 4px 4px' }}>
        <div style={{ fontFamily:cFonts.body, fontSize:11, fontWeight:600, color:confettiPalette.hotPink, textTransform:'uppercase', letterSpacing:'.1em' }}>{p.kind}</div>
        <div style={{ fontFamily:cFonts.bold, fontSize:18, color:confettiPalette.ink, marginTop:4, lineHeight:1.2 }}>{p.name}</div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:8 }}>
          <div style={{ fontFamily:cFonts.body, fontSize:18, fontWeight:700, color:confettiPalette.ink }}>{p.price}</div>
          <div style={{ background:confettiPalette.ink, color:'#fff', borderRadius:999, padding:'5px 12px', fontSize:11, fontFamily:cFonts.body, fontWeight:600, letterSpacing:'.08em', textTransform:'uppercase' }}>+ Add</div>
        </div>
      </div>
    </div>
  );
}

function ConfettiNewArrivals() {
  const products = SAMPLE_PRODUCTS.slice(0,8);
  return (
    <div className="hh-section" style={{ background:confettiPalette.cream, padding:'80px 56px 80px', position:'relative' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', maxWidth:1180, margin:'0 auto 40px' }}>
        <div>
          <div className="hh-section-eyebrow" style={{ fontFamily:cFonts.display, fontSize:36, color:confettiPalette.tealDark, transform:'rotate(-2deg)', display:'inline-block', marginBottom:-4 }}>just in ✿</div>
          <h2 style={{ fontFamily:cFonts.bold, fontSize:72, color:confettiPalette.ink, margin:0, letterSpacing:'-.02em', lineHeight:.95 }}>new arrivals</h2>
        </div>
        <a style={{ fontFamily:cFonts.body, fontSize:14, fontWeight:700, color:confettiPalette.ink, textTransform:'uppercase', letterSpacing:'.1em', borderBottom:`3px solid ${confettiPalette.hotPink}`, paddingBottom:4 }}>See all 87 →</a>
      </div>
      <div className="hh-grid-4" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:24, maxWidth:1180, margin:'0 auto' }}>
        {products.map((p,i) => <ConfettiProductCard key={p.name} p={p} i={i}/>)}
      </div>
      <Sparkle size={40} color={confettiPalette.hotPink} style={{ position:'absolute', left:30, top:120 }}/>
      <Star5 size={32} color={confettiPalette.yellow} style={{ position:'absolute', right:36, top:60 }}/>
      <Heart size={28} color={confettiPalette.teal} style={{ position:'absolute', right:80, bottom:80 }}/>
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────
function ConfettiFooter() {
  return (
    <div className="hh-footer" style={{ background:confettiPalette.ink, color:'#fff', padding:'70px 56px 30px', position:'relative', overflow:'hidden', borderTop:`3px solid ${confettiPalette.ink}` }}>
      <div style={{ maxWidth:1180, margin:'0 auto' }}>
        <div className="hh-footer-row" style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', borderBottom:'1.5px solid rgba(255,255,255,.2)', paddingBottom:50 }}>
          <div style={{ maxWidth:420 }}>
            <div style={{ fontFamily:cFonts.bold, fontSize:42, color:'#fff', lineHeight:1 }}>
              Hannah's <span style={{ color:confettiPalette.pink, fontFamily:'"Fraunces",serif', fontWeight:900 }}>Handiworks</span>
            </div>
            <p style={{ fontFamily:cFonts.body, fontSize:15, lineHeight:1.6, marginTop:18, opacity:.85 }}>
              A small shop in a small town, full of work made by people we know. Open Wed–Sun, 11–6. Hugs always free.
            </p>
          </div>
          <div className="hh-footer-cols" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:60, fontFamily:cFonts.body, fontSize:14 }}>
            {[
              { h:'Shop', l:['New arrivals','Paintings','Ceramics','Jewelry','Prints','Gift cards'] },
              { h:'About', l:['My story','Visit the studio','Press','Custom orders'] },
              { h:'Help', l:['Shipping','Returns','Contact','FAQ'] },
            ].map(col => (
              <div key={col.h}>
                <div style={{ fontFamily:cFonts.bold, fontSize:18, marginBottom:14, color:confettiPalette.yellow }}>{col.h}</div>
                {col.l.map(x => <div key={x} style={{ marginBottom:8, opacity:.85 }}>{x}</div>)}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', marginTop:24, fontSize:12, fontFamily:cFonts.body, opacity:.7 }}>
          <span>© 2026 Hannah's Handiworks · Made by hand in Louisville, KY</span>
          <span>Instagram · Pinterest · Newsletter</span>
        </div>
      </div>
    </div>
  );
}

function ConfettiHome() {
  return (
    <div className="hh-page" style={{ background:'#fff', minHeight:'100%', fontFamily:cFonts.body, color:confettiPalette.ink }}>
      <ConfettiNav/>
      <ConfettiHero/>
      <ConfettiMarquee/>
      <ConfettiCategories/>
      <ConfettiNewArrivals/>
      <ConfettiFooter/>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────
// Collection (Shop All) Page
// ───────────────────────────────────────────────────────────────────────
function ConfettiCollection() {
  const products = [...SAMPLE_PRODUCTS, ...SAMPLE_PRODUCTS].slice(0,12);
  const filters = [
    { label:'All', count:42, active:true },
    { label:'Paintings', count:14 },
    { label:'Ceramics', count:11 },
    { label:'Jewelry', count:12 },
    { label:'Prints', count:5 },
  ];
  return (
    <div className="hh-page" style={{ background:'#fff', minHeight:'100%', fontFamily:cFonts.body, color:confettiPalette.ink }}>
      <ConfettiNav/>

      {/* Page header */}
      <div className="hh-collection-header" style={{ background:confettiPalette.pinkSoft, padding:'48px 56px 56px', position:'relative', overflow:'hidden', borderBottom:`3px solid ${confettiPalette.ink}` }}>
        <div style={{ fontFamily:cFonts.body, fontSize:13, opacity:.7, marginBottom:8 }}>Home / Shop</div>
        <div style={{ display:'flex', alignItems:'flex-end', gap:24 }}>
          <h1 style={{ fontFamily:cFonts.bold, fontSize:96, lineHeight:.95, margin:0, letterSpacing:'-.02em' }}>
            shop <span style={{ color:confettiPalette.hotPink, fontStyle:'italic', fontFamily:'"Fraunces",serif' }}>everything</span>
          </h1>
          <div style={{ fontFamily:cFonts.display, fontSize:32, color:confettiPalette.tealDark, transform:'rotate(-4deg)', marginBottom:18 }}>
            42 little treasures ✿
          </div>
        </div>
        <Sparkle size={36} color={confettiPalette.yellow} style={{ position:'absolute', right:80, top:40 }}/>
        <Star5 size={28} color={confettiPalette.purple} style={{ position:'absolute', right:160, bottom:30 }}/>
        <Heart size={32} color={confettiPalette.hotPink} style={{ position:'absolute', right:50, bottom:80, transform:'rotate(20deg)' }}/>
      </div>

      {/* Filter bar */}
      <div className="hh-filterbar" style={{ background:'#fff', padding:'24px 56px', borderBottom:`2px solid ${confettiPalette.ink}`, display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0 }}>
        <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
          {filters.map(f => (
            <div key={f.label} style={{
              padding:'9px 18px',
              borderRadius:999,
              border:`2.5px solid ${confettiPalette.ink}`,
              background: f.active ? confettiPalette.ink : '#fff',
              color: f.active ? '#fff' : confettiPalette.ink,
              fontSize:13, fontWeight:700, letterSpacing:'.06em', textTransform:'uppercase',
              boxShadow: f.active ? 'none' : `2px 2px 0 ${confettiPalette.ink}`,
              display:'flex', gap:8, alignItems:'center'
            }}>
              <span>{f.label}</span>
              <span style={{ opacity:.6, fontWeight:500 }}>{f.count}</span>
            </div>
          ))}
        </div>
        <div style={{ display:'flex', gap:10, alignItems:'center' }}>
          <span style={{ fontSize:13, fontWeight:600, opacity:.7, textTransform:'uppercase', letterSpacing:'.08em' }}>Sort by:</span>
          <div style={{ padding:'9px 16px', border:`2.5px solid ${confettiPalette.ink}`, borderRadius:999, fontSize:13, fontWeight:700, background:confettiPalette.yellow }}>
            Newest ↓
          </div>
        </div>
      </div>

      {/* Body — sidebar + grid */}
      <div className="hh-collection-body" style={{ display:'grid', gridTemplateColumns:'240px 1fr', gap:40, padding:'48px 56px 80px', maxWidth:1280, margin:'0 auto' }}>
        <aside style={{ fontFamily:cFonts.body }}>
          <FilterBlock title="Collection" items={[
            ['Spring 2026','12'],['Studio seconds','6'],['Made to order','8'],['One of a kind','24'],['Last chance','4']
          ]}/>
          <FilterBlock title="Price" items={[
            ['Under $40','14'],['$40 – $80','18'],['$80 – $150','7'],['$150 +','3']
          ]}/>
          <FilterBlock title="Availability" items={[
            ['In stock','30'],['Made to order','8'],['1 of 1','24']
          ]}/>
          <div style={{ background:confettiPalette.tealSoft, border:`3px solid ${confettiPalette.ink}`, borderRadius:18, padding:18, marginTop:24, transform:'rotate(-1.5deg)', boxShadow:`4px 4px 0 ${confettiPalette.ink}` }}>
            <Heart size={24} color={confettiPalette.hotPink}/>
            <div style={{ fontFamily:cFonts.bold, fontSize:20, marginTop:8, lineHeight:1.1 }}>Looking for a gift?</div>
            <div style={{ fontSize:13, marginTop:6, opacity:.85, lineHeight:1.5 }}>We'll wrap it up with a hand-written note. Just leave a message at checkout.</div>
          </div>
        </aside>

        <div>
          <div className="hh-grid-3" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}>
            {products.map((p,i) => <ConfettiProductCard key={i} p={p} i={i}/>)}
          </div>
          <div style={{ display:'flex', justifyContent:'center', marginTop:48, gap:8 }}>
            {['1','2','3','4','5','→'].map((n,i) => (
              <div key={i} style={{ width:42, height:42, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'50%', border:`2.5px solid ${confettiPalette.ink}`, fontFamily:cFonts.bold, fontSize:16, background: i===0?confettiPalette.yellow:'#fff', boxShadow:i===0?`2px 2px 0 ${confettiPalette.ink}`:'none' }}>{n}</div>
            ))}
          </div>
        </div>
      </div>

      <ConfettiFooter/>
    </div>
  );
}

function FilterBlock({ title, items }) {
  return (
    <div style={{ marginBottom:28, paddingBottom:20, borderBottom:`1.5px dashed ${confettiPalette.ink}` }}>
      <div style={{ fontFamily:cFonts.bold, fontSize:18, color:confettiPalette.ink, marginBottom:12, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        {title}
        <span style={{ fontFamily:cFonts.body, fontSize:14 }}>−</span>
      </div>
      {items.map(([label,count],i) => (
        <div key={label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'5px 0', fontSize:14 }}>
          <label style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer' }}>
            <span style={{ width:18, height:18, border:`2px solid ${confettiPalette.ink}`, borderRadius:4, background: i===0?confettiPalette.hotPink:'#fff', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:12 }}>{i===0 ? '✓' : ''}</span>
            {label}
          </label>
          {count && <span style={{ fontSize:12, opacity:.6 }}>{count}</span>}
        </div>
      ))}
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────
// Single Product Page
// ───────────────────────────────────────────────────────────────────────
function ConfettiProduct() {
  const product = {
    name: 'Sunshower Ceramic Mug',
    medium: 'Ceramic',
    price: '$42',
    sku: 'CER-024',
    edition: '1 of 1 · made by hand',
    description: "A chunky little mug with a wheel-thrown body, hand-pinched handle, and a glaze I mixed in the studio that came out somewhere between marigold and grapefruit. Holds about 12oz of coffee or way too much herbal tea. Wobbles charmingly. Microwave-safe, not dishwasher-safe (please).",
    details: [
      ['Material', 'Stoneware, food-safe glaze'],
      ['Size', '4" tall × 3.5" wide'],
      ['Capacity', '~12oz'],
      ['Care', 'Hand wash, microwave-safe'],
      ['Made', 'Louisville, KY · April 2026'],
    ],
  };
  const swatches = [
    ['#FFD23F','#FF6B9D','Sunshower'],
    ['#2EC4B6','#118AB2','Tide pool'],
    ['#8338EC','#FFD6E0','Lavender milk'],
    ['#E63E62','#FFD23F','Hot honey'],
  ];
  const thumbs = [
    { kind:'ceramic',  palette:['#FFD23F','#FF6B9D'] },
    { kind:'ceramic',  palette:['#FFD6E0','#FFD23F'] },
    { kind:'ceramic',  palette:['#FFF1B6','#E63E62'] },
    { kind:'ceramic',  palette:['#2EC4B6','#FFD23F'] },
  ];
  const related = SAMPLE_PRODUCTS.slice(1,5);
  return (
    <div className="hh-page" style={{ background:'#fff', minHeight:'100%', fontFamily:cFonts.body, color:confettiPalette.ink }}>
      <ConfettiNav/>

      {/* Breadcrumb */}
      <div style={{ padding:'20px 56px 0', maxWidth:1280, margin:'0 auto', fontSize:13, opacity:.7 }}>
        Home / Shop / Ceramics / <span style={{ opacity:1, fontWeight:600 }}>{product.name}</span>
      </div>

      {/* Hero — gallery + info */}
      <div className="hh-product-grid" style={{ padding:'32px 56px 80px', maxWidth:1280, margin:'0 auto', display:'grid', gridTemplateColumns:'1.1fr 1fr', gap:60, position:'relative' }}>
        {/* Gallery */}
        <div style={{ display:'grid', gridTemplateColumns:'80px 1fr', gap:16 }}>
          <div className="hh-product-thumbs" style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {thumbs.map((t,i) => (
              <div key={i} style={{ width:80, height:80, borderRadius:12, overflow:'hidden', border:`${i===0?3:2}px solid ${confettiPalette.ink}`, padding:4, background:'#fff', boxShadow:i===0?`3px 3px 0 ${confettiPalette.hotPink}`:'none' }}>
                <ProductTile kind={t.kind} palette={t.palette} radius={8}/>
              </div>
            ))}
          </div>
          <div style={{ position:'relative' }}>
            <div style={{ aspectRatio:'1', borderRadius:24, overflow:'hidden', border:`3px solid ${confettiPalette.ink}`, background:confettiPalette.cream, padding:14, boxShadow:`6px 6px 0 ${confettiPalette.ink}` }}>
              <div style={{ width:'100%', height:'100%', borderRadius:14, overflow:'hidden', border:`2px solid ${confettiPalette.ink}` }}>
                <ProductTile kind="ceramic" palette={['#FFD23F','#FF6B9D']} radius={12}/>
              </div>
            </div>
            <div style={{ position:'absolute', top:-14, right:-14, background:confettiPalette.yellow, border:`2.5px solid ${confettiPalette.ink}`, fontFamily:cFonts.display, fontSize:22, color:confettiPalette.ink, padding:'6px 16px', borderRadius:999, transform:'rotate(8deg)', fontWeight:700, boxShadow:`3px 3px 0 ${confettiPalette.ink}` }}>1 of 1!</div>
            <Sparkle size={32} color={confettiPalette.hotPink} style={{ position:'absolute', left:-30, bottom:30, transform:'rotate(15deg)' }}/>
          </div>
        </div>

        {/* Info */}
        <div className="hh-product-info">
          <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:8 }}>
            <span style={{ fontSize:11, fontWeight:700, color:confettiPalette.hotPink, textTransform:'uppercase', letterSpacing:'.14em' }}>{product.medium}</span>
            <span style={{ width:4, height:4, borderRadius:'50%', background:confettiPalette.ink, opacity:.4 }}/>
            <span style={{ fontSize:11, fontWeight:600, opacity:.6, textTransform:'uppercase', letterSpacing:'.1em' }}>{product.sku}</span>
          </div>
          <h1 style={{ fontFamily:cFonts.bold, fontSize:64, lineHeight:.95, margin:0, letterSpacing:'-.02em' }}>
            Sunshower<br/>
            <span style={{ color:confettiPalette.hotPink, fontStyle:'italic', fontFamily:'"Fraunces",serif' }}>ceramic</span> mug
          </h1>

          <div style={{ fontFamily:cFonts.display, fontSize:26, color:confettiPalette.tealDark, transform:'rotate(-2deg)', display:'inline-block', marginTop:14 }}>
            {product.edition} ✿
          </div>

          <div style={{ display:'flex', alignItems:'baseline', gap:14, marginTop:24 }}>
            <div style={{ fontFamily:cFonts.bold, fontSize:48, color:confettiPalette.ink, letterSpacing:'-.02em' }}>{product.price}</div>
            <div style={{ fontSize:13, opacity:.6 }}>+ free shipping over $75</div>
          </div>

          <p style={{ fontSize:16, lineHeight:1.6, marginTop:22, color:'#3a2f4a' }}>{product.description}</p>

          {/* Glaze swatches */}
          <div style={{ marginTop:28 }}>
            <div style={{ fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:'.12em', marginBottom:12 }}>Glaze · <span style={{ color:confettiPalette.hotPink }}>Sunshower</span></div>
            <div style={{ display:'flex', gap:12 }}>
              {swatches.map(([a,b,name],i) => (
                <div key={name} style={{ textAlign:'center' }}>
                  <div style={{ width:54, height:54, borderRadius:'50%', background:`radial-gradient(circle at 30% 25%, ${a}, ${b})`, border:`${i===0?3:2}px solid ${confettiPalette.ink}`, boxShadow:i===0?`3px 3px 0 ${confettiPalette.ink}`:'none', cursor:'pointer' }}/>
                  <div style={{ fontSize:10, marginTop:6, fontWeight:600, opacity:i===0?1:.6 }}>{name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity + add */}
          <div style={{ display:'flex', gap:12, marginTop:32, alignItems:'stretch' }}>
            <div style={{ display:'flex', alignItems:'center', border:`2.5px solid ${confettiPalette.ink}`, borderRadius:999, overflow:'hidden', background:'#fff' }}>
              <div style={{ padding:'14px 18px', fontWeight:700, fontSize:18, cursor:'pointer' }}>−</div>
              <div style={{ padding:'14px 4px', fontFamily:cFonts.bold, fontSize:18, minWidth:30, textAlign:'center' }}>1</div>
              <div style={{ padding:'14px 18px', fontWeight:700, fontSize:18, cursor:'pointer' }}>+</div>
            </div>
            <a style={{ flex:1, background:confettiPalette.ink, color:'#fff', padding:'17px 28px', borderRadius:999, fontFamily:cFonts.body, fontWeight:700, fontSize:14, letterSpacing:'.1em', textTransform:'uppercase', textAlign:'center', boxShadow:`5px 5px 0 ${confettiPalette.hotPink}` }}>Add to cart · {product.price}</a>
            <div style={{ width:54, display:'flex', alignItems:'center', justifyContent:'center', border:`2.5px solid ${confettiPalette.ink}`, borderRadius:999, background:'#fff' }}>
              <Heart size={22} color={confettiPalette.hotPink}/>
            </div>
          </div>

          {/* Reassurance bullets */}
          <div style={{ marginTop:24, display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, fontSize:13 }}>
            {[
              ['✦','Ships in 3–5 days from Louisville'],
              ['♥','Free returns within 14 days'],
              ['✿','Wrapped by hand with a note'],
              ['☼','Made by me · not drop-shipped'],
            ].map(([icon,text]) => (
              <div key={text} style={{ display:'flex', gap:8, alignItems:'center' }}>
                <span style={{ color:confettiPalette.hotPink, fontSize:16 }}>{icon}</span>
                <span style={{ opacity:.85 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Floating decorations */}
        <Star5 size={28} color={confettiPalette.yellow} style={{ position:'absolute', right:30, top:0 }}/>
        <Squiggle width={100} color={confettiPalette.purple} style={{ position:'absolute', right:80, top:300 }}/>
      </div>

      {/* Details strip — two-up */}
      <div style={{ background:confettiPalette.tealSoft, borderTop:`3px solid ${confettiPalette.ink}`, borderBottom:`3px solid ${confettiPalette.ink}`, padding:'56px 56px' }}>
        <div className="hh-product-detail" style={{ maxWidth:1180, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:60 }}>
          <div>
            <div style={{ fontFamily:cFonts.display, fontSize:28, color:confettiPalette.hotPink, transform:'rotate(-2deg)', display:'inline-block' }}>the details ✿</div>
            <h2 style={{ fontFamily:cFonts.bold, fontSize:40, margin:'4px 0 18px', letterSpacing:'-.02em', lineHeight:1 }}>Specs & care</h2>
            <div style={{ background:'#fff', border:`3px solid ${confettiPalette.ink}`, borderRadius:18, overflow:'hidden', boxShadow:`5px 5px 0 ${confettiPalette.ink}` }}>
              {product.details.map(([k,v],i) => (
                <div key={k} style={{ display:'grid', gridTemplateColumns:'130px 1fr', gap:16, padding:'14px 20px', borderBottom: i<product.details.length-1?`1.5px dashed ${confettiPalette.ink}`:'none', fontSize:14 }}>
                  <span style={{ fontWeight:700, textTransform:'uppercase', letterSpacing:'.08em', fontSize:11, opacity:.7 }}>{k}</span>
                  <span>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontFamily:cFonts.display, fontSize:28, color:confettiPalette.purple, transform:'rotate(2deg)', display:'inline-block' }}>from the maker ✿</div>
            <h2 style={{ fontFamily:cFonts.bold, fontSize:40, margin:'4px 0 18px', letterSpacing:'-.02em', lineHeight:1 }}>A note from Hannah</h2>
            <div style={{ background:'#fff', border:`3px solid ${confettiPalette.ink}`, borderRadius:18, padding:'22px 24px', boxShadow:`5px 5px 0 ${confettiPalette.ink}`, position:'relative' }}>
              <p style={{ fontSize:15, lineHeight:1.6, margin:0, color:'#3a2f4a' }}>
                "I made this batch on a Tuesday in April after going for a walk and seeing the dogwoods finally bloom. The glaze is one of my favorites — it pools a little at the bottom in a way I can't fully control, which means every mug ends up slightly different. This one's yours."
              </p>
              <div style={{ marginTop:18, display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:46, height:46, borderRadius:'50%', background:confettiPalette.pinkSoft, border:`2.5px solid ${confettiPalette.ink}`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:cFonts.bold, fontSize:18 }}>H</div>
                <div>
                  <div style={{ fontFamily:cFonts.display, fontSize:24, color:confettiPalette.hotPink, lineHeight:1, transform:'rotate(-3deg)' }}>Hannah ✿</div>
                  <div style={{ fontSize:11, opacity:.6, fontWeight:600, letterSpacing:'.08em', textTransform:'uppercase' }}>Maker · Louisville, KY</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* You might also like */}
      <div className="hh-section" style={{ background:confettiPalette.cream, padding:'70px 56px 80px', position:'relative' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', maxWidth:1180, margin:'0 auto 36px' }}>
          <div>
            <div className="hh-section-eyebrow" style={{ fontFamily:cFonts.display, fontSize:30, color:confettiPalette.tealDark, transform:'rotate(-2deg)', display:'inline-block', marginBottom:-2 }}>more from the studio ✿</div>
            <h2 style={{ fontFamily:cFonts.bold, fontSize:54, color:confettiPalette.ink, margin:0, letterSpacing:'-.02em', lineHeight:.95 }}>you might also like</h2>
          </div>
          <a style={{ fontFamily:cFonts.body, fontSize:14, fontWeight:700, color:confettiPalette.ink, textTransform:'uppercase', letterSpacing:'.1em', borderBottom:`3px solid ${confettiPalette.hotPink}`, paddingBottom:4 }}>Shop everything →</a>
        </div>
        <div className="hh-product-related-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:24, maxWidth:1180, margin:'0 auto' }}>
          {related.map((p,i) => <ConfettiProductCard key={p.name} p={p} i={i+1}/>)}
        </div>
        <Sparkle size={36} color={confettiPalette.hotPink} style={{ position:'absolute', right:40, top:80 }}/>
        <Heart size={28} color={confettiPalette.yellow} style={{ position:'absolute', left:60, bottom:60, transform:'rotate(-15deg)' }}/>
      </div>

      <ConfettiFooter/>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────
// Coming Soon Page
// ───────────────────────────────────────────────────────────────────────
function ConfettiComingSoon({ mobile = false } = {}) {
  return (
    <div className="hh-page" data-cs-mobile={mobile ? '1' : undefined} style={{ background:confettiPalette.cream, minHeight:'100%', fontFamily:cFonts.body, color:confettiPalette.ink, position:'relative', overflow:'hidden' }}>

      <style>{`
        .hh-cs-wrap { max-width: 980px; margin: 0 auto; padding: 80px 32px; position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; text-align: center; }
        .hh-cs-logo { font-family: ${cFonts.bold}; font-size: 72px; color: ${confettiPalette.ink}; line-height: 1; letter-spacing: -.025em; white-space: nowrap; }
        .hh-cs-row { display: flex; align-items: center; gap: 18px; margin-bottom: 36px; }
        .hh-cs-form { display: flex; gap: 10px; align-items: stretch; background: #fff; border: 3px solid ${confettiPalette.ink}; border-radius: 999px; padding: 6px; box-shadow: 5px 5px 0 ${confettiPalette.ink}; }
        .hh-cs-input { flex: 1; border: none; outline: none; background: transparent; padding: 12px 20px; font-family: ${cFonts.body}; font-size: 16px; color: ${confettiPalette.ink}; min-width: 0; }
        .hh-cs-btn { background: ${confettiPalette.ink}; color: #fff; border: none; padding: 14px 26px; border-radius: 999px; font-family: ${cFonts.body}; font-weight: 700; font-size: 14px; letter-spacing: .1em; text-transform: uppercase; cursor: pointer; white-space: nowrap; }
        [data-cs-mobile="1"] .hh-cs-wrap { padding: 56px 20px; }
        [data-cs-mobile="1"] .hh-cs-logo { font-size: 40px; white-space: normal; line-height: 1.05; }
        [data-cs-mobile="1"] .hh-cs-row { gap: 10px; flex-wrap: nowrap; justify-content: center; margin-bottom: 24px; }
        [data-cs-mobile="1"] .hh-cs-form { flex-direction: column; border-radius: 22px; padding: 10px; gap: 10px; }
        [data-cs-mobile="1"] .hh-cs-input { padding: 14px 16px; text-align: center; }
        [data-cs-mobile="1"] .hh-cs-btn { padding: 14px 20px; border-radius: 14px; }
        [data-cs-mobile="1"] .hh-cs-fine { font-size: 14px !important; }
      `}</style>

      <div className="hh-cs-wrap">
        {/* Logo */}
        <div className="hh-cs-row">
          <div className="hh-cs-logo">
            Hannah's <span style={{ color:confettiPalette.hotPink, fontFamily:'"Fraunces",serif', fontWeight:900 }}>Handiworks</span>
          </div>
        </div>

        {/* Email signup */}
        <div style={{ marginTop:40, width:'100%', maxWidth:520 }}>
          <div style={{ fontFamily:cFonts.body, fontSize:14, fontWeight:700, textTransform:'uppercase', letterSpacing:'.14em', marginBottom:14, color:confettiPalette.hotPink }}>
            get on the list
          </div>
          <div className="hh-cs-form">
            <input className="hh-cs-input" type="email" placeholder="your@email.com" />
            <button className="hh-cs-btn">Notify me →</button>
          </div>
          <div className="hh-cs-fine" style={{ fontSize:14, opacity:.65, marginTop:14, fontFamily:cFonts.body }}>
            One email, max. No spam. Pinky promise.
          </div>
        </div>

        <div style={{ marginTop:64, fontSize:14, opacity:.6, fontFamily:cFonts.body, padding:'0 12px' }}>
          © 2026 Hannah's Handiworks · Made by hand in Louisville, KY
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ConfettiHome, ConfettiCollection, ConfettiProduct, ConfettiComingSoon });
