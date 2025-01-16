'use client'

import React from 'react'
import { Banner, BannerCollapseButton } from "flowbite-react";
import { HiX } from "react-icons/hi";
import { IoDownloadOutline } from "react-icons/io5";
import Logo from '../layout/Logo';


interface Props {
  closePrompt: () => void;
  installPrompt: () => void;
}

export default function AddToMobileDevice(props: Props) {
  const { installPrompt, closePrompt } = props;

    return (
      <Banner className="absolute h-screen w-full z-50 bg-gray-400/60">
        <div className="flex justify-between items-center w-[98%] mx-[1%] mt-3 p-4 rounded-md border-b border-gray-200 bg-gray-200">
          <div className="flex items-center">
            <BannerCollapseButton color="gray" className="border-0 bg-transparent text-gray-500 dark:text-gray-400" onClick={(closePrompt)}>
              <HiX className="text-xl" />
            </BannerCollapseButton>
            <Logo size="sm"/>
          </div>
          <div className="pr-3">
            <IoDownloadOutline size={ 40 } onClick={ installPrompt } className="ml-2 text-md bg-base-green-500 rounded-full p-2 text-white hover:bg-base-green-600" />
          </div>
        </div>
      </Banner>
    )
}
