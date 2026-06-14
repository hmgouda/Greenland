/* ============ Green Land — shared data, hooks, small UI ============ */
const { useState, useEffect, useRef, useCallback } = React;

const PHONE = "804-439-6900";
const PHONE_HREF = "tel:8044396900";
const EMAIL = "greenlandforyou@gmail.com";
const JOBBER_URL = "https://clienthub.getjobber.com/";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#quote" },
];

const SERVICE_AREAS = ["Chesterfield", "Midlothian", "Richmond"];

const SERVICES = [
  { n: "01", name: "Lawn Mowing & Maintenance", tag: "Weekly / Bi-weekly",
    desc: "Crisp cuts, clean edges, and our signature stripes. We set the ideal mowing height, edge every walk and drive, and clear debris before we cut." },
  { n: "02", name: "Lawn Treatment & Health", tag: "Seasonal program",
    desc: "A healthier lawn from the soil up — pre/post-emergent weed control, crabgrass & nutsedge treatment, granular and liquid fertilizers, and lime." },
  { n: "03", name: "Aeration & Seeding", tag: "Fall service",
    desc: "We open the soil so nutrients reach the roots, then overseed thin patches with premium fescue for thicker, faster, greener growth." },
  { n: "04", name: "Leaf Removal", tag: "Fall – Winter",
    desc: "Scheduled cleanups that clear leaves before they smother the grass — blown to a designated area or vacuumed and hauled away." },
  { n: "05", name: "Trimming & Gardening", tag: "Shrubs & beds",
    desc: "Shaping and pruning for shrubs, bushes, and small trees — hydrangeas, crape myrtles, boxwoods, hollies, liriope, and more." },
  { n: "06", name: "Mulching & Beds", tag: "Curb appeal",
    desc: "Edged beds and fresh double-shredded mulch or decorative rock. Choose dyed brown, jet black, red, natural hardwood, or river rock." },
  { n: "07", name: "Graveling & Driveways", tag: "Skid-steer work",
    desc: "Gravel delivery, grading, and leveling for driveways, paths, and parking areas — placed and graded with our skid steer." },
  { n: "08", name: "House Washing", tag: "Exterior cleaning",
    desc: "Soft-wash exterior cleaning that lifts dirt, mildew, and grime from siding, walks, and surfaces — instant curb appeal restored." },
  { n: "09", name: "Snow Removal & Plowing", tag: "Commercial & Residential", winter: true,
    desc: "Dependable winter service — plowing, shoveling, and de-icing for homes and businesses that keeps your property safe, clear, and open." },
];

const QUOTE_SERVICES = [
  "Lawn Mowing", "Leaf Removal", "Mulching", "Graveling",
  "Trimming & Gardening", "Aeration & Seeding", "House Washing",
  "Snow Removal", "Other",
];

const WHY = [
  "Professional, experienced crew leaders",
  "Text notifications when our crew is on the way",
  "Premium materials and equipment",
  "Comprehensive, season-long lawn programs",
  "Customer portal for effortless scheduling",
  "Signature lawn stripes and crisp edges",
  "Friendly, neighborly service every visit",
  "We educate you so your lawn thrives long-term",
];

const GALLERY = [
  { src: "assets/gallery/1000030862.jpg", cat: "Mowing", cap: "Striped front lawn, Midlothian", span: "wide" },
  { src: "assets/gallery/1000042844.jpg", cat: "Trimming", cap: "Shaping a Japanese maple", span: "tall" },
  { src: "assets/gallery/1000024894.jpg", cat: "Beds & Lighting", cap: "Mulch beds with landscape lighting", span: "" },
  { src: "assets/gallery/1000043694.jpg", cat: "Graveling", cap: "Driveway gravel with the skid steer", span: "tall" },
  { src: "assets/gallery/1000024892.jpg", cat: "Hardscaping", cap: "Stone steps & retaining wall", span: "" },
  { src: "assets/gallery/1000026682.jpg", cat: "Mowing", cap: "Fresh stripes, edge to edge", span: "wide" },
];

