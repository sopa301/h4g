import axios from "axios";
import Loading from "../custom/loading";
import React, { useEffect, useState } from "react";
import SettingsForm from "./settingsForm";

function Settings(props) {
  const toastEffect = props.toast;
  const [userSettings, setUserSettings] = useState();

  useEffect(() => {
    getUser(localStorage.getItem("personId"));
  }, []);

  async function getUser(userId) {
    return await axios
      .post(import.meta.env.VITE_API_URL + "/user", {
        userId: userId,
      })
      .then((res) => {
        setUserSettings(res.data);
      })
      .catch(function (error) {
        toastEffect({
          title: "Unable to retrieve data.",
          description: getErrorMessage(error),
          status: "error",
          duration: 1000,
          isClosable: true,
        });
      });
  }

  async function updateUser(
    userEmail,
    userTelegram,
    userAge,
    userArea,
    availabilityDateFrom,
    availabilityDateTo,
    interests,
    skills,
    addInfo
  ) {
    return await axios
      .patch(import.meta.env.VITE_API_URL + "/user", {
        userId: localStorage.getItem("personId"),
        email: userEmail,
        teleHandle: userTelegram,
        age: userAge,
        area: userArea,
        availabilityDateFrom: availabilityDateFrom,
        availabilityDateTo: availabilityDateTo,
        interests: interests,
        skills: skills,
        addInfo: addInfo,
      })
      .then((res) =>
        toastEffect({
          title: "Success",
          description: "Successfully updated!",
          status: "success",
          duration: 1000,
          isClosable: true,
        })
      )
      .catch(function (error) {
        toastEffect({
          title: "Unable to update.",
          description: getErrorMessage(error),
          status: "error",
          duration: 1000,
          isClosable: true,
        });
      });
  }

  return userSettings ? (
    <SettingsForm
      updateUser={updateUser}
      userSettings={userSettings}
      toast={props.toast}
    />
  ) : (
    <Loading />
  );
}

function getErrorMessage(error) {
  if (!error.response) {
    return "Network error.";
  }
  let status = error.response.status;
  if (status === 404) {
    return "User ID not found.";
  }
  if (status === 403) {
    return "Please ensure fields are input correctly";
  }
  return "Unknown error.";
}

export default Settings;
