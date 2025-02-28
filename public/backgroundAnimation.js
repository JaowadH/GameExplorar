const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas to full-screen
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

// List of gaming icons
const icons = [
    "/icons/computer-mouse.png",
    "/icons/crosshair.png",
    "/icons/game-controller.png",
    "/icons/game-over.png",
    "/icons/gamer.png",
    "/icons/gaming.png",
    "/icons/ghost.png",
    "/icons/joystick.png",
    "/icons/keyboard.png",
    "/icons/pokeball.png"
];

const iconObjects = [];
let loadedImages = 0;

// Preload images
icons.forEach((src) => {
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
        iconObjects.push({
            img: img,
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1,
            size: Math.random() * 50 + 30,
        });

        loadedImages++;
        if (loadedImages === icons.length) {
            startAnimation();
        }
    };

    img.onerror = () => {
        console.error(`Error loading image: ${src}`);
    };
});

// Start animation once all images are loaded
function startAnimation() {
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        iconObjects.forEach((icon) => {
            icon.x += icon.speedX;
            icon.y += icon.speedY;

            // Bounce off walls
            if (icon.x < 0 || icon.x + icon.size > canvas.width) {
                icon.speedX *= -1;
            }
            if (icon.y < 0 || icon.y + icon.size > canvas.height) {
                icon.speedY *= -1;
            }

            ctx.drawImage(icon.img, icon.x, icon.y, icon.size, icon.size);
        });

        requestAnimationFrame(animate);
    }
    
    animate();
}

// Resize canvas when window resizes
window.addEventListener("resize", resizeCanvas);
