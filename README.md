# 🎓 CampusPrep Quiz Hub

A comprehensive, modern quiz platform built for B.Tech students preparing for campus placements. Practice DSA, Operating Systems, DBMS, Computer Networks, OOP, Web Development, and more through interactive quizzes with detailed explanations and performance analytics.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)

## ✨ Features

### Core
- 🧠 **100+ curated MCQ questions** across DSA, OS, DBMS, CN, OOP, Web Dev, Aptitude
- ⏱️ **Timed quiz mode** with countdown timer and auto-submit
- 📊 **Performance dashboard** with Recharts visualizations
- 🎯 **DSA Mastery Mode** with complexity analysis and concept cards
- 🔀 **Mixed Quiz Builder** — create custom quizzes across subjects

### Quiz Engine
- Navigate between questions freely
- Mark questions for review
- Color-coded question palette
- Submit confirmation modal
- Per-question review with explanations

### Analytics
- Subject-wise accuracy tracking
- Score trend line chart
- Difficulty distribution pie chart
- Subject radar chart
- Streaks and best/average scores
- Recent attempts table

### UI/UX
- 🌙 Dark/Light theme with persistence
- 📱 Fully responsive (mobile, tablet, desktop)
- ✨ Smooth Framer Motion animations
- 💎 Glassmorphism and gradient design
- ♿ Accessible focus states and semantic HTML

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI library |
| TypeScript | Type safety |
| Vite | Build tool |
| Tailwind CSS 3 | Utility-first styling |
| React Router 7 | Client-side routing |
| Zustand | State management |
| Recharts | Data visualization |
| Framer Motion | Animations |
| Lucide React | Icon library |
| LocalStorage | Data persistence |

## 📁 Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ThemeToggle.tsx
│   ├── SubjectCard.tsx
│   ├── Timer.tsx
│   ├── ProgressBar.tsx
│   ├── OptionButton.tsx
│   ├── QuestionPalette.tsx
│   ├── Modal.tsx
│   ├── SearchBar.tsx
│   ├── EmptyState.tsx
│   └── ConceptCard.tsx
├── pages/             # Page-level components
│   ├── LandingPage.tsx
│   ├── SubjectsPage.tsx
│   ├── InstructionsPage.tsx
│   ├── QuizPage.tsx
│   ├── ResultPage.tsx
│   ├── DashboardPage.tsx
│   ├── DSAPage.tsx
│   ├── MixedQuizPage.tsx
│   └── AboutPage.tsx
├── data/              # Question bank and configurations
│   ├── questions.ts
│   └── quizConfigs.ts
├── store/             # Zustand state stores
│   ├── quizStore.ts
│   ├── analyticsStore.ts
│   └── themeStore.ts
├── types/             # TypeScript interfaces
│   └── index.ts
├── utils/             # Utility functions
│   ├── quizUtils.ts
│   └── storageUtils.ts
├── App.tsx            # Root component with routing
├── main.tsx           # Entry point
└── index.css          # Global styles with Tailwind
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd CampusPrp-Quiz-Hub

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

## 🗺️ Routes

| Route | Page | Description |
|---|---|---|
| `/` | Landing | Hero section with feature cards |
| `/subjects` | Subjects | Quiz category grid with search & filters |
| `/quiz/:id/instructions` | Instructions | Quiz rules and start button |
| `/quiz/:id` | Quiz | Active quiz with timer and navigation |
| `/result/:id` | Result | Score summary and question review |
| `/dashboard` | Dashboard | Performance analytics and charts |
| `/dsa` | DSA Mastery | DSA-focused quizzes and topic breakdown |
| `/mixed` | Mixed Quiz | Custom quiz builder |
| `/about` | About | Project info and tech stack |

## 📋 Topics Covered

### DSA
Arrays, Linked Lists, Stacks & Queues, Trees, Graphs, Dynamic Programming, Sorting, Binary Search, Recursion, Hashing, Greedy Algorithms, Trie

### Core Subjects
Operating Systems, DBMS, Computer Networks, OOP, Software Engineering, Web Development, Aptitude & Reasoning

## 🔮 Future Improvements

- [ ] Backend API with user authentication
- [ ] Leaderboard with rankings
- [ ] Daily challenge mode
- [ ] Bookmark & favorite questions
- [ ] Export results as PDF
- [ ] Interview prep mode
- [ ] Code snippet questions
- [ ] Spaced repetition learning
- [ ] AI-powered question generation

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ for campus placements.
