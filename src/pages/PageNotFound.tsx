import React from "react";

/**
 * if the user navigates to a route that does not exist in the application.
 * it is automatically redirected to this page and handled by the router.
 *
 * @returns {JSX.Element}
 * @description This component renders a "Page Not Found" message.
 */

const PageNotFound: React.FC = () => {
  return <h1>This Page Doesn't Exist</h1>;
};

export default PageNotFound;
