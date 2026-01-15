import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.join(__dirname, '..', 'Course material');
const EN_DIR = path.join(ROOT_DIR, 'en');
const AR_DIR = path.join(ROOT_DIR, 'ar');
const OUT_FILE = path.join(__dirname, '..', 'convex', 'seedData.ts');

console.log(`Scanning directory: ${EN_DIR}`);

const COURSE_CONFIG = {
  "00-Setup": {
    titleEn: "Environment Setup",
    titleAr: "إعداد بيئة العمل",
    descriptionEn: "Get your computer ready for professional development.",
    descriptionAr: "جهّز حاسوبك للتطوير الاحترافي.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
    order: 0
  },
  "01-Web-Foundations": {
    titleEn: "Web Foundations: HTML & CSS",
    titleAr: "أساسيات الويب: HTML و CSS",
    descriptionEn: "Your first step into web development. Master the structure and style of the internet.",
    descriptionAr: "خطوتك الأولى في تطوير الويب. أتقن هيكل وتنسيق الإنترنت.",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop",
    order: 1
  },
  "02-JavaScript-Mastery": {
    titleEn: "JavaScript: The Programming Language",
    titleAr: "JavaScript: لغة البرمجة",
    descriptionEn: "Learn the logic needed to build interactive applications.",
    descriptionAr: "تعلم المنطق اللازم لبناء تطبيقات تفاعلية.",
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=2070&auto=format&fit=crop",
    order: 2
  },
  "03-React-NextJS": {
    titleEn: "Modern React & Next.js",
    titleAr: "React و Next.js الحديثة",
    descriptionEn: "Build full-stack applications with the world's most popular framework.",
    descriptionAr: "ابنِ تطبيقات متكاملة مع الإطار الأكثر شهرة في العالم.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
    order: 3
  },
  "04-T3-Stack": {
    titleEn: "Professional T3 Stack",
    titleAr: "مسار T3 Stack الاحترافي",
    descriptionEn: "Master the modern full-stack: TypeScript, Tailwind, tRPC, and Next.js",
    descriptionAr: "أتقن التطوير المتكامل الحديث: TypeScript, Tailwind, tRPC, و Next.js",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2070&auto=format&fit=crop",
    order: 4
  },
  "05-Hosting-Deployment": {
    titleEn: "Hosting & Deployment",
    titleAr: "الاستضافة والنشر",
    descriptionEn: "Get your website live on the internet. Learn to deploy with GitHub Pages, Vercel, and Netlify.",
    descriptionAr: "انشر موقعك على الإنترنت. تعلم النشر مع GitHub Pages و Vercel و Netlify.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    order: 5
  }
};

function extractMetadata(content) {
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const timeMatch = content.match(/Estimated Time:?\*\*?\s*~?(\d+)/i) || 
                   content.match(/Duration:?\*\*?\s*~?(\d+)/i) ||
                   content.match(/Time:?\s*\|?\s*(\d+)/i);
  
  return {
    title: titleMatch ? titleMatch[1].trim() : "Untitled Lesson",
    time: timeMatch ? parseInt(timeMatch[1]) : 15
  };
}

function processDirectory() {
  const courses = [];
  
  if (!fs.existsSync(EN_DIR)) {
      console.error(`Error: Directory not found: ${EN_DIR}`);
      return;
  }

  const courseDirs = fs.readdirSync(EN_DIR).filter(f => fs.statSync(path.join(EN_DIR, f)).isDirectory());

  for (const dirName of courseDirs) {
    if (!COURSE_CONFIG[dirName]) {
        console.log(`Skipping unknown directory: ${dirName}`);
        continue;
    }
    
    console.log(`Processing Course: ${dirName}`);
    const config = COURSE_CONFIG[dirName];
    const coursePathEn = path.join(EN_DIR, dirName);
    const coursePathAr = path.join(AR_DIR, dirName);

    const lessons = [];
    if (fs.existsSync(coursePathEn)) {
        const files = fs.readdirSync(coursePathEn).filter(f => f.endsWith('.md') && f !== 'README.md');

        for (const fileName of files) {
            console.log(`  Processing Lesson: ${fileName}`);
            const contentEn = fs.readFileSync(path.join(coursePathEn, fileName), 'utf-8');
            let contentAr = '';
            
            try {
                if (fs.existsSync(path.join(coursePathAr, fileName))) {
                     contentAr = fs.readFileSync(path.join(coursePathAr, fileName), 'utf-8');
                } else {
                     contentAr = contentEn; // Fallback
                     console.warn(`    Missing Arabic file for ${dirName}/${fileName}`);
                }
            } catch (e) {
                contentAr = contentEn;
            }

            const metaEn = extractMetadata(contentEn);
            const metaAr = extractMetadata(contentAr);

            lessons.push({
                slug: fileName.replace('.md', ''),
                titleEn: metaEn.title,
                titleAr: metaAr.title,
                contentEn: contentEn,
                contentAr: contentAr,
                estimatedMinutes: metaEn.time
            });
        }
    }

    lessons.sort((a,b) => a.slug.localeCompare(b.slug));

    courses.push({
        slug: dirName.toLowerCase(),
        titleEn: config.titleEn,
        titleAr: config.titleAr,
        descriptionEn: config.descriptionEn,
        descriptionAr: config.descriptionAr,
        order: config.order,
        imageUrl: config.image,
        modules: [
            {
                titleEn: "Course Curriculum",
                titleAr: "منهج الدورة",
                descriptionEn: "All lessons for this module.",
                descriptionAr: "جميع دروس هذه الوحدة.",
                lessons: lessons
            }
        ]
    });
  }

  courses.sort((a,b) => a.order - b.order);

  const fileContent = `export const coursesData = ${JSON.stringify(courses, null, 2)};`;
  fs.writeFileSync(OUT_FILE, fileContent);
  console.log(`Successfully generated seedData.ts with ${courses.length} courses!`);
}

processDirectory();
