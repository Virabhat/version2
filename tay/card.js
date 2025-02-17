document.addEventListener("DOMContentLoaded", function() {
    let cardsData = []; // เก็บข้อมูลจาก JSON

    // โหลดข้อมูลจาก JSON
    fetch("cards.json")
        .then(response => response.json())
        .then(data => {
            cardsData = data; // บันทึกข้อมูลลงตัวแปร
        })
        .catch(error => console.error("Error loading JSON:", error));

    // ฟังก์ชันสุ่มการ์ด
    function displayRandomCard() {
        if (cardsData.length === 0) return; // ถ้าไม่มีข้อมูล ไม่ต้องทำอะไร
        
        const randomIndex = Math.floor(Math.random() * cardsData.length);
        const card = cardsData[randomIndex]; // เลือกการ์ดแบบสุ่ม

        // แสดงผลการ์ด
        const container = document.getElementById("card-container");
        container.innerHTML = `
            <div class="card">
                <img src="${card.image}" alt="${card.name}">
                <h3>${card.name}</h3>
                <p>${card.description}</p>
            </div>
        `;
    }

    // เชื่อมปุ่มกับฟังก์ชันสุ่ม
    document.getElementById("random-btn").addEventListener("click", displayRandomCard);
});
