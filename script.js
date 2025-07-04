const audio = document.getElementById('starWarsAudio');
const saber = document.getElementById('saberSound');
const flyby = document.getElementById('flybySound');
const tieFighter = document.getElementById('tieFighter');
const startButton = document.getElementById('startButton');
const mainContent = document.getElementById('mainContent');

/**
 * Launches the TIE Fighter across the screen.
 * Plays a flyby sound effect and resets the TIE Fighter for the next launch.
 */
function launchTIEFighter() {
  // Move TIE Fighter off-screen to the right
  tieFighter.style.transform = 'translateX(120vw)';
  // Reset and play the flyby sound
  flyby.currentTime = 0;
  flyby.play();
  // After a delay, reset the TIE Fighter's position and transition for the next launch
  setTimeout(() => {
    tieFighter.style.transition = 'none'; // Disable transition for instant reset
    tieFighter.style.transform = 'translateX(0)'; // Reset to initial off-screen left position
    void tieFighter.offsetWidth; // Trigger reflow to apply 'none' transition immediately
    tieFighter.style.transition = 'transform 6s linear'; // Re-enable transition for the next animation
  }, 7000); // Wait for the TIE Fighter to fly across and a bit more before resetting
}

/**
 * Shows a character image with a fade-in effect after a specified delay.
 * @param {string} id - The ID of the character image element.
 * @param {number} delay - The delay in milliseconds before showing the character.
 */
function showCharacter(id, delay = 0) {
  setTimeout(() => {
    const el = document.getElementById(id);
    if (el) { // Ensure the element exists before trying to modify it
      el.style.transition = 'opacity 2s ease-in-out'; // Smooth fade-in transition
      el.style.opacity = 1; // Make the character visible
    }
  }, delay);
}

/**
 * Starts all animations and audio after user interaction.
 */
function startAllAnimations() {
  // Hide the start button and show the main content
  startButton.style.display = 'none';
  mainContent.style.display = 'flex'; // Or 'block', depending on desired layout

  // Play the main Star Wars theme audio
  audio.play().catch(error => console.warn('Audio playback failed:', error));
  // Periodically launch the TIE Fighter
  setInterval(launchTIEFighter, 15000); // Every 15 seconds
  // Show characters with staggered delays
  showCharacter('jediSolis', 1000); // 1 second delay
  showCharacter('darthNightmare', 3000); // 3 second delay
  showCharacter('sithJayden', 5000); // 5 second delay
  showCharacter('brandon', 7000); // 7 second delay

  // Add saber sound on mouseenter for character images
  const characterIds = ['jediSolis', 'darthNightmare', 'sithJayden', 'brandon'];
  characterIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('mouseenter', () => {
        saber.currentTime = 0;
        saber.play();
      });
    }
  });

  // Start the hyperspace effect after a delay
  startHyperspace();
}

// --- Event Listeners and Initial Setup ---
window.onload = function () {
  // Attach click listener to the start button
  startButton.addEventListener('click', startAllAnimations);
  // Initially hide the main content until the button is clicked
  mainContent.style.display = 'none';
};

// --- Starfield Effect ---
const starCanvas = document.getElementById('starfield');
const starCtx = starCanvas.getContext('2d');
let stars = []; // Array to hold star objects

/**
 * Resizes both starfield and hyperspace canvases to fill the window.
 */
function resizeCanvas() {
  starCanvas.width = window.innerWidth;
  starCanvas.height = window.innerHeight;
  hyperCanvas.width = window.innerWidth;
  hyperCanvas.height = window.innerHeight;
}

// Listen for window resize events to adjust canvas size
window.addEventListener('resize', resizeCanvas);

// Initialize stars for the starfield
for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    radius: Math.random() * 1.5,
    speed: Math.random() * 0.5 + 0.2
  });
}

/**
 * Draws and animates the stars in the starfield.
 */
function drawStars() {
  starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height); // Clear the canvas
  starCtx.fillStyle = '#fff'; // White color for stars
  for (let star of stars) {
    starCtx.beginPath();
    starCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2); // Draw a circle
    starCtx.fill(); // Fill the circle
    star.y += star.speed; // Move star downwards
    // If star goes off-screen, reset its position to the top
    if (star.y > starCanvas.height) {
      star.y = 0;
      star.x = Math.random() * starCanvas.width;
    }
  }
  requestAnimationFrame(drawStars); // Loop the animation
}
drawStars(); // Start the starfield animation

// --- Hyperspace Effect ---
const hyperCanvas = document.getElementById('hyperspace');
const hyperCtx = hyperCanvas.getContext('2d');
let hyperStars = []; // Array to hold hyperspace star objects

// Initialize stars for the hyperspace effect
for (let i = 0; i < 100; i++) {
  hyperStars.push({
    x: window.innerWidth / 2, // Start at the center
    y: window.innerHeight / 2, // Start at the center
    dx: (Math.random() - 0.5) * 2, // Random horizontal direction
    dy: (Math.random() - 0.5) * 2, // Random vertical direction
    length: Math.random() * 20 + 10 // Random length for the "streaks"
  });
}

/**
 * Draws and animates the hyperspace effect.
 */
function drawHyperspace() {
  // Fill the canvas with a semi-transparent black to create a trailing effect
  hyperCtx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  hyperCtx.fillRect(0, 0, hyperCanvas.width, hyperCanvas.height);
  hyperCtx.strokeStyle = '#00f6ff'; // Cyan color for hyperspace streaks
  for (let star of hyperStars) {
    hyperCtx.beginPath();
    hyperCtx.moveTo(star.x, star.y); // Start drawing from current position
    star.x += star.dx * 10; // Move star rapidly
    star.y += star.dy * 10; // Move star rapidly
    hyperCtx.lineTo(star.x, star.y); // Draw line to new position
    hyperCtx.stroke(); // Render the line
    // If star goes off-screen, reset it to the center
    if (star.x < 0 || star.x > hyperCanvas.width || star.y < 0 || star.y > hyperCanvas.height) {
      star.x = window.innerWidth / 2;
      star.y = window.innerHeight / 2;
    }
  }
  requestAnimationFrame(drawHyperspace); // Loop the animation
}

/**
 * Starts the hyperspace effect after a delay.
 */
function startHyperspace() {
  // Delay hyperspace start for an initial starfield view
  setTimeout(drawHyperspace, 10000); // 10 seconds delay
}
