import { BookOpen, ExternalLink, Heart, Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-primary-500 to-violet-600 bg-clip-text text-transparent">
                CampusPrep Quiz Hub
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
              A comprehensive quiz platform for B.Tech students preparing for placements. Built to
              practice DSA, core CS subjects, aptitude, and more.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-3 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { to: '/subjects', label: 'Subjects' },
                { to: '/dsa', label: 'DSA Mastery' },
                { to: '/dashboard', label: 'Dashboard' },
                { to: '/about', label: 'About' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-3 text-sm uppercase tracking-wider">
              Topics
            </h4>
            <ul className="space-y-2">
              {['Arrays & Strings', 'Trees & Graphs', 'Dynamic Programming', 'Operating Systems'].map((topic) => (
                <li key={topic}>
                  <span className="text-sm text-slate-500 dark:text-slate-400">{topic}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> by
            </span>
            <span className="font-semibold text-slate-700 dark:text-slate-200">Poonam Chaurasia</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/poonamchaurasiya"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4.5 h-4.5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/poonam-chaurasiya/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4.5 h-4.5" />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
            <a
              href="https://github.com/poonamchaurasiya/CampusPrep-Quiz-Hub"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
              aria-label="Source Code"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">Source</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
