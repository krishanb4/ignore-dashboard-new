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
        ${tvl?.toFixed(3)}
      </span>
      <span className="px-4 py-2 text-white hidden md:flex col-span-2 justify-center">
        {displayApr}%
      </span>
      <span className="px-4 py-2 text-white hidden md:flex col-span-2 justify-center">
        {earn > 0 ? earn.toFixed(3) : 0}
      </span>
    </div>
  );
};

export default PoolCardDetails;
