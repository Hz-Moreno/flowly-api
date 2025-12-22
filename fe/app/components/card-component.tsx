import React from "react";

interface CardProps {
  children: React.ReactNode;
}

const CardComponent: React.FC<CardProps> = ({ children }) => {
  return (
    <>
      <div className="rounded flex flex-col justify-center items-center gap-4 bg-white p-4 w-lg border-stone-400 shadow-xl/30">
        {children}
      </div>
    </>
  );
};

export default CardComponent;
