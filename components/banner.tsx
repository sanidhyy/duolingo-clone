"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { XIcon } from "lucide-react";

type BannerProps = {
  hide: boolean;
  setHide: Dispatch<SetStateAction<boolean>>;
};
const BANNER_KEY = "hide-noorquran-banner";
const Banner = ({ hide, setHide }: BannerProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    if (localStorage.getItem(BANNER_KEY)) return;
    setHide(false);
    const fn = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, [setHide]);
  if (hide || isScrolled) return null;
  return (
    <div
      dir="rtl"
      className="fixed left-0 top-0 z-50 flex h-14 w-full items-center justify-center bg-amber-50 px-10 text-center text-sm font-medium text-amber-900 shadow-sm"
    >
      <span>✨ امروز با یک آیه‌ی تازه، روزت را نورانی کن.</span>
      <button
        onClick={() => {
          setHide(true);
          localStorage.setItem(BANNER_KEY, "1");
        }}
        className="absolute left-4 rounded-full p-1"
      >
        <XIcon className="size-4" />
        <span className="sr-only">بستن</span>
      </button>
    </div>
  );
};
export default Banner;
