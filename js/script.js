// feedback slider

$(document).ready(function () {
  $(".feedback_slider").slick({
    prevArrow:
      '<button type="button" class="slick-prev"><img src="icons/main/left_arrow.png"></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img src="icons/main/right_arrow.png"></button>',
    variableWidth: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          dots: true,
          arrows: false,
        },
      },
    ],
  });
});

//team slider
$(document).ready(function () {
  $(".team_slider").slick({
    centerMode: true,
    centerPadding: "60px",
    slidesToShow: 1,
    variableWidth: true,
    prevArrow:
      '<button type="button" class="slick-prev"><img src="icons/main/left_arrow.png"></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img src="icons/main/right_arrow.png"></button>',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  });
});

//cleaning slider

$(document).ready(function () {
  $(".certificate_slider").slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    // variableWidth: true,
    prevArrow:
      '<button type="button" class="slick-prev"><img src="icons/main/left_arrow.png"></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img src="icons/main/right_arrow.png"></button>',
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
          dots: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
        },
      },
    ],
  });
});

let map;
DG.then(function () {
  map = DG.map("map", {
    center: [55.596051, 37.167112],
    zoom: 14,
    scrollWheelZoom: true,
  });

  mapicon = DG.icon({
    iconUrl: "icons/main/footer/marker.png",
    iconAnchor: [32, 64],
    popupAnchor: [0, 24],
    className: "map-icon",
  });
  DG.marker([55.597307, 37.176086], { icon: mapicon })
    .addTo(map)
    .bindPopup(
      '<div class="map-popup"><h2>Клининговая компания</h2><br/>Россия, Москва, улица <p>советская дом 19</p><br/></b></div>'
    );
});

$(document).ready(function () {
  $("[data-modal=consultation]").on("click", function () {
    $(".overlay, #consultation").fadeIn("slow");
  });
  $(".modal_close").on("click", function () {
    $(".overlay, #consultation, #thanks").fadeOut("slow");
  });

  $(window).on("click", function (e) {
    if (e.target.classList.contains("overlay")) {
      $(".overlay, #consultation, #thanks").fadeOut("slow");
    }
  });

  function validateForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2,
        },
        phone: "required",
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: {
          required: "Пожалуйста, введите свое имя",
          minlength: jQuery.validator.format("Введите {0} символа!"),
        },
        phone: "Пожалуйста, введите свой номер телефона",
        email: {
          required: "Пожалуйста, введите свою почту",
          email: "Неправильно введен адрес почты",
        },
      },
    });
  }

  validateForms("#consultation form");

  $("input[name=phone]").mask("+7 (999) 999-99-99");

  //Ajax

  $("form").submit(function (e) {
    e.preventDefault();
    if (!$(this).valid()) {
      return;
    }
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize(),
    }).done(function () {
      $(this).find("input").val("");
      $("#consultation").fadeOut();
      $(".overlay, #thanks").fadeIn("slow");

      $("form").trigger("reset");
    });
    return false;
  });
});

// accordeon

$(document).ready(function () {
  $(".seo_detail").click(function (event) {
    if ($(".seo_wrapper").hasClass("one")) {
      $(".seo_detail").not($(this)).removeClass("active");
      $(".seo_text").not($(this).next()).slideUp(300);
    }
    $(this).toggleClass("active").next().slideToggle(300);
  });
});

window.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu"),
    menuItem = document.querySelectorAll(".menu_link"),
    hamburger = document.getElementById("nav-icon1"),
    phone = document.querySelector(".phone"),
    headerLabel = document.querySelector(".header_label");

  let body = document.querySelector("body");
  hamburger.addEventListener("click", function () {
    this.classList.toggle("open");
    if (phone.classList.toggle("block")) {
      phone.style.display = "none";
    } else {
      phone.style.display = "block";
    }
    if (headerLabel.classList.toggle("block")) {
      headerLabel.style.display = "none";
    } else {
      headerLabel.style.display = "block";
    }
    if (menu.classList.toggle("none")) {
      body.style.overflow = "hidden";
      menu.style.display = "flex";
    } else {
      menu.style.display = "none";
      body.style.overflow = "visible";
    }
  });

  $(window).on("load resize", function () {
    hamburger.addEventListener("click", () => {
      if ($(window).width() < 768) {
        if (!phone.classList.contains("none")) {
          phone.style.display = "none";
        }
      }
    });
  });
  menuItem.forEach((item) => {
    item.addEventListener("click", () => {
      menu.classList.remove("menu_active");
      hamburger.classList.toggle("hamburger_active");
    });
  });
});

// Touch mobile
let isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

