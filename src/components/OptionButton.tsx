import { motion } from 'framer-motion';

interface OptionButtonProps {
  label: string;
  index: number;
  isSelected: boolean;
  isCorrect?: boolean;
  isWrong?: boolean;
  showResult?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

const optionLabels = ['A', 'B', 'C', 'D'];

export function OptionButton({
  label,
  index,
  isSelected,
  isCorrect,
  isWrong,
  showResult,
  disabled,
  onClick,
}: OptionButtonProps) {
  let borderColor = 'border-slate-200 dark:border-slate-700';
  let bgColor = 'bg-white dark:bg-slate-800/50';
  let textColor = 'text-slate-700 dark:text-slate-300';
  let labelBg = 'bg-slate-100 dark:bg-slate-700';
  let labelText = 'text-slate-600 dark:text-slate-400';

  if (showResult && isCorrect) {
    borderColor = 'border-green-500 dark:border-green-400';
    bgColor = 'bg-green-50 dark:bg-green-900/20';
    textColor = 'text-green-700 dark:text-green-300';
    labelBg = 'bg-green-500';
    labelText = 'text-white';
  } else if (showResult && isWrong && isSelected) {
    borderColor = 'border-red-500 dark:border-red-400';
    bgColor = 'bg-red-50 dark:bg-red-900/20';
    textColor = 'text-red-700 dark:text-red-300';
    labelBg = 'bg-red-500';
    labelText = 'text-white';
  } else if (isSelected) {
    borderColor = 'border-primary-500 dark:border-primary-400';
    bgColor = 'bg-primary-50 dark:bg-primary-900/20';
    textColor = 'text-primary-700 dark:text-primary-300';
    labelBg = 'bg-primary-500';
    labelText = 'text-white';
  }

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.01 } : undefined}
      whileTap={!disabled ? { scale: 0.99 } : undefined}
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 ${borderColor} ${bgColor} ${textColor} transition-all duration-200 text-left ${
        disabled ? 'cursor-default' : 'cursor-pointer hover:shadow-md'
      }`}
    >
      <span
        className={`flex-shrink-0 w-8 h-8 rounded-lg ${labelBg} ${labelText} flex items-center justify-center text-sm font-bold transition-colors`}
      >
        {optionLabels[index]}
      </span>
      <span className="text-sm font-medium">{label}</span>
    </motion.button>
  );
}
