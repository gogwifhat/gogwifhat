// Configuration
const numberOfImages = 3; // Set the number of bouncing images you want
const imageSrc = 'gwif_clear.png'; // Replace with your image source
const headerHeight = 60; // Must match the padding-top in CSS

// Get the container element
const container = document.getElementById('container');

// Array to hold image objects
const images = [];

// Initialize images
for (let i = 0; i < numberOfImages; i++) {
    const img = document.createElement('img');
    img.src = imageSrc;
    img.classList.add('bouncingImage');

    // Set random initial positions
    img.style.left = Math.random() * (window.innerWidth - 100) + 'px'; // 100px is image width
    img.style.top = headerHeight + Math.random() * (window.innerHeight - headerHeight - 100) + 'px'; // 100px is image height

    // Assign random velocities
    const speed = 0.5; // Base speed
    const directionX = Math.random() < 0.5 ? -1 : 1;
    const directionY = Math.random() < 0.5 ? -1 : 1;
    img.vx = (Math.random() * speed + 0.5) * directionX;
    img.vy = (Math.random() * speed + 0.5) * directionY;

    // Append to container and array
    container.appendChild(img);
    images.push(img);
}

// Animation loop
function animate() {
    images.forEach(img => {
        // Current position
        let x = parseFloat(img.style.left);
        let y = parseFloat(img.style.top);

        // Update position
        x += img.vx;
        y += img.vy;

        // Check for collision with window boundaries and bounce
        if (x <= 0 || x + img.width >= window.innerWidth) {
            img.vx *= -1;
            x = Math.max(0, Math.min(x, window.innerWidth - img.width));
        }

        if (y <= headerHeight || y + img.height >= window.innerHeight) { // Consider header height
            img.vy *= -1;
            y = Math.max(headerHeight, Math.min(y, window.innerHeight - img.height));
        }

        // Apply new position
        img.style.left = x + 'px';
        img.style.top = y + 'px';
    });

    requestAnimationFrame(animate);
}

// Start animation
animate();

// Optional: Handle window resize to keep images within the viewport
window.addEventListener('resize', () => {
    images.forEach(img => {
        let x = parseFloat(img.style.left);
        let y = parseFloat(img.style.top);

        // Adjust positions if out of bounds
        if (x + img.width > window.innerWidth) {
            img.style.left = (window.innerWidth - img.width) + 'px';
        }
        if (y + img.height > window.innerHeight) {
            img.style.top = (window.innerHeight - img.height) + 'px';
        }
    });
});
