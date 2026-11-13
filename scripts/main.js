(() => {
  const root = document.documentElement;
  root.classList.add("js");

  const steps = [...document.querySelectorAll(".step")];
  if (!steps.length) return;

  const IN = 0.05;   // text appears
  const OUT = 0.5;   // text disappears
  const SHRINK = 0.6; // painting starts shrinking


  const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
  let ticking = false;
  const update = () => {
    const vh = window.innerHeight;
    const on = steps.map((s, i) => i === 0 || s.getBoundingClientRect().top < vh * 0.5);

    steps.forEach((step, i) => {
      const rect = step.getBoundingClientRect();
      const span = rect.height - vh;
      const p = span > 0 ? clamp(-rect.top / span, 0, 1) : 0;
      const first = i === 0;

      const art = step.querySelector(".art");
      const t = clamp((p - SHRINK) / (1 - SHRINK), 0, 1);
      art.style.setProperty("--t", t);

      const started = rect.top < vh * 0.6;
      const showIn = started && (first || p >= IN) && p < OUT;

      step.classList.toggle("is-in", showIn);
      step.classList.toggle("is-out", p >= OUT);
      step.classList.toggle("is-on", on[i] && !on[i + 1] && rect.bottom > vh * 0.5);
    });

    ticking = false;
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  window.addEventListener("load", update);
  update();
})();