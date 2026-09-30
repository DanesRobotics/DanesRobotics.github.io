/**
 * PAGE BEHAVIOR
 * Handles the sticky nav, mobile menu, scroll reveals, count-up stats,
 * image fallbacks, and rendering lists from the data/*.js files.
 */
(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  ready(function () {
    if (typeof window.injectChrome === "function") {
      window.injectChrome();
    }
    initImageFallbacks();
    initNav();
    renderPage();
    initReveals();
  });

  function initImageFallbacks() {
    var images = document.querySelectorAll("img");
    images.forEach(function (img) {
      img.addEventListener("error", function onError() {
        img.removeEventListener("error", onError);
        img.classList.add("is-missing");
        img.removeAttribute("src");
        var fallback = img.getAttribute("data-fallback");
        if (fallback === "logo") {
          var mark = document.createElement("span");
          mark.className = "brand-mark";
          mark.setAttribute("aria-hidden", "true");
          mark.textContent = "DR";
          if (img.parentNode) {
            img.parentNode.insertBefore(mark, img);
          }
        }
      });
    });
  }

  function initNav() {
    var header = document.querySelector(".site-header");
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("site-nav");
    if (!header) return;

    function onScroll() {
      header.classList.toggle("is-solid", window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = !document.body.classList.contains("nav-open");
        document.body.classList.toggle("nav-open", open);
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      });

      nav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          document.body.classList.remove("nav-open");
          toggle.setAttribute("aria-expanded", "false");
          toggle.setAttribute("aria-label", "Open menu");
        });
      });
    }
  }

  function initReveals() {
    var nodes = document.querySelectorAll("[data-reveal]");
    if (!nodes.length) return;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      nodes.forEach(function (node) {
        node.classList.add("is-visible");
      });
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -40px 0px" }
    );
    nodes.forEach(function (node) {
      observer.observe(node);
      var rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        node.classList.add("is-visible");
        observer.unobserve(node);
      }
    });
  }

  function animateCount(el, target) {
    if (reduceMotion) {
      el.textContent = formatCount(target, el.dataset.format);
      return;
    }
    var start = 0;
    var duration = 1200;
    var started = null;
    function frame(now) {
      if (!started) started = now;
      var progress = Math.min((now - started) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = Math.round(start + (target - start) * eased);
      el.textContent = formatCount(value, el.dataset.format);
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function formatCount(value, format) {
    if (format === "compact") {
      if (value >= 1000000) return Math.round(value / 100000) / 10 + "M+";
      if (value >= 1000) return Math.round(value / 1000).toLocaleString() + "K+";
      return String(value);
    }
    return value.toLocaleString();
  }

  function initials(name) {
    return name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(function (part) {
        return part.charAt(0);
      })
      .join("")
      .toUpperCase();
  }

  function renderSponsors(container, limit) {
    if (!container || !window.SITE_SPONSORS) return;
    var list = window.SITE_SPONSORS.slice();
    if (typeof limit === "number") list = list.slice(0, limit);
    container.innerHTML = list
      .map(function (sponsor) {
        var logo = sponsor.logo
          ? "<img src=\"" +
            sponsor.logo +
            "\" alt=\"" +
            sponsor.name +
            " logo\" width=\"160\" height=\"80\" loading=\"lazy\" data-fallback=\"sponsor\">"
          : "";
        return (
          "<article class=\"sponsor-card\">" +
          "<div class=\"sponsor-logo\">" +
          logo +
          "<span class=\"sponsor-initials\" aria-hidden=\"true\">" +
          initials(sponsor.name) +
          "</span>" +
          "</div>" +
          "<p class=\"sponsor-name\">" +
          sponsor.name +
          "</p>" +
          "</article>"
        );
      })
      .join("");

    container.querySelectorAll("img").forEach(function (img) {
      img.addEventListener("error", function () {
        img.classList.add("is-missing");
        img.removeAttribute("src");
      });
    });
  }

  function renderTiers(container) {
    if (!container || !window.SITE_TIERS) return;
    container.innerHTML = window.SITE_TIERS.map(function (tier) {
      var featured = tier.featured ? " is-featured" : "";
      var benefits = (tier.benefits || [])
        .map(function (item) {
          return "<li>" + item + "</li>";
        })
        .join("");
      return (
        "<article class=\"tier-card" +
        featured +
        "\">" +
        "<p class=\"tier-name\">" +
        tier.name +
        "</p>" +
        "<p class=\"tier-amount\">" +
        tier.amountLabel +
        "</p>" +
        "<ul class=\"tier-benefits\">" +
        benefits +
        "</ul>" +
        "</article>"
      );
    }).join("");
  }

  function renderEvents(container, options) {
    if (!container || !window.SITE_EVENTS) return;
    options = options || {};
    var list = window.SITE_EVENTS.slice();
    if (options.year) {
      list = list.filter(function (event) {
        return event.year === options.year;
      });
    }
    container.innerHTML = list
      .map(function (event) {
        var results = (event.results || [])
          .map(function (result) {
            return "<li>" + result + "</li>";
          })
          .join("");
        var notes = event.notes
          ? "<p class=\"event-notes\">" + event.notes + "</p>"
          : "";
        var status = event.upcoming ? "Upcoming" : String(event.year);
        return (
          "<article class=\"event-card\">" +
          "<p class=\"event-kicker\">" +
          status +
          " · " +
          (event.district || "") +
          "</p>" +
          "<h3>" +
          event.name +
          "</h3>" +
          "<p class=\"event-location\">" +
          (event.location || "") +
          "</p>" +
          (results ? "<ul class=\"event-results\">" + results + "</ul>" : "") +
          notes +
          "</article>"
        );
      })
      .join("");
  }

  function renderSubteams(container) {
    var data = window.SITE_DATA;
    if (!container || !data || !data.subteams) return;
    container.innerHTML = data.subteams
      .map(function (team) {
        return (
          "<article class=\"subteam-card\">" +
          "<h3>" +
          team.name +
          "</h3>" +
          "<p>" +
          team.summary +
          "</p>" +
          "</article>"
        );
      })
      .join("");
  }

  function renderMedia(container) {
    if (!container || !window.SITE_MEDIA) return;
    container.innerHTML = window.SITE_MEDIA.map(function (item) {
      return (
        "<figure class=\"media-card\">" +
        "<div class=\"media-frame\">" +
        "<img src=\"" +
        item.src +
        "\" alt=\"" +
        (item.alt || item.caption || "") +
        "\" width=\"800\" height=\"500\" loading=\"lazy\">" +
        "<span class=\"media-placeholder\">Photo coming soon</span>" +
        "</div>" +
        "<figcaption>" +
        (item.caption || "") +
        "</figcaption>" +
        "</figure>"
      );
    }).join("");

    container.querySelectorAll("img").forEach(function (img) {
      img.addEventListener("error", function () {
        img.classList.add("is-missing");
        img.removeAttribute("src");
      });
    });
  }

  function renderHome() {
    var data = window.SITE_DATA || {};
    var events = window.SITE_EVENTS || [];
    var yearEvents = events.filter(function (event) {
      return event.year === data.rookieSeason;
    });
    var awardCount = yearEvents.reduce(function (total, event) {
      var awards = (event.results || []).filter(function (result) {
        return !/^competed$/i.test(String(result).trim());
      });
      return total + awards.length;
    }, 0);

    var hero = document.getElementById("hero-content");
    if (hero && data.hero) {
      hero.innerHTML =
        "<p class=\"hero-kicker\">" +
        data.hero.kicker +
        "</p>" +
        "<h1>" +
        data.hero.title +
        "</h1>" +
        "<p class=\"hero-lede\">" +
        data.hero.lede +
        "</p>" +
        "<div class=\"hero-actions\">" +
        "<a class=\"btn-ghost\" href=\"" +
        data.hero.primaryCta.href +
        "\">" +
        data.hero.primaryCta.label +
        "<span aria-hidden=\"true\"> →</span></a>" +
        "<a class=\"btn-ghost\" href=\"" +
        data.hero.secondaryCta.href +
        "\">" +
        data.hero.secondaryCta.label +
        "<span aria-hidden=\"true\"> →</span></a>" +
        "</div>";
    }

    var story = document.getElementById("story-short");
    if (story) story.textContent = data.storyShort || data.story || "";

    var countSponsors = document.getElementById("stat-sponsors");
    var countEvents = document.getElementById("stat-events");
    var countAwards = document.getElementById("stat-awards");
    var countViews = document.getElementById("stat-views");

    if (countSponsors) {
      countSponsors.dataset.target = String((window.SITE_SPONSORS || []).length);
    }
    if (countEvents) {
      countEvents.dataset.target = String(yearEvents.length);
    }
    if (countAwards) {
      countAwards.dataset.target = String(awardCount);
    }
    if (countViews) {
      countViews.dataset.target = String(data.socialViews || 0);
      countViews.dataset.format = "compact";
    }

    document.querySelectorAll("[data-count]").forEach(function (el) {
      var target = Number(el.dataset.target || 0);
      if (reduceMotion) {
        el.textContent = formatCount(target, el.dataset.format);
        return;
      }
      if (!("IntersectionObserver" in window)) {
        animateCount(el, target);
        return;
      }
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(el, target);
            observer.unobserve(el);
          }
        });
      });
      observer.observe(el);
    });

    renderSubteams(document.getElementById("subteams-grid"));
    renderEvents(document.getElementById("home-events"), { year: data.rookieSeason });
    renderSponsors(document.getElementById("home-sponsors"));
  }

  function renderAbout() {
    var data = window.SITE_DATA || {};
    var story = document.getElementById("about-story");
    if (story) story.textContent = data.story || "";
    renderSubteams(document.getElementById("subteams-grid"));
  }

  function renderRobot() {
    var data = (window.SITE_DATA || {}).robot || {};
    var host = document.getElementById("robot-content");
    if (!host) return;
    var name = data.name
      ? "<p class=\"robot-name\">" + data.name + "</p>"
      : "<p class=\"robot-name is-todo\">TODO: add the robot name</p>";
    host.innerHTML =
      "<p class=\"section-kicker\">" +
      data.year +
      " · " +
      data.game +
      "</p>" +
      "<h1>The robot</h1>" +
      name +
      "<p class=\"lede\">" +
      data.summary +
      "</p>" +
      "<figure class=\"media-card robot-photo\">" +
      "<div class=\"media-frame\">" +
      "<img src=\"" +
      data.photo +
      "\" alt=\"Danes Robotics " +
      data.year +
      " robot\" width=\"960\" height=\"640\" loading=\"lazy\">" +
      "<span class=\"media-placeholder\">TODO: replace with a robot photo</span>" +
      "</div>" +
      "</figure>";
    var img = host.querySelector("img");
    if (img) {
      img.addEventListener("error", function () {
        img.classList.add("is-missing");
        img.removeAttribute("src");
      });
    }
  }

  function renderOutreach() {
    var data = window.SITE_DATA || {};
    var views = document.getElementById("outreach-views");
    if (views) {
      views.textContent = data.socialViewsLabel || formatCount(data.socialViews || 0, "compact");
    }
  }

  function renderPage() {
    var page = document.body.getAttribute("data-page");
    if (page === "home") renderHome();
    if (page === "about") renderAbout();
    if (page === "robot") renderRobot();
    if (page === "sponsors") {
      renderSponsors(document.getElementById("sponsors-grid"));
      renderTiers(document.getElementById("tiers-grid"));
      var count = document.getElementById("sponsor-count");
      if (count) count.textContent = String((window.SITE_SPONSORS || []).length);
    }
    if (page === "outreach") renderOutreach();
    if (page === "media") renderMedia(document.getElementById("media-grid"));
    if (page === "calendar") renderEvents(document.getElementById("events-grid"));
  }
})();
