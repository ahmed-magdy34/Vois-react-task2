import React from "react";

/**
 * Logo Component
 *
 * Renders the application logo as a styled heading.
 * The component displays the text "Modawna" with specific inline styles
 * for color, font weight, font size, and text alignment.
 *
 * @component
 * @example
 * return (
 *   <Logo />
 * )
 *
 * @returns {JSX.Element} A React element that represents the logo.
 */
const Logo: React.FC = () => {
  return (
    <div>
      <h1
        style={{
          color: "white",
          fontWeight: "bolder",
          fontSize: "32px",
          textAlign: "center",
        }}
      >
        Modawna
      </h1>
    </div>
  );
};

export default Logo;
