"use client";

import React, { useEffect } from "react";

interface AdComponentProps {
  className?: string;
}

const localScript = `(function(d,z,s){s.src='https://'+d+'/401/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('groleegni.net',9219445,document.createElement('script'))`;
const AdComponent2: React.FC<AdComponentProps> = ({ className = "" }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.setHTMLUnsafe(localScript);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  });

  return null;
};

export default AdComponent2;
