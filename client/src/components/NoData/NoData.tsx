const NoData = ({ display }: { display: string }) => {
  return (
    <div className=" flex h-[100%] font-sans w-[100%] items-center mt-20  justify-center">
      <p className="text-2xl">{display}</p>
    </div>
  );
};

export default NoData;
