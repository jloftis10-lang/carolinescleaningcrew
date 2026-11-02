// Optional GA4 connection. Set the public measurement ID in analytics-config.js.
const measurementId = window.CAROLINES_ANALYTICS?.measurementId;
if (/^G-[A-Z0-9]+$/.test(measurementId || "")) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  // Only the page path is sent; query parameters and form values are excluded.
  window.gtag("config", measurementId, {
    page_location: location.origin + location.pathname,
    page_referrer: document.referrer ? new URL(document.referrer).origin : "",
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  const analyticsScript = document.createElement("script");
  analyticsScript.async = true;
  analyticsScript.src = "https://www.googletagmanager.com/gtag/js?id=" + measurementId;
  document.head.append(analyticsScript);
}

// Analytics hook: sends event names only, never form values or contact details.
// Does nothing until an analytics tool (gtag or Plausible) is added to the pages.
function track(event) {
  window.dispatchEvent(new CustomEvent("carolines:conversion", { detail: { event } }));
  if (typeof window.gtag === "function") window.gtag("event", event);
  if (typeof window.plausible === "function") window.plausible(event);
}

document.querySelectorAll("[data-track]").forEach((link) => {
  link.addEventListener("click", () => track(link.dataset.track));
});

// Mobile nav toggle
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("site-nav");

if (toggle && nav) {
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
}

// Footer year
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Call/text banner: hide it while the quote form or footer is on screen so it never covers
// fields or the footer's own contact links
const contactBar = document.querySelector(".contact-bar");
const barTargets = [document.getElementById("quote"), document.querySelector(".site-footer")].filter(Boolean);
if (contactBar && barTargets.length && "IntersectionObserver" in window) {
  const onScreen = new Set();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => (entry.isIntersecting ? onScreen.add(entry.target) : onScreen.delete(entry.target)));
    contactBar.classList.toggle("is-hidden", onScreen.size > 0);
  });
  barTargets.forEach((target) => observer.observe(target));
}

// Quote form
const form = document.querySelector(".quote-form");