const REVIEWS = [
  { name: "Sarah M.", loc: "Midlothian, VA", initial: "S",
    text: "Green Land transformed our yard. The stripes look incredible and the crew is always on time, friendly, and thorough. We get compliments from neighbors constantly." },
  { name: "David & Lori P.", loc: "Chesterfield, VA", initial: "D",
    text: "They re-did all our mulch beds and added landscape lighting. The text-ahead notifications are such a nice touch. Felt like working with a neighbor, not a contractor." },
  { name: "Marcus T.", loc: "Richmond, VA", initial: "M",
    text: "Hired them for a gravel driveway and seasonal mowing. Fair pricing, great communication, and the work speaks for itself. Highly recommend to anyone in the area." },
  { name: "Janet R.", loc: "Midlothian, VA", initial: "J",
    text: "Their aeration and overseeding brought our tired fescue back to life. The customer portal makes scheduling effortless. Five stars without hesitation." },
];

/* ---------- reveal-on-scroll hook ---------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (ents) => ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  });
}

/* ---------- tiny icons (simple geometric strokes only) ---------- */
const Ico = {
  phone: (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6.5 3.5 9 4l1 4-2 1.5a12 12 0 0 0 6 6L15.5 13l4 1 .5 2.5a2 2 0 0 1-2 2.3A15 15 0 0 1 4.2 5.5a2 2 0 0 1 2.3-2Z"/></svg>),
  arrow: (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>),
  arrowUR: (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M7 17 17 7M8 7h9v9"/></svg>),
  check: (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 12.5l5 5L20 6"/></svg>),
  pin: (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>),
  mail: (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>),
  menu: (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><path d="M4 7h16M4 12h16M4 17h16"/></svg>),
  close: (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><path d="M6 6l12 12M18 6 6 18"/></svg>),
  snow: (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 2v20M4 7l16 10M20 7 4 17M12 5l2.5 2M12 5 9.5 7M12 19l2.5-2M12 19l-2.5-2M4.5 9.5 7 9M19.5 14.5 17 15M19.5 9.5 17 9M4.5 14.5 7 15"/></svg>),
  star: (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" {...p}><path fill="currentColor" d="M12 2.5l2.9 6 6.6.7-4.9 4.5 1.4 6.5-6-3.3-6 3.3 1.4-6.5L2 9.2l6.6-.7Z"/></svg>),
  leaf: (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 19c0-8 5-13 14-13 0 9-5 14-14 13Z"/><path d="M5 19C9 13 12 11 16 9"/></svg>),
};

function Stars({ n = 5, size = "1rem", color = "var(--lime-deep)" }) {
  return (
    <span style={{ display: "inline-flex", gap: 2, color, fontSize: size }} aria-label={n + " out of 5 stars"}>
      {Array.from({ length: n }).map((_, i) => <Ico.star key={i} />)}
    </span>
  );
}

/* Google "G" mark — simple multi-color arcs */
function GoogleG({ size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path fill="#4285F4" d="M21.6 12.2c0-.6 0-1.2-.15-1.8H12v3.4h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.1Z"/>
      <path fill="#34A853" d="M12 22c2.7 0 4.9-.9 6.6-2.4l-3.2-2.5c-.9.6-2 .95-3.4.95-2.6 0-4.8-1.75-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22Z"/>
      <path fill="#FBBC05" d="M6.4 13.95a6 6 0 0 1 0-3.9V7.45H3.1a10 10 0 0 0 0 9.1Z"/>
      <path fill="#EA4335" d="M12 5.95c1.5 0 2.8.5 3.8 1.5l2.85-2.85A10 10 0 0 0 3.1 7.45L6.4 10c.8-2.35 3-4.05 5.6-4.05Z"/>
    </svg>
  );
}

Object.assign(window, { useState, useEffect, useRef, useCallback,
  PHONE, PHONE_HREF, EMAIL, JOBBER_URL, NAV, SERVICE_AREAS, SERVICES, QUOTE_SERVICES,
  WHY, GALLERY, REVIEWS, useReveal, Ico, Stars, GoogleG });
