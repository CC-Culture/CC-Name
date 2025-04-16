"use client";

import React, { useEffect, useState } from "react";

interface AdComponentProps {
  className?: string;
}

const localScript = `(function(d,z,s){s.src='https://'+d+'/400/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('vemtoutcheeg.com',9219562,document.createElement('script'))`;

const AdComponent2: React.FC<AdComponentProps> = ({ className = "" }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.setHTMLUnsafe(localScript);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  });

  return null;
};

export default AdComponent2;
