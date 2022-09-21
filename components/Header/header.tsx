import React, { FC } from 'react'

const Header: FC = () => {
  return (
    <div className="h-[70px] w-screen max-w-full border-solid border-b-[1px] border-black">
      <div className="max-w-[1330px] h-full flex items-center justify-between px-10 mx-auto">
        <div className="uppercase text-xl tracking-[7px] font-bold flex items-center gap-[2px] -ml-1">
          <span className="text-2xl">&bull;</span> filmtesting
        </div>
      </div>
    </div>
  );
};

export default Header