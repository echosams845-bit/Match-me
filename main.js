const music = document.getElementById('bg-music');
const character = document.getElementById('game-char');
let flipped = [];
let matches = 0;
let time = 120;
let countdown;

const symbols = ['💎', '✨', '🔮', '💊', '🦋', '💄', '🌙', '🎧'];
let deck = [...symbols, ...symbols].sort(() => Math.random() - 0.5);

function startMatch() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-wrapper').style.display = 'flex';
    if(character) character.style.display = 'block';
    
    if(music) {
        music.currentTime = 0;
        music.play().catch(() => {});
    }
    
    buildGrid();
    startTimer();
}

function buildGrid() {
    const grid = document.getElementById('card-grid');
    if(!grid) return;
    grid.innerHTML = '';
    
    deck.forEach(s => {
        let card = document.createElement('div');
        card.className = 'card';
        card.dataset.val = s;
        
        card.innerHTML = `
            <div class="card-face card-front"></div>
            <div class="card-face card-back">${s}</div>
        `;
        
        card.onclick = () => {
            if(flipped.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('matched')) {
                card.classList.add('flipped');
                flipped.push(card);
                
                if(flipped.length === 2) checkMatch();
            }
        };
        grid.appendChild(card);
    });
}

function checkMatch() {
    let [c1, c2] = flipped;
    if(c1.dataset.val === c2.dataset.val) {
        c1.classList.add('matched');
        c2.classList.add('matched');
        matches++;
        flipped = [];
        
        if(matches === symbols.length) {
            clearInterval(countdown);
            setTimeout(() => {
                document.getElementById('card-grid').style.display = 'none';
                document.querySelector('.timer-bar').style.display = 'none';
                document.getElementById('win-btn').style.display = 'block';
                confetti({ particleCount: 150, spread: 80, colors: ['#00d4ff', '#ff0077', '#ffffff'] });
            }, 800);
        }
    } else {
        setTimeout(() => {
            c1.classList.remove('flipped');
            c2.classList.remove('flipped');
            flipped = [];
        }, 600);
    }
}

function startTimer() {
    countdown = setInterval(() => {
        time--;
        let m = Math.floor(time / 60);
        let s = time % 60;
        document.getElementById('timer').innerText = `0${m}:${s < 10 ? '0'+s : s}`;
        if(time <= 0) {
            clearInterval(countdown);
            alert("TIMEOUT! Try Again.");
            location.reload();
        }
    }, 1000);
}