if (form) {
  const status = form.querySelector(".form-status");
  const button = form.querySelector("button[type=submit]");
  const phone = form.elements.phone;
  const email = form.elements.email;

  // We validate ourselves so messages are clear and nothing typed is lost
  form.noValidate = true;

  // Preselect the plan from links like ?plan=monthly#quote
  function selectPlan(plan) {
    const recurring = ["weekly", "every-other-week", "monthly"].includes(plan);
    const servicePlan = recurring ? "regular" : plan;
    const serviceInput = form.querySelector(`input[name="service"][data-plan="${CSS.escape(servicePlan || "")}"]`);
    if (!serviceInput) return;
    serviceInput.checked = true;
    const frequencyPlan = recurring ? plan : "once";
    form.querySelector(`input[name="frequency"][data-plan="${frequencyPlan}"]`).checked = true;
    for (const name of ["service", "frequency"]) {
      form.elements[name][0].dispatchEvent(new Event("change", { bubbles: true }));
    }
  }

  // Only the contact detail needed for the chosen method is required
  function updateContactRequirements() {
    const method = form.elements.contact_method.value;
    phone.required = method === "Call" || method === "Text";
    email.required = method === "Email";
    document.getElementById("phone-field").hidden = method === "Email";
    document.getElementById("email-field").hidden = method === "Call" || method === "Text";
    phone.disabled = method === "Email";
    email.disabled = method === "Call" || method === "Text";
    form.querySelector('[data-optional-for="phone"]').hidden = phone.required;
    form.querySelector('[data-optional-for="email"]').hidden = email.required;
  }
  form.querySelectorAll('input[name="contact_method"]').forEach((input) => {
    input.addEventListener("change", updateContactRequirements);
  });
  updateContactRequirements();

  let started = false;
  form.addEventListener("input", () => {
    if (!started) {
      started = true;
      track("quote_start");
    }
  });
  form.addEventListener("change", () => form.dispatchEvent(new Event("input")));

  const messages = {
    zip: "Enter your 5-digit ZIP code.",
    service: "Choose the service you need.",
    frequency: "Choose how often you'd like cleaning.",
    bedrooms: "Choose the number of bedrooms.",
    bathrooms: "Choose the number of bathrooms.",
    name: "Enter your name.",
    contact_method: "Choose how Caroline should reach you.",
    phone: "Enter a phone number with area code so Caroline can call or text you.",
    email: "Enter an email address, like name@example.com.",
  };

  function fieldValid(name) {
    const field = form.elements[name];
    if (field.disabled) return true;
    if (name === "phone") {
      const digits = field.value.replace(/\D/g, "");
      return !field.required && !field.value.trim() ? true : /^(?:1)?[2-9]\d{2}[2-9]\d{6}$/.test(digits);
    }
    if (field instanceof RadioNodeList) return !!field.value;
    return field.checkValidity() && (!field.required || field.value.trim() !== "");
  }

  function showError(name, show) {
    const field = form.elements[name];
    const error = document.getElementById(
      { service: "q-service-error", frequency: "q-frequency-error", contact_method: "q-method-error" }[name] || `${field.id}-error`
    );
    error.textContent = show ? messages[name] : "";
    const targets = field instanceof RadioNodeList ? [...field] : [field];
    for (const target of targets) {
      if (show) target.setAttribute("aria-invalid", "true");
      else target.removeAttribute("aria-invalid");
    }
  }

  function validate() {
    let firstInvalid = null;
    for (const name of Object.keys(messages)) {
      const valid = fieldValid(name);
      showError(name, !valid);
      if (!valid && !firstInvalid) {
        const field = form.elements[name];
        firstInvalid = field instanceof RadioNodeList ? field[0] : field;
      }
    }
    return firstInvalid;
  }

  // Clear a field's error as soon as it's fixed
  form.addEventListener("change", (event) => {
    const name = event.target.name;
    if (name in messages && fieldValid(name)) showError(name, false);
    if (name === "contact_method") {
      for (const n of ["phone", "email"]) if (fieldValid(n)) showError(n, false);
    }
  });

  selectPlan(new URLSearchParams(location.search).get("plan"));
  document.querySelectorAll('a[href*="?plan="]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = new URL(link.href);
      const currentPage = location.pathname.replace(/index\.html$/, "");
      if (target.pathname.replace(/index\.html$/, "") !== currentPage) return;
      event.preventDefault();
      selectPlan(target.searchParams.get("plan"));
      history.replaceState(null, "", target.search + "#quote");
      document.getElementById("quote").scrollIntoView({ behavior: "smooth" });
      form.elements.service[0].focus({ preventScroll: true });
    });
  });

  const configured = !form.action.includes("YOUR_FORM_ID");
  if (!configured) {
    form.querySelector(".form-unavailable").hidden = false;
    button.disabled = true;
    button.textContent = "Call or text for your quote";
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!configured) {
      form.querySelector(".form-unavailable").focus();
      return;
    }
    status.className = "form-status";
    status.textContent = "";

    const firstInvalid = validate();
    if (firstInvalid) {
      status.classList.add("err");
      status.textContent = "Please fix the highlighted fields.";
      firstInvalid.focus();
      return;
    }

    button.disabled = true;
    status.textContent = "Sending...";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(response.statusText);
      track("quote_submitted");
      started = false;
      form.reset();
      updateContactRequirements();
      status.classList.add("ok");
      status.textContent =
        "Thanks, your request was sent. Caroline will review it and reply using the contact method you chose. This is a request, not a booked appointment.";
    } catch {
      track("quote_error");
      status.classList.add("err");
      status.textContent =
        "Sorry, your request didn't go through. Your details are still filled in, so please try again, or call or text (760) 492-9338.";
    } finally {
      button.disabled = false;
      status.focus();
    }
  });
}
