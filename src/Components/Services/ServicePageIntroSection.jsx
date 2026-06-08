const ServicePageIntroSection = () => {
  return (
    <section className="w-full bg-[#F4F7FB] py-32">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-24 items-start">

          {/* Left Side */}
          <div>
            <h2
              className="
                text-[32px]
                md:text-[26px]
                font-bold
                leading-[1.28]
                text-[#0F172A]
              "
            >
              We handle the full end-user computing lifecycle so your teams stay productive from day one.
              Whether you're rolling out a single office or thousands of{" "}
              <span className="text-[#1A56DB]">
                endpoints across the country.
              </span>
            </h2>
          </div>

          {/* Right Side */}
          <div className="flex items-start gap-6 mt-4">

            <div className="w-[3px] h-[72px] bg-[#F59E0B] rounded-full" />

            <p
              className="
                text-[#5B6B82]
                text-[17px]
                leading-8
                max-w-[420px]
              "
            >
              CSK manages design, procurement, deployment, and ongoing support under one accountable partner.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ServicePageIntroSection;