import { useEffect, useState } from "react";
import Charts from "./Charts";
import StakingCards from "./StakingCard";
import Farming from "./Farming";
import CountdownTimer from "./CountDownTimer";
import { useNetwork } from "wagmi";

const SelectButtons: React.FC = () => {
  const { chain } = useNetwork();
  const [selectedButton, setSelectButton] = useState("Dashboard");

  const SelectButton = [
    {
      id: 1,
      name: "Dashboard",
    },
    {
      id: 2,
      name: "Staking",
    },
    {
      id: 3,
      name: "Farming",
    },
  ];

  const handleTabClick = (name: string) => {
    setSelectButton(name);
    localStorage.setItem("selectedButton", name);
  };

  useEffect(() => {
    const storedButton = localStorage.getItem("selectedButton");
    if (storedButton) {
      setSelectButton(storedButton);
    }
  }, []);

  let componentToRender;

  if (selectedButton === "Dashboard") {
    componentToRender = <Charts />;
  } else if (selectedButton === "Staking") {
    componentToRender = <StakingCards />;
  } else if (chain?.id === 56 && selectedButton === "Farming") {
    componentToRender = <Farming />;
  }

  return (
    <>
      <div className="flex justify-center mt-5">
        <div className="flex bg-gray-200 bg-opacity-50 hover:bg-gray-200 rounded-lg transition p-1 dark:bg-gray-700 dark:bg-opacity-70 dark:hover:bg-opacity-70">
          <nav
            className="flex flex-1 space-x-2"
            aria-label="Tabs"
            role="tablist"
          >
            {SelectButton.map((selectButton) =>
              chain?.id === 1116 && selectButton.name === "Farming" ? null : (
                <button
                  key={selectButton.id}
                  type="button"
                  className={`text-xs  hover:text-gray-700 font-medium rounded-md py-2 px-3  dark:hover:text-gray-300  dark:active:text-gray-400 ${
                    selectedButton == selectButton.name
                      ? "bg-white dark:text-black text-black"
                      : "text-gray-500"
                  } active:text-gray-700 active:shadow-sm focus:outline-none`}
                  id="ctc-component-2-tab-1-item"
                  data-hs-tab="#ctc-component-2-tab-1"
                  aria-controls="ctc-component-2-tab-1"
                  role="tab"
                  onClick={() => handleTabClick(selectButton.name)}
                >
                  {selectButton.name}
                </button>
              )
            )}
          </nav>
        </div>
      </div>

      {componentToRender}
    </>
  );
};

export default SelectButtons;
