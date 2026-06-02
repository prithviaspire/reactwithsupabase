import { ContentPage } from "@/components/site/ContentPage";
import { Calendar, FileText } from "lucide-react";

import { usePageMeta } from "@/lib/use-page-meta";

const BASE = "https://hiejrdhxzwrmnalhbegt.supabase.co/storage/v1/object/public/college_assets";

const NOTICES = [
  { date: "Aug 15, 2026", tag: "Admission", title: "B.A.LL.B Integrated — Entrance Exam Registration Closing", url: `${BASE}/ballb_entrance_registration_2026.pdf` },
  { date: "Sep 02, 2026", tag: "Exam", title: "LL.M Entrance Examination — Hall Ticket Available", url: `${BASE}/llm_entrance_hall_ticket.pdf` },
  { date: "Sep 18, 2026", tag: "Calendar", title: "Academic Calendar 2026-27 Released", url: `${BASE}/academic_calendar_2026_27.pdf` },
  { date: "Oct 12, 2026", tag: "Event", title: "12th National Inter-College Moot Court Competition", url: `${BASE}/moot_court_invitation_brochure.pdf` },
  { date: "Nov 04, 2026", tag: "Result", title: "Semester V Mid-Term Results Published", url: null },
  { date: "Dec 20, 2026", tag: "Holiday", title: "Winter Break Notification (Dec 25 – Jan 7)", url: null },
];

function Page() {
  usePageMeta("Notice Board — Bright Vision Law College", "Official notices, entrance exam schedules, and downloadable forms from BVC.");
  return (
    <ContentPage eyebrow="Registrar" title="Notice Board" subtitle="All official communications from the BVC administration.">
      <div className="overflow-hidden rounded-md border border-border bg-card">
        {NOTICES.map((n, i) => (
          <div key={i} className={`flex flex-col gap-4 px-6 py-5 transition hover:bg-surface md:flex-row md:items-center ${i !== NOTICES.length - 1 ? "border-b border-border" : ""}`}>
            <div className="flex items-center gap-3 md:w-44 md:shrink-0">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-navy">{n.date}</span>
            </div>
            <div className="md:w-24">
              <span className="inline-flex rounded-sm bg-primary/10 px-2.5 py-1 text-[10px] font-bold tracking-wider text-primary uppercase">{n.tag}</span>
            </div>
            <div className="flex-1 text-sm font-medium text-navy">{n.title}</div>
            {n.url ? (
              <a
                href={n.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
              >
                <FileText className="h-3.5 w-3.5" />
                Download
              </a>
            ) : (
              <span className="text-xs text-muted-foreground">—</span>
            )}
          </div>
        ))}
      </div>
    </ContentPage>
  );
}

export default Page;
