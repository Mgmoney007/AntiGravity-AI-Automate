"use client";

import Script from 'next/script';

const UnicornBackground = () => {
  return (
    <>
      <div
        data-us-project="bmaMERjX2VZDtPrh4Zwx"
        className="fixed w-full h-full left-0 top-0 -z-50"
      />
      <Script
        id="unicorn-studio"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `!function(){if(!window.UnicornStudio){window.UnicornStudio={isInitialized:!1};var i=document.createElement("script");i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.34/dist/unicornStudio.umd.js",i.onload=function(){window.UnicornStudio.isInitialized||(UnicornStudio.init(),window.UnicornStudio.isInitialized=!0)},(document.head || document.body).appendChild(i)}}();`
        }}
      />
    </>
  );
};

export default UnicornBackground;
