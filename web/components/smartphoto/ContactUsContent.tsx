"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export const ContactUsContent: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    description: "",
    consentSms: true,
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copyToast, setCopyToast] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    const emailToCopy = "info@smartphotoeditors.com";
    navigator.clipboard
      .writeText(emailToCopy)
      .then(() => {
        setCopyToast("Email copied to clipboard: " + emailToCopy);
        setTimeout(() => setCopyToast(null), 3500);
      })
      .catch((err) => {
        console.error("Clipboard copy failed", err);
        alert("Email copied: " + emailToCopy);
      });
  };

  const handleChatClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setCopyToast("Live Chat is available 24/7. An agent will connect shortly!");
    setTimeout(() => setCopyToast(null), 3500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = "Please enter your full name";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Please describe your requirements";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        firstName: "",
        email: "",
        phone: "",
        description: "",
        consentSms: true,
      });
      setSelectedFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }, 1200);
  };

  return (
    <div className="contact-page-inner">
      {/* Toast Notification */}
      {copyToast && (
        <div
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            zIndex: 9999,
            backgroundColor: "#07152F",
            color: "#ffffff",
            padding: "14px 24px",
            borderRadius: "8px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "15px",
            fontWeight: 500,
            borderLeft: "4px solid #1265E8",
          }}
        >
          <i className="fa-solid fa-circle-check" style={{ color: "#8dce3c", fontSize: "18px" }}></i>
          <span>{copyToast}</span>
        </div>
      )}

      {/* INNER BANNER */}
      <section
        className="inner-banner contact"
        style={{
          backgroundImage: "url('/images/banner-contact-us.webp')",
          backgroundSize: "cover",
          backgroundPosition: "top left",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="inner-banner-title text-center">Contact Us</h1>

              <ul className="banner-contact-info">
                <li>
                  <a href="tel:+18559240830">
                    <Image
                      className="img-fluid"
                      title="contact phone"
                      alt="contact phone"
                      width={40}
                      height={40}
                      src="/images/icon-contact-phone.svg"
                    />
                    <span>1-855-924-0830</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="click2copy" onClick={handleCopyEmail}>
                    <Image
                      title="Email"
                      alt="Email"
                      className="img-fluid"
                      width={40}
                      height={40}
                      src="/images/icon-contact-mail.svg"
                    />
                    <span>Email</span>
                  </a>
                </li>
                <li>
                  <a href="#" onClick={handleChatClick}>
                    <Image
                      className="img-fluid"
                      title="Chat"
                      alt="Chat"
                      width={40}
                      height={40}
                      src="/images/icon-contact-chat.svg"
                    />
                    <span>Chat</span>
                  </a>
                </li>
              </ul>

              <ul
                className="breadcrum justify-content-start"
                itemScope
                itemType="http://schema.org/BreadcrumbList"
              >
                <li
                  itemProp="itemListElement"
                  itemScope
                  itemType="http://schema.org/ListItem"
                >
                  <Link itemProp="item" href="/">
                    <span itemProp="name">Home</span>
                  </Link>
                  &nbsp;&nbsp; &gt;
                  <meta itemProp="position" content="1" />
                </li>
                <li
                  className="text-dark"
                  itemProp="itemListElement"
                  itemScope
                  itemType="http://schema.org/ListItem"
                >
                  <span itemProp="name" style={{ color: "#343a40" }}>
                    Contact Us
                  </span>
                  <meta itemProp="position" content="2" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION CONTACT INFO & FORM */}
      <section className="section-contact-info">
        <div className="container">
          <div className="row">
            {/* LEFT COLUMN: FORM */}
            <div className="col-md-12 col-lg-7">
              <div className="contact-form-wrap">
                <h3>Contact Us</h3>
                <p>
                  &quot;You can also email us at{" "}
                  <a
                    href="#"
                    className="click2copy"
                    onClick={handleCopyEmail}
                    title="Click to copy email address"
                  >
                    info***@smartphotoeditors.com <i className="far fa-copy"></i>
                  </a>{" "}
                  and <br />
                  we&apos;ll get back to in one business day&quot;
                </p>

                {isSubmitted && (
                  <div
                    style={{
                      padding: "16px 20px",
                      marginBottom: "24px",
                      backgroundColor: "#e8f5e9",
                      border: "1px solid #c8e6c9",
                      borderRadius: "8px",
                      color: "#2e7d32",
                      fontSize: "15px",
                      lineHeight: "1.5",
                    }}
                  >
                    <strong>✓ Thank You!</strong> Your request has been successfully
                    submitted. A dedicated account manager will get back to you within
                    one business day.
                  </div>
                )}

                <form
                  name="generalform"
                  className="main-form"
                  id="generalform"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <div className="row">
                    <div className="col-md-12">
                      <input
                        name="FirstName"
                        type="text"
                        id="FirstName"
                        className="form-control"
                        placeholder="Full Name"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({ ...formData, firstName: e.target.value })
                        }
                      />
                      {errors.firstName && (
                        <span id="nameError" className="error">
                          {errors.firstName}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <input
                        name="Email"
                        type="email"
                        id="Email"
                        className="form-control"
                        placeholder="Work Email ID"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                      {errors.email && (
                        <span id="emailError" className="error">
                          {errors.email}
                        </span>
                      )}
                    </div>
                    <div className="col-md-6">
                      <input
                        name="phone"
                        type="tel"
                        id="phone"
                        className="form-control"
                        placeholder="Work Phone Number"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                      {errors.phone && (
                        <span id="numberError" className="error">
                          {errors.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <textarea
                        name="description"
                        className="form-control"
                        id="description"
                        placeholder="Describe your requirements"
                        rows={5}
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({ ...formData, description: e.target.value })
                        }
                      ></textarea>
                      {errors.description && (
                        <span id="messageError" className="error">
                          {errors.description}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div
                        className="contact-file-box"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <input
                          ref={fileInputRef}
                          name="upfile1[]"
                          multiple
                          type="file"
                          className="txt-field upload"
                          onChange={handleFileChange}
                        />
                        <span
                          style={{
                            fontSize: "14px",
                            color: selectedFiles.length > 0 ? "#07152F" : "#707070",
                            fontWeight: selectedFiles.length > 0 ? 600 : 400,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            padding: "0 8px",
                          }}
                        >
                          {selectedFiles.length > 0
                            ? selectedFiles.length === 1
                              ? selectedFiles[0].name
                              : `${selectedFiles.length} files selected`
                            : "Upload files (or drop here)"}
                        </span>
                      </div>
                      <p className="form-fileupload text-center">
                        File more than 2MB? Email Us:{" "}
                        <a href="#" className="click2copy" onClick={handleCopyEmail}>
                          info***@smartphotoeditors.com{" "}
                          <i className="far fa-copy"></i>
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12 consent-content">
                      <p>
                        <label
                          style={{
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={formData.consentSms}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                consentSms: e.target.checked,
                              })
                            }
                          />
                          <span>
                            I consent to receive SMS from smartphotoeditors.com
                          </span>
                        </label>
                      </p>
                      <p>
                        A disclaimer By submitting contact information on this
                        website, you consent to receive calls, SMS, and emails from
                        smartphotoeditors.com. You certify that you are the owner of
                        the contact information provided.
                      </p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <button
                        id="submitBtn"
                        type="submit"
                        name="submit"
                        value="Submit"
                        className="btn btn-primary btn-contact-submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </button>
                    </div>
                  </div>

                  <div className="row mt-2">
                    <div className="col-md-12 text-center">
                      <Link href="/privacy-policy.php" className="text-orange">
                        Privacy Policy
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* RIGHT COLUMN: LOCATIONS & MAP */}
            <div className="col-md-12 col-lg-5 pl-md-5">
              <ul className="location-list">
                <li>
                  <div className="country-name">USA</div>
                  <p>116 Village Blvd, Suite 220, Princeton, NJ 08540</p>
                </li>
                <li>
                  <div className="country-name">INDIA</div>
                  <p>
                    No.6, Banaswadi Main Road, Dodda Banaswadi, Bangalore - 560 043
                  </p>
                </li>
                <li>
                  <div className="country-name">PHILIPPINES</div>
                  <p>Aeon Towers, J.P. Laurel Avenue, Bajada, Davao City 8000</p>
                </li>
              </ul>

              <div className="map-location mt-4">
                <div className="google_map">
                  <iframe
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Smart Photo Edits Location"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15549.385111286761!2d77.661375!3d13.013607!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae114392e8f37f%3A0x8f482cafd65ddd13!2sSmart%20Photo%20Edits!5e0!3m2!1sen!2sin!4v1711539891005!5m2!1sen!2sin"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
