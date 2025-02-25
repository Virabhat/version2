let cardSelect = [];

localStorage.clear();
let userData = JSON.parse(localStorage.getItem("userData")) || {
  isPlay: false,
  time: Date.now(),
};
let shortDate = new Date(userData.time).toLocaleDateString("th-TH");
console.log("The day is today:", shortDate);

const loadCards = async () => {
  let cardsData = [];

  try {
    const response = await fetch("./cards.json"); // โหลด JSON
    if (!response.ok) throw new Error("โหลด JSON ไม่ได้");

    cardsData = await response.json();
    console.log("success:", cardsData);
    if (cardsData.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * cardsData.length);
    cardSelect = cardsData[randomIndex];
    const frontCard = document.querySelector(".front-card");
    frontCard.src = cardSelect.image;
    console.log(cardSelect);
  } catch (error) {
    console.error(" Error loading JSON:", error);
  }
};

const saveData = () => {
  userData.isPlay = true;
  userData.Date = Date.now();
  localStorage.setItem("userData", JSON.stringify(userData));
  console.log("บันทึกข้อมูลเรียบร้อย:", userData);
};
const checkIsHavePlay = () => {
  // ตรวจสอบว่าเล่นไปแล้วหรือยัง
  console.log(userData.isPlay);

  if (!userData.isPlay) {
    console.log("Let play!");
  } else {
    console.log("Too bad see you next time!");
  }
};

if (!checkIsHavePlay()) loadCards();

export { cardSelect, saveData };
