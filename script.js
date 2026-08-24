(function () {
  "use strict";
  var menuButton = document.querySelector(".menu-button");
  var navigation = document.getElementById("navigation");
  function closeMenu() {
    if (!menuButton || !navigation) return;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Otvoriť menu");
    navigation.classList.remove("open");
    document.body.classList.remove("menu-open");
  }
  if (menuButton && navigation) {
    menuButton.addEventListener("click", function () {
      var opening = !navigation.classList.contains("open");
      navigation.classList.toggle("open", opening);
      menuButton.setAttribute("aria-expanded", String(opening));
      menuButton.setAttribute("aria-label", opening ? "Zavrieť menu" : "Otvoriť menu");
      document.body.classList.toggle("menu-open", opening);
    });
    navigation.querySelectorAll("a").forEach(function (link) { link.addEventListener("click", closeMenu); });
  }
  var revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.07, rootMargin: "0px 0px -20px" });
    revealItems.forEach(function (item) { observer.observe(item); });
  } else { revealItems.forEach(function (item) { item.classList.add("visible"); }); }
  var archiveForm = document.getElementById("archive-form");
  var archiveMessage = document.getElementById("archive-message");
  if (archiveForm && archiveMessage) {
    archiveForm.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!archiveForm.reportValidity()) return;
      archiveMessage.hidden = false;
      archiveMessage.textContent = "Prihlasovanie je pripravené, ale bezpečný archív ešte treba pripojiť k serveru organizátora.";
    });
  }
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
