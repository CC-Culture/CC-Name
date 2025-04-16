"use client";

import React, { useEffect } from "react";

interface AdComponentProps {
  className?: string;
}

const AdComponent: React.FC<AdComponentProps> = ({ className = "" }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://eechicha.com/act/files/tag.min.js?z=9219011";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  });

  return null;
};

export default AdComponent;
