import React from "react";

interface AuthSwitchPromptProps {
  label: string;
  actionText: string;
  onAction: () => void;
  className?: string;
}

export function AuthSwitchPrompt({ label, actionText, onAction, className }: AuthSwitchPromptProps) {
  return (
    <div className={ ["text-sm flex items-center justify-center py-2", className].join(" ") }>
      { label }
      <button
        type="button"
        onClick={ onAction }
        className="ml-2 font-semibold cursor-pointer text-base-green-600 underline underline-offset-4 text-lg md:text-base bg-transparent border-0 hover:text-primary-light transition-colors"
        tabIndex={ 0 }
      >
        { actionText }
      </button>
    </div>
  );
}
