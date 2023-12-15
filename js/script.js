
// This code is for the sliding banner
document.addEventListener("DOMContentLoaded", function () {
    var currentSlide = 0;
    var totalSlides = document.querySelectorAll('.banner').length;
    var slideWidth;

    function updateSlide() {
      slideWidth = document.querySelector('.banner').clientWidth;
      var transformValue = -currentSlide * slideWidth + 'px';
      document.querySelector('.slides').style.transform = 'translateX(' + transformValue + ')';
      updateActiveButton();
    }

    function updateActiveButton() {
      document.querySelectorAll('.manual-btn').forEach(function (btn, index) {
        btn.classList.remove('active');
        if (index === currentSlide) {
          btn.classList.add('active');
        }
      });
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlide();
    }

    function goToSlide(index) {
      currentSlide = index;
      updateSlide();
    }

    window.addEventListener('resize', function () {
      updateSlide(); 
    });

    
    setInterval(nextSlide, 5000);

    
    document.querySelectorAll('.manual-btn').forEach(function (btn, index) {
      btn.addEventListener('click', function () {
        goToSlide(index);
      });
    });

    
    updateSlide();
  });






//this function is for the hamburge button to togle the sidebar

function toggleSidebar() {
  var hamburger = document.querySelector('.hamburger');
  hamburger.classList.toggle('active2');

  var sidebar = document.querySelector('.side-menu');
  sidebar.classList.toggle('active2');

  const overlay = document.querySelector('#overlay');
  overlay.classList.toggle('active2');

  const container = document.querySelector('#container');

 
  if (sidebar.classList.contains('active2')) {
    container.style.transform = 'translateX(-275px)';
    document.body.style.overflow = 'hidden'; 
  } else {
    container.style.transform = 'translateX(0)';
    document.body.style.overflow = ''; 
  }
}




// This code is for the cookie popup

const cookieAlert = document.querySelector(".cookie-container"),
  buttons = document.querySelectorAll(".cookie-btn");

  const executeCookie = () => {
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