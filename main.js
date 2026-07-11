document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("game-grid");
    const timerDisplay = document.getElementById("timer");
    let matches = 0;
    
    // Gawa ng 16 cards (8 pairs)
    const cardValues = ['🔥', '🔥', '💎', '💎', '⚡', '⚡', '🌌', '🌌', '💊', '💊', '🎭', '🎭', '🎧', '🎧', '🌙', '🌙'];
    cardValues.sort(() => Math.random() - 0.5);

    cardValues.forEach((val) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.value = val;
        card.addEventListener("click", () => flipCard(card));
        grid.appendChild(card);
    });

    let flipped = [];
    function flipCard(card) {
        if (flipped.length < 2 && !card.classList.contains("flipped")) {
            card.classList.add("flipped");
            card.innerHTML = card.dataset.value;
            flipped.push(card);
            if (flipped.length === 2) checkMatch();
        }
    }

    function checkMatch() {
        if (flipped[0].dataset.value === flipped[1].dataset.value) {
            matches++;
            flipped = [];
            if (matches === 8) { // Pag tapos na lahat
                document.getElementById("access-container").style.display = "block";
                document.getElementById("game-grid").style.display = "none";
                document.getElementById("timer").style.display = "none";
            }
        } else {
            setTimeout(() => {
                flipped.forEach(c => { c.classList.remove("flipped"); c.innerHTML = ""; });
                flipped = [];
            }, 800);
        }
    }
});
