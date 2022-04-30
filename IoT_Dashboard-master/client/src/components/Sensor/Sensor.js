import React, { useEffect, useState } from "react";
import DataChart from "./DataChart";
import "./Sensor.css";
import classNames from "classnames";

const Sensor = ({ sensorConfig, sensorData }) => {
  const [deviceStatus, setDeviceStatus] = useState("Offline");
  const [indicatorClass, setIndicatorClass] = useState(
    classNames("indicator", "offline")
  );
  const [sensorStatus, setSensorStatus] = useState("Not Available");
  const [sensorLastUpdated, setSensorLastUpdated] = useState("Not Available");

  useEffect(() => {
    if (
      sensorData.sensorType &&
      sensorData.sensorType.toLowerCase() === sensorConfig.name.toLowerCase()
    ) {
      setDeviceStatus("Online");
      setIndicatorClass(classNames("indicator", "online"));
      if (sensorData.sensorStatus) {
        setSensorStatus(sensorData.sensorStatus);
      }
      if (sensorData.timestamp) {
        setSensorLastUpdated(
          `${new Date(sensorData.timestamp).toDateString()} at ${new Date(
            sensorData.timestamp
          )
            .toLocaleTimeString("en-IN")
            .replace("am", "AM")
            .replace("pm", "PM")}`
        );
      }
    } else {
      setDeviceStatus("Offline");
      setIndicatorClass(classNames("indicator", "offline"));
      setSensorStatus("Not Available");
      setSensorLastUpdated("Not Available");
    }
    var DataTimeCheck = setInterval(() => {
      if (Date.now() - sensorData.timestamp > 2000) {
        setDeviceStatus("Offline");
        setIndicatorClass(classNames("indicator", "offline"));
        setSensorStatus("Not Available");
      }
    }, 1000);

    return () => {
      clearInterval(DataTimeCheck);
    };
  }, [sensorData, sensorConfig]);

  return (
    <div className="sensor-container">
      <div className="sensor-text">
        <div className="sensor-text-heading">
          <h2> {sensorConfig.details.id} <br /> </h2>

          <div className="metadata"> 
              <p>Name: {sensorConfig.details.name}</p>
              <p>{sensorConfig.details.dob}</p>
              <p>{sensorConfig.details.age}</p>
              <p>{sensorConfig.details.gender}</p>
              <p>{sensorConfig.details.comorbidity}</p>
              Device Status: {deviceStatus}
            <span className={indicatorClass}></span>
            <br />

            </div>

        </div>
        
        {/* <div className="sensor-text-content">
          <p>
            Device Status: {deviceStatus}
            <span className={indicatorClass}></span>
          </p>
        </div> */}
      </div>
      <div className="sensor-chart">
        <DataChart config={sensorConfig.bpChart} sensorData={sensorData} />
        <DataChart config={sensorConfig.tChart} sensorData={sensorData} />
        <DataChart config={sensorConfig.oChart} sensorData={sensorData} />
        <DataChart config={sensorConfig.hrChart} sensorData={sensorData} />
        {/* <DataChart config={sensorConfig.ecgChart} sensorData={sensorData} /> */}

      </div>
      
    </div>
  );
};

export default Sensor;
