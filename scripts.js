document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
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
        });
    });

    // Hide loading screen after content is loaded
    const loadingScreen = document.getElementById('loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    loadingProgress.addEventListener('animationend', () => {
        loadingScreen.style.display = 'none';
    });

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
});
