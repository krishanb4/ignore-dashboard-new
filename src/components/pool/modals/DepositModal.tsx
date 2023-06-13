import { Modal } from "flowbite-react";
import { useCallback, useEffect, useState } from "react";
import { Pool } from "../../../state/types";
import Spinner from "./Spinner";
import { Address } from "../../../state/types";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useNetwork,
  useSwitchNetwork,
} from "wagmi";
import { getAddress } from "@/utils/addressHelpers";
import stakeContract from "@/config/abi/stakeContract.json";
import { toast } from "react-toastify";
import { ethers, BigNumber } from "ethers";
import React, { memo } from "react";

interface DepositModalProps {
  poolId: number;
  name: any;
  userBalance: number;
  contract: Address;
  endedpool: boolean;
}

const DepositModal = ({
  poolId,
  name,
  userBalance,
  contract,
  endedpool,
}: DepositModalProps) => {
  const { chain } = useNetwork();
  const { chains, pendingChainId, switchNetwork } = useSwitchNetwork();
  const [modalOpen, setModalOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [depositing, setDepositing] = useState(false);
  const [modalOpenWait, setModalOpenWait] = useState(false);
  const [depositTo, setDepositTo] = useState<BigNumber | string>(
    ethers.utils.parseUnits("0", 0)
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const regex = /^\d*\.?\d*$/;
      if (value === "" || regex.test(value)) {
        setDepositAmount(value);
      }
    },
    [setDepositAmount]
  );

  const decimals = 18;
  useEffect(() => {
    if (Number(depositAmount) > 0) {
      const depositAmountFormated = ethers.utils.parseUnits(
        depositAmount?.toString(),
        decimals
      );
      setDepositTo(depositAmountFormated);
    } else {
      const depositAmountFormated = ethers.utils.parseUnits("0", 0);
      setDepositTo(depositAmountFormated);
    }
  }, [depositAmount]);
  const args = {
    depositTo,
    gassData: {
      gasLimit: 1100000,
    },
  };
  const { config, error } = usePrepareContractWrite({
    address: getAddress(contract) as `0x${string}`,
    abi: stakeContract,
    functionName: "stake",
    args: Object.values(args),
  });
  const { data, isLoading, isSuccess, write, status } = useContractWrite({
    ...config,
    onError(error) {
      setDepositing(false);
      const theme = document.documentElement.classList.contains("dark")
        ? "dark"
        : "default";
      if (theme === "default") {
        toast.error("Failed to send deposit: " + error, {
          theme: "light",
        });
      } else {
        toast.error("Failed to send deposit: " + error, {
          theme: "dark",
        });
      }
    },
    onSuccess(data) {
      setDepositing(true);
      setModalOpenWait(true);
      setModalOpen(false);
      toast.success("Transaction successfully sent 👌");
    },
  });
  // console.log(data);

  const transaction = useWaitForTransaction({
    hash: data?.hash,

    onSuccess(data) {
      toast.success("Deposit success 👌");
      //console.log("Success", data);
      setDepositing(false);
      setModalOpenWait(false);
      setModalOpen(false);
    },
    onError(error) {
      setDepositing(false);
      setModalOpenWait(false);
      setModalOpen(false);
      const theme = document.documentElement.classList.contains("dark")
        ? "dark"
        : "default";
      if (theme === "default") {
        toast.error("Failed to send deposit: " + error, {
          theme: "light",
        });
      } else {
        toast.error("Failed to send deposit: " + error, {
          theme: "dark",
        });
      }
    },
  });
  useEffect(() => {
    // console.log(transaction?.isSuccess);
    const isSuccess = transaction?.isSuccess;
    if (isSuccess) {
      console.log("transaction success");
    }
  }, [transaction]);

  const handleDeposit = () => {
    // console.log("here");
    setDepositing(true);
    write?.();
  };

  const setMax = () => {
    setDepositAmount(userBalance.toString());
  };
  let buttonElement;
  if (userBalance > 0) {
    if (Number(depositAmount) > userBalance) {
      buttonElement = (
        <button
          onClick={handleDeposit}
          type="button"
          className="opacity-25 w-full bg-gradient-to-br from-green-400 to-yellow-300 text-white  focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          Enter a valid amount
        </button>
      );
    } else if (Number(depositAmount) > 0 && !depositing) {
      buttonElement = (
        <button
          onClick={handleDeposit}
          type="button"
          className="w-full bg-gradient-to-br from-green-400 to-yellow-300 text-white  focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          Stake
        </button>
      );
    } else {
      buttonElement = (
        <button
          type="button"
          className="w-full opacity-25 bg-gradient-to-br from-green-400 to-yellow-300 text-white  focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          Stake
        </button>
      );
    }
  } else {
    buttonElement = (
      <button
        data-modal-hide="popup-modal"
        type="button"
        className="w-full opacity-25 bg-gradient-to-br from-green-400 to-yellow-300 text-white font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
      >
        Wallet {name} balance is too low
      </button>
    );
  }
  const handleCloseModal = () => {
    setModalOpen(false);
    setDepositAmount("");
  };

  const handleWaitModalClose = () => {
    setModalOpenWait(false);
    setModalOpen(false);
    setDepositing(false);
  };

  return (
    <>
      {chain?.id === 56 ? (
        endedpool ? (
          ""
        ) : (
          <button
            onClick={() => setModalOpen(true)}
            className="bg-gradient-to-br from-green-400 to-yellow-300 text-black text-sm p-3 pl-5 pr-5 rounded-[1rem]"
          >
            Stake
          </button>
        )
      ) : (
        <button
          onClick={() => switchNetwork?.(56)}
          className="bg-gradient-to-br from-red-400 to-red-300 text-white text-sm p-3 pl-5 pr-5 rounded-[1rem]"
        >
          Wrong Network
        </button>
      )}
      {depositing ? (
        <Modal show={modalOpenWait} size="md">
          <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                onClick={handleWaitModalClose}
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-hide="popup-modal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-6 text-center">
                <Spinner />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Staking please wait...
                </h3>
              </div>
            </div>
          </div>
        </Modal>
      ) : (
        <Modal show={modalOpen} size="md">
          <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                onClick={() => handleCloseModal()}
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-hide="authentication-modal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                  Stake {name}
                </h3>
                <form className="space-y-6">
                  <div className="relative">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Your Balance: {userBalance} {name}
                    </label>
                    <input
                      ref={(input) => {
                        if (input) {
                          input.focus();
                        }
                      }}
                      inputMode="decimal"
                      title="Token Amount"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                      autoComplete="new-password"
                      type="text"
                      pattern="^[0-9]*[.,]?[0-9]*$"
                      min="0"
                      minLength={1}
                      maxLength={79}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Deposit amount"
                      value={depositAmount}
                      onChange={handleChange}
                    />
                    <button
                      onClick={() => setMax()}
                      type="button"
                      className="bg-gradient-to-br from-green-400 to-yellow-300 text-white absolute right-2.5 bottom-[3px] font-medium rounded-lg text-sm px-4 py-2"
                    >
                      Max
                    </button>
                  </div>

                  {buttonElement}
                </form>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default DepositModal;
