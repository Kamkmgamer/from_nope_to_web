"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2, ArrowLeft, Plus, Trash, GripVertical } from "lucide-react";
import { type Id } from "@convex/_generated/dataModel";

export default function EditModulePage() {
  const params = useParams();
  const moduleId = params.moduleId as Id<"modules">; // We'll need to define this route with [moduleId]
  const courseSlug = params.courseSlug as string;
  const router = useRouter();

  const moduleData = useQuery(api.modules.get, { id: moduleId });
  const updateModule = useMutation(api.modules.update);
  const lessons = useQuery(api.lessons.listByModule, {
    moduleId: moduleId,
  });
  const createLesson = useMutation(api.lessons.create);
  const deleteLesson = useMutation(api.lessons.remove);

  const [saving, setSaving] = useState(false);
  const [isCreatingLesson, setIsCreatingLesson] = useState(false);

  if (moduleData === undefined || lessons === undefined) {
    return (
      <div>
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (moduleData === null) {
    return <div>Module not found</div>;
  }

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.currentTarget);

    try {
      await updateModule({
        id: moduleData._id,
        titleEn: formData.get("titleEn") as string,
        titleAr: formData.get("titleAr") as string,
        order: Number(formData.get("order")),
      });
      alert("Module updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to update module");
    } finally {
      setSaving(false);
    }
  };

  const handleCreateLesson = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const titleEn = formData.get("titleEn") as string;
    const slug = titleEn
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    try {
      await createLesson({
        moduleId: moduleData._id,
        titleEn,
        titleAr: (formData.get("titleAr") as string) || titleEn,
        slug: (formData.get("slug") as string) || slug,
        order: Number(formData.get("order")),
        contentEn: "# New Lesson\n\nWrite your content here...",
        contentAr: "# درس جديد\n\nأكتب المحتوى هنا...",
      });
      setIsCreatingLesson(false);
    } catch (err) {
      console.error(err);
      alert("Failed to create lesson");
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="hover:bg-muted rounded-full p-2"
        >
          <ArrowLeft className="size-5" />
        </button>
        <div>
          <span className="text-muted-foreground font-mono text-xs uppercase">
            Module Editor
          </span>
          <h2 className="font-display text-3xl">{moduleData.titleEn}</h2>
        </div>
      </div>

      <form
        onSubmit={handleUpdate}
        className="border-border grid grid-cols-1 gap-8 border-b pb-12 md:grid-cols-2"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title (English)</label>
            <input
              name="titleEn"
              defaultValue={moduleData.titleEn}
              className="bg-background border-border w-full border p-2"
            />
          </div>
        </div>
        <div className="space-y-4" dir="rtl">
          <div className="space-y-2">
            <label className="text-sm font-medium">العنوان (Arabic)</label>
            <input
              name="titleAr"
              defaultValue={moduleData.titleAr}
              className="bg-background border-border w-full border p-2"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Order</label>
          <input
            name="order"
            type="number"
            defaultValue={moduleData.order}
            className="bg-background border-border w-full border p-2"
          />
        </div>
        <div className="flex items-end justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-primary text-primary-foreground px-6 py-2 font-mono text-sm hover:opacity-90"
          >
            {saving ? "Saving..." : "Update Module Details"}
          </button>
        </div>
      </form>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-2xl">Lessons</h3>
          <button
            onClick={() => setIsCreatingLesson(true)}
            className="bg-secondary hover:bg-secondary/80 text-secondary-foreground flex items-center gap-2 px-4 py-2 font-mono text-xs tracking-wider uppercase"
          >
            <Plus className="size-4" /> Add Lesson
          </button>
        </div>

        <div className="border-border divide-border divide-y rounded-lg border">
          {lessons.map((lesson) => (
            <div
              key={lesson._id}
              className="bg-card hover:bg-muted/5 flex items-center justify-between p-4 transition-colors"
            >
              <div className="flex items-center gap-4">
                <GripVertical className="text-muted-foreground/30 size-5 cursor-move" />
                <div>
                  <div className="font-medium">{lesson.titleEn}</div>
                  <div className="text-muted-foreground font-mono text-xs">
                    /{lesson.slug}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`/admin/courses/${courseSlug}/lessons/${lesson._id}`}
                  className="hover:bg-muted hover:border-border border border-transparent p-2 font-mono text-sm"
                >
                  Edit Content
                </a>
                <button
                  onClick={async () => {
                    if (confirm("Delete lesson?"))
                      await deleteLesson({ id: lesson._id });
                  }}
                  className="hover:bg-destructive/10 text-destructive hover:border-destructive/20 border border-transparent p-2"
                >
                  <Trash className="size-4" />
                </button>
              </div>
            </div>
          ))}
          {lessons.length === 0 && (
            <div className="text-muted-foreground p-8 text-center font-mono text-sm">
              No lessons in this module yet.
            </div>
          )}
        </div>
      </div>
      {/* Create Lesson Modal */}
      {isCreatingLesson && (
        <div className="bg-background/80 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-card border-border w-full max-w-lg border p-8 shadow-2xl">
            <h3 className="font-display mb-4 text-2xl">New Lesson</h3>
            <form onSubmit={handleCreateLesson} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title (English)</label>
                <input
                  name="titleEn"
                  required
                  className="bg-background border-border w-full border p-2"
                />
              </div>
              <div className="space-y-2" dir="rtl">
                <label className="text-sm font-medium">العنوان (Arabic)</label>
                <input
                  name="titleAr"
                  className="bg-background border-border w-full border p-2"
                  placeholder="(Optional) Defaults to English"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Slug (Optional - Auto-generated)
                </label>
                <input
                  name="slug"
                  className="bg-background border-border w-full border p-2 font-mono text-xs"
                  placeholder="my-lesson-slug"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Order</label>
                <input
                  name="order"
                  type="number"
                  defaultValue={lessons.length + 1}
                  required
                  className="bg-background border-border w-full border p-2"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsCreatingLesson(false)}
                  className="border-border hover:bg-muted border px-4 py-2 font-mono text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground px-4 py-2 font-mono text-sm hover:opacity-90"
                >
                  Create Lesson
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
