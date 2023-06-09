import numeral from "numeral";

interface PoolCardDetailsProps {
  tvl?: number;
  displayApr: number | undefined;
  account?: string;
  earn: number;
}

const PoolCardDetails: React.FC<
  React.PropsWithChildren<PoolCardDetailsProps>
> = ({ tvl, displayApr, account, earn }) => {
  return (
    <div className="flex justify-center col-span-2 space-x-4">
      <span className="px-4 py-2 text-white hidden md:flex col-span-2 justify-center">
        $
        {Number(numeral(tvl).format("0.000a")) > 0
          ? numeral(tvl).format("0.000a")
          : 0}
      </span>
      <span className="px-4 py-2 text-white hidden md:flex col-span-2 justify-center">
        {numeral(Number(displayApr).toFixed(2)).format("0.0a")}%
      </span>
      <span className="px-4 py-2 text-white hidden md:flex col-span-2 justify-center">
        {earn > 0 ? earn.toFixed(3) : 0}
      </span>
    </div>
  );
};

export default PoolCardDetails;
