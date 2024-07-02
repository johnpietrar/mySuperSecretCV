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

    // Load the custom font
    async function loadCustomFont() {
        const url = 'path/to/DejaVuSans.ttf'; // Update the path to your font file
        const fontBytes = await fetch(url).then(res => res.arrayBuffer());
        return fontBytes;
    }

    // PDF Download functionality using pdf-lib
    document.getElementById('download-pdf').addEventListener('click', async function () {
        const { PDFDocument, rgb } = PDFLib;

        // Create a new PDF document
        const pdfDoc = await PDFDocument.create();
        const customFontBytes = await loadCustomFont();
        const customFont = await pdfDoc.embedFont(customFontBytes);
        const customFontBold = await pdfDoc.embedFont(customFontBytes, { subset: true });
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
                font = customFont,
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
            y -= sectionGap / 2; // Add some space before the title
            addText(title, { size: titleSize, font: customFontBold });
            y -= sectionGap;
        }

        // Function to add a subheading
        function addSubHeading(subheading) {
            y -= lineHeight; // Add some space before the subheading
            addText(subheading, { size: subheadingSize, font: customFontBold });
            y -= lineHeight / 2;
        }

        // Function to add a bullet point
        function addBulletPoint(text) {
            addText(`• ${text}`, { x: margin + 20 });
            y -= lineHeight / 2;
        }

        // Function to add a horizontal line
        function addDivider() {
            y -= lineHeight / 2; // Add some space before the divider
            page.drawLine({
                start: { x: margin, y: y },
                end: { x: width - margin, y: y },
                thickness: 1,
                color: rgb(0.5, 0.5, 0.5)
            });
            y -= lineHeight;
        }

        // Function to check and add a new page if needed
        function checkAndAddNewPage() {
            if (y < margin) {
                page = pdfDoc.addPage();
                y = height - margin;
            }
        }

        // Function to format and add sections to the PDF
        function addSection(sectionTitle, sectionContent) {
            addSectionTitle(sectionTitle);
            checkAndAddNewPage();
            sectionContent.forEach(content => {
                if (content.startsWith('•')) {
                    addBulletPoint(content.substring(2));
                } else {
                    addText(content);
                }
                checkAndAddNewPage();
            });
            addDivider();
            checkAndAddNewPage();
        }

        // Extract and format text from the CV content
        const sections = {
            "Professional Summary": [
                "Passionate and experienced Senior Software Engineer with over 8 years in the industry. Skilled in backend development, particularly with Node.js and AWS. Proven ability to lead projects, manage teams, and deliver high-quality software solutions on time. Known for strong problem-solving skills, innovation, and the ability to work independently and collaboratively within a team.",
                "Contact me at: johnpietrar@gmail.com"
            ],
            "Professional Experience": [
                "Mindera",
                "Senior Software Engineer (Apr 2022 - Present)",
                "• Utilizing Amazon Web Services (AWS) and Node.js to build and maintain robust applications.",
                "• Mentoring junior developers and conducting code reviews to ensure high code quality.",
                "• Facilitating and leading the interview process.",
                "• Collaborating with cross-functional teams to define and achieve project goals.",
                "",
                "3Pillar Global",
                "Software Engineer (Aug 2019 - Apr 2022)",
                "• Developed and maintained web applications using AWS and Node.js.",
                "• Participated in the full software development lifecycle, from design to deployment.",
                "• Implemented microservices architecture to enhance application scalability and maintainability.",
                "",
                "Webamboos",
                "Software Development Specialist (Aug 2018 - Aug 2019)",
                "• Specialized in developing server-side applications and APIs.",
                "• Integrated AWS services to improve application performance and scalability.",
                "• Worked on optimization and enhancement of existing codebases.",
                "",
                "Flex",
                "Software Development Engineer (May 2016 - Aug 2018)",
                "• Designed and developed software solutions for various clients.",
                "• Focused on communication and optimization within applications.",
                "• Collaborated with teams to deliver high-quality software on time."
            ],
            "Education": [
                "Politehnica University Timisoara - Bachelor's degree, Computer Science"
            ],
            "Skills": [
                "Programming Languages: Node.js, TypeScript, C#, Python",
                "Cloud Services: Amazon Web Services (AWS)",
                "Database Technologies: NoSQL, SQL",
                "Development Practices: Microservices, Data Analysis, Optimization",
                "Professional Skills: Communication, Team Leadership, Problem-Solving"
            ],
            "Certifications": [
                "Passed LinkedIn Skill Assessments for Node.js, AWS"
            ],
            "Recommendations": [
                "Daniel Dughila - Engineering Manager:",
                "Ionuț is a passionate software engineer with a valuable quality, you can depend on him! We worked together on a fast-paced project, building a video portal with a tight deadline. Ionuț stepped up; I relied on him for complex tasks, working independently, asking the right questions, getting the job done. He was always willing to help his colleagues. I am lucky to have worked together!"
            ],
            "Publications": [
                "Architecting Robust Software: Embracing Modular Design",
                "Crafting Effective Documentation for TypeScript Microservices Projects"
            ],
            "Achievements": [
                "Innovation Award for contributions to project efficiency and new feature development at 3Pillar Global.",
                "Successfully led the development and deployment of multiple high-impact projects."
            ]
        };

        // Add sections to the PDF
        for (const [sectionTitle, sectionContent] of Object.entries(sections)) {
            addSection(sectionTitle, sectionContent);
        }

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
