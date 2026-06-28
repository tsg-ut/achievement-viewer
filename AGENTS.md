# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start development server
npm run build        # Build
npm run generate     # Generate static files (for GitHub Pages deployment)
npm run lint         # Biome lint check
npm run lint:fix     # Biome lint auto-fix
npm run typecheck    # Type check with vue-tsc
npm run test         # Playwright E2E tests
```

Always run lint and type check together: `npm run lint -- --fix && npx nuxi typecheck`

## Architecture Overview

### Framework & Configuration

- **Nuxt 4** (SSR disabled, SPA mode) + **Vue 3** + **TypeScript**
- Deployment target: GitHub Pages (static files generated with `npm run generate`)
- CSS framework: Bulma
- Linter: Biome (not ESLint). Single quotes, tab indentation

### Data Sources (2 systems)

**1. Firebase Firestore** (`app/lib/firebase.ts`, `app/lib/db.ts`)
- Firestore project: `tsg-slackbot`
- Stored data: achievement data (`achievement_data`), unlock records (`achievements`), user counters (`users`), dream fortune messages, slow quiz, 20-questions game

**2. External REST API** (`https://slackbot-api.tsg.ne.jp`)
- Slack user profiles (name, icon, etc.): `/slack/users`
- Topic messages: `/topic/topics`
- **Auth**: Uses cookies (`credentials: 'include'`). Returns 401 when unauthenticated, setting `isUnauthorized` state to `true`

### Vuex Store

Uses **Vuex 4** instead of Nuxt's default Pinia. Manually registered and typed in `app/plugins/vuex.ts`.

**Typing mechanism**: Getter types are defined in the `StoreGetters` interface, and `useStore()` returns a `TypedStore`. When adding new getters, update `StoreGetters` as well.

**Store modules** (`app/store/`):

| Module | Data Source | Role |
|---|---|---|
| `slackInfos` | REST API | Slack user profiles, topic messages |
| `achievements` | Firestore | Achievement unlock records (all or filtered by user/name) |
| `achievementData` | Firestore | Achievement definition data (title, conditions, difficulty, etc.) |
| `users` | Firestore | User counters (numeric achievement progress) |
| `achievementStatsByCategory/Difficulty/Month` | Firestore | Aggregated statistics |
| `oneiromancies` | Firestore | Dream fortune messages |
| `slowQuizGames` / `twentyQuestionsGames` | Firestore | Game records |

**Duplicate fetch prevention pattern**: Each store has an `isInitX` flag and returns early at the start of actions with `if (state.isInitX) return`. Most Firestore stores subscribe in real time using `onSnapshot`.

### SlackUser Dual Data Sources

The `SlackUser` type comes from two different stores:
- `slackInfos/getUser(id)` → returns profile information (name, icon image URL)
- `users/getById(id)` → returns **counter values** (numeric progress per achievement) from the Firestore `users` collection

Counter access uses dynamic keys `user[counterName]`, so `SlackUser` has an index signature `[counterName: string]: unknown`. When retrieving counter values, use a type guard `typeof val === 'number'` (see `getCounterValue` in `app/lib/utils.ts`).

### Common Utilities (`app/lib/utils.ts`)

- `getCategoryColor(category)` — returns the color corresponding to a category name
- `getUserName(user)` — generates a display name from `SlackUser | undefined`
- `getUserIcon(user)` / `getUserIcon2x(user)` / `getUserIcon3x(user)` — returns icon image URLs (falls back to default image when not loaded)

### Notes

- Counter display for unlocked achievements always shows the MAX value regardless of the stored data value (due to past migrations or bugs, unlocked achievements may have counter values below the threshold)
- `OneiromancyMessage.originalMessage` is an optional field because it may not exist in Firestore documents
- `achievementData/getById` returns `undefined` when not yet loaded. Use `?.` for safe access in templates
