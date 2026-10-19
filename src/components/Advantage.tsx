import Image from "next/image";
import { advantages, pillars } from "@/data/content";
import { Counter, Reveal, SectionHeading } from "./ui";

export function Advantage() {
  return (
    <section aria-labelledby="advantage-title" className="grain relative bg-snow py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            id="advantage-title"
            eyebrow="The Trekking Compass advantage"
            title="Mountains are wild."
            accent="Your trek shouldn't be."
            description="We're a Dehradun-born team of mountaineers, guides and people from the very villages you'll walk through. Here's what that means on the trail."
          />
          <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10">
            {advantages.map((a, i) => (
              <Reveal key={a.label} delay={i * 0.08}>
                <dt className="text-sm font-semibold text-ink">{a.label}</dt>
                <dd>
                  <Counter to={a.value} suffix={a.suffix} className="mt-1 block font-display text-5xl text-saffron sm:text-6xl" />
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/65">{a.detail}</p>
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>

        <div className="relative">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem]">
            <Image
              src="/images/roopkund.jpg"
              alt="Trekkers with backpacks walking across a high Himalayan meadow on the Roopkund trail"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent" />
          </Reveal>
          <ul className="relative -mt-40 space-y-3 px-4 sm:px-8">
            {pillars.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.08} className="rounded-2xl bg-snow/95 p-5 shadow-xl shadow-ink/10 ring-1 ring-ink/5 backdrop-blur">
                <h3 className="font-display text-xl text-ink">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-charcoal/70">{p.copy}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
