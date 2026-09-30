/**
 * SHARED HEADER AND FOOTER
 * Edit NAV_LINKS below to add, remove, or rename pages.
 * Every HTML page calls injectChrome() from js/main.js after this file loads.
 */
(function () {
  // Single source of truth for the navigation. Paths are relative.
  window.NAV_LINKS = [
    { href: "index.html", label: "Home" },
    { href: "about.html", label: "About" },
    { href: "robot.html", label: "Robot" },
    { href: "sponsors.html", label: "Sponsors" },
    { href: "outreach.html", label: "Outreach" },
    { href: "media.html", label: "Media" },
    { href: "calendar.html", label: "Calendar" }
  ];

  function currentFile() {
    var path = window.location.pathname || "";
    var file = path.split("/").pop();
    return file === "" ? "index.html" : file;
  }

  function navItemsHtml() {
    var current = currentFile();
    return window.NAV_LINKS.map(function (link) {
      var active = link.href === current ? " aria-current=\"page\"" : "";
      return (
        "<li>" +
        "<a href=\"" +
        link.href +
        "\"" +
        active +
        ">" +
        link.label +
        "</a>" +
        "</li>"
      );
    }).join("");
  }

  function socialLinksHtml() {
    var data = window.SITE_DATA || {};
    var instagram = data.instagram || {};
    var tiktok = data.tiktok || {};
    var email = data.email || "";

    var html = "";
    if (instagram.url) {
      html +=
        "<a href=\"" +
        instagram.url +
        "\" rel=\"noopener noreferrer\" target=\"_blank\">Instagram " +
        (instagram.handle || "") +
        "</a>";
    }
    if (tiktok.placeholder) {
      html +=
        "<span class=\"footer-muted\">TikTok — TODO: add link</span>";
    } else if (tiktok.url) {
      html +=
        "<a href=\"" +
        tiktok.url +
        "\" rel=\"noopener noreferrer\" target=\"_blank\">TikTok</a>";
    }
    if (email) {
      html += "<a href=\"mailto:" + email + "\">" + email + "</a>";
    }
    return html;
  }

  window.injectChrome = function injectChrome() {
    var headerHost = document.getElementById("site-header");
    var footerHost = document.getElementById("site-footer");
    var data = window.SITE_DATA || {};
    var team = data.teamName || "Danes Robotics";
    var number = data.teamNumber || "11174";

    if (headerHost) {
      headerHost.innerHTML =
        "<header class=\"site-header\" id=\"top\">" +
        "<div class=\"nav-inner\">" +
        "<a class=\"brand\" href=\"index.html\">" +
        "<img class=\"brand-logo\" src=\"images/logo.png\" width=\"48\" height=\"48\" alt=\"" +
        team +
        " logo\" data-fallback=\"logo\">" +
        "<span class=\"brand-text\">" +
        "<span class=\"brand-name\">" +
        team +
        "</span>" +
        "<span class=\"brand-number\">FRC " +
        number +
        "</span>" +
        "</span>" +
        "</a>" +
        "<button class=\"nav-toggle\" type=\"button\" aria-expanded=\"false\" aria-controls=\"site-nav\" aria-label=\"Open menu\">" +
        "<span class=\"nav-toggle-bar\"></span>" +
        "<span class=\"nav-toggle-bar\"></span>" +
        "<span class=\"nav-toggle-bar\"></span>" +
        "</button>" +
        "<nav class=\"site-nav\" id=\"site-nav\" aria-label=\"Primary\">" +
        "<ul class=\"nav-list\">" +
        navItemsHtml() +
        "</ul>" +
        "</nav>" +
        "</div>" +
        "</header>";
    }

    if (footerHost) {
      footerHost.innerHTML =
        "<footer class=\"site-footer\">" +
        "<div class=\"footer-inner\">" +
        "<div>" +
        "<p class=\"footer-wordmark\">" +
        team +
        "</p>" +
        "<p class=\"footer-meta\">FIRST Robotics Competition Team " +
        number +
        "<br>" +
        (data.school || "Denmark High School") +
        " · " +
        (data.location || "Alpharetta, Georgia") +
        "</p>" +
        "</div>" +
        "<div class=\"footer-links\">" +
        socialLinksHtml() +
        "</div>" +
        "</div>" +
        "<p class=\"footer-note\">A student-built team. We do not list individual student or staff names on this site.</p>" +
        "</footer>";
    }
  };
})();
