import { HiEye, HiEyeOff } from "react-icons/hi";

interface PasswordToggleIconProps {
  show: boolean;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  label: string;
}

export function PasswordToggleIcon({ show, onClick, onKeyDown, label, }: PasswordToggleIconProps) {
  return (
    <span
      onClick={ onClick }
      onKeyDown={ onKeyDown }
      aria-label={ label }
      tabIndex={ 0 }
      className="absolute right-3 top-[10px] text-gray-500 hover:text-gray-700 cursor-pointer"
      role="button"
    >
      { show ? <HiEyeOff size={ 18 }/> : <HiEye size={ 18 }/> }
    </span>
  );
}
