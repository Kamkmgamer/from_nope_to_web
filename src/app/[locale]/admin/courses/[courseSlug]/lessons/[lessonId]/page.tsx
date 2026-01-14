"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import { type Id } from "@convex/_generated/dataModel";

export default function EditLessonPage() {
  const params = useParams();
  const lessonId = params.lessonId as Id<"lessons">;
  const router = useRouter();

  const lesson = useQuery(api.lessons.get, { id: lessonId });
  const updateLesson = useMutation(api.lessons.update);

  const [saving, setSaving] = useState(false);

  if (lesson === undefined) {
    return (
      <div>
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (lesson === null) {
    return <div>Lesson not found</div>;
  }

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.currentTarget);

    try {
      await updateLesson({
        id: lesson._id,
        titleEn: formData.get("titleEn") as string,
        titleAr: formData.get("titleAr") as string,
        slug: formData.get("slug") as string,
        contentEn: formData.get("contentEn") as string,
        contentAr: formData.get("contentAr") as string,
        estimatedMinutes: Number(formData.get("estimatedMinutes")),
        isPublished: formData.get("isPublished") === "on",
        videoUrl: formData.get("videoUrl") as string,
        order: Number(formData.get("order")),
      });
      alert("Lesson updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to update lesson");
    } finally {
      setSaving(false);
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
            Lesson Editor
          </span>
          <h2 className="font-display text-3xl">{lesson.titleEn}</h2>
        </div>
      </div>

      <form
        onSubmit={handleUpdate}
        className="border-border grid grid-cols-1 gap-8 border-b pb-12 md:grid-cols-2"
      >
        {/* English Content */}
        <div className="space-y-4">
          <h3 className="text-primary font-mono text-sm uppercase">
            English Content
          </h3>
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <input
              name="titleEn"
              defaultValue={lesson.titleEn}
              className="bg-background border-border w-full border p-2"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Content (Markdown)</label>
            <textarea
              name="contentEn"
              defaultValue={lesson.contentEn}
              rows={20}
              className="bg-background border-border w-full border p-4 font-mono text-sm leading-relaxed"
            />
          </div>
        </div>

        {/* Arabic Content */}
        <div className="space-y-4" dir="rtl">
          <h3 className="text-primary font-mono text-sm uppercase" dir="ltr">
            Arabic Content
          </h3>
          <div className="space-y-2">
            <label className="text-sm font-medium">العنوان</label>
            <input
              name="titleAr"
              defaultValue={lesson.titleAr}
              className="bg-background border-border w-full border p-2"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">المحتوى (Markdown)</label>
            <textarea
              name="contentAr"
              defaultValue={lesson.contentAr}
              rows={20}
              className="bg-background border-border w-full border p-4 font-mono text-sm leading-relaxed"
            />
          </div>
        </div>

        {/* Meta Settings */}
        <div className="border-border grid grid-cols-1 gap-8 border-t pt-8 md:col-span-2 md:grid-cols-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Slug (URL)</label>
            <input
              name="slug"
              defaultValue={lesson.slug}
              className="bg-background border-border w-full border p-2 font-mono text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Order</label>
            <input
              name="order"
              type="number"
              defaultValue={lesson.order}
              className="bg-background border-border w-full border p-2"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Estimate (Minutes)</label>
            <input
              name="estimatedMinutes"
              type="number"
              defaultValue={lesson.estimatedMinutes}
              className="bg-background border-border w-full border p-2"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Video URL (Optional)</label>
            <input
              name="videoUrl"
              defaultValue={lesson.videoUrl}
              className="bg-background border-border w-full border p-2"
            />
          </div>
          <div className="flex items-center gap-2 pt-8">
            <input
              type="checkbox"
              name="isPublished"
              defaultChecked={lesson.isPublished}
              className="size-4"
              id="pub"
            />
            <label htmlFor="pub" className="text-sm font-medium">
              Is Published?
            </label>
          </div>
        </div>

        <div className="flex justify-end md:col-span-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-primary text-primary-foreground flex items-center gap-2 px-8 py-3 font-mono hover:opacity-90"
          >
            {saving ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Save className="size-4" />
            )}
            Save Lesson
          </button>
        </div>
      </form>
    </div>
  );
}
