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
  const [isCreatingModule, setIsCreatingModule] = useState(false);

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

  const handleCreateModule = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      await createModule({
        courseId: course._id,
        titleEn: formData.get("titleEn") as string,
        titleAr: formData.get("titleAr") as string,
        order: Number(formData.get("order")),
        // descriptions are optional in the schema, can add if needed but titles are minimum
      });
      setIsCreatingModule(false);
    } catch (err) {
      console.error(err);
      alert("Failed to create module");
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
            onClick={() => setIsCreatingModule(true)}
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
      {/* Create Module Modal */}
      {isCreatingModule && (
        <div className="bg-background/80 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-card border-border w-full max-w-lg border p-8 shadow-2xl">
            <h3 className="font-display mb-4 text-2xl">New Module</h3>
            <form onSubmit={handleCreateModule} className="space-y-4">
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
                  required
                  className="bg-background border-border w-full border p-2"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Order</label>
                <input
                  name="order"
                  type="number"
                  defaultValue={modules.length + 1}
                  required
                  className="bg-background border-border w-full border p-2"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsCreatingModule(false)}
                  className="border-border hover:bg-muted border px-4 py-2 font-mono text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground px-4 py-2 font-mono text-sm hover:opacity-90"
                >
                  Create Module
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
