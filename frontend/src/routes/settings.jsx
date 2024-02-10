import React from "react";
import Settings from "../components/settings/settings";

function SettingsRoute(props) {
  return (
    <>
      <Settings toast={props.toast} />
    </>
  );
}

export default SettingsRoute;
