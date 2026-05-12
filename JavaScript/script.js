// Reveal Animation
let reveals = document.querySelectorAll(".reveal");

// Mobile Menu
let menuToggle = document.querySelector(".menu-toggle");
let mobileMenu = document.querySelector(".mobile-menu");

// Search
let searchIcon = document.getElementById("searchIcon");
let searchInput = document.getElementById("searchInput");




// Reveal Elements When Scrolling
function revealOnScroll() {
  for (let i = 0; i < reveals.length; i++) {
    if (window.scrollY > 300) {
      reveals[i].classList.add("active");
    }
  }
}


// Mobile Menu
function openMobileMenu() {
  if (mobileMenu.classList.contains("open")) {
    mobileMenu.classList.remove("open");
  } else {
    mobileMenu.classList.add("open");
  }
}


// Search Input
function openSearchInput() {
  if (searchInput.classList.contains("active")) {
    searchInput.classList.remove("active");
  } else {
    searchInput.classList.add("active");
  }
}




// Reveal Animation
window.addEventListener("scroll", revealOnScroll);

// OpenMobileMenu
menuToggle.addEventListener("click", openMobileMenu);

//openSearchInput
searchIcon.addEventListener("click", openSearchInput);
