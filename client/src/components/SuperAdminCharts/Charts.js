import "./Charts.css";
import TopBox from "./TopBox.js";
import SuperAdminNavbar from "../SuperAdminNavbar";
import SuperAdminSideBar from "../SuperAdminSideBar/SuperAdminSideBar.js";
import Footer from "../Footer";
import ChartBox from "./ChartBox";
import BarChartBox from "./BarChartBox";
import {
  barChartBoxRevenue,
  // barChartBoxVisit,
  chartBoxRevenue,
  // chartBoxConversion,
  chartBoxNutrionists,
  chartBoxUser,
} from "../SuperAdminSideBar/SuperAdminSideBarData.js";
const Charts = () => {
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
            <ChartBox {...chartBoxUser} />
          </div>
          <div className="box box3">
            <ChartBox {...chartBoxNutrionists} />
          </div>

          <div className="box box9">
            <ChartBox {...chartBoxRevenue} />
          </div>
          <div className="box box7">
            <BarChartBox {...barChartBoxRevenue} />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
export default Charts;
