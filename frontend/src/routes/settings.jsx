import React from "react";
import Settings from "../components/settings/settings";
import Certificate from "../components/certificate";

function SettingsRoute(props) {
  return (
    <>
      <Settings toast={props.toast} />
    </>
  );
}

export default SettingsRoute;
