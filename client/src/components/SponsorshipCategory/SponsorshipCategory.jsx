import React from "react";
import "./SponsorshipCategory.css";

const SponsorCategory = () => {
  const categories = [
    { amount: "2.5 lAkH", title1: "BECA", title2: "SPONSOR" },
    { amount: "5.0 lAkH", title1: "ASSOCIATE", title2: "SPONSOR" },
    { amount: "8.0 lAkH", title1: "Co-", title2: "SPONSOR" },
    { amount: "10 lAkH", title1: "TITLE", title2: "SPONSOR" },
  ];

  return (
    <div className="sponsorship-timeline-container">
      <div className="timeline-items">
        <div className="timeline-line-bg"></div>
        {categories.map((cat, index) => (
          <React.Fragment key={index}>
            <div className={`timeline-amount item-${index}`}>{cat.amount}</div>
            <div className={`timeline-dot item-${index}`}></div>
            <div className={`timeline-title item-${index}`}>
              <div>{cat.title1}</div>
              <div>{cat.title2}</div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SponsorCategory;