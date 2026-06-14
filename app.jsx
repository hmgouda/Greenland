/* ============ Green Land — Quote form, Footer, App ============ */

/* ---------------- QUOTE FORM ---------------- */
function Quote() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", message: "" });
  const [picked, setPicked] = useState([]);
  const [sent, setSent] = useState(false);
  const [errs, setErrs] = useState({});

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const toggle = (s) => setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!form.name.trim()) er.name = 1;
    if (!form.phone.trim() && !form.email.trim()) er.contact = 1;
    if (!form.address.trim()) er.address = 1;
    if (!picked.length) er.services = 1;
    setErrs(er);
    if (Object.keys(er).length) return;
    setSent(true);
  };

  return (
    <section id="quote" className="quote sec-pad">
      <div className="wrap quote__grid">
        <div className="quote__intro reveal">
          <span className="eyebrow" style={{ color: "var(--lime)" }}>Get in touch</span>
          <h2 className="section-title" style={{ color: "var(--paper)" }}>Request a<br /><em style={{ color: "var(--lime)" }}>free quote</em></h2>
          <p className="quote__lead">Tell us about your property and what you need. We'll get back to you quickly with a no-obligation quote.</p>

          <ul className="quote__contact">
            <li><span className="quote__ci"><Ico.phone /></span><div><span className="quote__ck">Phone</span><a href={PHONE_HREF}>{PHONE}</a></div></li>
            <li><span className="quote__ci"><Ico.mail /></span><div><span className="quote__ck">Email</span><a href={"mailto:" + EMAIL}>{EMAIL}</a></div></li>
            <li><span className="quote__ci"><Ico.pin /></span><div><span className="quote__ck">Service area</span><span>Chesterfield · Midlothian · Richmond</span></div></li>
          </ul>
          <a className="quote__hub" href={JOBBER_URL} target="_blank" rel="noopener noreferrer">
            Already a customer? <strong>Visit the Client Hub</strong> to view visits &amp; schedule <Ico.arrowUR style={{ fontSize: ".85em" }} />
          </a>
        </div>

        <div className="quote__card reveal">
          {sent ? (
            <div className="quote__success">
              <span className="quote__success-ico"><Ico.check style={{ fontSize: "2rem" }} /></span>
              <h3 className="serif">Thank you, {form.name.split(" ")[0] || "neighbor"}!</h3>
              <p>Your request is in. We'll reach out shortly to confirm details and schedule your free quote.</p>
              <button className="btn btn-ghost" onClick={() => { setSent(false); setForm({ name: "", phone: "", email: "", address: "", message: "" }); setPicked([]); }}>Submit another request</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="field">
                <label>Full name *</label>
                <input value={form.name} onChange={set("name")} placeholder="Jane Doe" className={errs.name ? "err" : ""} />
              </div>
              <div className="field-row">
                <div className="field">
                  <label>Phone</label>
                  <input value={form.phone} onChange={set("phone")} placeholder="(804) 000-0000" inputMode="tel" className={errs.contact ? "err" : ""} />
                </div>
                <div className="field">
                  <label>Email</label>
                  <input value={form.email} onChange={set("email")} placeholder="you@email.com" inputMode="email" className={errs.contact ? "err" : ""} />
                </div>
              </div>
              {errs.contact && <p className="field-hint">Please add a phone number or email so we can reach you.</p>}
              <div className="field">
                <label>Property address *</label>
                <input value={form.address} onChange={set("address")} placeholder="123 Maple Ln, Midlothian, VA 23113" className={errs.address ? "err" : ""} />
              </div>

              <div className="field">
                <label>Which services are you interested in? *</label>
                <div className={"svc-picker" + (errs.services ? " err" : "")}>
                  {QUOTE_SERVICES.map((s) => (
                    <button type="button" key={s} className={"pick" + (picked.includes(s) ? " on" : "")} onClick={() => toggle(s)}>
                      <span className="pick__box">{picked.includes(s) && <Ico.check style={{ fontSize: ".8rem" }} />}</span>{s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="field">
                <label>Anything else? <span className="opt">(optional)</span></label>
                <textarea value={form.message} onChange={set("message")} rows="3" placeholder="Lot size, gate access, timing, or anything we should know…"></textarea>
              </div>

              <button type="submit" className="btn btn-primary quote__submit">Send my request <Ico.arrow /></button>
              <p className="quote__fine">No spam, no obligation. We typically reply within one business day.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer({ onQuote }) {
  return (
    <footer className="footer">
      <div className="wrap footer__cta reveal">
        <h2 className="serif">Ready for a lawn that turns heads?</h2>
        <div className="footer__cta-btns">
          <button className="btn btn-lime" onClick={onQuote}>Request a Quote <Ico.arrow /></button>
          <a className="btn btn-ghost-light" href={PHONE_HREF}><Ico.phone /> Call {PHONE}</a>
        </div>
      </div>
      <div className="wrap footer__grid">
        <div className="footer__brand">
          <img className="footer__logo-img" src="assets/logo-landscape.png" alt="Green Land Landscape & Maintenance" />
          <p className="serif footer__tag">Where skill meets soil.</p>
          <p className="footer__copy">Lawn care &amp; landscaping for the Greater Richmond area.</p>
        </div>
        <div className="footer__col">
          <h4>Explore</h4>
          {NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
        </div>
        <div className="footer__col">
          <h4>Services</h4>
          {SERVICES.slice(0, 6).map((s) => <a key={s.n} href="#services">{s.name.split(" &")[0].split(" (")[0]}</a>)}
        </div>
        <div className="footer__col">
          <h4>Get in touch</h4>
          <a href={PHONE_HREF}>{PHONE}</a>
          <a href={"mailto:" + EMAIL}>{EMAIL}</a>
          <span>Chesterfield · Midlothian · Richmond</span>
          <a href={JOBBER_URL} target="_blank" rel="noopener noreferrer">Client Hub ↗</a>
        </div>
      </div>
      <div className="wrap footer__legal">
        <span>© {new Date().getFullYear()} Green Land Lawn Care &amp; Landscaping. All rights reserved.</span>
        <span>Licensed &amp; insured · Greater Richmond, VA</span>
      </div>
    </footer>
  );
}

/* ---------------- MOBILE CALL BAR ---------------- */
function MobileCallBar({ onQuote }) {
  return (
    <div className="callbar">
      <a className="callbar__call" href={PHONE_HREF}><Ico.phone style={{ fontSize: "1.15rem" }} /> Call Now</a>
      <button className="callbar__quote" onClick={onQuote}>Free Quote</button>
    </div>
  );
}

/* ---------------- APP ---------------- */
function App() {
  const [lb, setLb] = useState(null);
  useReveal();
  const scrollToQuote = useCallback(() => {
    const el = document.querySelector("#quote");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);
  return (
    <React.Fragment>
      <Nav onQuote={scrollToQuote} />
      <main>
        <Hero onQuote={scrollToQuote} />
        <Marquee />
        <About />
        <Services onQuote={scrollToQuote} />
        <Why />
        <Gallery onOpen={(i) => setLb(i)} />
        <Reviews />
        <Quote />
      </main>
      <Footer onQuote={scrollToQuote} />
      <MobileCallBar onQuote={scrollToQuote} />
      <Lightbox index={lb} onClose={() => setLb(null)} onNav={(d) => setLb((i) => (i + d + GALLERY.length) % GALLERY.length)} />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
