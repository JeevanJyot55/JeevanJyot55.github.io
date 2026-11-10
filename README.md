<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:4285F4,35:34A853,70:FBBC05,100:EA4335&height=200&section=header&text=jeevanjyot55.github.io&fontSize=46&fontColor=ffffff&fontAlignY=38&desc=My%20personal%20portfolio%20%E2%80%94%20and%20a%20tiny%20OS&descSize=18&descAlignY=60&animation=fadeIn" width="100%" />
</p>

<p align="center">
  <a href="https://jeevanjyot55.github.io"><img src="https://img.shields.io/badge/🌐_Visit_Live_Site-4285F4?style=for-the-badge" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/GitHub_Pages-222222?style=for-the-badge&logo=githubpages&logoColor=white" />
</p>

<p align="center">
  <b>Not just a résumé page. An interactive portfolio with its own control center, a terminal you can ask questions,<br/>and a playground to explore, all built from scratch in React.</b>
</p>

---

## ✨ What's Inside

| Section | What it does |
|---|---|
| 🦸 **Hero** | Intro, résumé download and social links |
| 🖥️ **JeevanOS** | A mini desktop "control center" with a live appearance theme and accent-color picker that restyles the whole site |
| 💬 **Ask-Me Terminal** | Type a question about my experience, projects or skills and get an answer, powered by a local, rule-based assistant with no API calls and no data leaving your browser |
| 🚀 **Project Showcase** | Cards for each project with tech stacks, highlights and source links |
| 🧭 **Timeline** | Experience and milestones, including my Software Engineering internship at Google |
| 🎓 **Education** | UW–Madison, CS + Economics, and coursework |
| 🛠️ **Tech Specs** | Languages, frameworks and tools, organized like a spec sheet |
| 🎮 **Fun Playground** | Interactive extras (with confetti 🎉) |

---

## 🏗️ How It's Built

```mermaid
flowchart LR
    D[📄 portfolioData.js<br/>single source of truth] --> C[⚛️ React components<br/>Hero · JeevanOS · Showcase<br/>Timeline · Education · TechSpecs]
    D --> AI[💬 localJeevanAssistant.js<br/>offline Q&A engine]
    C --> V[⚡ Vite build]
    V --> P[🌐 GitHub Pages]
```

- **Data-driven:** every project, role and skill lives in one `portfolioData.js` file, so updating the site means editing data, not markup
- **Zero backend:** the Q&A assistant runs fully in the browser
- **Lightweight:** React + Vite with hand-written CSS and only a few small dependencies (`lucide-react` icons, `canvas-confetti`)

---

## 🚀 Run Locally

```bash
git clone https://github.com/JeevanJyot55/JeevanJyot55.github.io.git
cd JeevanJyot55.github.io
npm install
npm run dev
```

### Deploy
```bash
npm run deploy     # builds with Vite and publishes /dist to GitHub Pages
```

---

## 📁 Structure

```
src/
├── components/        # Hero, InteractiveOS, Showcase, Timeline, Education,
│                      # TechSpecs, FunPlayground, Navbar, Footer
├── utils/
│   └── localJeevanAssistant.js   # Offline Q&A engine
├── portfolioData.js   # All site content in one place
└── App.jsx
```

---

<p align="center">
  Built by <a href="https://github.com/JeevanJyot55"><b>Jeevan Jyot Singh</b></a> · <a href="https://www.linkedin.com/in/jeevanjyotsingh">LinkedIn</a> · <a href="https://jeevanjyot55.github.io">Portfolio</a>
</p>
