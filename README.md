# Fan Yang · Research Homepage

A minimal, content-first academic homepage built with React, TypeScript, and Vite. It is a fully static site with no backend, accounts, tracking, or runtime secrets.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

A workflow is included at `.github/workflows/deploy.yml`.

1. Push this project to the `main` branch of a public repository named `teee000.github.io`.
2. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. The workflow builds `dist/` and deploys it after each push to `main`.

No personal access token is required by the workflow; it uses the repository's built-in Pages permissions.

## Site structure

Writing is the default view, with automatically generated topic filters and expandable articles. Research and About are separate views selected from the top navigation. All views remain part of a static GitHub Pages build.

## Add a blog post

Create one new Markdown file in `src/content/posts/`, for example `my-robot-learning-note.md`. No component or index file needs to be edited.

```markdown
---
title: 'My robot learning note'
date: '2026-11-05'
summary: 'A short summary shown in the article list.'
topics:
  - 'Paper notes'
  - 'Robot learning'
example: false
---

Write the article here using Markdown.

Inline math: $\pi_\theta(a_t \mid o_t)$.

$$
a_{t:t+H} = \pi_\theta(o_{\leq t})
$$
```

The filename becomes the post's internal slug. `date` must use `YYYY-MM-DD`; posts are sorted newest first. Topics, sidebar entries, and article counts are generated automatically. Set `example: true` only for sample content that should display an Example label.

The article body supports GFM, images, inline LaTeX math, and display equations through React Markdown, Remark Math, and KaTeX. Images placed in `public/images/` can be referenced as `./images/your-image.png`.

## Add a research paper

Create one new JSON file in `src/content/papers/`, for example `my-paper.json`:

```json
{
  "order": 4,
  "title": "My paper",
  "subtitle": "Full paper title",
  "description": "A short description.",
  "meta": "Conference · 2026",
  "image": "./images/my-paper-framework.png",
  "imageAlt": "Method framework for my paper",
  "links": [
    { "label": "Project", "href": "https://example.com/project" },
    { "label": "Code", "href": "https://github.com/teee000/my-paper" },
    { "label": "arxiv", "href": "https://arxiv.org/abs/0000.00000" }
  ]
}
```

`order` controls the paper list order. Paper images are stored in `public/images/`. Replace the example URLs with real destinations before publishing.

The file-discovery loaders are in `src/data/posts.ts` and `src/data/content.ts`; they normally do not need changes. The main view composition is in `src/pages/Home.tsx`, and visual styles are in `src/App.css` and `src/index.css`.

The existing blog post is explicitly labeled as an example and should be replaced with your own writing before publication.

## Research assets

The three research diagrams come from the owner's public repositories and are used here as part of the requested personal homepage:

- `LiLa-WAM-page/static/images/FrameWork.png`
- `ABPolicy/static/images/refit_example1.png`
- `AdaPolicy/assets/images/framework.png`

Local copies are stored in `public/images/` so the page does not depend on third-party image requests at runtime. DM Sans and Newsreader are bundled locally through Fontsource.
