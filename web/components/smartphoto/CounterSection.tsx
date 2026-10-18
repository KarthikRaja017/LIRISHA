"use client";

import React from "react";

export interface StatItem {
  count: string;
  label: string;
  icon: string;
  alt?: string;
  iconClass?: string;
}

export interface CounterSectionProps {
  initialStats?: StatItem[];
}

export const CounterSection: React.FC<CounterSectionProps> = ({ initialStats }) => {
  const defaultStats: StatItem[] = [
    {
      count: "05+",
      label: "Awards Rewarded",
      icon: "/images/homepage/icon-award.webp",
      alt: "Awards Rewarded Quote",
      iconClass: "award1",
    },
    {
      count: "13+",
      label: "Years of Experience",
      icon: "/images/homepage/icon-experience.webp",
      alt: "Years of Experience Quote",
      iconClass: "",
    },
    {
      count: "1000+",
      label: "Completed Projects",
      icon: "/images/homepage/icon-projects.webp",
      alt: "Completed Projects Quote",
      iconClass: "",
    },
    {
      count: "1300+",
      label: "Happy Clients",
      icon: "/images/homepage/icon-clients.webp",
      alt: "Happy Clients Quote",
      iconClass: "",
    },
  ];

  const activeStats = initialStats && initialStats.length > 0 ? initialStats : defaultStats;

  return (
    <section className="homepage-counter fadein visible">
      <div className="container">
        <div className="row">
          {activeStats.map((stat, idx) => (
            <div key={idx} className="col-md-6 col-lg-3 col-xl-3 col-sm-6">
              <div className="homepage-counter-box media">
                <div className="media-body">
                  <span>{stat.count}</span>
                  <p>{stat.label}</p>
                </div>
                <img
                  src={stat.icon}
                  alt={stat.alt}
                  className={stat.iconClass || "img-fluid"}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
