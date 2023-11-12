import numeral from "numeral";

interface PoolCardDetailsProps {
  tvl?: number;
}

const PoolCardDetails: React.FC<
  React.PropsWithChildren<PoolCardDetailsProps>
> = ({ tvl }) => {
  return (
    <div className="flex justify-center col-span-2 space-x-4">
      <span className="px-4 py-2 text-white hidden md:flex col-span-2 justify-center">
        {Number(tvl) > 0 ? tvl : 0} 4TOKEN
      </span>
    </div>
  );
};

export default PoolCardDetails;
