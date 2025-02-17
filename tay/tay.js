var wheel = $("#wheel");
let isWheelSpun = false;
var border = parseInt(wheel.css("border-width"));
// var radius = Math.min(window.innerWidth, window.innerHeight) * 0.7 / 2;
var radius = 300; //250
var center = radius - border / 2;
var total = 22; // จำนวนไพ่
var slice = (1 * Math.PI) / total;

TweenLite.set(wheel, {
  width: radius * 2 - border,
  height: radius * 2 - border,
  xPercent: -50,
  yPercent: -50,
});

for (var i = 0; i < total; i++) {
  createBox(i);
}

const draggableWheel = Draggable.create(wheel, {
  type: "rotation",
  throwProps: true,
  allowEventDefault: true,
  inertia: true,
  bounds: {
    minRotation: -90,
    maxRotation: 90,
  },
  // onClick: function (e) {
  //   console.log("Clicked Wheel");
  //   // console.log(e.target);
  //   var num = e.target.dataset.num;
  //   if (num) {
  //     console.log("Clicked Box " + num);
  //   }
  // },
  onThrowUpdate: function () {
    $("#object").text(this);
    console.log(this);
  },
  liveSnap: liveSnap,
  dragResistance: 0.3, //slow rotate
  throwResistance: 0.6,
});

function liveSnap(value) {
  const offset = value * -1;

  // console.log(offset);

  const percentage = (offset + 90) / 180;

  // console.log(percentage)

  if (value > -85 && value < 85) {
    boxTimeline.totalProgress(percentage);
    boxTimeline2.totalProgress(percentage);
  }

  $("#value").text(percentage);
  return value;
}

function createBox(i) {
  var num = i + 1;
  var hue = (i / total) * 360;
  var angle = i * slice - 1.5;

  var x = center + radius * Math.sin(angle);
  var y = center - radius * Math.cos(angle);

  var box = $("<div class='box box-" + i + "' />")
    .attr("data-num", num)
    .appendTo(wheel);

  // var internalBox = $("<div class='internalBox' />").text(num).appendTo(box);

  //img
  var image = $(
    "<img class='image-box' src='./All_Pic/Tarot card/Card.png' alt='Card Image' />"
  ).appendTo(box);

  TweenLite.set(box, {
    rotation: angle + "_rad",
    xPercent: -50,
    yPercent: -50,
    x: x,
    y: y,
  });

  // TweenLite.set(internalBox, {
  //     backgroundColor: "hsl(" + hue + ",100%,50%)",
  // });
}

const generateTimeline = () => {
  const boxes = document.querySelectorAll(".box .image-box");

  // console.log(boxes);

  const boxTimeline = gsap.timeline({ paused: true });

  [...boxes].map((box) => {
    // console.log(box);
    //  Disable card popup
    // boxTimeline.to(
    //   box,
    //   { duration: 0.3, yPercent: -40, ease: "expo.out" },
    //   "-=0.16"
    // );
    // boxTimeline.to(box, { duration: 0.3, yPercent: 0, ease: "expo.in" }, "-=0");
  });

  boxTimeline.totalProgress(0.5);
  // boxTimeline2.totalProgress(0.5);
  return boxTimeline;
};

var boxTimeline = generateTimeline();
// boxTimeline.play();

const generateTimelineSmallBox = () => {
  const boxes = document.querySelectorAll(".smallBox");

  // console.log(boxes);

  const boxTimeline = gsap.timeline({ paused: true });

  [...boxes].map((box) => {
    // console.log(box);

    boxTimeline.to(
      box,
      { duration: 0.3, yPercent: -70, ease: "expo.out" },
      "-=0.16"
    );
    boxTimeline.to(box, { duration: 0.3, yPercent: 0, ease: "expo.in" }, "-=0");
  });

  return boxTimeline;
};

var boxTimeline2 = generateTimelineSmallBox();

let activeCard = null;
const active = document.getElementById("active");
const selectCard = document.querySelectorAll(".image-box");
const frontCard = document.querySelector(".front-card");
let isCardClicked = false;

let cardsData = [];

fetch("cards.json")
  .then((response) => response.json())
  .then((data) => {
    cardsData = data;
  })
  .catch((error) => console.error("Error loading JSON:", error));


// selectCard[1].addEventListener("click", (e) => {
//   e.preventDefault();
//   console.log("index");
// });
// console.log(selectCard);

selectCard.forEach((card, index) => {
  card.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Card clicked:", index);

    if (isCardClicked) return;

    draggableWheel[0].disable(); // ปิดการหมุน
    isCardClicked = true;
    card.style.cursor = "default";

    if (activeCard && activeCard !== card) {
      gsap.to(activeCard, {
        duration: 1,
        scale: 1,
        yPercent: 0,
        ease: "expo.out",
      });
    }
    activeCard = card;

    active.appendChild(card);
    card.classList.add("flip");

    gsap.to(wheel, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        wheel.style.display = "none";
      },
    });

    gsap.to(card, {
      duration: 1,
      yPercent: 0,
      bounds: 0,
      scale: 1,
      rotation: 0,
      ease: "expo.out",
      onComplete: () => {
        gsap.to(card, {
          duration: 0.5,
          rotationY: 90,
          ease: "power2.inOut",
          onComplete: () => {
            card.style.display = "none";
            frontCard.style.display = "flex";

            gsap.to(frontCard, {
              duration: 0.5,
              rotationY: 0,
              ease: "power2.inOut",
            });

            // 🔥 แสดงข้อมูลของการ์ดจาก `cards.json`
            displayCardDetails(index);
          },
        });
      },
    });
  });
});

function displayCardDetails(index) {
  if (!cardsData || cardsData.length === 0) {
    console.error("No card data available");
    return;
  }

  const cardInfo = cardsData[index];

  if (!cardInfo) {
    console.error("Invalid card index");
    return;
  }

  const cardDetails = document.getElementById("card-details");
  cardDetails.innerHTML = `
    <h2>${cardInfo.name}</h2>
    <img src="${cardInfo.image}" alt="${cardInfo.name}" style="width: 200px;">
    <p>${cardInfo.description}</p>
  `;
}



// const gg = document.querySelector(".gg");
// gg.addEventListener("click", (e) => {
//   e.preventDefault();
//   gsap.to(gg, {
//     duration: 0.5,
//     rotationY: 90,
//     ease: "power2.inOut",
//   });
//   console.log("gg");
// });
