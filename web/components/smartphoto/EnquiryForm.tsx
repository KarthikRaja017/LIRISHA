"use client";

import React, { useState } from "react";

export interface EnquiryFormProps {
  initialData?: {
    heading?: string;
    subtitle?: string;
    buttonText?: string;
    successHeading?: string;
    successMessage?: string;
  };
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({ initialData }) => {
  const heading = initialData?.heading || "Enquiry Now";
  const buttonText = initialData?.buttonText || "Submit";
  const successHeading = initialData?.successHeading || "Thank You!";
  const successMessage =
    initialData?.successMessage ||
    "Your enquiry has been received. Our photo editing specialists will get back to you within 12 hours.";
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    requirements: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = "Please enter your full name";
    if (!formData.email.trim() || !formData.email.includes("@")) {
      errs.email = "Please enter a valid work email";
    }
    if (!formData.phone.trim()) errs.phone = "Please enter your work phone";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  return (
    <section className="homepage-enquiry fadein visible relative overflow-hidden">
      <div className="clouds relative min-h-[500px] flex items-center justify-center py-12">
        {/* Animated Moving Cloud Background */}
        <div className="animation">
          <div className="cloud cloud1"></div>
          <div className="cloud cloud2"></div>
          <div className="cloud cloud3"></div>
        </div>

        <div className="container relative z-10">
          <div className="row">
            <div className="col-md-10 col-lg-6 col-xl-6 col-xxl-4 offset-xxl-4 offset-md-1 offset-xl-3 offset-lg-3">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
                {heading}
              </h2>

              {submitted ? (
                <div className="home-page-form bg-white/90 p-8 rounded-xl shadow-lg text-center">
                  <i className="fa fa-check-circle text-5xl text-[#1265E8] mb-4 block"></i>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {successHeading}
                  </h3>
                  <p className="text-gray-600">
                    {successMessage}
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: "",
                        email: "",
                        phone: "",
                        requirements: "",
                      });
                    }}
                    className="butn3 butn__new butn1-size mt-4"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="home-page-form small-form validate shadow-xl"
                >
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-field">
                        <label htmlFor="FirstName" className="visually-hidden">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="FirstName"
                          id="FirstName"
                          className="form-control"
                          placeholder="Full Name"
                          value={formData.fullName}
                          onChange={(e) =>
                            setFormData({ ...formData, fullName: e.target.value })
                          }
                        />
                        {errors.fullName && (
                          <span className="error">{errors.fullName}</span>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-field">
                        <label htmlFor="Email" className="visually-hidden">
                          Work Email
                        </label>
                        <input
                          className="form-control"
                          name="Email"
                          type="email"
                          id="Email"
                          placeholder="Work Email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                        {errors.email && (
                          <span className="error">{errors.email}</span>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-field">
                        <label htmlFor="phone" className="visually-hidden">
                          Work Number
                        </label>
                        <input
                          name="phone"
                          type="tel"
                          id="phone"
                          className="form-control"
                          placeholder="Work Number"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                        />
                        {errors.phone && (
                          <span className="error">{errors.phone}</span>
                        )}
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-field">
                        <label htmlFor="description" className="visually-hidden">
                          Describe your requirements
                        </label>
                        <textarea
                          className="form-control"
                          name="description"
                          id="description"
                          rows={3}
                          placeholder="Describe your requirements"
                          value={formData.requirements}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              requirements: e.target.value,
                            })
                          }
                        ></textarea>
                      </div>
                    </div>

                    <div className="col-md-8">
                      <div className="form-field">
                        <label htmlFor="upfile1" className="visually-hidden">
                          Upload File
                        </label>
                        <input
                          className="form-control mb-1"
                          name="upfile1"
                          id="upfile1"
                          type="file"
                        />
                      </div>
                      <p className="form-fileupload text-left text-xs text-gray-500">
                        File more than 2MB? Email Us:{" "}
                        <a
                          href="mailto:info@smartphotoeditors.com"
                          className="click2copy underline font-semibold"
                        >
                          info***@smartphotoeditors.com{" "}
                          <i className="far fa-copy"></i>
                        </a>
                      </p>
                    </div>

                    <div className="col-md-4">
                      <div className="form-field text-center">
                        <button
                          id="submitBtn"
                          type="submit"
                          className="butn3 butn__new butn1-size w-full"
                        >
                          Submit
                        </button>
                      </div>
                    </div>

                    <div className="col-md-12 text-center mt-3">
                      <a className="pp text-xs text-gray-500" href="/privacy-policy">
                        Privacy Policy
                      </a>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
