import React from "react";

import {
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagramSquare,
} from "react-icons/fa";

type Props = {};

export default function Footer({}: Props) {
  return (
    <div className="flex justify-center items-center gap-3 py-3">
      <FaInstagramSquare className="text-3xl-flex brand-text-hover" />
      <FaFacebookSquare className="text-3xl-flex brand-text-hover" />
      <FaGithubSquare className="text-3xl-flex brand-text-hover" />
    </div>
  );
}
