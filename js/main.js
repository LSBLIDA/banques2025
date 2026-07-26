/**
 * ABIX — Script principal côté client
 *
 * Responsabilités :
 *  1. Navigation mobile & scroll header
 *  2. Dropdowns & accrodéons FAQ
 *  3. Gestion automatique de la date limite Early Bird (31 août 2026)
 *  4. Suivi d'événements analytics (conversions)
 *  5. Modaux de précommande (2026) et de commande (2025)
 *  6. Soumission des formulaires de précommande & fallbacks
 */

(function () {
  "use strict";

  // ══════════════════════════════════════════════════════════ UTILITAIRES
  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return (ctx || document).querySelectorAll(sel); }

  // ══════════════════════════════════════════════════════════ ANALYTICS TRACKING
  window.trackEvent = function (eventName, eventParams) {
    eventParams = eventParams || {};
    console.log("[Analytics Event]", eventName, eventParams);

    if (window.dataLayer && typeof window.dataLayer.push === "function") {
      window.dataLayer.push({
        event: eventName,
        event_params: eventParams,
        timestamp: new Date().toISOString()
      });
    }
  };

  // Attachement automatique aux éléments avec data-track="..."
  document.addEventListener("click", function (e) {
    var target = e.target.closest("[data-track]");
    if (target) {
      var eventName = target.getAttribute("data-track");
      if (eventName) {
        window.trackEvent(eventName, {
          element_id: target.id || null,
          element_text: target.textContent.trim().substring(0, 50)
        });
      }
    }
  });

  // ══════════════════════════════════════════════════════════ MENU MOBILE
  const mobileMenuBtn = qs("#mobile-menu-btn");
  const mobileMenu = qs("#mobile-menu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", function () {
      const isExpanded = mobileMenuBtn.getAttribute("aria-expanded") === "true";
      mobileMenuBtn.setAttribute("aria-expanded", String(!isExpanded));
      mobileMenu.classList.toggle("hidden");
    });

    document.addEventListener("click", function (e) {
      if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add("hidden");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ══════════════════════════════════════════════════════════ SCROLL NAV
  const nav = qs("#main-nav");
  if (nav) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 10) {
        nav.classList.add("shadow-sm");
      } else {
        nav.classList.remove("shadow-sm");
      }
    }, { passive: true });
  }

  // ══════════════════════════════════════════════════════════ DROPDOWNS DESKTOP
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      qsa(".dropdown-menu").forEach(function (menu) {
        menu.style.display = "";
      });
    }
  });

  // ══════════════════════════════════════════════════════════ FAQ ACCORDÉON
  window.toggleFAQ = function (id) {
    const content = qs("#" + id + "-content");
    const icon = qs("#" + id + "-icon");
    if (!content || !icon) return;

    const isHidden = content.classList.contains("hidden");
    content.classList.toggle("hidden", !isHidden);
    if (icon) icon.style.transform = isHidden ? "rotate(180deg)" : "";
  };

  // ══════════════════════════════════════════════════════════ ONGLETS (TABS)
  window.showTab = function (tabName) {
    const tabs = ["methodology", "content", "sample"];
    tabs.forEach(function (t) {
      const btn = qs("#tab-" + t);
      const panel = qs("#content-" + t);
      if (!btn || !panel) return;

      const isActive = t === tabName;
      btn.setAttribute("aria-selected", String(isActive));
      btn.classList.toggle("tab-btn--active", isActive);
      panel.classList.toggle("hidden", !isActive);
    });
  };

  // ══════════════════════════════════════════════════════════ GESTION AUTOMATIQUE DATE LIMITE EARLY BIRD
  var countdownInterval = null;

  function initEarlyBirdDeadline() {
    var deadlineStr = "2026-08-31T23:59:59+01:00";
    var editionStatus = "preorder";

    if (typeof SITE_CONFIG !== "undefined" && SITE_CONFIG.editions && SITE_CONFIG.editions["2026"]) {
      var ed2026 = SITE_CONFIG.editions["2026"];
      if (ed2026.earlyBird && ed2026.earlyBird.deadline) {
        deadlineStr = ed2026.earlyBird.deadline;
      } else if (ed2026.preorderDeadline) {
        deadlineStr = ed2026.preorderDeadline;
      }
      if (ed2026.status) {
        editionStatus = ed2026.status;
      }
    }

    var deadlineDate = new Date(deadlineStr);
    var now = new Date();
    var isExpired = now >= deadlineDate;

    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("expired")) {
      deadlineDate = new Date("2020-01-01T00:00:00+01:00");
      isExpired = true;
      var expParam = urlParams.get("expired");
      if (expParam === "available" || expParam === "preorder" || expParam === "preparation") {
        editionStatus = expParam;
      }
    }

    if (isExpired) {
      if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
      }

      // 1. Masquer les badges Early Bird
      qsa(".badge-discount, #hero-earlybird-badge, #pricing-earlybird-badge, #modal-earlybird-badge").forEach(function (el) {
        el.classList.add("hidden");
      });

      // 2. Masquer la mention de validité et de l'économie réalisée
      qsa(".saving-mention, .validity-mention").forEach(function (el) {
        el.classList.add("hidden");
      });

      // 3. Masquer le tarif Early Bird et afficher uniquement le tarif normal en grand
      qsa(".early-bird-price").forEach(function (el) {
        el.classList.add("hidden");
      });

      qsa(".regular-price-struck").forEach(function (el) {
        el.classList.remove("line-through", "text-gray-400", "text-sm", "text-xs");
        el.classList.add("text-3xl", "sm:text-4xl", "font-extrabold", "text-white", "tracking-tight");
      });

      // 4. Masquer le compte à rebours
      var countdownContainer = qs("#countdown-container");
      if (countdownContainer) countdownContainer.classList.add("hidden");

      // 5. Mettre à jour les CTA en fonction du statut de l'édition
      qsa(".cta-pricing-btn .cta-text").forEach(function (el) {
        var btn = el.closest("[data-pack]");
        var packKey = btn ? btn.getAttribute("data-pack") : "";
        if (editionStatus === "available") {
          var packLabel = packKey === "essential" ? "le Pack Essentiel" : packKey === "pro" ? "le Pack Pro" : packKey === "corporate" ? "le Pack Corporate Executive" : "";
          el.textContent = "Commander " + packLabel;
        } else {
          el.textContent = "Demander une réservation";
        }
      });

      var btnHero = qs("#btn-preorder-hero");
      if (btnHero) btnHero.textContent = editionStatus === "available" ? "Commander l'édition 2026" : "Demander une réservation";

      console.log("[ABIX] Offre Early Bird expirée le 31 août 2026. Statut édition : " + editionStatus);
    } else {
      // Restaurer l'affichage Early Bird
      qsa(".badge-discount, #hero-earlybird-badge, #pricing-earlybird-badge, #modal-earlybird-badge").forEach(function (el) {
        el.classList.remove("hidden");
      });
      qsa(".saving-mention, .validity-mention").forEach(function (el) {
        el.classList.remove("hidden");
      });
      qsa(".early-bird-price").forEach(function (el) {
        el.classList.remove("hidden");
      });
      qsa(".regular-price-struck").forEach(function (el) {
        el.classList.add("line-through", "text-gray-400", "text-sm");
        el.classList.remove("text-3xl", "sm:text-4xl", "font-extrabold", "text-white", "tracking-tight");
      });
      var countdownContainer = qs("#countdown-container");
      if (countdownContainer) countdownContainer.classList.remove("hidden");

      qsa(".cta-pricing-btn .cta-text").forEach(function (el) {
        var btn = el.closest("[data-pack]");
        var packKey = btn ? btn.getAttribute("data-pack") : "";
        var packLabel = packKey === "essential" ? "le Pack Essentiel" : packKey === "pro" ? "le Pack Pro" : packKey === "corporate" ? "le Pack Corporate Executive" : "";
        el.textContent = "Précommander " + packLabel;
      });

      var btnHero = qs("#btn-preorder-hero");
      if (btnHero) btnHero.textContent = "Précommander l'édition 2026";

      updateCountdown(deadlineDate);
      if (countdownInterval) clearInterval(countdownInterval);
      countdownInterval = setInterval(function () {
        updateCountdown(deadlineDate);
      }, 1000);
    }
  }

  function updateCountdown(targetDate) {
    var now = new Date();
    var diff = targetDate - now;
    if (diff <= 0) return;

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var secs = Math.floor((diff % (1000 * 60)) / 1000);

    var dEl = qs("#cd-days");
    var hEl = qs("#cd-hours");
    var mEl = qs("#cd-mins");
    var sEl = qs("#cd-secs");

    if (dEl) dEl.textContent = String(days).padStart(2, '0');
    if (hEl) hEl.textContent = String(hours).padStart(2, '0');
    if (mEl) mEl.textContent = String(mins).padStart(2, '0');
    if (sEl) sEl.textContent = String(secs).padStart(2, '0');
  }

  initEarlyBirdDeadline();

  // Exposer la simulation pour le contrôle qualité
  window.simulateEarlyBirdExpired = function (simulatedStatus) {
    if (typeof SITE_CONFIG !== "undefined" && SITE_CONFIG.editions && SITE_CONFIG.editions["2026"]) {
      SITE_CONFIG.editions["2026"].earlyBird.deadline = "2020-01-01T00:00:00+01:00";
      if (simulatedStatus) SITE_CONFIG.editions["2026"].status = simulatedStatus;
    }
    initEarlyBirdDeadline();
  };

  window.resetEarlyBirdSimulation = function () {
    if (typeof SITE_CONFIG !== "undefined" && SITE_CONFIG.editions && SITE_CONFIG.editions["2026"]) {
      SITE_CONFIG.editions["2026"].earlyBird.deadline = "2026-08-31T23:59:59+01:00";
      SITE_CONFIG.editions["2026"].status = "preorder";
    }
    initEarlyBirdDeadline();
  };

  // ══════════════════════════════════════════════════════════ MODAUX DE COMMANDE & PRÉCOMMANDE
  var ORDER_FORMS = {};
  if (typeof SITE_CONFIG !== "undefined" && SITE_CONFIG.editions["2025"]) {
    ORDER_FORMS = SITE_CONFIG.editions["2025"].orderForms || {};
  }

  window.openPreorder = function (packKey) {
    window.trackEvent("open_preorder_form", { pack: packKey || "2026" });
    var modal = qs("#preorderModal");

    if (packKey && ["essential", "pro", "corporate"].indexOf(packKey) !== -1) {
      var poPack = qs("#po_pack");
      if (poPack) poPack.value = packKey;

      var ppoPack = qs("#ppo_pack");
      if (ppoPack) ppoPack.value = packKey;
    }

    if (modal) {
      modal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
      modal.focus();
    } else {
      var preorderSec = qs("#precommande");
      if (preorderSec) {
        preorderSec.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  window.closePreorder = function () {
    const modal = qs("#preorderModal");
    if (modal) {
      modal.classList.add("hidden");
      document.body.style.overflow = "";
    }
  };

  window.openOrder = function (pack) {
    window.trackEvent("open_order_form_2025", { pack: pack });
    const modal = qs("#orderModal");
    const frame = qs("#orderFrame");
    const labelEl = qs("#orderPlanLabel");
    if (!modal || !frame) return;

    var packLabels = {
      essential: "Pack Essentiel",
      pro: "Pack Pro",
      corporate: "Pack Corporate Executive"
    };
    if (labelEl) labelEl.textContent = packLabels[pack] || "";

    var formUrl = ORDER_FORMS[pack] || null;
    if (formUrl) {
      frame.src = formUrl;
    } else {
      frame.src = "about:blank";
      frame.srcdoc = '<p style="font-family:Inter,sans-serif;padding:24px;color:#374151">Formulaire en cours de configuration. Contactez-nous à <a href="mailto:info@tadjeddine-partners.com">info@tadjeddine-partners.com</a></p>';
    }

    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    modal.focus();
  };

  window.closeOrder = function () {
    var modal = qs("#orderModal");
    var frame = qs("#orderFrame");
    if (modal) { modal.classList.add("hidden"); document.body.style.overflow = ""; }
    if (frame) { frame.src = "about:blank"; }
  };

  window.openPreview = function () {
    window.trackEvent("click_preview_2025");
    var modal = qs("#previewModal");
    if (modal) { modal.classList.remove("hidden"); document.body.style.overflow = "hidden"; }
  };

  window.closePreview = function () {
    var modal = qs("#previewModal");
    if (modal) { modal.classList.add("hidden"); document.body.style.overflow = ""; }
  };

  // Fermer les modaux en cliquant sur le backdrop
  ["preorderModal", "orderModal", "previewModal"].forEach(function (id) {
    var modal = qs("#" + id);
    if (!modal) return;
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.classList.add("hidden");
        document.body.style.overflow = "";
        var frame = qs("#orderFrame");
        if (id === "orderModal" && frame) frame.src = "about:blank";
      }
    });
  });

  // Fermer les modaux avec Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      qsa('[id$="Modal"]').forEach(function (m) {
        m.classList.add("hidden");
        document.body.style.overflow = "";
      });
      var frame = qs("#orderFrame");
      if (frame) frame.src = "about:blank";
    }
  });

  // ══════════════════════════════════════════════════════════ FILTRAGE BANQUES
  window.filterBanks = function (type) {
    var cards = qsa(".bank-card");
    var allBtn = qs("#filter-all");
    var pubBtn = qs("#filter-public");
    var priBtn = qs("#filter-private");

    [allBtn, pubBtn, priBtn].forEach(function (b) { if (b) b.classList.remove("filter-btn--active"); });
    var activeBtn = qs("#filter-" + type);
    if (activeBtn) activeBtn.classList.add("filter-btn--active");

    cards.forEach(function (card) {
      if (type === "all" || card.dataset.type === type) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  };

  // ══════════════════════════════════════════════════════════ FORMULAIRES DE PRÉCOMMANDE 2026
  function handlePreorderSubmit(form, formErrorId, formSuccessId, submitBtnId) {
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var errEl = qs("#" + formErrorId);
      if (errEl) errEl.classList.add("hidden");

      // Vérification case à cocher obligatoire
      var termsCheck = qs('input[name="terms_consent"]', form);
      if (termsCheck && !termsCheck.checked) {
        if (errEl) {
          errEl.textContent = "Veuillez cocher la case confirmant que vous avez pris connaissance du statut de finalisation de l'édition 2026.";
          errEl.classList.remove("hidden");
        }
        return;
      }

      window.trackEvent("submit_preorder_form");

      var submitBtn = qs("#" + submitBtnId, form);
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Enregistrement...";
      }

      var formData = new FormData(form);
      var body = [];
      formData.forEach(function (val, key) { body.push(key + ": " + val); });

      var mailto = "mailto:info@tadjeddine-partners.com"
        + "?subject=" + encodeURIComponent("Réservation Early Bird ABIX 2026 — " + (formData.get("organization") || ""))
        + "&body=" + encodeURIComponent(body.join("\n"));

      // Déclenche le mailto de secours et affiche le panneau de succès
      setTimeout(function () {
        form.classList.add("hidden");
        var succEl = qs("#" + formSuccessId);
        if (succEl) succEl.classList.remove("hidden");

        // Événement preorder_success DÉCLENCHÉ UNIQUEMENT après enregistrement réel
        window.trackEvent("preorder_success", {
          pack: formData.get("pack"),
          organization: formData.get("organization")
        });

        window.location.href = mailto;
      }, 500);
    });
  }

  handlePreorderSubmit(qs("#preorder-form-2026"), "preorder-form-error", "preorder-form-success", "po-submit-btn");
  handlePreorderSubmit(qs("#page-preorder-form-2026"), "ppo-form-error", "ppo-form-success", "ppo-submit-btn");

  // ══════════════════════════════════════════════════════════ FORMULAIRE CONTACT GÉNÉRIQUE
  var contactForm = qs("#contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var formData = new FormData(contactForm);
      var body = [];
      formData.forEach(function (val, key) { body.push(key + ": " + val); });

      var mailtoUrl = "mailto:info@tadjeddine-partners.com"
        + "?subject=" + encodeURIComponent("Demande via ABIX — " + (formData.get("contact_type") || "Contact"))
        + "&body=" + encodeURIComponent(body.join("\n"));

      window.location.href = mailtoUrl;
    });
  }

}());
