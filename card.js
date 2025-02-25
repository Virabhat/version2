let cardSelect = [];

localStorage.clear();
let userData = JSON.parse(localStorage.getItem("userData")) || {
  isPlay: false,
  time: Date.now(),
};
let savedDate = new Date(userData.time).toLocaleDateString("th-TH");
console.log("The saved date is:", savedDate);

let currentDate = new Date().toLocaleDateString("th-TH");
console.log("The current date is:", currentDate);

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
const CheckIsNewDay = () => {
  if (savedDate !== currentDate) {
    userData.isPlay = false;
    console.log(userData.isPlay);
  }
  displayPlayStatus();
};
const displayPlayStatus = () => {
  if (!userData.isPlay) {
    console.log("Let play!");
  } else {
    const block = document.querySelector("#block");
    block.style.display = "grid";
    console.log("Too bad see you next time!");
  }
};

if (!CheckIsNewDay()) loadCards();

export { cardSelect, saveData };
