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

## Deploy to GitHub Pages

This repo includes a GitHub Actions workflow that builds and deploys the app to GitHub Pages.

1. Push the repo to GitHub and make sure your default branch is `main`.
2. In GitHub, go to Settings -> Pages.
3. For Source, choose GitHub Actions.
4. Push to `main` (or run the workflow manually).

After the workflow finishes, GitHub will show your Pages URL in the Actions run summary and in Settings -> Pages.
