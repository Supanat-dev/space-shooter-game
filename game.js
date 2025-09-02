const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');

// ประกาศตัวแปรสำหรับปุ่ม
const leftButton = document.getElementById('leftButton');
const rightButton = document.getElementById('rightButton');

const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 60,
    width: 50,
    height: 50,
    speed: 5
};

let score = 0;
let keys = {};
let asteroids = [];
let isLeftPressed = false;
let isRightPressed = false;

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Event Listener สำหรับปุ่ม (รองรับทั้งเมาส์และนิ้ว)
leftButton.addEventListener('mousedown', () => { isLeftPressed = true; });
leftButton.addEventListener('mouseup', () => { isLeftPressed = false; });
leftButton.addEventListener('touchstart', (e) => {
    e.preventDefault(); // ป้องกันการซูมหน้าจอ
    isLeftPressed = true;
});
leftButton.addEventListener('touchend', (e) => {
    e.preventDefault();
    isLeftPressed = false;
});

rightButton.addEventListener('mousedown', () => { isRightPressed = true; });
rightButton.addEventListener('mouseup', () => { isRightPressed = false; });
rightButton.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isRightPressed = true;
});
rightButton.addEventListener('touchend', (e) => {
    e.preventDefault();
    isRightPressed = false;
});


function drawPlayer() {
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function update() {
    // ควบคุมด้วยแป้นพิมพ์
    if (keys['ArrowLeft'] && player.x > 0) {
        player.x -= player.speed;
    }
    if (keys['ArrowRight'] && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }

    // ควบคุมด้วยปุ่ม
    if (isLeftPressed && player.x > 0) {
        player.x -= player.speed;
    }
    if (isRightPressed && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }

    // Update asteroids
    for (let i = 0; i < asteroids.length; i++) {
        asteroids[i].y += asteroids[i].speed;

        // Check for collision
        if (player.x < asteroids[i].x + asteroids[i].width &&
            player.x + player.width > asteroids[i].x &&
            player.y < asteroids[i].y + asteroids[i].height &&
            player.y + player.height > asteroids[i].y) {
            
            // Game Over
            alert('Game Over! คะแนนของคุณ: ' + score);
            document.location.reload();
        }

        // Check if asteroid is out of screen
        if (asteroids[i].y > canvas.height) {
            asteroids.splice(i, 1);
            score++;
            scoreDisplay.innerText = 'คะแนน: ' + score;
            i--;
        }
    }

    // Add new asteroids
    if (Math.random() < 0.02) {
        asteroids.push({
            x: Math.random() * (canvas.width - 30),
            y: -30,
            width: 30,
            height: 30,
            speed: Math.random() * 3 + 1
        });
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();

    // Draw asteroids
    ctx.fillStyle = '#888';
    for (let i = 0; i < asteroids.length; i++) {
        ctx.fillRect(asteroids[i].x, asteroids[i].y, asteroids[i].width, asteroids[i].height);
    }
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
