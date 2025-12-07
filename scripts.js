document.addEventListener('DOMContentLoaded', function() {
    // Game stats system
    let score = 0;
    let level = 1;
    const scoreElement = document.getElementById('score-indicator');
    const levelElement = document.getElementById('level-indicator');

    function updateScore(points) {
        score += points;
        scoreElement.textContent = `SCORE: ${score}`;

        // Level up every 1000 points
        const newLevel = Math.floor(score / 1000) + 1;
        if (newLevel > level) {
            level = newLevel;
            levelElement.textContent = `LEVEL: ${level}`;
            showAchievement(`LEVEL UP! Now at Level ${level}!`);
        }
    }

    // Achievement notification system
    function showAchievement(message) {
        const achievement = document.createElement('div');
        achievement.className = 'achievement-popup';
        achievement.innerHTML = `
            <div class="achievement-content">
                <span class="achievement-icon">🏆</span>
                <span class="achievement-text">${message}</span>
            </div>
        `;
        document.body.appendChild(achievement);

        setTimeout(() => {
            achievement.classList.add('show');
        }, 100);

        setTimeout(() => {
            achievement.classList.remove('show');
            setTimeout(() => achievement.remove(), 300);
        }, 3000);
    }

    // Konami Code Easter Egg (↑ ↑ ↓ ↓ ← → ← → B A)
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', function(e) {
        const key = e.key.toLowerCase();
        if (key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateKonamiCode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateKonamiCode() {
        showAchievement('KONAMI CODE ACTIVATED! +10000 POINTS!');
        updateScore(10000);
        document.body.style.animation = 'rainbow 2s linear';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            updateScore(10);
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Highlight active navigation link
    document.querySelectorAll('ul li').forEach(item => {
        item.addEventListener('click', function () {
            document.querySelectorAll('ul li').forEach(li => li.classList.remove('active'));
            this.classList.add('active');
            updateScore(5);
        });
    });

    // Ghost click counter
    let ghostClicks = 0;
    document.querySelectorAll('.ghost').forEach(ghost => {
        ghost.addEventListener('click', function() {
            ghostClicks++;
            updateScore(50);
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = '';
            }, 10);

            if (ghostClicks === 10) {
                showAchievement('Ghost Hunter! Clicked 10 ghosts!');
            } else if (ghostClicks === 50) {
                showAchievement('Pac-Master! 50 ghost clicks!');
            }
        });
    });

    // Pedro clicks
    let pedroClicks = 0;
    const raccoon = document.querySelector('.raccoon-container img');
    if (raccoon) {
        raccoon.addEventListener('click', function(e) {
            e.preventDefault();
            pedroClicks++;
            updateScore(100);

            if (pedroClicks === 1) {
                showAchievement('You found Pedro! +100 points!');
            } else if (pedroClicks === 5) {
                showAchievement('Pedro\'s Best Friend!');
            } else if (pedroClicks === 10) {
                showAchievement('Pedro Dance Champion!');
            }
        });
    }

    // Section scroll achievements
    let sectionsViewed = new Set();
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                if (!sectionsViewed.has(sectionId)) {
                    sectionsViewed.add(sectionId);
                    updateScore(25);

                    if (sectionsViewed.size === 8) {
                        showAchievement('CV Explorer! Viewed all sections! +500 bonus!');
                        updateScore(500);
                    }
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.cv-section').forEach(section => {
        observer.observe(section);
    });

    // Hide loading screen after content is loaded
    const loadingScreen = document.getElementById('loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    loadingProgress.addEventListener('animationend', () => {
        loadingScreen.style.display = 'none';
        setTimeout(() => {
            showAchievement('Welcome, Player! Start exploring to earn points!');
        }, 500);
    });

    // LEGO Button achievement
    const legoButton = document.getElementById('lego-button');
    if (legoButton) {
        legoButton.addEventListener('click', function() {
            showAchievement('LEGO Master Builder discovered! +500 points!');
            updateScore(500);
        });
    }

    // GSAP Animations
    gsap.from("header h1", { duration: 1, y: -50, opacity: 0 });
    gsap.from("header p", { duration: 1, y: 50, opacity: 0, delay: 0.5 });

    // Scroll Reveal
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal().reveal('.animate__animated', {
            distance: '50px',
            duration: 1000,
            easing: 'ease-in-out',
            origin: 'bottom',
            interval: 200
        });
    }

    // Function to replace special characters
    function replaceSpecialCharacters(text) {
        const map = {
            'ț': 't',
            'Ț': 'T',
            'ș': 's',
            'Ș': 'S',
            'ă': 'a',
            'Ă': 'A',
            'î': 'i',
            'Î': 'I',
            'â': 'a',
            'Â': 'A'
        };
        return text.replace(/[țȚșȘăĂîÎâÂ]/g, function(match) {
            return map[match];
        });
    }

    // PDF Download functionality using pdf-lib
    document.getElementById('download-pdf').addEventListener('click', async function () {
        const { PDFDocument, rgb, StandardFonts } = PDFLib;

        // Create a new PDF document
        const pdfDoc = await PDFDocument.create();
        const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
        let page = pdfDoc.addPage();

        // Set up text and styles
        const { width, height } = page.getSize();
        const fontSize = 12;
        const titleSize = 16;
        const lineHeight = fontSize * 1.5;
        const sectionGap = lineHeight * 2;
        let y = height - 4 * lineHeight;

        // Function to add text to the PDF
        function addText(text, options = {}) {
            const {
                x = 50,
                yPos = y,
                size = fontSize,
                font = timesRomanFont,
                color = rgb(0, 0, 0)
            } = options;

            page.drawText(replaceSpecialCharacters(text), {
                x,
                y: yPos,
                size,
                font,
                color
            });
            y -= lineHeight;
        }

        // Function to add a section title
        function addSectionTitle(title) {
            addText(replaceSpecialCharacters(title), { size: titleSize, yPos: y });
            y -= lineHeight + sectionGap;
        }

        // Function to process each section
        function processSection(section) {
            const sectionTitle = section.querySelector('h2').innerText;
            const contentItems = section.querySelectorAll('p, ul');
            addSectionTitle(sectionTitle);

            contentItems.forEach(item => {
                if (item.tagName === 'P') {
                    addText(item.innerText);
                } else if (item.tagName === 'UL') {
                    item.querySelectorAll('li').forEach(li => {
                        addText(`• ${li.innerText}`, { x: 70 });
                    });
                }
            });

            y -= sectionGap;
        }

        // Process all sections
        document.querySelectorAll('.cv-section').forEach(section => {
            processSection(section);
            if (y < 4 * lineHeight) {
                page = pdfDoc.addPage();
                y = height - 4 * lineHeight;
            }
        });

        // Serialize the PDF to bytes
        const pdfBytes = await pdfDoc.save();

        // Create a Blob from the PDF bytes
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);

        // Create a link element to download the PDF
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ionut_cv.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    // Ghost eyes follow cursor
    const ghosts = document.querySelectorAll('.ghost');
    document.addEventListener('mousemove', (event) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        ghosts.forEach(ghost => {
            const rect = ghost.getBoundingClientRect();
            const ghostX = rect.left + rect.width / 2;
            const ghostY = rect.top + rect.height / 2;

            const angle = Math.atan2(mouseY - ghostY, mouseX - ghostX);

            const eye1 = ghost.querySelectorAll('.eye')[0];
            const eye2 = ghost.querySelectorAll('.eye')[1];
            const pupil1 = ghost.querySelectorAll('.pupil')[0];
            const pupil2 = ghost.querySelectorAll('.pupil')[1];

            const pupilOffsetX = Math.cos(angle) * 1.5; // Adjusted for better centering
            const pupilOffsetY = Math.sin(angle) * 1.5; // Adjusted for better centering

            const eyeRadius = parseFloat(eye1.getAttribute('r'));
            const maxOffset = eyeRadius * 0.6; // Keep the pupil within the eye

            // Constrain the pupil within the eye
            const clampedOffsetX = Math.max(-maxOffset, Math.min(maxOffset, pupilOffsetX));
            const clampedOffsetY = Math.max(-maxOffset, Math.min(maxOffset, pupilOffsetY));

            pupil1.setAttribute('cx', parseFloat(eye1.getAttribute('cx')) + clampedOffsetX);
            pupil1.setAttribute('cy', parseFloat(eye1.getAttribute('cy')) + clampedOffsetY);

            pupil2.setAttribute('cx', parseFloat(eye2.getAttribute('cx')) + clampedOffsetX);
            pupil2.setAttribute('cy', parseFloat(eye2.getAttribute('cy')) + clampedOffsetY);
        });

        // Play background music on mouse move
        const backgroundMusic = document.getElementById('background-music');
        if (backgroundMusic.paused) {
            backgroundMusic.volume = 0.2;
            backgroundMusic.play();
        }
    });
});
