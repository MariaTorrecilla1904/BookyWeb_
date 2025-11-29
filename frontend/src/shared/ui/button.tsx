import React from "react";

export const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
}) => {
  const base = "px-5 py-2 rounded-lg font-semibold transition-colors duration-200";
  const styles =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "bg-gray-200 text-gray-800 hover:bg-gray-300";

  return (
    <button onClick={onClick} type={type} className={`${base} ${styles}`}>
      {children}
    </button>
  );
};
