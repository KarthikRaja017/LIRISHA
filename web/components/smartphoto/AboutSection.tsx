import React from "react";

export interface AboutSectionProps {
  initialData?: {
    heading?: string;
    para1?: string;
    para2?: string;
  };
}

export const AboutSection: React.FC<AboutSectionProps> = ({ initialData }) => {
  const heading = initialData?.heading || "About LIRISHA Image Editing Specialists";
  const para1 =
    initialData?.para1 ||
    "LIRISHA is a team of skilled photo editing specialists with a commitment to providing quality, excellence, and satisfaction. Comprised of experienced artists, LIRISHA dedicates collective knowledge and capabilities towards transforming photos and images while exceeding client expectations.";
  const para2 =
    initialData?.para2 ||
    "We observed busy professional photographers and creative studios juggling between projects, and we started offering a dedicated hand to take care of their image post-processing activities.";

  return (
    <section className="page-intro-content fadein visible">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-12 col-xl-12 my-3 mt-1 text-center">
            <h1>{heading}</h1>
          </div>
          <div className="col-md-6 col-sm-6 col-xl-6 col-lg-6">
            <p>{para1}</p>
          </div>
          <div className="col-md-6 col-sm-6 col-xl-6 col-lg-6">
            <p>{para2}</p>
          </div>
        </div>
        <div className="space20"></div>
      </div>
    </section>
  );
};
