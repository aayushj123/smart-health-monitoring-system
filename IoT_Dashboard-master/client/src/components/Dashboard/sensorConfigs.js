import chartColors from "../Sensor/chartColors";

export const Patient = {
  
  details: {
    id: "Patient 1",
    name: "Aayush Jha",
    dob: "Date of Admission: 19-12-2021",
    gender: "Gender: Female",
    age: "Age: 34",
    comorbidity: "Co-mobidity: Diabetes, High Blood Pressure",
    
  },

  bpChart: {
    color: {
      bgColor: chartColors.green,
      borderColor: chartColors.green,
    },
    chartLabel: "Ambient Temperature Sensor",
    xlabelString: "Today's Time",
    ylabelString: "Ambient Temperature",
  },

  tChart: {
    color: {
      bgColor: chartColors.orange,
      borderColor: chartColors.orange,
    },
    chartLabel: "Body Temperature Sensor",
    xlabelString: "Today's Time",
    ylabelString: "Body Temperature",
  },
  
  oChart: {
    color: {
      bgColor: chartColors.blue,
      borderColor: chartColors.blue,
    },
    chartLabel: "Blood-Pulse Oximeter Sensor",
    xlabelString: "Today's Time",
    ylabelString: "Oximeter",
  },

  hrChart: {
    color: {
      bgColor: chartColors.purple,
      borderColor: chartColors.purple,
    },
    chartLabel: "Heart-rate Monitor Sensor",
    xlabelString: "Today's Time",
    ylabelString: "Heartrate",
  },

  ecgChart: {
    color: {
      bgColor: chartColors.green,
      borderColor: chartColors.green,
    },
    chartLabel: "ECG Sensor",
    xlabelString: "Today's Time",
    ylabelString: "ECG",
  },

};