let cardSelect = [];

const loadCards = async () => {
  let cardsData = [];
  try {
    const response = await fetch("./cards.json"); // โหลด JSON
    if (!response.ok) throw new Error("โหลด JSON ไม่ได้");

    cardsData = await response.json();
    console.log("โหลดข้อมูลสำเร็จ:", cardsData);
    if (cardsData.length === 0) return null; // เช็คว่ามีข้อมูลไหม

    const randomIndex = Math.floor(Math.random() * cardsData.length);
    cardSelect = cardsData[randomIndex];
    console.log(cardSelect);
  } catch (error) {
    console.error(" Error loading JSON:", error);
  }
};

loadCards();
export { cardSelect };
