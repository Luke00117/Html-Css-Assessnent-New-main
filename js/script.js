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
      updateSlide(); // Update slide on window resize
    });

    // Automatically switch to the next slide every 5 seconds
    setInterval(nextSlide, 5000);

    // Manual navigation button click event listeners
    document.querySelectorAll('.manual-btn').forEach(function (btn, index) {
      btn.addEventListener('click', function () {
        goToSlide(index);
      });
    });

    // Initial setup
    updateSlide();
  });




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
    } else {
        container.style.transform = 'translateX(0)';
    }
}