import "./Charts.css";
import TopBox from "./TopBox.js";
import SuperAdminNavbar from "../SuperAdminNavbar";
import SuperAdminSideBar from "../SuperAdminSideBar/SuperAdminSideBar.js";
import Footer from "../Footer";
import ChartBox from "./ChartBox";
import BarChartBox from "./BarChartBox";
import usericon from "../../images/UserIcon.svg";
import { useState, useEffect } from "react";
const Charts = () => {
const [chartBoxRevenue, setChartBoxRevenue] = useState([]);
useEffect(() => {
  fetch("/chartBoxRevenue")
    .then((response) => response.json())
    .then((data) => setChartBoxRevenue(data))
    .catch((error) => console.error("Error fetching data:", error));
}, []);
const [barChartData, setBarChartData] = useState([]);
useEffect(() => {
  fetch("/barChartBoxRevenue")
    .then((response) => response.json())
    .then((data) => setBarChartData(data))
    .catch((error) => console.error("Error fetching data:", error));
}, []);

const [userChartData, setUserChartData] = useState({
    color: "#8884d8",
    icon: { usericon},
    title: "Total Users",
    number: 0,
    dataKey: "users",
    percentage: 0,
    chartData: [],
  });

useEffect(() => {
  fetch('/userChartData')
    .then((response) => response.json())
    .then((data) => {
      const totalUsers = data.reduce((acc, monthData) => acc + monthData.users, 0);

      const mostRecentMonth = data[0];
      const mostRecentUsers = mostRecentMonth ? mostRecentMonth.users : 0;
      const percentage = mostRecentMonth ? ((mostRecentUsers / totalUsers) * 100).toFixed(2) : 0;

      setUserChartData({
        ...userChartData,
        number: totalUsers,
        percentage,
        chartData: data,
      });
    })
    .catch((error) => console.error('Error fetching data:', error));
}, []);

const [nutChartData, setNutChartData] = useState({
  color: "#8884d8",
  icon: { usericon },
  title: "Total Nutrionists",
  number: 0,
  dataKey: "nutrionists",
  percentage: 0,
  chartData: [],
});

useEffect(() => {
  fetch("/nutChartData")
    .then((response) => response.json())
    .then((res) => {
      const total = res.reduce(
        (acc, monthData) => acc + monthData.nutrionists,
        0
      );

      const mostRecentMonth = res[0];
      const mostRecentUsers = mostRecentMonth ? mostRecentMonth.nutrionists : 0;
      const percentage = mostRecentMonth
        ? ((mostRecentUsers / total) * 100).toFixed(2)
        : 0;
      console.log(res)
      console.log(mostRecentMonth)
      console.log(mostRecentUsers)
      setNutChartData({
        ...nutChartData,
        number: total,
        percentage,
        chartData: res,
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
}, []);

  return (
    <>
      <SuperAdminNavbar />
      <div className="container-box">
        <SuperAdminSideBar />
        <div className="chart">
          <div className="box box1">
            <TopBox />
          </div>
          <div className="box box2">
            <ChartBox {...userChartData} />
          </div>
          <div className="box box3">
            <ChartBox {...nutChartData} />
          </div>

          <div className="box box9">
            <ChartBox {...chartBoxRevenue} />
          </div>
          <div className="box box7">
            <BarChartBox {...barChartData} />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
export default Charts;
