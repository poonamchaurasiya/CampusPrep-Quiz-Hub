import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BookOpen, BarChart3, Clock, Zap, Target, Brain, Code2,
  ChevronRight, Sparkles, Trophy, Layers, Shuffle
} from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Subject-wise Quizzes',
    description: 'Practice DSA, OS, DBMS, Networks, OOP, and more with curated questions.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Clock,
    title: 'Timed Mode',
    description: 'Simulate real exam pressure with countdown timers and auto-submit.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: BarChart3,
    title: 'Performance Analytics',
    description: 'Track progress with visual charts, streaks, and subject-wise accuracy.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Zap,
    title: 'DSA Mastery Mode',
    description: 'Dedicated DSA challenges with complexity analysis and concept cards.',
    color: 'from-violet-500 to-purple-500',
  },
];

const stats = [
  { value: '100+', label: 'Questions' },
  { value: '15+', label: 'Topics' },
  { value: '8+', label: 'Subjects' },
  { value: '3', label: 'Difficulty Levels' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-violet-50 to-white dark:from-slate-900 dark:via-primary-950/30 dark:to-slate-900" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Built for Campus Placements
            </motion.div>

            {/* Title */}
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
              Master CS Fundamentals
              <br />
              <span className="bg-gradient-to-r from-primary-500 via-violet-500 to-purple-500 bg-clip-text text-transparent">
                One Quiz at a Time
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p variants={itemVariants} className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              CampusPrep Quiz Hub helps B.Tech students sharpen their DSA knowledge, 
              core CS subjects, and aptitude skills through interactive quizzes with 
              detailed explanations and performance tracking.
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">
              <Link
                to="/subjects"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary-500 to-violet-600 text-white font-semibold shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:from-primary-600 hover:to-violet-700 transition-all duration-200"
              >
                <Target className="w-5 h-5" />
                Start Quiz
              </Link>
              <Link
                to="/dsa"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
              >
                <Zap className="w-5 h-5 text-violet-500" />
                DSA Mastery
              </Link>
              <Link
                to="/mixed"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
              >
                <Shuffle className="w-5 h-5 text-cyan-500" />
                Mixed Quiz
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 max-w-2xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary-500 to-violet-500 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
              Everything You Need to Ace Your Placements
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              From algorithmic thinking to system design concepts — practice it all in one place.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/50 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transition-all"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects Preview */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
              Cover All Your CS Subjects
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              Comprehensive question bank across all major B.Tech subjects.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { icon: Code2, name: 'Arrays & Strings', color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
              { icon: Layers, name: 'Stacks & Queues', color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-900/30' },
              { icon: Brain, name: 'Dynamic Programming', color: 'text-indigo-500', bg: 'bg-indigo-100 dark:bg-indigo-900/30' },
              { icon: Target, name: 'Trees & Graphs', color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' },
              { icon: BookOpen, name: 'Operating Systems', color: 'text-slate-500', bg: 'bg-slate-100 dark:bg-slate-700/50' },
              { icon: BarChart3, name: 'DBMS', color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
              { icon: Sparkles, name: 'Computer Networks', color: 'text-cyan-500', bg: 'bg-cyan-100 dark:bg-cyan-900/30' },
              { icon: Trophy, name: 'OOP & Design', color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' },
            ].map((subject, index) => (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center gap-3 ${subject.bg} rounded-xl p-4 border border-slate-200/50 dark:border-slate-700/30`}
              >
                <subject.icon className={`w-5 h-5 ${subject.color}`} />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{subject.name}</span>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/subjects"
              className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold hover:gap-3 transition-all"
            >
              Explore All Subjects <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Ready to Start Preparing?
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-lg mx-auto">
              Pick a subject, take a quiz, review your answers, and track your improvement over time.
            </p>
            <Link
              to="/subjects"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary-500 to-violet-600 text-white font-semibold shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all"
            >
              Get Started <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
