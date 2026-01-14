"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2, Save, ArrowLeft, Plus } from "lucide-react";

export default function EditCoursePage() {
  const params = useParams();
  const slug = params.courseSlug as string;
  const router = useRouter();

  const course = useQuery(api.courses.getBySlug, { slug });
  const updateCourse = useMutation(api.courses.update);

  // Modules for this course
  const modules = useQuery(
    api.modules.list,
    course ? { courseId: course._id } : "skip",
  );
  const createModule = useMutation(api.modules.create);

  const [saving, setSaving] = useState(false);

  // We could use react-hook-form properly here, but for brevity using simple state binding to the query result
  // In a real production app, we would initialize form state with useEffect when 'course' loads.

  if (course === undefined || modules === undefined) {
    return (
      <div>
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (course === null) {
    return <div>Course not found</div>;
  }

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.currentTarget);

    try {
      await updateCourse({
        id: course._id,
        titleEn: formData.get("titleEn") as string,
        titleAr: formData.get("titleAr") as string,
        descriptionEn: formData.get("descriptionEn") as string,
        descriptionAr: formData.get("descriptionAr") as string,
        slug: formData.get("slug") as string,
        order: Number(formData.get("order")),
        isPublished: formData.get("isPublished") === "on",
      });
      alert("Saved!");
    } catch (err) {
      console.error(err);
      alert("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleCreateModule = async () => {
    const titleEn = prompt("Module Title (English):");
    if (!titleEn) return;
    const titleAr = prompt("Module Title (Arabic):");
    if (!titleAr) return;

    await createModule({
      courseId: course._id,
      titleEn,
      titleAr,
      order: modules.length + 1,
    });
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
          <h2 className="font-display text-3xl">{course.titleEn}</h2>
          <p className="text-muted-foreground font-mono text-sm">
            {course._id}
          </p>
        </div>
      </div>

      <form
        onSubmit={handleUpdate}
        className="border-border grid grid-cols-1 gap-8 border-b pb-12 md:grid-cols-2"
      >
        <div className="space-y-4">
          <h3 className="text-primary font-mono text-sm uppercase">
            English Details
          </h3>
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <input
              name="titleEn"
              defaultValue={course.titleEn}
              className="bg-background border-border w-full border p-2"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <textarea
              name="descriptionEn"
              defaultValue={course.descriptionEn}
              rows={4}
              className="bg-background border-border w-full border p-2"
            />
          </div>
        </div>

        <div className="space-y-4" dir="rtl">
          <h3 className="text-primary font-mono text-sm uppercase" dir="ltr">
            Arabic Details
          </h3>
          <div className="space-y-2">
            <label className="text-sm font-medium">العنوان</label>
            <input
              name="titleAr"
              defaultValue={course.titleAr}
              className="bg-background border-border w-full border p-2"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">الوصف</label>
            <textarea
              name="descriptionAr"
              defaultValue={course.descriptionAr}
              rows={4}
              className="bg-background border-border w-full border p-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:col-span-2 md:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-medium">Slug (URL)</label>
            <input
              name="slug"
              defaultValue={course.slug}
              className="bg-background border-border w-full border p-2 font-mono text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Order</label>
            <input
              name="order"
              type="number"
              defaultValue={course.order}
              className="bg-background border-border w-full border p-2"
            />
          </div>
          <div className="flex items-center gap-2 pt-8">
            <input
              type="checkbox"
              name="isPublished"
              defaultChecked={course.isPublished}
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
            Save Changes
          </button>
        </div>
      </form>

      {/* Modules Section */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-display text-2xl">Modules</h3>
          <button
            onClick={handleCreateModule}
            type="button"
            className="border-border hover:bg-muted flex items-center gap-2 border px-4 py-2 font-mono text-xs tracking-wider uppercase"
          >
            <Plus className="size-4" /> Add Module
          </button>
        </div>

        <div className="space-y-4">
          {modules.map((module) => (
            <div key={module._id} className="border-border bg-card border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-medium">{module.titleEn}</h4>
                  <p className="text-muted-foreground font-arabic text-sm">
                    {module.titleAr}
                  </p>
                </div>
                <a
                  href={`/admin/courses/${slug}/modules/${module._id}`}
                  className="text-primary font-mono text-sm hover:underline"
                >
                  Manage Lessons &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
