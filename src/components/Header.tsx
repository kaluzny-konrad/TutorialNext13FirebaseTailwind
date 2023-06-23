import React from "react";
import { MdAccountBox } from "react-icons/md";

type Props = {};

export default function Header({}: Props) {
  return (
    <div className="sticky-nav styled-nav p-4">
      <h1 className="text-4xl-flex select-none">TODO LIST</h1>
      <MdAccountBox className="text-3xl-flex brand-text-hover" />
    </div>
  );
}
