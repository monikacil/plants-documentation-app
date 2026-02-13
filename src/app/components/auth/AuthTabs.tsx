"use client";

import { Tabs, TabsList, TabsTrigger, } from "@/app/components/ui/tabs";

type Mode = "login" | "register";

interface AuthTabsProps {
  mode: Mode;
  onChange: (mode: Mode) => void;
}

export function AuthTabs({ mode, onChange }: AuthTabsProps) {
  return (
    <Tabs
      value={ mode }
      onValueChange={ (val) => onChange(val as Mode) }
      className="w-full"
    >
      <TabsList
        className="
          grid grid-cols-2 gap-1 h-10 p-1
          bg-surface
        "
      >

        <TabsTrigger
          value="login"
          className="
            h-full flex items-center justify-center
            text-sm font-medium
            transition-colors
            text-muted
            rounded-none border-b
            data-[state=active]:bg-background
            data-[state=active]:text-primary
            data-[state=active]:shadow-sm
            data-[state=active]:border-primary
          "
        >
          Login
        </TabsTrigger>

        <TabsTrigger
          value="register"
          className="
            h-full flex items-center justify-center
            text-sm font-medium
            transition-colors
            text-muted
            rounded-none border-b
            data-[state=active]:bg-background
            data-[state=active]:text-primary
            data-[state=active]:shadow-sm
            data-[state=active]:border-primary
          "
        >
          Register
        </TabsTrigger>

      </TabsList>
    </Tabs>
  );
}
