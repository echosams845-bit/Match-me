document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("game-grid");
    const timerDisplay = document.getElementById("timer");
    const scoreDisplay = document.getElementById("score");
    const bgMusic = document.getElementById("bg-music");

    let cards = [];
    let flippedCards = [];
    let matches = 0;
    let timeLeft = 90;
    let musicStarted = false;

    // Icons/Values para sa memory cards (Pwedeng palitan ng emojis)
    const cardValues = ['💎', '🔥', '⚡', '🌌', '💊', '🎭', '🎧', '🌙', '💎', '🔥', '⚡', '🌌', '💊', '🎭', '🎧', '🌙'];

    // Shuffle Cards
    cardValues.sort(() => Math.random() - 0.5);

    // Create Cards
    cardValues.forEach((val, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.value = val;
        card.innerHTML = "?"; // Default na nakatago
        
        card.addEventListener("click", () => {
            if (!musicStarted) {
                bgMusic.play();
                musicStarted = true;
            }
            flipCard(card);
        });

        grid.appendChild(card);
        cards.push(card);
    });

    function flipCard(card) {
        if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
            card.classList.add("flipped");
            card.innerHTML = card.dataset.value;
            flippedCards.push(card);

            if (flippedCards.length === 2) {
                checkMatch();
            }
        }
    }

    function checkMatch() {
        const [c1, c2] = flippedCards;
        if (c1.dataset.value === c2.dataset.value) {
            matches++;
            scoreDisplay.textContent = matches;
            flippedCards = [];
            if (matches === 8) {
                alert("ARENA CONQUERED! Accessing Private Channel...");
                window.location.href = "https://t.me/+iL-Xj34kepk1OGY1";
            }
        } else {
            setTimeout(() => {
                c1.classList.remove("flipped");
                c2.classList.remove("flipped");
                c1.innerHTML = "?";
                c2.innerHTML = "?";
                flippedCards = [];
            }, 800);
        }
    }

    // Timer Logic
    const timer = setInterval(() => {
        timeLeft--;
        let m = Math.floor(timeLeft / 60);
        let s = timeLeft % 60;
        timerDisplay.textContent = `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("TIME EXPIRED! Try again to get access.");
            location.reload();
        }
    }, 1000);
});
