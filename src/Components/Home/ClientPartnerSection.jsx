"use client";

import { useEffect, useState } from "react";

// CLIENTS
import samsung from "../../assets/clients/samsungpng.png";
import hp from "../../assets/clients/hp.png";
import netapp from "../../assets/clients/netapp.png";
import dell from "../../assets/clients/dell.png";
import cisco from "../../assets/clients/cisco.png";
import aws from "../../assets/clients/aws.png";
import hitachi from "../../assets/clients/hitachi.png";
import suse from "../../assets/clients/suse.png";
import microsoft from "../../assets/clients/microsoft.png";
import oracle from "../../assets/clients/oracle.png";
import trend from "../../assets/clients/trend.png";
import welcomhotel from "../../assets/clients/welcomhotel.png";
import iitmandi from "../../assets/clients/iitmandi.png";
import idds from "../../assets/clients/idds.png";
import gku from "../../assets/clients/gku.png";
import bharatpetroleum from "../../assets/clients/bharatpetroleum.png";



// PARTNERS
import acer from "../../assets/partners/acer.png";
import juniper from "../../assets/partners/juniper.png";
import panasonic from "../../assets/partners/panasonic.png";
import peoplelink from "../../assets/partners/peoplelink.png";

export default function ClientPartnerSection() {
  const [showPartners, setShowPartners] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowPartners((prev) => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#fffffd] py-[90px] overflow-hidden">

      {/* CARD */}
      <div
        className="
          relative
          max-w-[1180px]
          h-[360px]
          mx-auto
          rounded-[18px]
          bg-[#F8F8F8]
          border border-[#EAEAEA]
          shadow-[0_10px_30px_rgba(0,0,0,0.12)]
          py-[42px]
          px-[48px]
          overflow-hidden
        "
      >

        {/* CLIENTS PAGE */}
        <div
          className={`
            absolute
            inset-0
            flex
            flex-col
            items-center
            justify-center
            transition-all
            duration-700
            px-[48px]
            py-[42px]
            ${
              showPartners
                ? "opacity-0 rotate-y-90 scale-95"
                : "opacity-100 rotate-y-0 scale-100"
            }
          `}
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          }}
        >

          <h2 className="text-[34px] font-[700] tracking-[3px] uppercase mb-[30px] text-[#111]">
            Our Clients
          </h2>

          <div className="grid grid-cols-8 gap-y-[38px] gap-x-[42px] place-items-center">

            <img src={samsung} className="w-[95px] object-contain" />
            <img src={hp} className="w-[55px] object-contain" />
            <img src={netapp} className="w-[88px] object-contain" />
            <img src={dell} className="w-[78px] object-contain" />
            <img src={cisco} className="w-[70px] object-contain" />
            <img src={aws} className="w-[72px] object-contain" />

            <img src={hitachi} className="w-[95px] object-contain" />
            <img src={suse} className="w-[82px] object-contain" />
            <img src={microsoft} className="w-[60px] object-contain" />
            <img src={oracle} className="w-[72px] object-contain" />
            <img src={trend} className="w-[58px] object-contain" />
            <img src={welcomhotel} className="w-[78px] object-contain" />
             <img src={bharatpetroleum} className="w-[45px] object-contain" />
              <img src={iitmandi} className="w-[78px] object-contain" />
               <img src={idds} className="w-[78px] object-contain" />
                <img src={gku} className="w-[78px] object-contain" />
           

            

          </div>
        </div>

        {/* PARTNERS PAGE */}
        <div
          className={`
            absolute
            inset-0
            flex
            flex-col
            items-center
            justify-center
            transition-all
            duration-700
            px-[48px]
            py-[42px]
            ${
              showPartners
                ? "opacity-100 rotate-y-0 scale-100"
                : "opacity-0 -rotate-y-90 scale-95"
            }
          `}
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          }}
        >

          <h2 className="text-[34px] font-[700] tracking-[3px] uppercase mb-[30px] text-[#111]">
            Our Partners
          </h2>

          <div className="grid grid-cols-6 gap-y-[38px] gap-x-[42px] place-items-center">

            <img src={aws} className="w-[82px] object-contain" />
            <img src={oracle} className="w-[70px] object-contain" />
            <img src={samsung} className="w-[105px] object-contain" />
            <img src={netapp} className="w-[92px] object-contain" />
            <img src={juniper} className="w-[112px] object-contain" />
            <img src={cisco} className="w-[82px] object-contain" />

            <img src={acer} className="w-[82px] object-contain" />
            <img src={peoplelink} className="w-[82px] object-contain" />
            <img src={trend} className="w-[65px] object-contain" />
            <img src={panasonic} className="w-[62px] object-contain" />
            <img src={hp} className="w-[55px] object-contain" />
            <img src={microsoft} className="w-[65px] object-contain" />

          </div>
        </div>
      </div>
    </section>
  );
}