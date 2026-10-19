import type { Pace } from "@/data/content";

/** The hero's journey finder talks to the trek list and the enquiry form through window events */
export const FINDER_EVENT = "yatra-finder";

export type Journey = "char-dham" | "do-dham" | "pilgrim-trek" | "himalayan-trek";

export type FinderDetail = {
  journey: Journey;
  /** 0 = any month */
  month: number;
  pace: Pace | "any";
};

export const journeyLabels: Record<Journey, string> = {
  "char-dham": "Char Dham Yatra",
  "do-dham": "Do Dham: Kedarnath & Badrinath",
  "pilgrim-trek": "Pilgrimage trek",
  "himalayan-trek": "Himalayan trek",
};

export function sendFinder(detail: FinderDetail) {
  window.dispatchEvent(new CustomEvent<FinderDetail>(FINDER_EVENT, { detail }));
}

/** "Enquire" buttons pre-fill the enquiry form with a trek */
export const ENQUIRE_EVENT = "yatra-enquire";

export function sendEnquire(trek: string) {
  window.dispatchEvent(new CustomEvent<string>(ENQUIRE_EVENT, { detail: trek }));
}
