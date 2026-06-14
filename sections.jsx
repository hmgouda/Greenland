/* ============ Green Land — page sections ============ */

/* ---------------- NAV ---------------- */
function Nav({ onQuote }) {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  const go = (href) => { setOpen(false); const el = document.querySelector(href); if (el) el.scrollIntoView({ behavior: "smooth" }); };

  return (
    <header className={"nav" + (solid ? " nav--solid" : "")}>
      <div className="wrap nav__inner">
        <a href="#top" className="nav__logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} aria-label="Green Land Lawn Care & Landscaping home">
          <img className="nav__logo-img" src="assets/logo-landscape.png" alt="Green Land Landscape & Maintenance" />
        </a>
        <nav className="nav__links">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={(e) => { e.preventDefault(); go(n.href); }}>{n.label}</a>
          ))}
        </nav>
        <div className="nav__cta">
          <a className="nav__hub" href={JOBBER_URL} target="_blank" rel="noopener noreferrer">Client Hub <Ico.arrowUR style={{ fontSize: ".8em" }} /></a>
          <button className="btn btn-lime nav__quote" onClick={onQuote}>Request a Quote</button>
          <button className="nav__burger" onClick={() => setOpen(true)} aria-label="Open menu"><Ico.menu style={{ fontSize: "1.5rem" }} /></button>
        </div>
      </div>

      {open && (
        <div className="mobile-menu">
          <div className="mobile-menu__top wrap">
            <span className="serif" style={{ fontSize: "1.5rem", fontStyle: "italic", color: "var(--paper)" }}>Green Land</span>
            <button className="nav__burger" onClick={() => setOpen(false)} aria-label="Close menu" style={{ color: "var(--paper)" }}><Ico.close style={{ fontSize: "1.6rem" }} /></button>
          </div>
          <nav className="mobile-menu__links">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={(e) => { e.preventDefault(); go(n.href); }}>{n.label}</a>
            ))}
            <a href={JOBBER_URL} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>Client Hub ↗</a>
          </nav>
          <div className="mobile-menu__actions">
            <a className="btn btn-lime" href={PHONE_HREF}><Ico.phone /> Call {PHONE}</a>
            <button className="btn btn-ghost-light" onClick={() => { setOpen(false); onQuote(); }}>Request a Quote</button>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------------- HERO ---------------- */
