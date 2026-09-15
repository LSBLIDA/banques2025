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

  // ══════════════════════════════════════════════════════════ SÉLECTEUR DE LANGUE & DROPDOWNS
  document.addEventListener("click", function (e) {
    var langBtn = e.target.closest(".lang-switcher-btn");
    var langContainer = e.target.closest(".lang-switcher-container");

    if (langBtn && langContainer) {
      e.stopPropagation();
      var isOpen = langContainer.classList.contains("is-open");
      qsa(".lang-switcher-container").forEach(function (c) { c.classList.remove("is-open"); });
      if (!isOpen) {
        langContainer.classList.add("is-open");
      }
    } else if (!e.target.closest(".lang-switcher-container")) {
      qsa(".lang-switcher-container").forEach(function (c) { c.classList.remove("is-open"); });
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      qsa(".lang-switcher-container").forEach(function (c) { c.classList.remove("is-open"); });
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

  function getLang() {
    if (window.SITE_CONFIG && window.SITE_CONFIG.lang) {
      return window.SITE_CONFIG.lang.toLowerCase();
    }
    return (document.documentElement.lang || "fr").toLowerCase();
  }

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

    var lang = getLang();

    var packNamesOrder = {
      fr: { essential: "le Pack Essentiel", pro: "le Pack Pro", corporate: "le Pack Corporate Executive" },
      en: { essential: "Essential Pack", pro: "Pro Pack", corporate: "Corporate Executive Pack" },
      ar: { essential: "الباقة الأساسية", pro: "الباقة الاحترافية", corporate: "الباقة التنفيذية" }
    };

    var i18nLabels = {
      fr: {
        orderPrefix: "Commander ",
        requestReservation: "Demander une réservation",
        order2026: "Commander l'édition 2026"
      },
      en: {
        orderPrefix: "Order ",
        requestReservation: "Request a reservation",
        order2026: "Order 2026 Edition"
      },
      ar: {
        orderPrefix: "طلب ",
        requestReservation: "طلب حجز",
        order2026: "طلب إصدار 2026"
      }
    };

    var curLabels = i18nLabels[lang] || i18nLabels.fr;
    var curPacksOrder = packNamesOrder[lang] || packNamesOrder.fr;

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

      // 5. Mettre à jour les CTA en fonction du statut de l'édition et de la langue
      qsa(".cta-pricing-btn .cta-text").forEach(function (el) {
        var btn = el.closest("[data-pack]");
        var packKey = btn ? btn.getAttribute("data-pack") : "";
        if (editionStatus === "available") {
          var packLabel = curPacksOrder[packKey] || "";
          el.textContent = curLabels.orderPrefix + packLabel;
        } else {
          el.textContent = curLabels.requestReservation;
        }
      });

      var btnHero = qs("#btn-preorder-hero");
      if (btnHero) btnHero.textContent = editionStatus === "available" ? curLabels.order2026 : curLabels.requestReservation;

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
  var PREORDER_IFRAMES = {
    essential: "https://fenekio.com/tandp/ps/forms/wtl/5ba23a9399dbe1484beb72b52e95593f?styled=1",
    pro: "https://fenekio.com/tandp/ps/forms/wtl/9c18a26196a5b5630df381113da3d4b2?styled=1",
    corporate: "https://fenekio.com/tandp/ps/forms/wtl/79e33d8596a4c5f745648a74fe76c5c5?styled=1"
  };

  var PREORDER_TITLE_LABELS = {
    fr: {
      essential: "Souscription — Pack Essentiel (Édition 2026)",
      pro: "Souscription — Pack Pro (Édition 2026)",
      corporate: "Souscription — Pack Corporate Executive (Édition 2026)",
      default: "Formulaire de souscription anticipée"
    },
    en: {
      essential: "Subscription — Essential Pack (2026 Edition)",
      pro: "Subscription — Pro Pack (2026 Edition)",
      corporate: "Subscription — Corporate Executive Pack (2026 Edition)",
      default: "Early Subscription Form"
    },
    ar: {
      essential: "الاشتراك — الباقة الأساسية (إصدار 2026)",
      pro: "الاشتراك — الباقة الاحترافية (إصدار 2026)",
      corporate: "الاشتراك — الباقة التنفيذية المؤسسية (إصدار 2026)",
      default: "استمارة الاشتراك المسبق"
    }
  };

  window.openPreorder = function (packKey) {
    var key = (packKey && PREORDER_IFRAMES[packKey]) ? packKey : "pro";
    window.trackEvent("open_preorder_form", { pack: key });

    var modal = qs("#preorderModal") || qs("#subscription-modal");
    var iframe = qs("#preorderIframe") || qs("#subscription-iframe");
    var titleEl = qs("#preorderModalTitle");

    if (titleEl) {
      var lang = getLang();
      var titles = PREORDER_TITLE_LABELS[lang] || PREORDER_TITLE_LABELS.fr;
      titleEl.textContent = titles[key] || titles.default;
    }

    // Gérer l'affichage des détails du pack
    qsa(".preorder-details").forEach(function (el) {
      el.classList.add("hidden");
    });
    var detailsEl = qs("#preorderModalDetails-" + key);
    if (detailsEl) {
      detailsEl.classList.remove("hidden");
    }

    if (iframe) {
      iframe.src = PREORDER_IFRAMES[key];
    }

    if (modal) {
      modal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
      if (typeof modal.focus === "function") modal.focus();
    }
  };

  window.openSubscriptionPopup = window.openPreorder;

  window.closePreorder = function () {
    var modal = qs("#preorderModal") || qs("#subscription-modal");
    var iframe = qs("#preorderIframe") || qs("#subscription-iframe");
    if (modal) {
      modal.classList.add("hidden");
      document.body.style.overflow = "";
    }
    if (iframe) {
      iframe.src = "about:blank";
    }
  };

  window.closeSubscriptionModal = window.closePreorder;

  window.openOrder = function (pack) {
    window.trackEvent("open_order_form_2025", { pack: pack });
    const modal = qs("#orderModal");
    const frame = qs("#orderFrame");
    const labelEl = qs("#orderPlanLabel");
    if (!modal || !frame) return;

    var lang = getLang();
    var packLabels = {
      fr: {
        essential: "Pack Essentiel",
        pro: "Pack Pro",
        corporate: "Pack Corporate Executive"
      },
      en: {
        essential: "Essential Pack",
        pro: "Pro Pack",
        corporate: "Corporate Executive Pack"
      },
      ar: {
        essential: "الباقة الأساسية",
        pro: "الباقة الاحترافية",
        corporate: "الباقة التنفيذية المؤسسية"
      }
    };
    var currentPackLabels = packLabels[lang] || packLabels.fr;
    if (labelEl) labelEl.textContent = currentPackLabels[pack] || "";

    var fallbackMsgs = {
      fr: '<p style="font-family:Inter,sans-serif;padding:24px;color:#374151">Formulaire en cours de configuration. Contactez-nous à <a href="mailto:info@tadjeddine-partners.com">info@tadjeddine-partners.com</a></p>',
      en: '<p style="font-family:Inter,sans-serif;padding:24px;color:#374151">Form currently being configured. Contact us at <a href="mailto:info@tadjeddine-partners.com">info@tadjeddine-partners.com</a></p>',
      ar: '<p style="font-family:Inter,sans-serif;padding:24px;color:#374151" dir="rtl">الاستمارة قيد الإعداد. اتصل بنا على <a href="mailto:info@tadjeddine-partners.com">info@tadjeddine-partners.com</a></p>'
    };

    var formUrl = (typeof SITE_CONFIG !== "undefined" && SITE_CONFIG.editions && SITE_CONFIG.editions["2025"] && SITE_CONFIG.editions["2025"].orderForms) ? SITE_CONFIG.editions["2025"].orderForms[pack] : null;
    if (formUrl) {
      frame.src = formUrl;
    } else {
      frame.src = "about:blank";
      frame.srcdoc = fallbackMsgs[lang] || fallbackMsgs.fr;
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
    var is2026 = window.location.pathname.indexOf("2026") !== -1;
    window.trackEvent(is2026 ? "click_preview_2026" : "click_preview_2025");
    var modal = qs("#previewModal");
    if (modal) { modal.classList.remove("hidden"); document.body.style.overflow = "hidden"; }
  };

  window.closePreview = function () {
    var modal = qs("#previewModal");
    if (modal) { modal.classList.add("hidden"); document.body.style.overflow = ""; }
  };

  // Gestion de l'ancre #synthese (défilement et ouverture automatique de l'aperçu)
  if (window.location.hash === "#synthese") {
    setTimeout(function () {
      var synthEl = qs("#synthese");
      if (synthEl) {
        synthEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      if (typeof window.openPreview === "function") {
        window.openPreview();
      }
    }, 300);
  }

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

  window.openPrivacyPopup = function (e) {
    if (e) e.preventDefault();
    window.trackEvent("open_privacy_policy_popup");

    var url = "https://tadjeddine-partners.com/politique-confidentialite/";
    var width = 850;
    var height = 750;
    var left = Math.max(0, (window.screen.width - width) / 2);
    var top = Math.max(0, (window.screen.height - height) / 2);
    var features = "width=" + width + ",height=" + height + ",left=" + left + ",top=" + top + ",scrollbars=yes,resizable=yes,status=no,location=no,toolbar=no,menubar=no";

    var popup = window.open(url, "ABIX_Privacy_Policy", features);
    if (!popup || popup.closed || typeof popup.closed === "undefined") {
      // Si le popup du navigateur est bloqué par la sécurité client, afficher la modale HTML sur la page
      var modal = qs("#privacyModal");
      if (modal) {
        modal.classList.remove("hidden");
        document.body.style.overflow = "hidden";
      }
    } else {
      popup.focus();
    }
  };

  window.openPrivacyModal = window.openPrivacyPopup;

  window.closePrivacyModal = function () {
    var modal = qs("#privacyModal");
    if (modal) {
      modal.classList.add("hidden");
      document.body.style.overflow = "";
    }
  };

  // ══════════════════════════════════════════════════════════ FORMULAIRES DE PRÉCOMMANDE 2026 (RELAIS BACKEND FENEKIO)
  function handlePreorderSubmit(form, formErrorId, formSuccessId, submitBtnId) {
    if (!form) return;

    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      var errEl = qs("#" + formErrorId);
      if (errEl) {
        errEl.classList.add("hidden");
        errEl.textContent = "";
      }

      var submitBtn = qs("#" + submitBtnId, form);
      var originalBtnText = submitBtn ? submitBtn.textContent : "";

      // Vérification case 1 : Termes & Conditions
      var termsCheck = qs('input[name="accept_terms_and_conditions"]', form);
      if (termsCheck && !termsCheck.checked) {
        if (errEl) {
          errEl.textContent = "Veuillez cocher la case d'acceptation des Termes & Conditions.";
          errEl.classList.remove("hidden");
        }
        return;
      }

      // Vérification case 2 : Politique de Confidentialité
      var privacyCheck = qs('input[name="privacy_consent"]', form);
      if (privacyCheck && !privacyCheck.checked) {
        if (errEl) {
          errEl.textContent = "Veuillez accepter la politique de confidentialité pour pouvoir valider votre précommande.";
          errEl.classList.remove("hidden");
        }
        return;
      }

      window.trackEvent("submit_preorder_form");

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Envoi en cours…";
      }

      var formData = new FormData(form);
      var payload = {};
      formData.forEach(function (val, key) {
        payload[key] = val;
      });

      var basePath = (window.SITE_CONFIG && window.SITE_CONFIG.basePath) ? window.SITE_CONFIG.basePath : "/banques2025";
      var endpoint = basePath + "/api/preorder.php";

      try {
        var res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        var data = await res.json().catch(function () { return {}; });

        if (res.ok && data.ok) {
          form.reset();
          form.classList.add("hidden");
          var succEl = qs("#" + formSuccessId);
          if (succEl) {
            succEl.classList.remove("hidden");
          }

          window.trackEvent("preorder_success", {
            organization: payload.company || payload.organization
          });
        } else {
          var errorMsg = data.error || "Une erreur est survenue lors de l’enregistrement de votre précommande. Veuillez réessayer.";
          if (errEl) {
            errEl.textContent = errorMsg;
            errEl.classList.remove("hidden");
          }
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
          }
        }
      } catch (err) {
        if (errEl) {
          errEl.textContent = "Une erreur est survenue lors de l’enregistrement de votre précommande. Veuillez réessayer.";
          errEl.classList.remove("hidden");
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
        }
      }
    });
  }

  handlePreorderSubmit(qs("#preorder-form-2026"), "preorder-form-error", "preorder-form-success", "po-submit-btn");
  handlePreorderSubmit(qs("#page-preorder-form-2026"), "ppo-form-error", "ppo-form-success", "ppo-submit-btn");

  // ══════════════════════════════════════════════════════════ VIDÉO DÉMO DATA EXPLORER
  window.loadDataExplorerVideo = function () {
    var container = qs("#dex-video-player-container");
    if (!container) return;

    window.trackEvent("play_data_explorer_demo_video", { source: "hero_play_button" });

    var iframe = document.createElement("iframe");
    iframe.setAttribute("src", "https://www.youtube-nocookie.com/embed/6xiW8lhvE5A?autoplay=1&rel=0&modestbranding=1&enablejsapi=1");
    iframe.setAttribute("title", "ABIX Data Explorer — Démonstration Vidéo");
    iframe.setAttribute("class", "w-full h-full border-0 rounded-lg absolute inset-0");
    iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
    iframe.setAttribute("allowfullscreen", "true");

    container.innerHTML = "";
    container.classList.remove("cursor-pointer", "group");
    container.removeAttribute("onclick");
    container.removeAttribute("onkeydown");
    container.removeAttribute("tabindex");
    container.removeAttribute("role");
    container.appendChild(iframe);

    var badge = qs("#hero-demo-badge");
    if (badge) {
      badge.style.opacity = "0";
      badge.style.pointerEvents = "none";
    }
  };

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

window.openVideoModal = function() {
    let modal = document.getElementById('dexVideoModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'dexVideoModal';
        modal.className = 'fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4';
        modal.style.zIndex = '9999';
        modal.innerHTML = `
            <div class="bg-slate-900 rounded-3xl max-w-5xl w-full max-h-[90vh] flex flex-col border border-gray-800 shadow-2xl relative overflow-hidden">
                <div class="p-3 border-b border-gray-800 flex justify-end">
                    <button onclick="closeVideoModal()" class="text-gray-400 hover:text-white transition-colors p-2 rounded-xl hover:bg-slate-800">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                </div>
                <div class="relative w-full bg-black" style="padding-top: 56.25%;">
                    <iframe id="dexVideoIframe" src="https://www.youtube-nocookie.com/embed/6xiW8lhvE5A?autoplay=1&rel=0&modestbranding=1" class="absolute inset-0 w-full h-full border-0" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    } else {
        modal.classList.remove('hidden');
        document.getElementById('dexVideoIframe').src = "https://www.youtube-nocookie.com/embed/6xiW8lhvE5A?autoplay=1&rel=0&modestbranding=1";
    }
};
window.closeVideoModal = function() {
    const modal = document.getElementById('dexVideoModal');
    if (modal) {
        modal.classList.add('hidden');
        document.getElementById('dexVideoIframe').src = "";
    }
};
