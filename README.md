# VolunTrack Melbourne

VolunTrack Melbourne is a responsive MVP website for Startup Sprint. It helps international students discover, filter, compare, and save volunteering opportunities in Melbourne.

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Local JSON data in `src/data/opportunities.json`
- `localStorage` saved list

## Local Development

```bash
corepack enable
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Production Build

```bash
pnpm build
pnpm start
```

## Deploy To Vercel

1. Push this folder to a GitHub repository.
2. Import the repository in Vercel.
3. Use the default Next.js framework settings.
4. Build command: `pnpm build`
5. Output directory: leave empty for Next.js.

## Future Extensions

- Email reminders for upcoming openings and closing deadlines.
- User accounts with synced saved lists.
- Student reviews and application experience notes.
- Partner organisation submissions.
- Semi-automated opportunity aggregation with human review before publishing.
