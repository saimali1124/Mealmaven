const express = require("express");
const router = express.Router();
const User = require("../models/userschema");
const Admin = require("../models/adminschema");

///GET USERS AND ADMIN
router.get("/getUsers", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/getAdmin", async (req, res) => {
  try {
    const users = await Admin.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE USERS AND ADMIN
router.delete("/nutrionist/:email", async (req, res) => {
  console.log("deleting", req.params.email)
  try {
    const result = await Admin.findOneAndDelete({ email: req.params.email });
    console.log("result", result)
    res.send(result);
  } catch (err) {
    res.status(500).send
}});
router.delete("/user/:email", async (req, res) => {
  console.log("deleting USER", req.params.email);
  try {
    const result = await User.findOneAndDelete({ email: req.params.email });
    console.log("result", result);
    res.send(result);
  } catch (err) {
    res.status(500).send;
  }
});
console.log(router)


//GET NO OF USER AND ADMIN 
router.get("/userChartData", async (req, res) => {
  try {
    const aggregatedData = await User.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
          },
          totalUsers: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          month: "$_id.month",
          totalUsers: 1,
        },
      },
    ]).exec();

    const chartData = aggregatedData.map(({ month, totalUsers }) => ({
      name: monthToName(month),
      users: totalUsers,
    }));
    
    res.json(chartData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
router.get("/nutChartData", async (req, res) => {
  try {
    const aggregatedData = await Admin.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
          },
          totalUsers: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          month: "$_id.month",
          totalUsers: 1,
        },
      },
    ]).exec();

    const chartData = aggregatedData.map(({ month, totalUsers }) => ({
      name: monthToName(month),
      nutrionists: totalUsers,
    }));
    console.log(chartData)
    res.json(chartData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
router.get("/barChartBoxRevenue", async (req, res) => {
  try {
    const aggregatedData = await User.aggregate([
      {
        $match: {
          hasPremiumAccess: true,
          premiumObtainedOn: { $exists: true, $ne: null },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$premiumObtainedOn" },
          },
          totalUsers: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          month: "$_id.month",
          profit: { $multiply: ["$totalUsers", 500] },
        },
      },
    ]).exec();

    const barChartBoxRevenue = {
      title: "Profit Earned",
      color: "#8884d8",
      dataKey: "profit",
      chartData: aggregatedData.map(({ month, profit }) => ({
        name: monthToName(month),
        profit,
      })),
    };

    res.json(barChartBoxRevenue);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
function monthToName(month) {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return monthNames[month - 1];
}
router.get("/topUsers", async (req, res) => {
  try {
    const premiumUsers = await User.find(
      { hasPremiumAccess: true },
      "name email"
    );
    const top = premiumUsers.map(({ _id, name, email }) => ({
      id: _id,
      username: name,
      email,
    }));

    res.json(top);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get('/chartBoxRevenue', async (req, res) => {
  try {
    const today = new Date();
    const startOfCurrentWeek = new Date(today);
    startOfCurrentWeek.setHours(0, 0, 0, 0);
    startOfCurrentWeek.setDate(today.getDate() - today.getDay());

    const endOfCurrentWeek = new Date(today);
    endOfCurrentWeek.setHours(23, 59, 59, 999);
    endOfCurrentWeek.setDate(today.getDate() + (6 - today.getDay()));

    const startOfPreviousWeek = new Date(startOfCurrentWeek);
    startOfPreviousWeek.setDate(startOfCurrentWeek.getDate() - 7);

    const aggregatedDataCurrentWeek = await aggregateRevenueData(startOfCurrentWeek, endOfCurrentWeek);
    const aggregatedDataPreviousWeek = await aggregateRevenueData(startOfPreviousWeek, startOfCurrentWeek);
    const chartBoxRevenue = {
      color: "teal",
      //icon: { usericon },
      title: "Total Revenue This Week",
      number: aggregatedDataCurrentWeek.reduce((total, { revenue }) => total + revenue, 0),
      dataKey: "revenue",
      percentage: calculatePercentage(aggregatedDataCurrentWeek, aggregatedDataPreviousWeek),
      chartData: aggregatedDataCurrentWeek.map(({ dayOfWeek, revenue }) => ({
        name: dayOfWeekToName(dayOfWeek),
        revenue,
      })),
    };
    res.json(chartBoxRevenue);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



async function aggregateRevenueData(startDate, endDate) {
  return User.aggregate([
    {
      $match: {
        hasPremiumAccess: true,
        premiumObtainedOn: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $group: {
        _id: {
          dayOfWeek: { $dayOfWeek: "$premiumObtainedOn" },
        },
        totalRevenue: { $sum: 500 },
      },
    },
    {
      $project: {
        _id: 0,
        dayOfWeek: "$_id.dayOfWeek",
        revenue: "$totalRevenue",
      },
    },
  ]).exec();
}


function dayOfWeekToName(dayOfWeek) {
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return dayNames[dayOfWeek - 1];
}

function calculatePercentage(currentWeekData, previousWeekData) {
  const currentWeekRevenue = currentWeekData.reduce((total, { revenue }) => total + revenue, 0);
  const previousWeekRevenue = previousWeekData.reduce((total, { revenue }) => total + revenue, 0);

  if (previousWeekRevenue === 0) {
    return 100; // If no revenue in the previous week, consider a 100% increase.
  }

  return ((currentWeekRevenue - previousWeekRevenue) / previousWeekRevenue) * 100;
}

module.exports = router;