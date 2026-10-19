"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Mail, Phone, Send } from "lucide-react";
import { monthNames, treks } from "@/data/content";
import { site, telHref } from "@/data/site";
import { ChapterHead, Postmark, ease } from "./ui";
import { Select } from "./Select";

const trekOptions = [...treks.map((t) => t.name), "Char Dham Yatra", "Help me choose"].map((v) => ({ value: v, label: v }));
const monthOptions = [...monthNames, "Not sure yet"].map((v) => ({ value: v, label: v }));

const line =
  "w-full border-b-2 border-ink/20 bg-transparent px-1 pb-2 pt-3 text-lg outline-none transition placeholder:text-graphite/70 focus:border-vermilion";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [trek, setTrek] = useState("");
  const [month, setMonth] = useState("");

  // Frontend only: connect this to your CRM or email API
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="paper contours relative overflow-hidden bg-paper-2/60 py-24 sm:py-32">
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <ChapterHead
          n="11"
          id="contact-title"
          align="center"
          title={
            <>
              Send us a <em className="italic text-forest">postcard</em>
            </>
          }
          lede="Tell us when you're free and which trail caught your eye. A trek expert will call you back with dates, batch sizes and a free fitness plan."
        />

        <motion.div
          initial={{ opacity: 0, y: 50, rotate: 2 }}
          whileInView={{ opacity: 1, y: 0, rotate: -0.6 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          className="relative mt-14 overflow-hidden rounded-sm bg-card shadow-[0_40px_80px_-40px_rgb(28_26_22/0.6)] ring-1 ring-ink/5"
        >
          {/* Airmail border */}
          <div
            className="h-2.5 w-full"
            aria-hidden="true"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, var(--color-vermilion) 0 14px, transparent 14px 28px, var(--color-pencil) 28px 42px, transparent 42px 56px)",
            }}
          />
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative flex min-h-[28rem] flex-col items-center justify-center p-10 text-center"
                role="status"
              >
                <motion.div
                  initial={{ scale: 2.4, rotate: -40, opacity: 0 }}
                  animate={{ scale: 1, rotate: -12, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 14 }}
                >
                  <Postmark top="Posted" bottom={site.address.locality} center="✓ SENT" className="size-40" />
                </motion.div>
                <p className="mt-6 font-display text-4xl">Namaste! Your postcard is on its way.</p>
                <p className="mt-2 max-w-md text-graphite">We usually call back the same day, between 9 am and 8 pm IST.</p>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} exit={{ opacity: 0, y: -10 }} className="grid md:grid-cols-[1fr_auto_1fr]">
                {/* Message side */}
                <div className="p-6 sm:p-10">
                  <p className="font-hand text-2xl text-vermilion">Dear {site.name},</p>
                  <label className="mt-2 block">
                    <span className="sr-only">Message</span>
                    <textarea
                      name="message"
                      rows={7}
                      placeholder="I'd love to trek in… My experience so far is… I have questions about…"
                      className="lined w-full resize-none bg-transparent font-hand text-2xl leading-8 outline-none placeholder:text-graphite/60"
                    />
                  </label>
                  <div className="mt-6 space-y-3 text-sm">
                    {site.phones.map((p) => (
                      <a key={p} href={telHref(p)} className="flex items-center gap-3 font-semibold hover:text-vermilion">
                        <Phone className="size-4 text-forest" aria-hidden="true" />
                        {p}
                      </a>
                    ))}
                    <a href={`mailto:${site.email}`} className="flex items-center gap-3 font-semibold hover:text-vermilion">
                      <Mail className="size-4 text-forest" aria-hidden="true" />
                      {site.email}
                    </a>
                  </div>
                </div>

                <span className="mx-6 h-px bg-ink/15 md:mx-0 md:my-10 md:h-auto md:w-px" aria-hidden="true" />

                {/* Address side */}
                <div className="relative p-6 sm:p-10">
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <Postmark top={site.address.locality} bottom="Uttarakhand" center="26–27" className="size-24 -rotate-12 opacity-80" color="var(--color-pencil)" />
                    <div className="perforated rotate-3 bg-forest text-card">
                      <div className="grid h-24 w-20 place-items-center border border-dashed border-card/50 text-center">
                        <span className="font-display text-lg leading-tight">
                          Dev
                          <br />
                          bhoomi
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <label>
                      <span className="sr-only">Your name</span>
                      <input required name="name" autoComplete="name" placeholder="Your name" className={line} />
                    </label>
                    <label>
                      <span className="sr-only">Phone or WhatsApp</span>
                      <input required name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="Phone / WhatsApp" className={line} />
                    </label>
                    <label>
                      <span className="sr-only">Email</span>
                      <input name="email" type="email" autoComplete="email" placeholder="Email (optional)" className={line} />
                    </label>
                    <div className="grid gap-2 sm:grid-cols-2 sm:gap-6">
                      <Select name="trek" label="Trek" placeholder="Which trek?" value={trek} onChange={setTrek} options={trekOptions} />
                      <Select name="month" label="Month" placeholder="When?" value={month} onChange={setMonth} options={monthOptions} />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="group mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-vermilion py-4 font-semibold text-card transition hover:bg-ink"
                  >
                    Post it
                    <Send className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-1" aria-hidden="true" />
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
