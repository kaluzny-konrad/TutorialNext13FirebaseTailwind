"use client";

import React from "react";
import { MdAccountBox } from "react-icons/md";
import Modal from "./Modal";

type Props = {};

export default function Header({}: Props) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <>
      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}
      <div className="sticky-nav styled-nav p-4">
        <h1 className="text-4xl-flex select-none font-extrabold">TODO LIST</h1>
        <MdAccountBox
          onClick={() => setIsModalOpen(true)}
          className="text-3xl-flex brand-text-hover"
        />
      </div>
    </>
  );
}
