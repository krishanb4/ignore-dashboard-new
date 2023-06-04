import Image from "next/image";
import Link from "next/link";
import { Web3Button } from "@web3modal/react";

const Header: React.FC = () => {
  return (
    <>
      <header className="lg:border-transparent text-black dark:text-white bg-transparent sticky flex items-center top-0 z-[1] transition-all h-[56px]">
        <div className="mx-auto flex items-center max-w-full w-full h-[56px]">
          <div className="grid grid-cols-2 items-center w-full mx-auto z-[101] px-4">
            <div className="flex items-center sm:gap-1">
              <Link
                className="flex flex-row items-center sm:pl-2 sm:pr-6"
                href="/"
              >
                <div className="block md:hidden w-7 h-7 sm:w-[115px] sm:h-[37px]">
                  <Image
                    src="/images/4logo.png"
                    alt=""
                    width={800}
                    height={800}
                  />
                </div>
                <div className="hidden md:block w-7 h-7 sm:w-[115px] sm:h-[37px]">
                  <Image
                    src="/images/logo_name.png"
                    alt=""
                    width={800}
                    height={800}
                  />
                </div>
              </Link>
            </div>
            <div className="flex items-center justify-end gap-2">
              <div className="flex gap-2 transform scale-100 opacity-100">
                <div
                  data-headlessui-state=""
                  className="w-[62px] sm:w-auto md:w-auto"
                >
                  {/* <button
                    className="btn  flex items-center justify-center gap-2 cursor-pointer transition-all bg-white dark:text-white dark:bg-slate-600/10 hover:dark:bg-slate-600/20 active:dark:bg-slate-600/30 px-4 h-[38px] rounded-xl text-base font-semibold !"
                    aria-expanded="false"
                    data-headlessui-state=""
                    type="button"
                    id="headlessui-popover-button-:r1m:"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      width="24"
                      height="24"
                      className="transition-all rotate-0 hidden sm:block"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button> */}
                </div>
                <div data-headlessui-state="">
                  <Web3Button icon="hide" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
