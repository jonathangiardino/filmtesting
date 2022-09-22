import Link from 'next/link';
import React, { FC } from 'react'

const Header: FC = () => {
  return (
    <div className="h-[70px] w-screen max-w-full border-solid border-b-[1px] border-black">
      <div className="max-w-[1330px] h-full flex items-center justify-between px-10 mx-auto">
        <Link href={"/"}>
          <div className="uppercase text-xl tracking-[7px] font-bold flex items-center gap-[2px] -ml-1 cursor-pointer">
            <span className="text-2xl">&bull;</span> filmtesting
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header