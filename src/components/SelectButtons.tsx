import { useEffect, useState } from "react";
import Charts from "./Charts";
import StakingCards from "./StakingCard";

const SelectButtons: React.FC = () => {
  const [selectedButton, setSelectButton] = useState("Staking");
  const SelectButton = [
    { name: "Dashboard" },
    { name: "Staking" },
    { name: "Marketplace" },
  ];

  return (
    <>
      <div className="flex justify-center mt-5">
        <div className="flex bg-gray-200 bg-opacity-50 hover:bg-gray-200 rounded-lg transition p-1 dark:bg-gray-700 dark:bg-opacity-70 dark:hover:bg-opacity-70">
          <nav
            className="flex flex-1 space-x-2"
            aria-label="Tabs"
            role="tablist"
          >
            {SelectButton.map((selectButton, index) => (
              <button
                key={index}
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
                onClick={() => setSelectButton(selectButton.name)}
              >
                {selectButton.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
      {selectedButton == "Dashboard" ? (
        <Charts />
      ) : selectedButton == "Staking" ? (
        <StakingCards />
      ) : (
        ""
      )}
      {}
    </>
  );
};

export default SelectButtons;
