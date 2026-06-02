import { useRef, useState } from "react";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { supabase } from "@/lib/supabase";

import { usePageMeta } from "@/lib/use-page-meta";

type Status = "idle" | "submitting" | "success" | "error";

function Page() {
  usePageMeta("Contact Us — Bright Vision Law College", "Reach BVC at Samjhana Chowk, Biratnagar-06, Morang, Koshi, Nepal.");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value.trim() || null,
      programme: (form.elements.namedItem("programme") as HTMLInputElement).value.trim() || null,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim(),
    };

    const { error } = await supabase.from("contact_submissions").insert(data);

    if (error) {
      setErrorMsg(error.message);
      setStatus("error");
    } else {
      setStatus("success");
      formRef.current?.reset();
    }
  }

  return (
    <SiteLayout>
      <PageHero eyebrow="Get in Touch" title="Contact Us" subtitle="Admissions enquiries, partnerships, and general correspondence." />
      <section className="px-4 py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl font-bold text-navy">Visit the Campus</h2>
            <p className="mt-3 text-muted-foreground">We welcome prospective students and parents for guided campus tours.</p>
            <div className="mt-8 space-y-5">
              {[
                { Icon: MapPin, label: "Address", value: "Samjhana Chowk, Biratnagar-06, Morang, Koshi, Nepal" },
                { Icon: Phone, label: "Phone", value: "+977-21-503051 · +977-21-503407" },
                { Icon: Mail, label: "Email", value: "info@brightvisionlaw.edu.np" },
                { Icon: Clock, label: "Office Hours", value: "Sun – Fri · 9:00 AM – 5:00 PM" },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-primary/10 text-primary">
                    <c.Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold tracking-widest text-muted-foreground uppercase">{c.label}</div>
                    <div className="mt-0.5 text-sm font-medium text-navy">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="rounded-md border border-border bg-card p-8 shadow-sm"
          >
            <h3 className="font-serif text-2xl font-bold text-navy">Send a Message</h3>
            <p className="mt-1 text-sm text-muted-foreground">Our office responds within two working days.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Full Name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Phone" name="phone" />
              <Field label="Programme of Interest" name="programme" placeholder="B.A.LL.B / LL.M" />
            </div>
            <div className="mt-4">
              <label htmlFor="message" className="block text-xs font-bold tracking-widest text-muted-foreground uppercase">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="mt-1.5 w-full rounded-sm border border-input bg-background px-3.5 py-2.5 text-sm transition focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </div>

            {/* Error message */}
            {status === "error" && (
              <p className="mt-3 rounded-sm bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {errorMsg || "Something went wrong. Please try again."}
              </p>
            )}

            {/* Success message */}
            {status === "success" && (
              <p className="mt-3 rounded-sm bg-green-50 px-3 py-2 text-sm text-green-700">
                Message received — our office will respond within two working days.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-6 inline-flex w-full items-center justify-center rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-navy disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? "Sending…" : "Submit Enquiry"}
            </button>
          </form>
        </div>
      </section>

      {/* Map */}
      <div className="relative h-72 w-full overflow-hidden border-y border-border bg-[#0a1f3a]">
        <iframe
          title="BVC Location Map"
          src="https://www.openstreetmap.org/export/embed.html?bbox=87.27%2C26.46%2C87.30%2C26.49&amp;layer=mapnik&amp;marker=26.475,87.285"
          className="h-full w-full opacity-90"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-navy/30" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-lg">
          BVC Campus · Samjhana Chowk, Biratnagar
        </div>
      </div>
    </SiteLayout>
  );
}

function Field({ label, name, type = "text", required, placeholder }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs font-bold tracking-widest text-muted-foreground uppercase">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-sm border border-input bg-background px-3.5 py-2.5 text-sm transition focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
      />
    </div>
  );
}

export default Page;
