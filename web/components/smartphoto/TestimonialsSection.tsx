import React from "react";

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="homepage-testimonials fadein visible">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-8 col-lg-8 col-xl-8 col-sm-9">
            <h2>
              Listen to What Our
              <br />
              Clients Have to Say About Us
            </h2>
            <div className="space20"></div>
          </div>
          <div className="col-md-4 col-lg-4 col-xl-4 col-sm-3 text-right">
            <a href="/testimonials.php" className="butn3 butn__new butn-size">
              See More Reviews
            </a>
            <div className="space20"></div>
          </div>
        </div>
        <div className="row">
          {/* Review 1 */}
          <div className="col-md-12 col-lg-4 col-xl-4 col-sm-6">
            <div className="home-testimonials-box">
              <img
                src="/images/homepage/icon-quotes-white.webp"
                alt="Quote"
                className="quote-home"
              />
              <p>
                Their edits are always sharp and on point. They really get our style,
                and their quick responses make the whole process so much easier.
              </p>
              <div className="d-flex flex-nowrap justify-content-top">
                <div className="flex-shrink-0">
                  <img
                    src="/images/homepage/testi-user1.webp"
                    alt="Photo Editing Manager"
                    className="testi-user"
                  />
                </div>
                <div className="flex-grow-1">
                  <p className="font-semibold text-white">Brand Manager</p>
                  <p className="text-gray-400">Jewelry Company, UK</p>
                </div>
              </div>
            </div>
          </div>

          {/* Review 2 (White Box) */}
          <div className="col-md-12 col-lg-4 col-xl-4 col-sm-6">
            <div className="home-testimonials-box white">
              <img
                src="/images/homepage/icon-quotes-black.webp"
                alt="Quote"
                className="quote-home"
              />
              <p>
                They always nail the edits, and the results look fantastic. Super
                easy to work with, and their support feels genuinely helpful — not
                just professional, but like our extended team.
              </p>
              <div className="d-flex flex-nowrap justify-content-top">
                <div className="flex-shrink-0">
                  <img
                    src="/images/homepage/testi-user2.webp"
                    alt="Photo Editing Manager"
                    className="testi-user"
                  />
                </div>
                <div className="flex-grow-1">
                  <p className="font-semibold text-black">Photography Lead</p>
                  <p className="text-gray-600">Interior Design Studio, Australia</p>
                </div>
              </div>
            </div>
          </div>

          {/* Review 3 */}
          <div className="col-md-12 col-lg-4 col-xl-4 col-sm-6">
            <div className="home-testimonials-box">
              <img
                src="/images/homepage/icon-quotes-white.webp"
                alt="Quote"
                className="quote-home"
              />
              <p>
                Our visuals turned out way better than we imagined. They’re quick
                with tweaks, really know their stuff, and we genuinely trust them to
                get it right every time.
              </p>
              <div className="d-flex flex-nowrap justify-content-top">
                <div className="flex-shrink-0">
                  <img
                    src="/images/homepage/testi-user3.webp"
                    alt="Photo Editing Manager"
                    className="testi-user"
                  />
                </div>
                <div className="flex-grow-1">
                  <p className="font-semibold text-white">Digital Marketing Manager</p>
                  <p className="text-gray-400">Travel & Hospitality, Singapore</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
