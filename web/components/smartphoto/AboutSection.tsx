import React from "react";

export const AboutSection: React.FC = () => {
  return (
    <section className="page-intro-content fadein visible">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-12 col-xl-12 my-3 mt-1 text-center">
            <h1>About SmartPHOTOeditors Image Editing specialists</h1>
          </div>
          <div className="col-md-6 col-sm-6 col-xl-6 col-lg-6">
            <p>
              SmartPHOTOeditors (SPE) is a team of skilled photo editing specialists
              with a commitment to providing quality, excellence, and satisfaction.
              Comprised of experienced Adobe artists, SPE dedicates collective
              knowledge and capabilities towards transforming photos and images while
              exceeding client expectations.
            </p>
          </div>
          <div className="col-md-6 col-sm-6 col-xl-6 col-lg-6">
            <p>
              During the early 21st century, we observed busy professional
              photographers juggling between projects, and we started offering a
              helping hand to take care of their image post-processing activities.
            </p>
          </div>
        </div>
        <div className="space20"></div>
      </div>
    </section>
  );
};
