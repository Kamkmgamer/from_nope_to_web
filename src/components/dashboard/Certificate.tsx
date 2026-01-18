"use client";

import { useState, useRef } from "react";
import { useLocale } from "next-intl";
import { Download, Loader2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

interface CertificateProps {
  userName: string;
  courseTitleEn: string;
  courseTitleAr: string;
  completedAt: Date;
}

function CertificateContent({
  userName,
  courseTitleEn,
  courseTitleAr,
  dateFormatted,
  isPrintVersion = false,
}: {
  userName: string;
  courseTitleEn: string;
  courseTitleAr: string;
  dateFormatted: string;
  isPrintVersion?: boolean;
}) {
  return (
    <div
      className={`relative mx-auto flex flex-col items-center justify-center overflow-hidden bg-white text-black dark:bg-[#fdfbf6] dark:text-black ${
        !isPrintVersion
          ? "group w-full max-w-4xl rounded-xl shadow-2xl transition-all hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]"
          : "h-full w-full rounded-none shadow-none"
      }`}
      style={
        isPrintVersion
          ? {
              width: "297mm",
              height: "210mm",
              // Force white background for the image capture
              backgroundColor: "#ffffff",
            }
          : {}
      }
    >
      {/* Decorative Border */}
      <div className="border-16px] pointer-events-none absolute inset-0 z-0 rotate-180 border-double border-[rgba(26,35,51,0.1)] p-2" />
      <div className="pointer-events-none absolute inset-3 z-0 border-2 border-[rgba(26,35,51,0.2)]" />

      {/* Corner Ornaments */}
      <div className="absolute top-0 left-0 z-0 h-24 w-24 bg-[radial-gradient(circle_at_top_left,#D4AF37_0%,transparent_70%)] opacity-20" />
      <div className="absolute top-0 right-0 z-0 h-24 w-24 bg-[radial-gradient(circle_at_top_right,#D4AF37_0%,transparent_70%)] opacity-20" />
      <div className="absolute bottom-0 left-0 z-0 h-24 w-24 bg-[radial-gradient(circle_at_bottom_left,#D4AF37_0%,transparent_70%)] opacity-20" />
      <div className="absolute right-0 bottom-0 z-0 h-24 w-24 bg-[radial-gradient(circle_at_bottom_right,#D4AF37_0%,transparent_70%)] opacity-20" />

      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center p-12 text-center md:p-16">
        <h1 className="font-serif text-4xl font-bold tracking-widest text-[#1a2333] uppercase md:text-5xl">
          Certificate of Completion
        </h1>
        <h2
          className="font-display mt-2 text-2xl text-[#D4AF37] md:text-3xl"
          dir="rtl"
        >
          شهادة إتمام
        </h2>

        <div className="my-6 h-px w-32 bg-[#d1d5db]" />

        <p className="font-serif text-lg text-[#4b5563] italic">
          This is to certify that
        </p>
        <p className="font-display mt-1 text-lg text-[#4b5563]" dir="rtl">
          تشهد هذه الوثيقة بأن
        </p>

        {/* Name with simple border-bottom */}
        <div className="my-4 w-full max-w-2xl px-8">
          <h3 className="font-display border-b-2 border-[#1a2333] pb-2 text-3xl font-bold text-[#1a2333] md:text-5xl">
            {userName}
          </h3>
        </div>

        <p className="font-serif text-lg text-[#4b5563] italic">
          has successfully completed the course
        </p>
        <p className="font-display mt-1 text-lg text-[#4b5563]" dir="rtl">
          قد أتم بنجاح دورة
        </p>

        {/* Course Title */}
        <div className="my-6 w-full space-y-2">
          <h4 className="font-display text-2xl font-bold text-[#D4AF37] md:text-4xl">
            {courseTitleEn}
          </h4>
          <h4
            className="font-display text-2xl font-bold text-[#D4AF37] md:text-3xl"
            dir="rtl"
          >
            {courseTitleAr}
          </h4>
        </div>

        {/* Footer */}
        <div className="mt-8 flex w-full flex-col items-center justify-between gap-8 md:flex-row md:px-12">
          {/* Date */}
          <div className="text-center md:text-left">
            <div className="mb-2 h-px w-32 bg-[#9ca3af]" />
            <p className="font-serif text-sm font-semibold tracking-wider text-[#6b7280] uppercase">
              Date
            </p>
            <p className="font-mono text-sm text-[#1a2333]">{dateFormatted}</p>
          </div>

          {/* Seal */}
          <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full border-4 border-double border-[#D4AF37] bg-white shadow-inner">
            <div className="absolute inset-1 rounded-full border border-[#D4AF37] opacity-50" />
            <div className="text-center">
              <div className="font-serif text-[10px] font-bold tracking-widest text-[#D4AF37] uppercase">
                Official
              </div>
              <div className="font-serif text-[8px] tracking-widest text-[#1a2333] uppercase">
                Certification
              </div>
            </div>
          </div>

          {/* Signature Placeholder */}
          <div className="text-center md:text-right">
            <div className="mb-2 h-px w-40 bg-[#9ca3af]" />
            <p className="font-serif text-sm font-semibold tracking-wider text-[#6b7280] uppercase">
              Instructor
            </p>
            <p className="font-mono text-sm text-[#1a2333]">From Nope to Web</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Certificate({
  userName,
  courseTitleEn,
  courseTitleAr,
  completedAt,
}: CertificateProps) {
  const locale = useLocale();
  const [isDownloading, setIsDownloading] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);

  // Format date
  const dateFormatted = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(completedAt);

  const contentProps = {
    userName,
    courseTitleEn,
    courseTitleAr,
    dateFormatted,
  };

  const handleDownload = async () => {
    if (!pdfRef.current) return;
    setIsDownloading(true);

    try {
      // 1. Generate PNG from DOM
      const dataUrl = await toPng(pdfRef.current, {
        cacheBust: true,
        pixelRatio: 2, // High resolution
        backgroundColor: "#ffffff",
        skipFonts: true, // Prevent font loading errors
      });

      // 2. Add to PDF
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = 297;
      const pdfHeight = 210;

      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("certificate.pdf");
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <div className="group relative">
        <CertificateContent {...contentProps} />

        {/* Action Overlay */}
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-[rgba(0,0,0,0.6)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Button
            variant="default"
            size="lg"
            className="gap-2 bg-white text-black hover:bg-[#e5e7eb]"
            onClick={handleDownload}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Download className="h-5 w-5" />
            )}
            {isDownloading ? "Generating PDF..." : "Download Certificate"}
          </Button>
        </div>
      </div>

      {/* Off-screen render target for high-quality PDF generation */}
      {/* Opacity 0 makes it invisible but rendered. z-[-1] puts it behind. */}
      {/* We need it 'fixed' to ensure it doesn't mess up layout value, but 'top: 0' ensures it's in viewport if needed for capture */}
      <div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: -1,
          opacity: 0,
          width: "297mm",
          height: "210mm",
          pointerEvents: "none",
        }}
      >
        <div ref={pdfRef}>
          <CertificateContent isPrintVersion={true} {...contentProps} />
        </div>
      </div>
    </>
  );
}
