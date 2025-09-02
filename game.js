const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');

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

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

function drawPlayer() {
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function update() {
    if (keys['ArrowLeft'] && player.x > 0) {
        player.x -= player.speed;
    }
    if (keys['ArrowRight'] && player.x < canvas.width - player.width) {
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

// เพิ่มตัวแปรสำหรับควบคุมการสัมผัส
let isTouchingLeft = false;
let isTouchingRight = false;

// เพิ่ม Event Listener สำหรับการสัมผัส
document.addEventListener('touchstart', (e) => {
    const touchX = e.touches[0].clientX;
    const canvasRect = canvas.getBoundingClientRect();
    const touchRelativeToCanvas = touchX - canvasRect.left;

    if (touchRelativeToCanvas < canvas.width / 2) {
        isTouchingLeft = true;
    } else {
        isTouchingRight = true;
    }
});

document.addEventListener('touchend', (e) => {
    isTouchingLeft = false;
    isTouchingRight = false;
});

// แก้ไขฟังก์ชัน update()
function update() {
    // โค้ดสำหรับแป้นพิมพ์เหมือนเดิม
    if (keys['ArrowLeft'] && player.x > 0) {
        player.x -= player.speed;
    }
    if (keys['ArrowRight'] && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }

    // เพิ่มโค้ดสำหรับควบคุมด้วยการสัมผัส
    if (isTouchingLeft && player.x > 0) {
        player.x -= player.speed;
    }
    if (isTouchingRight && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }

    // โค้ดส่วนที่เหลือของฟังก์ชัน update() เหมือนเดิม
    // ...
}

