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
        const lineHeight = fontSize * 1.2;
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

            page.drawText(text, {
                x,
                y: yPos,
                size,
                font,
                color
            });
        }

        // Function to add a section title
        function addSectionTitle(title) {
            addText(title, { size: fontSize + 2, yPos: y });
            y -= lineHeight + sectionGap;
        }

        // Extract and format text from the CV content
        let cvContent = document.getElementById('cv-content').innerText;
        cvContent = replaceSpecialCharacters(cvContent);
        const sections = cvContent.split('\n\n');

        // Add sections to the PDF
        sections.forEach(section => {
            const lines = section.split('\n');
            addSectionTitle(lines[0]); // First line as section title
            lines.slice(1).forEach(line => {
                addText(line);
                y -= lineHeight;
                if (y < 4 * lineHeight) {
                    page = pdfDoc.addPage();
                    y = height - 4 * lineHeight;
                }
            });
            y -= sectionGap; // Add extra space between sections
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
