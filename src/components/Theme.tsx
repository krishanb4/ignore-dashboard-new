import { useCallback, useEffect, useState } from "react";
import { FaSun, FaMoon, FaDesktop } from "react-icons/fa";

function Theme() {
  const options = [
    {
      icon: FaSun,
      text: "light",
    },
    {
      icon: FaMoon,
      text: "dark",
    },
    {
      icon: FaDesktop,
      text: "system",
    },
  ];
  const [theme, setTheme] = useState(
    typeof localStorage !== "undefined" && localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : options[2].text // Set the initial state to 'system'
  );
  const darkQuery =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)");

  const onWindowMatch = useCallback(() => {
    if (typeof document !== "undefined") {
      if (
        darkQuery &&
        (localStorage.theme === "dark" ||
          (!("theme" in localStorage) && darkQuery.matches))
      ) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [darkQuery]);
  onWindowMatch();
  useEffect(() => {
    const element = document.documentElement;
    switch (theme) {
      case "dark":
        element.classList.add("dark");
        localStorage.setItem("theme", "dark");
        break;
      case "light":
        element.classList.remove("dark");
        localStorage.setItem("theme", "light");

        break;

      default:
        localStorage.removeItem("theme");
        onWindowMatch();
        break;
    }
  }, [theme, onWindowMatch]);

  if (darkQuery) {
    const onChange = (e: any) => {
      if (!("theme" in localStorage)) {
        if (e.matches) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    };
    darkQuery.removeEventListener("change", onChange);
    darkQuery.addEventListener("change", onChange);
  }
  console.log(theme);

  return (
    <>
      <div className="fixed left-[5px] bottom-[5px] duration-100 dark:bg-[#365b07]  bg-black text-white  border-solid dark:border-white border-black border-2 rounded-lg">
        {options.map(({ icon: Icon, text }) => (
          <button
            key={text}
            onClick={() => setTheme(text)}
            className={`w-8 h-8 leading-9 text-xl rounded-full m-1 ${
              theme == text ? "text-sky-600" : ""
            }`}
          >
            <Icon />
          </button>
        ))}
      </div>
    </>
  );
}

export default Theme;
