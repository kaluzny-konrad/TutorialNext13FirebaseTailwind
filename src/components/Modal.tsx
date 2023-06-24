"use client";

import { useAuth } from "@/context/AuthContext";
import React, { SetStateAction, useEffect, useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import ReactDom from "react-dom";

type Props = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Modal({ setIsModalOpen }: Props) {
  const [portal, setPortal] = useState<HTMLElement | null>(null);
  const { logout, currentUser } = useAuth();

  useEffect(() => {
    const portal = document.getElementById("portal");
    setPortal(portal);
  }, []);

  if (!portal) {
    return null;
  }

  return ReactDom.createPortal(
    <div className="fixed inset-0 bg-white text-slate-900 text-lg sm:text-xl flex flex-col">
      <div className="flex items-center justify-between border-b border-solid border-slate-900 p-4">
        <h1 className="text-4xl-flex select-none font-extrabold">MENU</h1>
        <FaWindowClose
          className="text-3xl-flex brand-text-hover"
          onClick={() => setIsModalOpen(false)}
        />
      </div>
      <div className="p-4 flex flex-col gap-3">
        {currentUser && (
          <p
            onClick={() => {
              logout();
              setIsModalOpen(false);
            }}
            className="select-none duration-300 p-4 hover:pl-6 cursor-pointer"
          >
            Logout
          </p>
        )}
      </div>
    </div>,
    portal
  );
}