function Hero({ onQuote }) {
  return (
    <section id="top" className="hero">
      <div className="wrap hero__grid">
        <div className="hero__copy reveal in">
          <div className="hero__eyebrow">
            <span className="eyebrow">Lawn Care &amp; Landscaping</span>
            <span className="hero__rule" />
            <span className="eyebrow" style={{ color: "var(--ink-soft)" }}>Family Owned & Operated</span>
          </div>
          <h1 className="display">Where Skill<br />Meets <em>Soil</em></h1>
          <p className="hero__sub text-w">High-quality lawn care and landscaping from a crew that treats your property like a neighbor's — crisp stripes, healthy beds, and honest, friendly service.</p>
          <div className="hero__areas">
            <Ico.pin style={{ color: "var(--green)", fontSize: "1.1rem" }} />
            <span>Servicing <strong>Chesterfield</strong>, <strong>Midlothian</strong> &amp; <strong>Richmond</strong></span>
          </div>
          <div className="hero__btns">
            <button className="btn btn-primary" onClick={onQuote}>Request a Free Quote <Ico.arrow /></button>
            <a className="btn btn-ghost" href={PHONE_HREF}><Ico.phone /> {PHONE}</a>
          </div>
          <a className="hero__rating" href="#reviews" onClick={(e) => { e.preventDefault(); document.querySelector('#reviews').scrollIntoView({behavior:'smooth'}); }}>
            <GoogleG size={20} />
            <Stars n={5} size=".95rem" />
            <span><strong>5.0</strong> · Loved by local homeowners</span>
          </a>
        </div>

        <div className="hero__media reveal in">
          <div className="hero__photo">
            <img src="assets/gallery/1000026682.jpg" alt="Freshly mowed lawn with signature stripes" />
          </div>
          <div className="hero__badge">
            <span className="serif" style={{ fontSize: "2.6rem", lineHeight: 1, color: "var(--forest)" }}>9</span>
            <span className="hero__badge-txt">services,<br />one trusted crew</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- MARQUEE ---------------- */
function Marquee() {
  const items = ["Mowing & Stripes", "Mulch & Beds", "Aeration & Seeding", "Leaf Removal", "Trimming & Pruning", "Graveling", "House Washing", "Snow & Plowing"];
  const row = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {row.map((t, i) => (
          <span key={i} className="marquee__item"><Ico.leaf style={{ color: "var(--lime)", fontSize: "1rem" }} /> {t}</span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- ABOUT ---------------- */
function About() {
  return (
    <section id="about" className="about sec-pad">
      <div className="wrap about__grid">
        <div className="about__media reveal">
          <div className="about__photo" id="about-owner-photo">
            <span className="about__photo-ph serif">Owner on the mower</span>
          </div>
          <div className="about__caption serif">A neighbor, not just a contractor.</div>
        </div>
        <div className="about__copy reveal">
          <span className="eyebrow">Serving our community</span>
          <h2 className="section-title">Taking care of<br /><em className="acc">our neighbors</em></h2>
          <p>We have one simple goal: to provide a high-quality service and create a friendly, hospitable environment. We take great pride in our work, and our crew leaders will guide you toward what's best for you and your property.</p>
          <p>We'll educate you on the tasks at hand, answer your questions, and share tips for the future. Our customer portal makes it effortless to see scheduled visits and book new appointments — you'll even get a text when our crew is on the way.</p>
          <blockquote className="about__quote serif">
            “We're happy to provide a great service that everyone needs — and if we make a few friends along the way, that makes our job so much better.”
            <cite>— Your local landscapers</cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SERVICES ---------------- */
function Services({ onQuote }) {
  return (
    <section id="services" className="services sec-pad">
      <div className="wrap">
        <div className="services__head reveal">
          <div>
            <span className="eyebrow">Our services</span>
            <h2 className="section-title">Everything your<br />property needs</h2>
          </div>
          <p className="text-w services__lead">A full range of comprehensive services for homeowners and businesses across the Greater Richmond area — from weekly mowing to winter plowing.</p>
        </div>

        <div className="services__grid">
          {SERVICES.map((s) => (
            <article key={s.n} className={"svc reveal" + (s.winter ? " svc--winter" : "")}>
              <div className="svc__top">
                <span className="svc__n serif">{s.n}</span>
                {s.winter
                  ? <span className="svc__winter-mark"><Ico.snow style={{ fontSize: "1.3rem" }} /></span>
                  : <span className="svc__tag">{s.tag}</span>}
              </div>
              <h3 className="svc__name">{s.name}</h3>
              <p className="svc__desc">{s.desc}</p>
              {s.winter && <span className="svc__tag svc__tag--winter">{s.tag}</span>}
            </article>
          ))}
        </div>

        <SnowBanner onQuote={onQuote} />
      </div>
    </section>
  );
}

/* ---------------- SNOW SEASONAL BANNER ---------------- */
function SnowBanner({ onQuote }) {
  return (
    <div className="snow-banner reveal">
      <div className="snow-banner__flakes" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => (
          <Ico.snow key={i} style={{ position: "absolute", left: (i * 7.1 % 100) + "%", top: (i * 37 % 100) + "%", fontSize: (10 + (i % 4) * 6) + "px", opacity: .18, color: "#fff" }} />
        ))}
      </div>
      <div className="snow-banner__inner">
        <div>
          <span className="eyebrow" style={{ color: "var(--lime)" }}>Seasonal · Now booking</span>
          <h3 className="snow-banner__title serif">Snow removal &amp; plowing,<br /><em>commercial &amp; residential</em></h3>
          <p className="snow-banner__sub">When the forecast turns, we keep your driveways, walkways, and lots safe and clear. Reserve your winter service before the first storm.</p>
        </div>
        <div className="snow-banner__cta">
          <button className="btn btn-lime" onClick={onQuote}>Reserve winter service <Ico.snow /></button>
          <a className="btn btn-ghost-light" href={PHONE_HREF}><Ico.phone /> {PHONE}</a>
        </div>
      </div>
    </div>
  );
}

/* ---------------- WHY US ---------------- */
function Why() {
  return (
    <section id="why" className="why sec-pad">
      <div className="wrap why__grid">
        <div className="why__intro reveal">
          <span className="eyebrow">Why choose us</span>
          <h2 className="section-title">Excellence in<br />every detail</h2>
          <blockquote className="why__quote serif">“Transform your lawn into the belle of the block with Green Land's signature service and attention to detail.”</blockquote>
        </div>
        <ul className="why__list">
          {WHY.map((w, i) => (
            <li key={i} className="why__item reveal" style={{ transitionDelay: (i * 40) + "ms" }}>
              <span className="why__check"><Ico.check /></span>
              <span>{w}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- GALLERY ---------------- */
function Gallery({ onOpen }) {
  return (
    <section id="gallery" className="gallery sec-pad">
      <div className="wrap">
        <div className="gallery__head reveal">
          <div>
            <span className="eyebrow">Our work</span>
            <h2 className="section-title">The transformations<br />we create</h2>
          </div>
          <p className="text-w">Real projects from real yards across our community. Tap any photo to take a closer look.</p>
        </div>
        <div className="gallery__grid">
          {GALLERY.map((g, i) => (
            <button key={i} className={"gtile reveal gtile--" + (g.span || "sm")} onClick={() => onOpen(i)} style={{ transitionDelay: (i * 50) + "ms" }}>
              <img src={g.src} alt={g.cap} loading="lazy" />
              <span className="gtile__overlay">
                <span className="gtile__cat">{g.cat}</span>
                <span className="gtile__cap">{g.cap}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Lightbox({ index, onClose, onNav }) {
  useEffect(() => {
    if (index == null) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); if (e.key === "ArrowRight") onNav(1); if (e.key === "ArrowLeft") onNav(-1); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [index, onClose, onNav]);
  if (index == null) return null;
  const g = GALLERY[index];
  return (
    <div className="lb" onClick={onClose}>
      <button className="lb__close" onClick={onClose} aria-label="Close"><Ico.close style={{ fontSize: "1.6rem" }} /></button>
      <button className="lb__nav lb__prev" onClick={(e) => { e.stopPropagation(); onNav(-1); }} aria-label="Previous">‹</button>
      <figure className="lb__fig" onClick={(e) => e.stopPropagation()}>
        <img src={g.src} alt={g.cap} />
        <figcaption><span className="chip">{g.cat}</span> {g.cap}</figcaption>
      </figure>
      <button className="lb__nav lb__next" onClick={(e) => { e.stopPropagation(); onNav(1); }} aria-label="Next">›</button>
    </div>
  );
}

/* ---------------- REVIEWS (Google) ---------------- */
function Reviews() {
  return (
    <section id="reviews" className="reviews sec-pad">
      <div className="wrap">
        <div className="reviews__head reveal">
          <div className="reviews__score">
            <GoogleG size={34} />
            <div>
              <div className="reviews__num"><strong>5.0</strong> <Stars n={5} size="1.2rem" /></div>
              <div className="reviews__meta">Based on Google reviews · <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer">Read all reviews ↗</a></div>
            </div>
          </div>
          <a className="btn btn-ghost" href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer">Review us on Google <Ico.arrowUR /></a>
        </div>
        <div className="reviews__grid">
          {REVIEWS.map((r, i) => (
            <figure key={i} className="rev reveal" style={{ transitionDelay: (i * 60) + "ms" }}>
              <div className="rev__top">
                <span className="rev__avatar">{r.initial}</span>
                <div>
                  <figcaption className="rev__name">{r.name}</figcaption>
                  <span className="rev__loc">{r.loc}</span>
                </div>
                <GoogleG size={18} />
              </div>
              <Stars n={5} size=".95rem" />
              <blockquote className="rev__text">{r.text}</blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Nav, Hero, Marquee, About, Services, SnowBanner, Why, Gallery, Lightbox, Reviews });
