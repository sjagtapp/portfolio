# Nakshtraa Jagtap — Portfolio

Freelance portfolio for a full stack web developer, written for clients.
Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4** and **Motion**.

Home page: Intro → Tech strip → Services → Work → Process → About → Contact. Separate `/pricing` page.
Deep-black theme with electric-blue glass and "vibe coding" effects: decoding name, typing code editor,
typewriter, cursor spotlight, scroll reveals, tilt cards and a tech marquee (`src/components/fx/`).
All movement switches off for visitors who set "reduce motion" on their device.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Where to edit content

Everything lives in `src/data/` — you never need to touch a component.

| File | What it holds |
| ---- | ------------- |
| `src/data/site.ts` | Name, title, pitch, email, phone/WhatsApp, location, stats, bio, social links |
| `src/data/services.ts` | Services (plain-language descriptions) and the "How we'll work together" steps |
| `src/data/projects.ts` | Client work: project name, client, type, description, live URL |
| `src/data/skills.ts` | Tech stack and the AI-assisted development card |
| `src/data/pricing.ts` | Pricing packages — while empty, /pricing shows "coming soon" + "Quote on request" |
| `src/data/navigation.ts` | Navbar / footer links |

Social links set to `"[ADD … URL]"` stay hidden until you replace them with a real URL.

## Images

- Photo → `public/images/profile.jpg`
- Project screenshots → `public/images/work/<slug>.jpg`

They're detected on the server and switch on automatically. See `public/images/README.md`.

## Contact form

The form posts to `src/app/api/contact/route.ts`. Until an email provider is connected
there, it hands the finished message to WhatsApp or the visitor's email app, so no
enquiry is lost. To send emails directly, follow the Resend example at the top of
`route.ts` and set `RESEND_API_KEY` and `CONTACT_TO` in `.env.local`.

## Deploy

Set `NEXT_PUBLIC_SITE_URL` to your domain (used for link previews, sitemap and robots),
then deploy to Vercel or any Node host.