let body = document.querySelector("body");
if (isMobile.any()) {
  body.classList.add("touch");
  let arrow = document.querySelectorAll(".arrow");
  for (i = 0; i < arrow.length; i++) {
    let thisLink = arrow[i].previousElementSibling;
    let subMenu = arrow[i].nextElementSibling;
    let thisArrow = arrow[i];

    thisLink.classList.add("parent");
    arrow[i].addEventListener("click", function () {
      if (subMenu.classList.toggle("open")) {
        subMenu.style.display = "block";
      } else {
        subMenu.style.display = "none";
      }
      thisArrow.classList.toggle("active");
    });
  }
} else {
  body.classList.add("mouse");
}

$(window).on("load resize", function () {
  if ($(window).width() < 940) {
    $(".present_wrapper:not(.slick-initialized)").slick({
      dots: true,
      infinite: true,
      arrows: false,
      speed: 100,
      slidesToShow: 1,
    });
  } else {
    $(".present_wrapper.slick-initialized").slick("unslick");
  }

  if ($(window).width() < 940) {
    $(".clients_wrapper:not(.slick-initialized)").slick({
      dots: true,
      infinite: true,
      arrows: false,
      speed: 100,
      slidesToShow: 1,
    });
  } else {
    $(".clients_wrapper.slick-initialized").slick("unslick");
  }

  if ($(window).width() < 1040) {
    $(".reasons_wrapper:not(.slick-initialized)").slick({
      dots: true,
      infinite: true,
      arrows: false,
      slidesToShow: 1,
      centerMode: true,
      variableWidth: true,
    });
  } else {
    $(".reasons_wrapper.slick-initialized").slick("unslick");
  }

  if ($(window).width() < 1202) {
    $(".subheader_wrapper:not(.slick-initialized)").slick({
      // centerMode: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      variableWidth: true,
      dots: true,
      arrows: false,
      responsive: [
        {
          breakpoint: 577,
          settings: {
            settings: "slick",
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            arrows: false,
            dots: true,
          },
        },
        {
          breakpoint: 1201,
          settings: {
            settings: "slick",
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: false,
            dots: true,
          },
        },
        {
          breakpoint: 4000,
          settings: "unslick",
        },
      ],
    });
  } else {
    $(".subheader_wrapper.slick-initialized").slick("unslick");
  }

  if ($(window).width() < 1110) {
    $(".promo_wrapper:not(.slick-initialized)").slick({
      slidesToShow: 2,
      slidesToScroll: 1,
      variableWidth: true,
      dots: true,
      arrows: false,
      responsive: [
        {},
        {
          breakpoint: 769,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  } else {
    $(".promo_wrapper.slick-initialized").slick("unslick");
  }
});

//cookie
function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
let cookiecook = getCookie("cookiecook"),
  cookiewin = document.getElementsByClassName("cookie_notice")[0];
// проверяем, есть ли у нас cookie, с которой мы не показываем окно и если нет, запускаем показ
if (cookiecook != "no") {
  // показываем
  cookiewin.style.display = "block";
  // закрываем по клику
  document
    .getElementById("cookie_close")
    .addEventListener("click", function () {
      cookiewin.style.display = "none";
      // записываем cookie на 1 день, с которой мы не показываем окно
      let date = new Date();
      date.setDate(date.getDate() + 1);
      document.cookie = "cookiecook=no; path=/; expires=" + date.toUTCString();
    });
}
// Scroll
let scrolled;
window.onscroll = function () {
  scrolled = window.pageYOffset || document.documentElement.scrollTop;

  let nav = document.getElementById("nav"),
    image = document.querySelector(".header_logo"),
    text = document.querySelector(".header_text"),
    phone = document.querySelector(".phone-mob"),
    label = document.querySelector(".header_label"),
    phoneLap = document.querySelector(".phone_feedback"),
    subTitle = document.querySelector(".subheader_title");
  if ($(window).width() < 768) {
    if (scrolled) {
      nav.classList.add("navigation");
      image.style.width = 57 + "px";
      image.style.height = 56 + "px";
      text.style.display = "none";
      phone.style.top = 24 + "px";
      label.style.left = 85 + "px";
      phoneLap.style.display = "none";
      subTitle.style.marginTop = 150 + "px";
    } else {
      nav.classList.remove("navigation");
      image.style.width = 77 + "px";
      image.style.height = 76 + "px";
      text.style.display = "block";
      phone.style.top = 28 + "px";
      label.style.left = "";
      phoneLap.style.display = "block";
      subTitle.style.marginTop = "";
    }
  }
};

AOS.init({
  once: false,
});

$(window).on("load", function () {
  $(".holder").fadeOut().end().delay(1000).fadeOut("slow");
});
