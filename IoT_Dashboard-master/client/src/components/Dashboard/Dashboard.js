import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Dashboard.css";
import Navbar from "../NavBar/NavBar";
import { Patient } from "./sensorConfigs";
import Sensor from "../Sensor/Sensor";

const Dashboard = ({ history }) => {
  const [error, setError] = useState("");
  const [sensorData, setSensorData] = useState({});
  const ws = useRef(null);

  useEffect(() => {
    // if (!localStorage.getItem("authToken")) {
    //   history.push("/login");
    // }

    const connectWebSocket = () => {
      ws.current = new WebSocket("ws://localhost:5000");
      const jsonClientType = {
        type: "CLIENT",
      };

      ws.current.onopen = () => {
        console.log("Connected to Server!");
        ws.current.send(JSON.stringify(jsonClientType));
      };

      ws.current.onerror = (error) => {
        console.log(`Error: ${error}`);
      };

      ws.current.onclose = () => {
        console.log("Disconnected from Server!");
        // Implement Reconnecting Method
      };

      ws.current.onmessage = ({ data }) => {
        setSensorData(JSON.parse(data));
      };
    };

    const authenticate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/authorize", config);
        if (data.data === "ACCESS_GRANTED") {
          connectWebSocket();
        }
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
        setTimeout(() => {
          history.push("/login");
        }, 3000);
      }
    };

    // authenticate();
    connectWebSocket();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [history]);

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <>
      <Navbar history={history} />
      <div className="data">
        <Sensor sensorConfig={Patient} sensorData={sensorData} />
      </div>
    </>
  );
};

export default Dashboard;
