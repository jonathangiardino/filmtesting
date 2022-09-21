import React, { FC } from "react";

const Hero: FC = () => {
  return (
    <div className="flex flex-col mt-12 px-10 justify-start">
      <h1 className="max-w-[600px] text-5xl leading-[56px]">
        Your go-to place to research and review movies.
      </h1>
    </div>
  );
};

export default Hero;
