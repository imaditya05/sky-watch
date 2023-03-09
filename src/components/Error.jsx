import React from "react";
import Alert from "@mui/material/Alert";

export default function Error() {
  return (
    <div className="error-container">
      <Alert severity="error">{`Sorry, Can't find your city`}</Alert>
    </div>
  );
}
