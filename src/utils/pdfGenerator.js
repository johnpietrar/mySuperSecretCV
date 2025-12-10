import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const replaceSpecialCharacters = (text) => {
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
  return text.replace(/[țȚșȘăĂîÎâÂ]/g, (match) => map[match] || match);
};

export const generatePDF = async () => {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let page = pdfDoc.addPage();
  const { width, height } = page.getSize();

  const fontSize = 11;
  const titleSize = 16;
  const sectionTitleSize = 14;
  const lineHeight = fontSize * 1.5;
  const sectionGap = lineHeight * 1.5;
  let y = height - 50;

  const addText = (text, options = {}) => {
    const {
      x = 50,
      yPos = y,
      size = fontSize,
      font: textFont = font,
      color = rgb(0, 0, 0),
      maxWidth = width - 100
    } = options;

    const cleanText = replaceSpecialCharacters(text);

    // Simple word wrapping
    const words = cleanText.split(' ');
    let line = '';
    let currentY = yPos;

    words.forEach((word, _index) => {
      const testLine = line + word + ' ';
      const testWidth = textFont.widthOfTextAtSize(testLine, size);

      if (testWidth > maxWidth && line !== '') {
        page.drawText(line.trim(), {
          x,
          y: currentY,
          size,
          font: textFont,
          color
        });
        line = word + ' ';
        currentY -= lineHeight;

        // Check if we need a new page
        if (currentY < 50) {
          page = pdfDoc.addPage();
          currentY = height - 50;
        }
      } else {
        line = testLine;
      }
    });

    if (line.trim() !== '') {
      page.drawText(line.trim(), {
        x,
        y: currentY,
        size,
        font: textFont,
        color
      });
      currentY -= lineHeight;
    }

    y = currentY;
    return currentY;
  };

  const addSectionTitle = (title) => {
    if (y < 100) {
      page = pdfDoc.addPage();
      y = height - 50;
    }
    y -= sectionGap;
    addText(title, { size: sectionTitleSize, font: boldFont });
    y -= lineHeight;
  };

  // Title
  addText('Ionut Pietrar', { size: titleSize, font: boldFont });
  addText('Engineering Team Lead / Senior Software Engineer', { size: 12, font: boldFont });
  addText('Email: johnpietrar@gmail.com', { size: 10 });
  y -= sectionGap;

  // Professional Summary
  addSectionTitle('Professional Summary');
  addText('Passionate and experienced Engineering Team Lead with over 8 years in the industry. Skilled in backend development, particularly with Node.js and AWS. Proven ability to lead engineering teams, architect scalable systems, and deliver high-quality software solutions on time.');
  y -= lineHeight / 2;
  addText('Known for strong problem-solving skills, innovation, and the ability to work independently and collaboratively within cross-functional teams.');
  y -= lineHeight / 2;

  // Experience
  addSectionTitle('Professional Experience');

  // ArcForge Technologies / LEGO Group
  addText('ArcForge Technologies (Node.js/AWS/SQL)', { font: boldFont });
  addText('Engineering Team Lead | Oct 2024 - Present');
  addText('Client: LEGO Group, Denmark', { size: 10 });
  y -= lineHeight / 2;
  addText('• Leading engineering team for LEGO Magazine platform serving millions of users globally', { x: 60 });
  addText('• Architected and developed the complete infrastructure and backend for LEGO Magazine from the ground up', { x: 60 });
  addText('• Implemented comprehensive testing suite including unit, integration, and E2E tests ensuring 95%+ code coverage', { x: 60 });
  addText('• Created custom admin tool for magazine content management, streamlining editorial workflows', { x: 60 });
  addText('• Built and configured entire AWS infrastructure using CDK, architecting scalable cloud solutions from scratch', { x: 60 });
  addText('• Designed and implemented automated GDPR compliance system for data privacy requirements', { x: 60 });
  addText('• Leading technical decisions, mentoring team members, and establishing engineering best practices', { x: 60 });
  y -= sectionGap;

  // Mindera
  addText('Mindera (Node.js/AWS/NoSQL)', { font: boldFont });
  addText('Senior Software Engineer | Apr 2022 - Oct 2024');
  addText('Client: Dunelm - UK\'s largest homewares retailer', { size: 10 });
  y -= lineHeight / 2;
  addText('• Led development for stock management system handling real-time inventory across 180+ stores', { x: 60 });
  addText('• Architected and built payment system processing millions of transactions with 99.9% uptime', { x: 60 });
  addText('• Optimized backend services for high-traffic retail platform serving millions of customers', { x: 60 });
  addText('• Built and maintained scalable e-commerce solutions using AWS and Node.js', { x: 60 });
  addText('• Conducted code reviews and mentored junior developers on microservices architecture', { x: 60 });
  y -= sectionGap;

  // 3Pillar Global
  addText('3Pillar Global (Node.js/AWS/NoSQL)', { font: boldFont });
  addText('Software Engineer | Aug 2019 - Apr 2022');
  addText('Client: Fortune (Fortune Media)', { size: 10 });
  y -= lineHeight / 2;
  addText('• Developed enterprise-grade web applications for Fortune Media using AWS and Node.js', { x: 60 });
  addText('• Participated in the full software development lifecycle for high-stakes media platform projects', { x: 60 });
  addText('• Implemented microservices architecture enhancing scalability for millions of users', { x: 60 });
  addText('• Delivered innovative solutions meeting strict enterprise security and compliance standards', { x: 60 });
  y -= sectionGap;

  // Webamboos
  addText('Webamboos (Node.js/AWS/NoSQL)', { font: boldFont });
  addText('Software Development Specialist | Aug 2018 - Aug 2019');
  addText('Jack-of-all-trades developer handling diverse project categories', { size: 10 });
  y -= lineHeight / 2;
  addText('• Tackled projects across every conceivable category - from e-commerce to IoT, fintech to content management', { x: 60 });
  addText('• Rapidly adapted to new technologies and domains, delivering solutions across varied tech stacks', { x: 60 });
  addText('• Specialized in developing server-side applications, APIs, and cloud integrations', { x: 60 });
  addText('• Optimized and enhanced existing codebases across multiple client projects', { x: 60 });
  y -= sectionGap;

  // Flex
  addText('Flex (C#/SQL)', { font: boldFont });
  addText('Software Development Engineer | May 2016 - Aug 2018');
  y -= lineHeight / 2;
  addText('• Collaborated directly with production line engineers to improve manufacturing systems', { x: 60 });
  addText('• Designed and developed software solutions optimizing factory floor operations', { x: 60 });
  addText('• Implemented real-time communication systems between production line equipment', { x: 60 });
  addText('• Enhanced system efficiency leading to measurable improvements in production output', { x: 60 });
  y -= sectionGap;

  // Skills
  addSectionTitle('Skills');
  addText('Languages: Node.js, TypeScript, C#, Python', { x: 60 });
  addText('Cloud Services: Amazon Web Services (AWS)', { x: 60 });
  addText('Databases: NoSQL, SQL, Databricks', { x: 60 });
  addText('Practices: Microservices, Testing, CI/CD, GDPR Compliance', { x: 60 });
  addText('Leadership: Team Lead, Mentoring, Code Review, Interviews', { x: 60 });
  addText('Domains: E-commerce, Media, Manufacturing, IoT', { x: 60 });
  y -= sectionGap;

  // Education
  addSectionTitle('Education');
  addText('Politehnica University Timisoara', { font: boldFont });
  addText('Bachelor\'s degree, Computer Science');
  y -= sectionGap;

  // Achievements
  addSectionTitle('Achievements');
  addText('• Innovation Award for contributions to project efficiency and new feature development at 3Pillar Global', { x: 60 });
  addText('• Successfully led the development and deployment of multiple high-impact projects across LEGO, Dunelm, and Fortune Media', { x: 60 });
  addText('• Built payment system processing millions of transactions with 99.9% uptime', { x: 60 });
  y -= sectionGap;

  // Publications
  addSectionTitle('Publications');
  addText('• Architecting Robust Software: Embracing Modular Design', { x: 60 });
  addText('  https://medium.com/@ionutpietrar/architecting-robust-software-embracing-modular-design-6980ff3c3933', { x: 60, size: 9 });
  y -= lineHeight / 2;
  addText('• Crafting Effective Documentation for TypeScript Microservices Projects', { x: 60 });
  addText('  https://medium.com/@ionutpietrar/crafting-effective-documentation-for-typescript-microservices-projects-94cec40e740b', { x: 60, size: 9 });

  // Save PDF
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'ionut_pietrar_cv.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
