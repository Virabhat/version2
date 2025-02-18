let cardSelect = [];
document.addEventListener("DOMContentLoaded", function () {
  let cardsData = []; // เก็บข้อมูลจาก JSON

  // โหลดข้อมูลจาก JSON
  fetch("../cards.json")
    .then((response) => response.json())
    .then((data) => {
      cardsData = data; // บันทึกข้อมูลลงตัวแปร

      console.log(cardsData);

      const displayRandomCard = () => {
        if (cardsData.length === 0) return null;

        const randomIndex = Math.floor(Math.random() * cardsData.length);
        return cardsData[randomIndex];
      };
      cardSelect = displayRandomCard();
      console.log(cardSelect);
    })
    .catch((error) => console.error("Error loading JSON:", error));
});
export { cardSelect };
