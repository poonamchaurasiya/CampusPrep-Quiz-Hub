import { motion } from 'framer-motion';
import {
  BookOpen, Code2, Database, Globe, Layers, Brain,
  Target, ChevronRight, Github, Linkedin, User
} from 'lucide-react';
import { Link } from 'react-router-dom';

const techStack = [
  { name: 'React', description: 'Component-based UI library', color: 'text-cyan-500' },
  { name: 'TypeScript', description: 'Type-safe JavaScript', color: 'text-blue-500' },
  { name: 'Vite', description: 'Fast build tool', color: 'text-violet-500' },
  { name: 'Tailwind CSS', description: 'Utility-first CSS framework', color: 'text-sky-500' },
  { name: 'Zustand', description: 'Lightweight state management', color: 'text-amber-500' },
  { name: 'Recharts', description: 'React charting library', color: 'text-green-500' },
  { name: 'Framer Motion', description: 'Animation library', color: 'text-pink-500' },
  { name: 'React Router', description: 'Client-side routing', color: 'text-red-500' },
];

const demonstrates = [
  { icon: Code2, text: 'Component architecture and reusable patterns' },
  { icon: Layers, text: 'State management with Zustand stores' },
  { icon: Database, text: 'LocalStorage persistence and data modeling' },
  { icon: Brain, text: 'Quiz engine logic with scoring and analytics' },
  { icon: Target, text: 'Responsive design across all breakpoints' },
  { icon: Globe, text: 'DSA and CS subject knowledge integration' },
];

export function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-500/30">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            About CampusPrep Quiz Hub
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            A comprehensive, interview-ready quiz platform built to showcase frontend development skills, 
            DSA knowledge, and CS fundamentals understanding.
          </p>
        </motion.div>

        {/* Purpose */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 mb-6"
        >
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">🎯 Why I Built This</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            As a final-year B.Tech student preparing for campus placements, I wanted to build a project that:
          </p>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li className="flex items-start gap-2">
              <ChevronRight className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
              Demonstrates practical frontend development skills with React and TypeScript
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
              Reflects my understanding of data structures, algorithms, and CS fundamentals
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
              Shows the ability to design clean, modular, and maintainable code
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
              Serves as a practical study tool for me and other students
            </li>
          </ul>
        </motion.div>

        {/* What it demonstrates */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 mb-6"
        >
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">🔧 What This Project Demonstrates</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {demonstrates.map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800 rounded-xl p-3">
                <item.icon className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700 dark:text-slate-300">{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 mb-6"
        >
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">⚡ Tech Stack</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {techStack.map((tech) => (
              <div key={tech.name} className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3 text-center">
                <div className={`text-sm font-semibold ${tech.color} mb-0.5`}>{tech.name}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{tech.description}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 mb-6"
        >
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">✨ Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              '100+ curated MCQ questions',
              '15+ DSA and CS topics',
              'Timed quiz mode with auto-submit',
              'Question marking and navigation',
              'Detailed answer explanations',
              'DSA complexity analysis',
              'Performance dashboard with charts',
              'Subject-wise accuracy tracking',
              'Mixed quiz builder',
              'Dark/Light theme toggle',
              'Responsive mobile design',
              'LocalStorage persistence',
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                {feature}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Future improvements */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-primary-50 to-violet-50 dark:from-primary-900/20 dark:to-violet-900/20 rounded-2xl border border-primary-200 dark:border-primary-800/50 p-6 mb-6"
        >
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">🚀 Future Improvements</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Backend API with authentication',
              'Leaderboard with rankings',
              'Daily challenge mode',
              'Bookmark & favorite questions',
              'Export results as PDF',
              'Interview prep mode',
              'Code snippet questions',
              'Spaced repetition learning',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Developer Profile */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 mb-6"
        >
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">👩‍💻 Developer</h2>
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center shadow-lg shadow-primary-500/25 flex-shrink-0">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="text-center sm:text-left flex-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Poonam Chaurasia
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Final-year B.Tech student passionate about frontend development, data structures & algorithms, 
                and building polished, user-centric web applications.
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-3 mt-3">
                <a
                  href="https://github.com/poonamchaurasiya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/poonam-chaurasiya/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Link
            to="/subjects"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary-500 to-violet-600 text-white font-semibold shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all"
          >
            Start Practicing Now <ChevronRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
