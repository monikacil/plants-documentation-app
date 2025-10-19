"use client";

type Props = {
  open: boolean;
  onClick: () => void;
};

export function SidebarOverlay({ open, onClick }: Props) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-30 backdrop-blur-sm bg-black/50 transition-opacity md:hidden"
      role="presentation"
      onClick={ onClick }
    />
  );
}
