/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

import axios from "axios";
import Device from "./Device";

const DeviceCard = (props) => {
  const location = useLocation();
  console.log(location.pathname);
  const deviceName = props.data[1];
  const deviceId = props.data[0];
  const [status, setStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deviceType, setDeviceType] = useState("");
  const [disabledState, setDisabledState] = useState(false);

  const changeState = async () => {
    setIsLoading(!isLoading);
    // console.log(status);
    const cmd = status ? "OFF" : "ON";
    const options = {
      method: "POST",
      url: "https://opentpl1.p.rapidapi.com/dev/tplapi",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Host": "opentpl1.p.rapidapi.com",
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
      data:
        '{"body":{"command":"' +
        cmd +
        '","plugid":"' +
        deviceId +
        '"},"uuid":"' +
        sessionStorage.getItem("userName") +
        '"}',
    };
    var response = await axios.request(options);
    // console.log("🚀 ~ file: DeviceCard.js ~ line 22 ~ getStatus ~ response", response.data.state);
    //if the response is OFF or NA we put the status as false i.e is OFF.
    setStatus(response.data.state === "ON" ? true : false);
    setIsLoading(false);
    getStatus(deviceId);
  };

  const getStatus = async (deviceID = "") => {
    setIsLoading(!isLoading);
    const options = {
      method: "POST",
      url: "https://opentpl1.p.rapidapi.com/dev/tplapi",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Host": "opentpl1.p.rapidapi.com",
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
      data:
        '{"body":{"command":"status","plugid":"' +
        deviceId +
        '"},"uuid":"' +
        sessionStorage.getItem("userName") +
        '"}',
    };
    // console.log("🚀 ~ file: DeviceCard.js ~ line 41 ~ getStatus ~ options", options)
    try{
    var response = await axios.request(options);

    console.log(
      "🚀 ~ file: DeviceCard.js ~ line 22 ~ getStatus ~ response",
      response
    );
    //if the response is OFF or NA we put the status as false i.e is OFF.
    setIsLoading(false);
    if (response.status === 200) {
      setStatus(response.data.state === "ON" ? true : false);
      setDeviceType(
        response.data.model === "HS300(US)" ||
          response.data.model === "HS110(US)" ||
          response.data.model === "HS100(US)" ||
          response.data.model === "HS300(US)" ||
          response.data.model === "KP115(US)"
          ? "plug"
          : response.data.model === "HS200(US)"
          ? "switch"
          : "light"
      );
    } else if(response.status === 500){
      setDisabledState(true);
    }} catch(error) {
      setIsLoading(false);
      setDisabledState(true);
    }
  };

  useEffect(() => {
    getStatus();
  }, []);
  return (
    <div>
      {location.pathname === "/dashboard/allSwitches" &&
      deviceType === "switch" ? (
        <Device
          disabledState={disabledState}
          key={deviceId + deviceName}
          isLoading={isLoading}
          deviceId={deviceId}
          deviceType={deviceType}
          status={status}
          deviceName={deviceName}
          onChangeState={changeState}
        />
      ) : location.pathname === "/dashboard/allLights" &&
        deviceType === "light" ? (
        <Device
          disabledState={disabledState}
          key={deviceId + deviceName}
          isLoading={isLoading}
          deviceId={deviceId}
          deviceType={deviceType}
          status={status}
          deviceName={deviceName}
          onChangeState={changeState}
        />
      ) : location.pathname === "/dashboard/allPlugs" &&
        deviceType === "plug" ? (
        <Device
          disabledState={disabledState}
          key={deviceId + deviceName}
          isLoading={isLoading}
          deviceId={deviceId}
          deviceType={deviceType}
          status={status}
          deviceName={deviceName}
          onChangeState={changeState}
        />
      ) : location.pathname === "/dashboard/home" ? (
        <Device
          disabledState={disabledState}
          key={deviceId + deviceName}
          isLoading={isLoading}
          deviceId={deviceId}
          deviceType={deviceType}
          status={status}
          deviceName={deviceName}
          onChangeState={changeState}
        />
      ) : null}
    </div>
  );
};

export default DeviceCard;
