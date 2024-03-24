import React, { useContext } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Select from "react-select";
import { themeOptions } from "../Styles/theme";
import { ThemeContext } from "../Context/ThemeContext";

const Footer = () => {
  const { setTheme, defaultValue } = useContext(ThemeContext);

  const handleThemeChange = (e) => {
    setTheme(e.value);
    localStorage.setItem("theme", JSON.stringify(e.value));
  };

  return (
    <div className="footer">
      <div className="links">
        <a
          href="https://github.com/riyagarwal"
          target="_blank"
          rel="noreferrer"
          style={{ color: "inherit" }}
        >
          <GitHubIcon />
        </a>

        <a
          href="https://www.linkedin.com/in/riya-agarwal445/"
          target="_blank"
          rel="noreferrer"
          style={{ color: "inherit" }}
        >
          <LinkedInIcon />
        </a>
      </div>
      <div className="themes">
        {/* select button will go */}
        <Select
          menuPlacement="top"
          options={themeOptions}
          onChange={handleThemeChange}
          defaultValue={{ value: defaultValue, label: defaultValue.label }}
        />
      </div>
    </div>
  );
};

export default Footer;
