"use client";

import React from "react";

// import { Banner, BannerCollapseButton } from "flowbite-react";

interface Props {
  closePrompt: () => void;
  installPrompt: () => void;
}

export function AddToMobileDevice(props: Props) {
  console.log(props)
  // const { installPrompt, closePrompt } = props;

  return (
    <div></div>
    // <Banner className="absolute h-screen w-full z-50 bg-gray-400/60 p-3 md:p-6">
    //   <div
    //     className="flex justify-between items-center w-[98%] mx-[1%] mt-3 p-4 rounded-md border-b border-gray-200 bg-gray-200">
    //     <div className="flex items-center">
    //       {/*<BannerCollapseButton*/ }
    //       {/*  color="gray"*/ }
    //       {/*  className="border-0 bg-transparent text-gray-500 dark:text-gray-400"*/ }
    //       {/*  onClick={ closePrompt }*/ }
    //       {/*>*/ }
    //       {/*  <HiX className="text-2xl"/>*/ }
    //       {/*</BannerCollapseButton>*/ }
    //       <Logo size="sm"/>
    //     </div>
    //     <div className="pr-3">
    //       <IoDownloadOutline
    //         size={ 50 }
    //         onClick={ installPrompt }
    //         className="ml-2 bg-base-green-500 rounded-full p-2 text-primary hover:bg-base-green-600"
    //       />
    //     </div>
    //   </div>
    // </Banner>
  );
}
