import "./style.css";
import { FORM_EMAIL, SUBSCRIBE_URL } from "./config.js";

// ── Mobile nav ──
const btn = document.querySelector("[data-nav-toggle]");
const menu = document.querySelector("[data-nav-mobile]");
btn?.addEventListener("click", () => {
  const open = menu?.classList.toggle("hidden") === false;
  btn.setAttribute("aria-expanded", String(open));
});
menu?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => menu.classList.add("hidden")));

// ── Subscribe buttons → payment page (if configured) ──
if (SUBSCRIBE_URL) {
  document.querySelectorAll("[data-subscribe]").forEach((a) => {
    a.href = SUBSCRIBE_URL;
    a.target = "_blank";
    a.rel = "noopener";
  });
}

// ── Join form ──
const form = document.querySelector("[data-join-form]");
if (form) {
  const done = form.querySelector("[data-form-done]");
  const error = form.querySelector("[data-form-error]");
  const submit = form.querySelector("button[type=submit]");

  if (FORM_EMAIL) {
    form.action = `https://formsubmit.co/ajax/${FORM_EMAIL}`;
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      submit.disabled = true;
      submit.textContent = "جارٍ الإرسال…";
      try {
        const res = await fetch(form.action, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(Object.fromEntries(new FormData(form))),
        });
        if (!res.ok) throw new Error(res.statusText);
        form.reset();
        done.classList.remove("hidden");
        error.classList.add("hidden");
      } catch {
        error.classList.remove("hidden");
      } finally {
        submit.disabled = false;
        submit.textContent = "أرسل لي رابط الاشتراك";
      }
    });
  } else {
    // No email configured yet: show confirmation only.
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      form.reset();
      done.classList.remove("hidden");
    });
  }
}

// ── Reveal on scroll ──
const reveals = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); } }),
    { threshold: 0.12 }
  );
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("is-visible"));
}

// ── Hide sticky CTA when the join section is on screen ──
const sticky = document.querySelector("[data-sticky-cta]");
const join = document.querySelector("#join");
if (sticky && join && "IntersectionObserver" in window) {
  new IntersectionObserver(([en]) => sticky.classList.toggle("hidden", en.isIntersecting), { threshold: 0.2 }).observe(join);
}

// ── Footer year ──
document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = String(new Date().getFullYear())));
