"use client"
import Link from "next/link";
import { useClickAway } from "react-use";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Squash as Hamburger } from "hamburger-react";

import { logout } from "@/app/actions/auth.actions";

export function NavMobile ({isAuth}: {isAuth: boolean}) {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);

  useClickAway(ref, () => setOpen(false));

  return (
    <div ref={ref} className="block sm:hidden">
      <Hamburger toggled={isOpen} size={25} toggle={setOpen} />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed left-0 right-0 top-[5rem] p-4 pt-2 bg-primary-light-green text-lime-50 border-b shadow "
          >
            <ul className="grid gap-2">
              {!isAuth
                ? <>
                   <motion.li
                    className="w-full p-[0.2rem] rounded-xl bg-gradient-to-tr from-primary-green-100 via-primary-dark-green to-primary-green-100"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.1 + 0 / 15,
                    }}>
                    <Link className="pl-5 text-inherit w-full block text-center" href="/">
                      Home
                    </Link>
                  </motion.li>
                  <motion.li
                    className="w-full p-[0.2rem] rounded-xl bg-gradient-to-tr from-primary-green-100 via-primary-dark-green to-primary-green-100"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.1 + 0 / 15,
                    }}>
                    <Link className="pl-5 text-inherit w-full block text-center" href="/signup">
                      Sign Up
                    </Link>
                  </motion.li>
                  <motion.li className="w-full p-[0.2rem] rounded-xl bg-gradient-to-tr from-primary-green-100 via-primary-dark-green to-primary-green-100"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.1 + 1 / 15,
                    }}>
                    <Link className="pl-5 text-inherit w-full block text-center" href="/signin">
                      Sign In
                    </Link>
                  </motion.li>
                </>
                :
                <>
                  <motion.li className="w-full p-[0.2rem] rounded-xl bg-gradient-to-tr from-primary-green-100 via-primary-dark-green to-primary-green-100"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.1 + 1 / 15,
                    }}>
                    <Link className="pl-5 text-inherit w-full block text-center" href="/plants">
                      Plants
                    </Link>
                  </motion.li>
                  <motion.li className="w-full p-[0.2rem] rounded-xl bg-gradient-to-tr from-primary-green-100 via-primary-dark-green to-primary-green-100"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.1 + 2 / 15,
                  }}>
                    <button className="pl-5 w-full block" onClick={logout}>
                      Logout
                    </button>
                  </motion.li>
               </>
              }
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};