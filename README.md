# Course Helper AI – Vercel Version

This is a **Vercel-ready** version of your Course Helper AI agent.

- Frontend: static `index.html` + `style.css` + `script.js`
- Backend: a **serverless function** at `/api/chat` that talks to OpenAI
- Designed to be deployed directly on **Vercel**

---

## 1. Project Structure

```text
.
├── api/
│   └── chat.js        # Serverless function (backend)
├── index.html         # Frontend UI
├── style.css          # Styling
├── script.js          # Frontend logic
├── package.json       # Dependencies & scripts
├── .env.example       # Template for local OpenAI key
└── .gitignore
```

---

## 2. How to use this project on Vercel

### Step 1 – Create a new OpenAI API key

1. Go to your OpenAI dashboard.
2. Create a new **secret key**.
3. Copy it (you will only see it once).

> ⚠️ Never share this key or commit it to GitHub.

### Step 2 – Upload this project to Vercel

You have two options:

#### Option A – Direct upload (zip)

1. Zip this folder and upload it as a new project on Vercel **or**
2. Push this folder to a GitHub repo and import it into Vercel.

#### Option B – GitHub

1. Create a new GitHub repository.
2. Add this folder's contents, commit, and push.
3. In Vercel, import the GitHub repo as a new project.

### Step 3 – Set the environment variable on Vercel

In your Vercel dashboard:

1. Open your project.
2. Go to **Settings → Environment Variables**.
3. Add a new variable:

   - **Name:** `OPENAI_API_KEY`
   - **Value:** your real OpenAI API key
   - Environment: `Production` (and `Preview` if you want)

4. Save.

### Step 4 – Deploy

- If you're using the web UI: click **Deploy**.
- If you're using the CLI:

  ```bash
  npm install
  npx vercel
  npx vercel --prod
  ```

Vercel will:

- Serve `index.html`, `style.css`, and `script.js` as static files.
- Treat `api/chat.js` as a serverless function.
- Inject `OPENAI_API_KEY` from your environment settings.

Once deployment finishes, you'll get a URL like:

```
https://your-project-name.vercel.app
```

Open it and start chatting with your Course Helper AI 🎓

---

## 3. How to run locally (optional)

If you want to test on your own machine:

### Step 1 – Install dependencies

```bash
npm install
```

### Step 2 – Create `.env`

In the **root folder** (same place as `package.json`), create a file named `.env`:

```env
OPENAI_API_KEY=your_real_api_key_here
```

> ⚠️ Do **not** commit `.env` to GitHub. It is already ignored by `.gitignore`.

### Step 3 – Install Vercel CLI (once)

```bash
npm install -g vercel
```

### Step 4 – Run development server

```bash
vercel dev
```

This will start a local dev server (usually at `http://localhost:3000`).

Open that URL in your browser and use the app.

---

## 4. What the serverless function does

`api/chat.js`:

- Receives `POST /api/chat` with `{ messages: [...] }`.
- Adds a **system prompt**: “You are a friendly AI tutor helping college students with their course questions...”
- Calls OpenAI's `gpt-4.1-mini` model.
- Returns `{ reply: "..." }` back to the frontend.

The frontend (`script.js`) then:

- Shows your message and the AI's reply as chat bubbles.
- Shows a temporary `"AI is thinking..."` indicator while waiting.

You can modify the **system prompt** inside `api/chat.js` to make it specific to your course (e.g. BCA, OS, DBMS).

---

You're ready to deploy 🚀
