import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import { deepOrange, yellow } from "@material-ui/core/colors";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

function LineGraph({ casesType, country }) {
  const [data, setData] = useState({});
  const [data1, setData1] = useState({});
  
  const [bgcolor, setbgColor] = useState("rgba(185, 203, 235, 0.5)");
  const [brcolor, setbrColor] = useState("#0c4778");
  useEffect(() => {
    if(casesType === "recovered"){
      setbgColor("rgba(125, 215, 29, 0.5)");
      setbrColor("#7dd71d");
    }
    else if(casesType === "deaths"){
      setbgColor("rgba(251, 68, 67, 0.5)");
      setbrColor("#fb4443");
    } 
    else{
        setbgColor("rgba(185, 203, 235, 0.5)");
        setbrColor("#0c4778");
    }
  })
  useEffect(() => {
    const fetchData = async () => {
      console.log(country + "<<<<<<<<<<<<<<<<<<<<<");
      const url =
      // (country === "worldwide")
       "https://disease.sh/v3/covid-19/historical/all?lastdays=120";
      //  ? `https://disease.sh/v3/covid-19/historical/in?lastdays=120` 
      //  : `https://disease.sh/v3/covid-19/historical/${country}?lastdays=120`;
      await fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
        //   setData1(
        //  (country === "worldwide")
        //  ? data
        //  : data.timeline
        // ) 


          let chartData = buildChartData(data, casesType);
          setData(chartData);
          console.log(chartData);
          // buildChart(chartData);
        });
    };

    fetchData();
  }, [casesType]);

  return (
    <div>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {

                
                backgroundColor: bgcolor,//"rgba(204, 16, 52, 0.5)",
                borderColor: brcolor,
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph;