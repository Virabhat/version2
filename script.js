import { cardSelect } from "./card.js";

// function LoadOnetime() {
//   if (sessionStorage.getItem("isLoad")) return; // ถ้าเคยโหลดแล้ว ให้ออกจากฟังก์ชัน

//   sessionStorage.setItem("isLoad", "true"); // บันทึกว่าโหลดแล้ว
//   window.location.href =
//     window.location.origin +
//     window.location.pathname +
//     "?nocache=" +
//     new Date().getTime();
// }

// LoadOnetime();

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

const cardContainer = document.getElementById("card-container");
const cards = document.querySelectorAll(".image-box");
const frontCard = document.querySelector(".front-card");
const meaning = document.querySelector(".meaning");
const cardName = document.querySelector(".name_card");
const btn = document.querySelector(".btn-meaning");
const containerInfo = document.querySelector(".container-info ");
let isCardClicked = false;
// selectCard[1].addEventListener("click", (e) => {
//   e.preventDefault();
//   console.log("index");
// });
// console.log(selectCard);

cards.forEach((selectCard, index) => {
  selectCard.addEventListener("click", (e) => {
    e.preventDefault();
    // if (!isWheelSpun) return;
    if (isCardClicked) return;

    console.log("Card clicked:", index);
    draggableWheel[0].disable(); //ปิดการหมุน
    isCardClicked = true;
    selectCard.style.cursor = "default";

    const tl = gsap.timeline(); //ใช้timeline

    meaning.innerHTML = cardSelect.description;
    cardName.innerHTML = cardSelect.name;

    tl.to(selectCard, {
      yPercent: -20,
      duration: 0.3,
      ease: "power2.out",
    })

      //เฟด wheel
      .to(wheel, {
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power4.out",
        onComplete: () => {
          cardContainer.appendChild(selectCard);
        },
      })

      .set(wheel, { display: "none" })
      .set(selectCard, { yPercent: 0 })
      .set(cardContainer, { opacity: 0, display: "flex" })

      //เฟดและ ขยายdiv active
      .to(cardContainer, { opacity: 1, duration: 1, ease: "power4.out" })
      .to(cardContainer, { duration: 0.7, scale: 1.1, ease: "power4.out" })
      .to(selectCard, {
        scale: 1.1,
        duration: 0.7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    // คลิกcard แล้วเล่นอนิมเชั่นถัดไป
    selectCard.addEventListener("click", (e) => {
      e.preventDefault();
      const currentTweens = gsap.getTweensOf(selectCard);

      // ถ้ามีอนิเมชั่นทำงานอยู่ให้หยุดมันก่อน
      if (currentTweens.length > 0) {
        currentTweens.forEach((tween) => {
          tween.kill(); // หยุดอนิเมชั่น
        });
      }
      gsap.to(cardContainer, {
        scale: 1,
        duration: 1,
        ease: "power2.out",
        // transform: "translateY(-10%)",
      });

      const tl = gsap.timeline();

      tl.to(containerInfo, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      })
        .to(selectCard, {
          duration: 0.5,
          scale: 1,
          ease: "sine.inOut",
        })
        //พลิกจากหลังไปหน้า
        .to(selectCard, {
          duration: 0.5,
          rotationY: 90,
          ease: "expo.inOut",
        })

        .set(selectCard, { display: "none" })
        .set(frontCard, { display: "flex" })
        .set(cardName, { display: "flex" })
        .set(btn, { display: "flex" })

        .to(frontCard, {
          duration: 0.35,
          yPercent: 0,
          rotationY: 0,
          ease: "back.out(2)",
        })

        .to(cardName, {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        })
        .to(
          btn,
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "<"
        );

      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const tl = gsap.timeline();
        tl.to(btn, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => {
            gsap.set(meaning, { display: "flex" });
          },
        }).to(meaning, {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        });
      });
    });
  });
});
