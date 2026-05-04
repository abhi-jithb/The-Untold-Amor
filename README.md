<div align="center">
  
# The Untold Amor 🌌

*A quiet digital sanctuary for words that were felt but never sent.*

[Features](#features) • [Tech Stack](#tech-stack) • [Installation](#installation) • [Keys & Setup](#keys--setup) • [Deployment](#deployment)

</div>

---

## 🕊️ Soul of the Product

**The Untold Amor** is not a social app. It is a private, sacred space.
Users write letters to someone they once loved — or still do — but never sent. The act of writing *is* the release. There is no audience, no reply, no algorithm. Just honesty and breath.

- **Expression without fear.**
- **Release without expectation.**
- **Closure through vulnerability.**

---

## ✨ Features

- **Sensory UI:** Immersive, clean, and distraction-free writing screen with a dark, slowly-drifting star background.
- **Deep Intent Animation:** Sealing the letter invokes a deliberate, precious folding animation modeled after an exhale.
- **Save or Release:** Choose to keep a letter private (saved to your device securely) or release it to the "Whisper Wall" anonymously.
- **Gentle AI Refinement:** An opt-in, invisible AI (powered by Groq) that gently clarifies your words while strictly preserving your emotional tone.
- **Whisper Wall:** Find other anonymous feelings without likes, comments, profiles, or gamification. Just a quiet space of shared humanity.

---

## 🧩 Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS (v4)
- **Animation:** Framer Motion
- **Database:** Supabase (PostgreSQL)
- **AI Core:** Groq API (Llama-3 model)
- **Icons:** Lucide React

---

## 🗝️ Keys & Setup (What you need to configure)

To bring the project to life locally, you need two free accounts: **Supabase** (for the database) and **Groq** (for the AI).

### 1. Supabase (Database)
1. Go to [Supabase](https://supabase.com/) and create a new project.
2. Go to **Project Settings -> API** to find your **Project URL** and **anon public key**.
3. Go to the **SQL Editor** in Supabase and run this exact schema to secure your table:

```sql
create table letters (
  id uuid primary key default uuid_generate_v4(),
  content text not null,
  recipient text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  is_public boolean default false
);

-- Row Level Security (VERY IMPORTANT to prevent misuse)
alter table letters enable row level security;

-- Allow anyone to anonymously add a letter
create policy "Allow insert for anyone"
on letters for insert
with check (true);

-- Allow public letters to be viewable on the Whisper Wall
create policy "Allow read public letters"
on letters for select
using (is_public = true);
```

### 2. Groq (AI Refinement)
1. Go to [Groq Console](https://console.groq.com) and create an account.
2. Navigate to **API Keys** and click **Create API Key**. Copy this key.

### 3. Add Keys Locally
Create a `.env.local` file in the root of the project:
```bash
touch .env.local
```
Add your keys exactly like this:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
GROQ_API_KEY=your_groq_api_key
```

*(These keys will never be pushed to GitHub as `.env.local` is ignored in Git!)*

---

## 🚀 Installation & Running Locally

1. **Clone & Install:**
   ```bash
   git clone https://github.com/abhi-jithb/The-Untold-Amor.git
   cd The-Untold-Amor
   npm install
   ```

2. **Start the Development Server:**
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌍 Hosting The Project Live (Vercel)

The best place to host a Next.js application is [Vercel](https://vercel.com/) (it's free and takes 2 minutes).

1. Push your code to your GitHub repository.
2. Go to [Vercel.com](https://vercel.com/) and log in with GitHub.
3. Click **Add New -> Project**.
4. Import `The-Untold-Amor` from your GitHub repos.
5. In the **Environment Variables** section before deploying, paste the same three keys you used in `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `GROQ_API_KEY`
6. Click **Deploy**.

Vercel will build the project and give you a live URL (e.g., `the-untold-amor.vercel.app`) within seconds!

---

*"Some words don't need replies. You can love, without being loved back."*
