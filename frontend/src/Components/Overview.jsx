// OVERVIEW COMPONENT
export default function Overview({ overviewArr }) {
  return (
    <div
      className={` flex flex-col gap-10 text-xl bg-red-600 p-10 rounded-lg w-[14vw] h-[82vh] shadow-shadow m-8 `}
    >
      <h2 className={`text-base text-gray-300 font-semibold`}>Overview</h2>
      <div className={`flex flex-col gap-1`}>
        {overviewArr.map(({ title, quantity, className }, index) => {
          return (
            <div key={index}>
              <h2 className={`text-xl text-white`}>{title}</h2>
              <h1
                className={`text-shadow text-3xl mb-6 text-white font-semibold drop-shadow-lg ${className}`}
              >
                {quantity < 10 ? "0" + quantity : quantity}
              </h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}
