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
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 2000); // Adjust time based on your preference

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
        const timesRomanBoldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
        let page = pdfDoc.addPage();

        // Set up text and styles
        const { width, height } = page.getSize();
        const fontSize = 12;
        const titleSize = 18;
        const subheadingSize = 14;
        const lineHeight = fontSize * 1.5;
        const sectionGap = lineHeight * 2;
        const margin = 50;
        let y = height - margin;

        // Function to add text to the PDF
        function addText(text, options = {}) {
            const {
                x = margin,
                yPos = y,
                size = fontSize,
                font = timesRomanFont,
                color = rgb(0, 0, 0)
            } = options;

            page.drawText(text, {
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
            addText(title, { size: titleSize, font: timesRomanBoldFont });
            y -= sectionGap;
        }

        // Function to add a subheading
        function addSubHeading(subheading) {
            addText(subheading, { size: subheadingSize, font: timesRomanBoldFont });
            y -= lineHeight / 2;
        }

        // Function to add a bullet point
        function addBulletPoint(text) {
            addText(`• ${text}`, { x: margin + 20 });
            y -= lineHeight / 2;
        }

        // Function to add a horizontal line
        function addDivider() {
            page.drawLine({
                start: { x: margin, y: y },
                end: { x: width - margin, y: y },
                thickness: 1,
                color: rgb(0.5, 0.5, 0.5)
            });
            y -= lineHeight;
        }

        // Extract and format text from the CV content
        let cvContent = document.getElementById('cv-content').innerText;
        cvContent = replaceSpecialCharacters(cvContent);
        const sections = cvContent.split('\n\n');

        // Add sections to the PDF
        sections.forEach(section => {
            const lines = section.split('\n');
            if (lines[0].startsWith('Professional Summary') || lines[0].startsWith('Professional Experience') || lines[0].startsWith('Education') || lines[0].startsWith('Skills') || lines[0].startsWith('Certifications') || lines[0].startsWith('Recommendations') || lines[0].startsWith('Publications') || lines[0].startsWith('Achievements')) {
                addSectionTitle(lines[0]);
            } else {
                addSubHeading(lines[0]); // First line as section subheading
            }
            lines.slice(1).forEach(line => {
                if (line.startsWith('•')) {
                    addBulletPoint(line.substring(2));
                } else {
                    addText(line);
                }
                if (y < margin) {
                    page = pdfDoc.addPage();
                    y = height - margin;
                }
            });
            addDivider(); // Add divider between sections
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
