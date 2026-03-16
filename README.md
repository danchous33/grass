# grass

Run and deploy your AI Studio app.

## Run locally

Prerequisites: Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in `./.env.local` to your Gemini API key
3. Place the audio file at `public/audio/creep.mp3`
4. Run the app:
   `npm run dev`

## Deploy to GitHub Pages (branch-based)

This repo uses a `gh-pages` branch for deployment (no Actions required).

1. Push the repo to GitHub and make sure your default branch is `main`.
2. In GitHub, go to Settings -> Pages.
3. Under Source, choose "Deploy from a branch".
4. Select branch: `gh-pages` and folder: `/ (root)`.
5. Run:
   `npm run deploy`

After deploy, GitHub will show your Pages URL in Settings -> Pages.
