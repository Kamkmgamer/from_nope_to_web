"use client";

import { motion } from "framer-motion";

const courses = [
  {
    number: "I",
    title: "Web Foundations",
    titleAr: "أساسيات الويب",
    description: "HTML, CSS, and JavaScript from scratch.",
    topics: ["HTML5", "CSS3", "JavaScript ES6+", "Responsive Design"],
    level: "Beginner",
  },
  {
    number: "II",
    title: "React Mastery",
    titleAr: "احتراف ريأكت",
    description: "Modern UI development with React 19.",
    topics: ["Components", "Hooks", "State", "Performance"],
    level: "Intermediate",
  },
  {
    number: "III",
    title: "Next.js & Full-Stack",
    titleAr: "نكست.جي.أس",
    description: "Production apps with Next.js 15.",
    topics: ["App Router", "Server Components", "API Routes", "Deployment"],
    level: "Advanced",
  },
  {
    number: "IV",
    title: "T3 Stack",
    titleAr: "تي٣ ستاك",
    description: "Type-safe full-stack development.",
    topics: ["tRPC", "Drizzle", "PostgreSQL", "TypeScript"],
    level: "Advanced",
  },
];

export function CoursesSection() {
  return (
    <section id="roadmap" className="border-border border-t py-24">
      <div className="container-editorial">
        {/* Section header */}
        <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="label-mono">Roadmap</span>
          </div>
          <div className="lg:col-span-8">
            <h2 className="max-w-lg">
              Four modules from <span className="accent-underline">zero</span>{" "}
              to <span className="accent-underline">production</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-md">
              A structured curriculum designed to take you from complete
              beginner to confident full-stack developer.
            </p>
          </div>
        </div>

        {/* Courses list */}
        <div className="border-border space-y-0 border-t">
          {courses.map((course, index) => (
            <motion.div
              key={course.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border-border border-b py-8 lg:py-12"
            >
              <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-12">
                {/* Number */}
                <div className="lg:col-span-1">
                  <span className="font-display text-primary text-4xl opacity-60 lg:text-5xl">
                    {course.number}
                  </span>
                </div>

                {/* Main content */}
                <div className="lg:col-span-5">
                  <div className="mb-2 flex items-baseline gap-4">
                    <h3 className="text-xl lg:text-2xl">{course.title}</h3>
                    <span className="tag">{course.level}</span>
                  </div>
                  <p className="text-muted-foreground mb-3 text-sm" dir="rtl">
                    {course.titleAr}
                  </p>
                  <p className="text-muted-foreground">{course.description}</p>
                </div>

                {/* Topics */}
                <div className="lg:col-span-6">
                  <div className="flex flex-wrap gap-2">
                    {course.topics.map((topic) => (
                      <span key={topic} className="tag">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Coming soon note */}
        <div className="mt-12 text-center">
          <span className="label-mono">Courses launching soon</span>
        </div>
      </div>
    </section>
  );
}
