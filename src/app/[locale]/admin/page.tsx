"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { useState } from "react";
import { Plus, Edit, Trash, Eye, EyeOff } from "lucide-react";

export default function AdminDashboard() {
  const courses = useQuery(api.courses.listAll);
  const deleteCourse = useMutation(api.courses.remove);
  const togglePublish = useMutation(api.courses.update);
  const createCourse = useMutation(api.courses.create);

  // Local state for basic course editing (could be a modal in V2)
  const [isCreating, setIsCreating] = useState(false);

  if (courses === undefined) {
    return <div>Loading courses...</div>;
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="font-mono text-xl tracking-wider uppercase">
          Course Management
        </h2>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-primary text-primary-foreground flex items-center gap-2 px-4 py-2 font-mono text-sm transition-opacity hover:opacity-90"
        >
          <Plus className="size-4" />
          New Course
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {courses.map((course) => (
          <div
            key={course._id}
            className="border-border bg-card flex flex-col justify-between gap-4 border p-6 md:flex-row md:items-center"
          >
            <div className="flex-1">
              <div className="mb-2 flex items-center gap-3">
                <span className="text-muted-foreground font-mono text-xs">
                  Order: {course.order}
                </span>
                {course.isPublished ? (
                  <span className="inline-flex items-center gap-1 rounded border border-green-500/20 px-2 py-0.5 font-mono text-xs text-green-500">
                    <Eye className="size-3" /> Published
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded border border-yellow-500/20 px-2 py-0.5 font-mono text-xs text-yellow-500">
                    <EyeOff className="size-3" /> Draft
                  </span>
                )}
              </div>
              <h3 className="font-display text-xl">{course.titleEn}</h3>
              <p
                className="text-muted-foreground font-arabic text-sm"
                dir="rtl"
              >
                {course.titleAr}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  togglePublish({
                    id: course._id,
                    isPublished: !course.isPublished,
                  })
                }
                className="hover:bg-muted text-muted-foreground hover:text-foreground hover:border-border border border-transparent p-2 transition-colors"
                title={course.isPublished ? "Unpublish" : "Publish"}
              >
                {course.isPublished ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
              <a
                href={`/admin/courses/${course.slug}`} // We'll build this next
                className="hover:bg-muted text-muted-foreground hover:text-foreground hover:border-border border border-transparent p-2 transition-colors"
                title="Edit Content"
              >
                <Edit className="size-4" />
              </a>
              <button
                onClick={async () => {
                  if (
                    confirm(
                      "Are you sure? This will delete all modules and lessons within this course.",
                    )
                  ) {
                    await deleteCourse({ id: course._id });
                  }
                }}
                className="hover:bg-destructive/10 text-muted-foreground hover:text-destructive hover:border-border border border-transparent p-2 transition-colors"
                title="Delete"
              >
                <Trash className="size-4" />
              </button>
            </div>
          </div>
        ))}

        {courses.length === 0 && (
          <div className="border-border text-muted-foreground border border-dashed py-12 text-center">
            No courses found. Seed the database or create one.
          </div>
        )}
      </div>

      {/* Simple Create Modal Placeholder - Implementing full edit page next */}
      {isCreating && (
        <div className="bg-background/80 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-card border-border max-h-[90vh] w-full max-w-2xl overflow-y-auto border p-8 shadow-2xl">
            <h3 className="font-display mb-6 text-2xl">New Course</h3>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                try {
                  await createCourse({
                    titleEn: formData.get("titleEn") as string,
                    titleAr: formData.get("titleAr") as string,
                    descriptionEn: formData.get("descriptionEn") as string,
                    descriptionAr: formData.get("descriptionAr") as string,
                    slug: formData.get("slug") as string,
                    order: Number(formData.get("order")),
                    imageUrl: (formData.get("imageUrl") as string) || undefined,
                  });
                  setIsCreating(false);
                } catch (error) {
                  console.error("Failed to create course:", error);
                  alert("Failed to create course. Please check the console.");
                }
              }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="text-primary border-b pb-2 font-mono text-sm uppercase">
                    English
                  </h4>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <input
                      name="titleEn"
                      required
                      className="bg-background border-border w-full border p-2"
                      placeholder="e.g. Web Foundations"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <textarea
                      name="descriptionEn"
                      required
                      rows={3}
                      className="bg-background border-border w-full border p-2"
                      placeholder="Course summary..."
                    />
                  </div>
                </div>

                <div className="space-y-4" dir="rtl">
                  <h4
                    className="text-primary border-b pb-2 font-mono text-sm uppercase"
                    dir="ltr"
                  >
                    Arabic
                  </h4>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">العنوان</label>
                    <input
                      name="titleAr"
                      required
                      className="bg-background border-border w-full border p-2"
                      placeholder="مثال: أساسيات الويب"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">الوصف</label>
                    <textarea
                      name="descriptionAr"
                      required
                      rows={3}
                      className="bg-background border-border w-full border p-2"
                      placeholder="ملخص الدورة..."
                    />
                  </div>
                </div>
              </div>

              <div className="border-border grid grid-cols-1 gap-6 border-t border-dashed pt-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Slug (URL)</label>
                  <input
                    name="slug"
                    required
                    className="bg-background border-border w-full border p-2 font-mono text-sm"
                    placeholder="web-foundations"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Order</label>
                  <input
                    name="order"
                    type="number"
                    required
                    defaultValue={1}
                    className="bg-background border-border w-full border p-2"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">
                    Image URL (Optional)
                  </label>
                  <input
                    name="imageUrl"
                    className="bg-background border-border w-full border p-2 font-mono text-sm"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="border-border hover:bg-muted border px-6 py-2 font-mono text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground px-6 py-2 font-mono text-sm transition-opacity hover:opacity-90"
                >
                  Create Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
