import React, { FC } from 'react'

const Footer: FC = () => {
  return (
    <footer className="flex h-24 w-full items-center justify-center border-t">
      <a
        className="flex items-center justify-center gap-2"
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by <span className="text-2xl">&bull;</span>{" "}
        <strong>filmtesting</strong>
      </a>
    </footer>
  );
};

export default Footer