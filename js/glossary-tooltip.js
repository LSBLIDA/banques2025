/**
 * ABIX — Système d'Aide Contextuelle et Infobulles du Glossaire
 *
 * Ce script permet d'enrichir n'importe quel terme dans les modules d'ABIX
 * (ex: Total Bilan, CAGR, ROE, HHI, LDR, Quantile) avec une infobulle interactive
 * et un lien direct vers sa fiche complète dans le Glossaire.
 *
 * Usage HTML :
 *   <span data-glossary-term="cagr" class="glossary-term">CAGR ⓘ</span>
 *   ou
 *   <button type="button" data-glossary-term="hhi" class="glossary-trigger">HHI</button>
 */

(function () {
  'use strict';

  var currentLang = document.documentElement.lang || 'fr';
  var isRtl = document.documentElement.dir === 'rtl';
  var basePath = (window.SITE_CONFIG && window.SITE_CONFIG.basePath) || '';
  if (!basePath && window.location.pathname.includes('/banques2025')) {
    basePath = '/banques2025';
  }

  var glossaryItemsCache = null;
  var tooltipEl = null;
  var activeTrigger = null;

  function getGlossaryUrl(slug) {
    var langPath = currentLang === 'en' ? 'en/glossary' : (currentLang === 'ar' ? 'ar/glossaire' : 'fr/glossaire');
    return (basePath + '/' + langPath + '/#term-' + encodeURIComponent(slug)).replace(/\/+/g, '/');
  }

  function initTooltipElement() {
    if (tooltipEl) return tooltipEl;

    tooltipEl = document.createElement('div');
    tooltipEl.id = 'abix-glossary-tooltip';
    tooltipEl.setAttribute('role', 'tooltip');
    tooltipEl.className = 'fixed z-50 hidden max-w-sm w-80 bg-slate-900/95 text-white rounded-xl p-4 shadow-2xl border border-slate-700 backdrop-blur-md text-xs transition-all duration-200 pointer-events-auto opacity-0 scale-95';

    tooltipEl.innerHTML = [
      '<div class="flex items-start justify-between gap-2 mb-2 pb-2 border-b border-slate-700/80">',
      '  <div>',
      '    <div id="tooltip-term-title" class="font-bold text-sm text-emerald-400 font-inter"></div>',
      '    <div id="tooltip-term-category" class="text-[10px] text-slate-400 font-medium mt-0.5"></div>',
      '  </div>',
      '  <span class="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 flex-shrink-0">ABIX</span>',
      '</div>',
      '<p id="tooltip-term-def" class="text-slate-200 text-xs leading-relaxed mb-3 font-normal"></p>',
      '<div class="flex items-center justify-between pt-1 border-t border-slate-800 text-[11px]">',
      '  <span id="tooltip-term-unit" class="text-slate-400 italic"></span>',
      '  <a id="tooltip-term-link" href="#" class="inline-flex items-center gap-1 font-semibold text-accent hover:text-amber-300 transition-colors">',
      '    <span>' + (currentLang === 'en' ? 'View in glossary →' : (currentLang === 'ar' ? 'عرض في المعجم ←' : 'Voir dans le glossaire →')) + '</span>',
      '  </a>',
      '</div>'
    ].join('');

    document.body.appendChild(tooltipEl);

    // Éviter la fermeture si l'utilisateur survole l'infobulle elle-même
    tooltipEl.addEventListener('mouseenter', function () {
      tooltipEl.classList.remove('opacity-0', 'scale-95');
      tooltipEl.classList.add('opacity-100', 'scale-100');
    });

    tooltipEl.addEventListener('mouseleave', function () {
      hideTooltip();
    });

    return tooltipEl;
  }

  function fetchGlossaryItem(slug, callback) {
    if (glossaryItemsCache && glossaryItemsCache[slug]) {
      callback(glossaryItemsCache[slug]);
      return;
    }

    // Essayer de lire les données déjà injectées dans la page si présentes
    if (window.__ABIX_GLOSSARY_ITEMS__ && window.__ABIX_GLOSSARY_ITEMS__[slug]) {
      if (!glossaryItemsCache) glossaryItemsCache = {};
      glossaryItemsCache[slug] = window.__ABIX_GLOSSARY_ITEMS__[slug];
      callback(glossaryItemsCache[slug]);
      return;
    }

    // Requête API vers api/glossary.php
    var apiUrl = (basePath + '/api/glossary.php?lang=' + encodeURIComponent(currentLang) + '&slug=' + encodeURIComponent(slug)).replace(/\/+/g, '/');
    fetch(apiUrl)
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (!glossaryItemsCache) glossaryItemsCache = {};
        if (data && data.entries && data.entries.length > 0) {
          glossaryItemsCache[slug] = data.entries[0];
          callback(data.entries[0]);
        }
      })
      .catch(function () {});
  }

  function positionTooltip(trigger) {
    if (!tooltipEl || !trigger) return;

    var rect = trigger.getBoundingClientRect();
    var tooltipWidth = 320;
    var tooltipHeight = tooltipEl.offsetHeight || 160;
    var padding = 12;

    var top = rect.bottom + 8;
    var left = isRtl ? (rect.right - tooltipWidth) : rect.left;

    // Ajustement vertical si débordement en bas
    if (top + tooltipHeight > window.innerHeight - padding) {
      top = rect.top - tooltipHeight - 8;
    }

    // Ajustement horizontal
    if (left < padding) left = padding;
    if (left + tooltipWidth > window.innerWidth - padding) {
      left = window.innerWidth - tooltipWidth - padding;
    }

    tooltipEl.style.top = top + 'px';
    tooltipEl.style.left = left + 'px';
  }

  function showTooltip(trigger) {
    var slug = trigger.getAttribute('data-glossary-term');
    if (!slug) return;

    activeTrigger = trigger;
    initTooltipElement();

    fetchGlossaryItem(slug, function (item) {
      if (!item || activeTrigger !== trigger) return;

      var titleEl = document.getElementById('tooltip-term-title');
      var catEl = document.getElementById('tooltip-term-category');
      var defEl = document.getElementById('tooltip-term-def');
      var unitEl = document.getElementById('tooltip-term-unit');
      var linkEl = document.getElementById('tooltip-term-link');

      if (titleEl) titleEl.textContent = item.term + (item.acronym ? ' (' + item.acronym + ')' : '');
      if (catEl) catEl.textContent = item.category || '';
      if (defEl) defEl.textContent = item.short_definition || '';
      if (unitEl) unitEl.textContent = item.unit ? (currentLang === 'en' ? 'Unit: ' : (currentLang === 'ar' ? 'الوحدة: ' : 'Unité : ')) + item.unit : '';
      if (linkEl) linkEl.href = getGlossaryUrl(item.slug || slug);

      tooltipEl.classList.remove('hidden');
      positionTooltip(trigger);

      requestAnimationFrame(function () {
        tooltipEl.classList.remove('opacity-0', 'scale-95');
        tooltipEl.classList.add('opacity-100', 'scale-100');
      });
    });
  }

  function hideTooltip() {
    activeTrigger = null;
    if (!tooltipEl) return;

    tooltipEl.classList.remove('opacity-100', 'scale-100');
    tooltipEl.classList.add('opacity-0', 'scale-95');

    setTimeout(function () {
      if (!activeTrigger) {
        tooltipEl.classList.add('hidden');
      }
    }, 200);
  }

  function bindTriggers() {
    var triggers = document.querySelectorAll('[data-glossary-term]');
    triggers.forEach(function (trigger) {
      // Style visuel subtil si pas déjà stylé
      if (!trigger.classList.contains('glossary-trigger-bound')) {
        trigger.classList.add('glossary-trigger-bound', 'cursor-help', 'border-b', 'border-dotted', 'border-primary/40');

        trigger.addEventListener('mouseenter', function () { showTooltip(trigger); });
        trigger.addEventListener('mouseleave', function () {
          setTimeout(function () {
            if (!tooltipEl || !tooltipEl.matches(':hover')) {
              hideTooltip();
            }
          }, 150);
        });

        trigger.addEventListener('focus', function () { showTooltip(trigger); });
        trigger.addEventListener('blur', function () { hideTooltip(); });

        trigger.addEventListener('click', function (e) {
          // Si c'est un lien direct on laisse faire, sinon on affiche l'infobulle
          if (trigger.tagName.toLowerCase() !== 'a') {
            e.preventDefault();
            showTooltip(trigger);
          }
        });
      }
    });
  }

  // Initialisation au chargement du DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindTriggers);
  } else {
    bindTriggers();
  }

  // Écouteur pour fermer avec la touche Échap
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') hideTooltip();
  });

  // Re-binding si le contenu dynamique est injecté
  window.ABIX_BIND_GLOSSARY_TOOLTIPS = bindTriggers;
})();
