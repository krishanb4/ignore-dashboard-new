import { Modal } from "flowbite-react";
import { useCallback, useEffect, useState } from "react";
import { Pool } from "../../../state/types";
import Spinner from "./Spinner";
import { Address } from "../../../state/types";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useSwitchNetwork,
  useNetwork,
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
  locked: boolean;
}

const WithdrawtModal = memo(
  ({ poolId, name, userBalance, contract, locked }: DepositModalProps) => {
    const { chain } = useNetwork();
    const { chains, pendingChainId, switchNetwork } = useSwitchNetwork();
    const [modalOpen, setModalOpen] = useState(false);
    const [depositAmount, setDepositAmount] = useState("");
    const [depositing, setDepositing] = useState(false);
    const [modalOpenWait, setModalOpenWait] = useState(false);
    const [modalOpenDisclaimer, setModalOpenDisclaimer] = useState(false);
    const [depositTo, setDepositTo] = useState("");
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const regex = /^[0-9]*$/;
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
          depositAmount,
          decimals
        );
        setDepositTo(depositAmountFormated.toString());
      } else {
        const depositAmountFormated = "0";
        setDepositTo(depositAmountFormated);
      }
    }, [depositAmount]);
    const args = {
      depositTo,
      gassData: {
        gasLimit: 1000000,
      },
    };
    const { config, error } = usePrepareContractWrite({
      address: getAddress(contract) as `0x${string}`,
      abi: stakeContract,
      functionName: "withdrawAmount",
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
        toast.success("Unstake success 👌");
        //console.log("Success", data);
        setDepositing(false);
        setModalOpenWait(false);
        setModalOpen(false);
      },
      onError(error) {
        const theme = document.documentElement.classList.contains("dark")
          ? "dark"
          : "default";
        if (theme === "default") {
          toast.error("Failed to get rewards: " + error, {
            theme: "light",
          });
        } else {
          toast.error("Failed to get rewards: " + error, {
            theme: "dark",
          });
        }
        setDepositing(false);
        setModalOpenWait(false);
        setModalOpen(false);
      },
    });

    useEffect(() => {
      console.log(transaction?.isSuccess);
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
            Unstake
          </button>
        );
      } else {
        buttonElement = (
          <button
            type="button"
            className="w-full opacity-25 bg-gradient-to-br from-green-400 to-yellow-300 text-white  focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Unstake{" "}
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
          Staked {name} balance is too low
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

    const handleDisclaimerModalClose = () => {
      setModalOpenDisclaimer(false);
      setModalOpen(true);
    };

    return (
      <>
        {chain?.id === 56 ? (
          <button
            onClick={
              locked
                ? () => setModalOpenDisclaimer(true)
                : () => setModalOpen(true)
            }
            className="bg-gradient-to-br from-green-400 to-yellow-300 text-black text-sm p-3 pl-5 pr-5 ml-1 rounded-[1rem]"
          >
            Unstake
          </button>
        ) : (
          ""
        )}
        <Modal show={modalOpenDisclaimer} size="md">
          <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                onClick={() => setModalOpenDisclaimer(false)}
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
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-6 text-center">
                <svg
                  aria-hidden="true"
                  className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to unstake? Early unstaking will cost
                  you 4% penalty
                </h3>
                <button
                  onClick={handleDisclaimerModalClose}
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                >
                  Yes, I&apos;m sure
                </button>
                <button
                  onClick={() => setModalOpenDisclaimer(false)}
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </Modal>
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
                    Unstaking please wait...
                  </h3>
                </div>
              </div>
            </div>
          </Modal>
        ) : (
          <Modal show={modalOpen} size="md" id={poolId.toString()}>
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
                    Unstake {name}
                  </h3>
                  <div className="space-y-6">
                    <div className="relative">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Your Staked Balance: {userBalance} {name}
                      </label>
                      <input
                        ref={(input) => {
                          if (input) {
                            input.focus();
                          }
                        }}
                        autoFocus={false}
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg truncate focus:outline-none focus:ring-0 without-ring  block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Withdraw amount"
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
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </>
    );
  }
);

WithdrawtModal.displayName = "WithdrawModal";

export default WithdrawtModal;
