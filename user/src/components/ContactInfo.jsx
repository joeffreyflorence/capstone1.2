import React from "react";

const ContactInfo = () => {
  const contactInfoStyle = {
    backgroundColor: "#1d1d24",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    textAlign: "center",
  };

  const headerStyle = {
    fontSize: "24px",
    marginBottom: "10px",
  };

  const paragraphStyle = {
    fontSize: "16px",
    marginBottom: "10px",
  };

  const listStyle = {
    listStyle: "none",
    padding: "0",
  };

  const listItemStyle = {
    fontSize: "16px",
    marginBottom: "5px",
  };

  return (
    <div style={contactInfoStyle} className="contact-section">
      <h1 style={headerStyle} className="contact-header">
        Contact Us
      </h1>
      <p style={paragraphStyle}>
        If you have any questions or need assistance, please feel free to contact us:
      </p>
      <ul style={listStyle}>
        <li style={listItemStyle}>Email: dagupancrimereport@gmail.com</li>
        <li style={listItemStyle}>Phone: 0912-456-7890</li>
        <li style={listItemStyle}>Address: 123 Arellano Street, Dagupan City</li>
      </ul>
    </div>
  );
};

export default ContactInfo;
