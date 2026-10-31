// Mobile nav toggle
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("site-nav");

toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!open));
  nav.classList.toggle("open", !open);
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("open");
  });
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Quote form: submit via fetch so visitors stay on the page
const form = document.querySelector(".quote-form");

form?.addEventListener("submit", async (event) => {
  const status = form.querySelector(".form-status");
  event.preventDefault();
  const button = form.querySelector("button[type=submit]");
  button.disabled = true;
  status.className = "form-status";
  status.textContent = "Sending...";

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new Error(response.statusText);
    form.reset();
    status.classList.add("ok");
    status.textContent = "Thanks! We'll be in touch soon.";
  } catch {
    status.classList.add("err");
    status.textContent = "Something went wrong. Please call or email us instead.";
  } finally {
    button.disabled = false;
  }
});
