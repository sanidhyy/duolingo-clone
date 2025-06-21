"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { XIcon } from "lucide-react";
import Link from "next/link";

import { links } from "@/config";

type BannerProps = {
  hide: boolean;
  setHide: Dispatch<SetStateAction<boolean>>;
};

const BANNER_KEY = "hide-lingo-banner";

const Banner = ({ hide, setHide }: BannerProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const hideBanner = localStorage.getItem(BANNER_KEY);

    if (hideBanner) return;

    setHide(false);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBannerClose = () => {
    setHide(true);
    localStorage.setItem(BANNER_KEY, "1");
  };

  if (hide || isScrolled) return null;

  return (
    <div
      id="sticky-banner"
      className="fixed left-0 top-0 z-50 block h-20 w-full bg-secondary p-2.5 opacity-[0.98] shadow-md sm:h-16 lg:h-10"
    >
      <div className="relative w-full">
        <div className="flex items-center justify-center">
          <p className="text-sm font-normal">
            📢{" "}
            <strong className="font-semibold">
              Account creation is currently not working
            </strong>{" "}
            due to Clerk&apos;s 500-user limit. To try it out, please{" "}
            <Link
              href={`${links.sourceCode}/fork`}
              target="_blank"
              rel="noreferrer noopener"
              className="text-green-600 transition-opacity hover:opacity-75"
            >
              fork this repo
            </Link>{" "}
            or{" "}
            <Link
              href={`mailto:${links.email}`}
              target="_blank"
              rel="noreferrer noopener"
              className="text-green-600 transition-opacity hover:opacity-75"
            >
              Contact me
            </Link>{" "}
            for access.
          </p>
        </div>

        <button
          data-dismiss-target="#sticky-banner"
          onClick={handleBannerClose}
          type="button"
          className="absolute right-0 top-3/4 -translate-y-1/2 rounded-full border border-gray-300 bg-white p-1 opacity-80 hover:opacity-90 sm:top-1/2"
        >
          <XIcon className="size-3" strokeWidth={3} />
          <span className="sr-only">Close banner</span>
        </button>
      </div>
    </div>
  );
};

export default Banner;
