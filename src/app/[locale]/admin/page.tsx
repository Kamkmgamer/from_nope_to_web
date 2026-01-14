"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { useState } from "react";
import { Plus, Edit, Trash, Eye, EyeOff } from "lucide-react";

export default function AdminDashboard() {
  const courses = useQuery(api.courses.listAll);
  const deleteCourse = useMutation(api.courses.remove);
  const togglePublish = useMutation(api.courses.update);

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
          <div className="bg-card border-border w-full max-w-lg border p-8 shadow-2xl">
            <h3 className="font-display mb-4 text-2xl">New Course</h3>
            <p className="text-muted-foreground mb-6">
              Course creation is handled in the seed script or manually via the
              specialized editor. Please verify seed status.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setIsCreating(false)}
                className="border-border hover:bg-muted border px-4 py-2 font-mono text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
