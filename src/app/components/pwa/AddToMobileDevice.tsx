'use client'

import React from 'react'
import { Banner, BannerCollapseButton } from "flowbite-react";
import { HiX } from "react-icons/hi";
import BasicButton from '../common/BasicButton';
import Image from "next/image";
import { IoDownloadOutline } from "react-icons/io5";


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
            <Image
              src="/images/logo.png"
              width={300}
              height={100}
              alt="Logo"
            />
          </div>
          <div className="pr-3">
            <BasicButton color="success" onClick={installPrompt}>Install <IoDownloadOutline className="ml-2 text-lg" /></BasicButton>
          </div>
        </div>
      </Banner>
    )
}
