
// This code is for the sliding banner
document.addEventListener("DOMContentLoaded", function () {
  var currentSlide = 0;
  var slideWidth;
  var slideInterval;

  function updateSlide() {
  slideWidth = document.querySelector('.banner').clientWidth;
  var transformValue = -currentSlide * slideWidth + 'px';
  var slidesContainer = document.querySelector('.slides');
  
  slidesContainer.style.transition = 'transform 0.5s ease-in-out';
  slidesContainer.style.transform = 'translateX(' + transformValue + ')';
  
  updateActiveButton();
}

  function updateActiveButton() {
  var totalSlides = document.querySelectorAll('.manual-btn').length;
  document.querySelectorAll('.manual-btn').forEach(function (btn, index) {
    btn.classList.remove('active');
    if (index === currentSlide % totalSlides) {
      btn.classList.add('active');
    }
  });
}

  function nextSlide() {
    var totalSlides = document.querySelectorAll('.banner').length;
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
    } else {
      var banners = document.querySelectorAll('.banner');
      var clonedBanners = Array.from(banners).map(function (banner) {
        return banner.cloneNode(true);
      });
      clonedBanners.forEach(function (clonedBanner) {
        document.querySelector('.slides').appendChild(clonedBanner);
      });
      currentSlide++;
    }
    updateSlide();
  }

  function goToSlide(index) {
    currentSlide = index;
    updateSlide();
  }

  window.addEventListener('resize', function () {
    updateSlide();
  });

  slideInterval = setInterval(nextSlide, 5000);

  document.querySelectorAll('.manual-btn').forEach(function (btn, index) {
    btn.addEventListener('click', function () {
      clearInterval(slideInterval);
      goToSlide(index);
      setTimeout(function () {
        slideInterval = setInterval(nextSlide, 5000);
      }, 500);
    });
  });

  updateSlide();
});





//this function is for the hamburger button to toggle the sidebar

function toggleSidebar() {
  var hamburger = document.querySelector('.hamburger');
  hamburger.classList.toggle('active2');

  var sidebar = document.querySelector('.side-menu');
  sidebar.classList.toggle('active2');

  const overlay = document.querySelector('#overlay');
  overlay.classList.toggle('active2');

  const shiftContent = document.getElementById("container");
  shiftContent.classList.toggle("active2")


}




// This code is for the cookie popup

const cookieAlert = document.querySelector(".cookie-container"),
  buttons = document.querySelectorAll(".cookie-btn");

  const executeCookie = () => {
    if(document.cookie.includes("mrAnderson")) return;
    cookieAlert.classList.add("show");

    buttons.forEach(button =>  {
      button.addEventListener("click", () => {
        cookieAlert.classList.remove("show");
       
        if(button.id == "accept-btn") {
          document.cookie = "cookieBy= mrAnderson; max-age="+ 60 * 60 * 24 * 30;
        }
      })
    })
  }
  

// function will be called on page load  
window.addEventListener("load", executeCookie)



// this code is for the sticky header

let prevScrollPos = window.pageYOffset;
let stickyHead = document.getElementById("topbar");

function handleSlideOutUpEnd() {
  stickyHead.classList.remove("sticky");
  stickyHead.removeEventListener("animationend", handleSlideOutUpEnd);
}

window.addEventListener("scroll", function() {
  let currentScrollPos = window.pageYOffset;

  if (prevScrollPos > currentScrollPos) {
    stickyHead.classList.add("sticky", "slideInDown");
    stickyHead.classList.remove("slideOutUp");
  } else {
    stickyHead.classList.remove("slideInDown");
    stickyHead.classList.add("slideOutUp");

    stickyHead.addEventListener("animationend", handleSlideOutUpEnd);
  }


  prevScrollPos = currentScrollPos;
});
