# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: Tech recruiters at companies scanning many portfolios under time pressure — they need to form a strong impression quickly and have a clear path to reach out or grab the resume.

Secondary: Freelance clients evaluating fit for a project — they care more about communication style, reliability, and the breadth of skills than raw prestige.

Both audiences arrive with limited attention. They need to leave with a feeling ("this person is solid, I want to talk to them") and an easy action (email, LinkedIn, resume download).

## Product Purpose

Personal portfolio for Stefanos Michelakis, a Frontend / React Native engineer with ~5 years of experience. The site exists to convert first impressions into conversations — job interviews, freelance inquiries, or collaborations. Success is a visitor clicking "get in touch" or downloading the resume and moving it forward.

## Positioning

A senior React Native specialist who ships real mobile products end to end, with web React as a strong second. The mobile depth (currently Senior React Native Developer at Base Element, an offline-first React Native app as the lead project) is the claim a generic React web portfolio could not truthfully make.

## Operating Context

Visitors mostly arrive by clicking the site link on Stefanos's CV, LinkedIn profile or a job application. They are already partway through evaluating him and use the site to confirm and deepen the impression from the CV, then act: email, LinkedIn or the resume PDF.

## Capabilities and Constraints

- Single-page site: header, hero with work-experience timeline, selected work, about (skills, education), contact, footer.
- Light and dark themes; follows the OS until the visitor chooses, choice persisted.
- Contact is by mailto links (no form, no backend). LinkedIn and GitHub linked from the footer.
- Stack: React 19, TypeScript, Vite, Tailwind CSS v4. Static build.

## Brand Commitments

Personality: polished, warm, bold.

- Polished: refined craft, intentional spacing, details that say "I sweat the small stuff" — the same quality signal the engineer brings to code.
- Warm: approachable, direct, human — not a company brochure; a person talking to another person.
- Bold: a strong visual presence that makes a statement without shouting; stands out in a stack of gray-900 portfolios.

Voice: confident and specific, not self-promotional. First person, no buzzwords, no "I am passionate about creating scalable solutions." Say what you actually did.

## Anti-references

- Generic Bootstrap / template-look: the 2015-era portfolio with a centered name, three-column cards, and a skills progress bar. Unmemorable, signals no design investment.
- Corporate / stiff: reads like a company landing page — formal, distant, no personality. A recruiter should feel like they're meeting a person, not reviewing a vendor.
- Bland dark SaaS: gray-900 base + blue-500 accent, the training-data default.

## Evidence on Hand

- Work history: four roles, 2021 to now (Flarmio, Valmore Technologies, Kanellis Development Labs, Base Element), in `src/components/sections/Hero.tsx`.
- Projects with source on GitHub (github.com/Steven404):
  - Offline Notes App (React Native): light and dark screenshots, `public/images/notes-{light,dark}-{1-4}.webp`.
  - 2D Platformer (Unity, C#, hand-drawn pixel art): gameplay video and poster, `public/images/platformer.mp4`, `public/images/platformer-poster.webp`.
  - Language Teacher Portfolio (Next.js): homepage screenshot, `public/images/language-teacher.webp`.
- Resume PDF: `public/stefanos-michelakis-cv-english.pdf`.
- Education: Computer Engineering (TEI of Eastern Macedonia and Thrace, Kavala); Michigan Certificate of Proficiency in English (C2).
- Testimonials: real quotes from colleagues or clients exist but are not in the repo yet. Use only quotes Stefanos supplies, verbatim, with attribution he approves.
- Not available, never fabricate: client or employer project showcases, product metrics, company logos, store links.

## Product Principles

1. **Craft is the argument.** The portfolio's own quality is evidence of the work quality. Every spacing decision, every type choice, every interaction is part of the case.
2. **Lead with mobile depth.** React Native experience is the differentiator; it should be the first thing a recruiter coming from the CV has confirmed.
3. **Personal, not promotional.** Speak as a person, not a pitch deck. Specific details ("React Native apps with offline-first UX") beat category claims ("passionate frontend engineer").
4. **Invite, don't obstruct.** The path from landing to contacting should be obvious. Reduce friction; every section should end with a clear next step or a natural pull downward.
5. **Stand out by committing.** Safe and average is invisible. A strong visual identity — even if it risks a little strangeness — is better than forgettable restraint.
6. **Motion serves, never performs.** Subtle entrance animations are fine. Motion should make the site feel alive, not like it's showing off.

## Accessibility & Inclusion

No specific WCAG level required. Target: fully readable and keyboard-navigable. Body text must meet 4.5:1 contrast against backgrounds. Respect `prefers-reduced-motion`. Screen-reader-friendly link labels and ARIA where needed.
