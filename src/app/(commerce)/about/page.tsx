import rightImg from "@/images/hero-right1.png";
import React from "react";
import SectionStatistic from "./SectionStatistic";
import BgGlassmorphism from "@/components/BgGlassmorphism/BgGlassmorphism";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import SectionHero from "./SectionHero";
import SectionClientSay from "@/components/SectionClientSay/SectionClientSay";

const PageAbout = ({}) => {
  return (
    <div className={`nc-PageAbout overflow-hidden relative`}>
      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />

      <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
        <SectionHero
          rightImg={rightImg}
          heading="👋 Tentang Kami."
          btnText=""
          subHeading="CV. Karya Cipta Magnet (KCM) adalah Specialist Permanent Magnet Trap yang berada di Kec Gunung sindur, Bogor, Jawa Barat. KCM adalah salah satu perusahaan yang bergerak dalam usaha rekayasa mekanik maupun supplier."
        />

        {/* <SectionFounder /> */}
        <div className="relative py-16">
          <BackgroundSection />
          <SectionClientSay />
        </div>

        <SectionStatistic />
      </div>
    </div>
  );
};

export default PageAbout;
