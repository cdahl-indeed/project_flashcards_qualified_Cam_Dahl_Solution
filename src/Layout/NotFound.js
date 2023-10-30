import React from "react";
import { useLocation } from "react-router-dom";


function NotFound() {

    const location = useLocation();

  return (
    <div className="NotFound">
      <h1>Not Found <code>{location.pathname}</code></h1>
    </div>
  );
}

export default NotFound;
