// public/pixel.js
(function () {
    function send(data) {
      try {
        navigator.sendBeacon
          ? navigator.sendBeacon("/api/pixel/click", JSON.stringify(data))
          : fetch("/api/pixel/click", {
              method: "POST",
              credentials: "same-origin",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            });
      } catch (e) {}
    }
  
    function init() {
      var script = document.currentScript || (function () {
        var scripts = document.getElementsByTagName("script");
        return scripts[scripts.length - 1];
      })();
  
      var domain = script?.getAttribute("data-domain") || window.location.hostname;
      var publisherId = script?.getAttribute("data-publisher") || null;
  
      // send a pageview immediately
      send({ domain: domain, publisherId: publisherId });
  
      // track clicks on links (optional)
      document.addEventListener("click", function (e) {
        var el = e.target;
        while (el && el.tagName !== "A") el = el.parentElement;
        if (!el || !el.href) return;
        send({ domain: domain, publisherId: publisherId });
      }, true);
    }
  
    if (document.readyState === "complete" || document.readyState === "interactive") {
      init();
    } else {
      document.addEventListener("DOMContentLoaded", init);
    }
  })();
  