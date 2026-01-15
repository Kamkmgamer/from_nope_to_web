import { mutation } from "./_generated/server";
import { coursesData } from "./seedData";

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    // 1. CLEANUP
    console.log("Cleaning up old data...");
    const allLessons = await ctx.db.query("lessons").collect();
    for (const l of allLessons) await ctx.db.delete(l._id);

    const allModules = await ctx.db.query("modules").collect();
    for (const m of allModules) await ctx.db.delete(m._id);

    const allCourses = await ctx.db.query("courses").collect();
    for (const c of allCourses) await ctx.db.delete(c._id);
    console.log("Cleanup complete.");

    // 2. SEED NEW DATA
    console.log("Seeding new data...");

    for (const courseData of coursesData) {
      console.log(`Creating Course: ${courseData.titleEn}`);
      const courseId = await ctx.db.insert("courses", {
        slug: courseData.slug,
        titleEn: courseData.titleEn,
        titleAr: courseData.titleAr,
        descriptionEn: courseData.descriptionEn,
        descriptionAr: courseData.descriptionAr,
        order: courseData.order,
        isPublished: true,
        imageUrl: courseData.imageUrl,
      });

      let moduleOrderCounter = 1;
      for (const moduleData of courseData.modules) {
        console.log(`  Creating Module: ${moduleData.titleEn}`);
        const moduleId = await ctx.db.insert("modules", {
            courseId: courseId,
            order: moduleOrderCounter++,
            titleEn: moduleData.titleEn,
            titleAr: moduleData.titleAr,
            descriptionEn: moduleData.descriptionEn ?? "",
            descriptionAr: moduleData.descriptionAr ?? "",
        });

        let lessonOrderCounter = 1;
        for (const lessonData of moduleData.lessons) {
             await ctx.db.insert("lessons", {
                moduleId: moduleId,
                slug: lessonData.slug,
                order: lessonOrderCounter++,
                titleEn: lessonData.titleEn,
                titleAr: lessonData.titleAr,
                contentEn: lessonData.contentEn,
                contentAr: lessonData.contentAr,
                estimatedMinutes: lessonData.estimatedMinutes,
                isPublished: true,
            });
        }
      }
    }

    return "Database seeded with ALL curriculum (Bilingual & Advanced) successfully!";
  },
});
