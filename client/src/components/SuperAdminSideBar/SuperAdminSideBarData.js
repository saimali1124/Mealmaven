import home from "../../images/Home.svg";
import setting from "../../images/Setting.svg";
import chart from "../../images/Chart.svg";
import log from "../../images/Log.svg";
import userlogo from "../../images/User.svg";
import usericon from "../../images/UserIcon.svg";
export const menu = [
  {
    id: 1,
    title: "main",
    listItems: [
      {
        id: 1,
        title: "Home",
        url: "/SuperAdminHome",
        icon: { home },
      },
      {
        id: 2,
        title: "Profile",
        url: "/users/1",
        icon: { userlogo },
      },
    ],
  },
  {
    id: 2,
    title: "Maintenance",
    listItems: [
      {
        id: 1,
        title: "Manage Recipe",
        url: "/ManageRecipe",
        icon: { setting },
      },
    ],
  },
  {
    id: 3,
    title: "analytics",
    listItems: [
      {
        id: 1,
        title: "Dashboard",
        url: "/Charts",
        icon: { chart },
      },
    ],
  },
];
export const topNutrionists = [
  {
    id: 1,
    img: { usericon },
    username: "Elva McDonald",
    email: "elva@gmail.com",
  },
  {
    id: 2,
    img: { usericon },
    username: "Linnie Nelson",
    email: "linnie@gmail.com",
  },
  {
    id: 3,
    img: { usericon },
    username: "Brent Reeves",
    email: "brent@gmail.com",
  },
  {
    id: 4,
    img: { usericon },
    username: "Adeline Watson",
    email: "adeline@gmail.com",
  },
  {
    id: 5,
    img: { usericon },
    username: "Juan Harrington",
    email: "juan@gmail.com",
  },
];
export const chartBoxUser = {
  color: "#8884d8",
  icon: { usericon },
  title: "Total Users",
  number: "11.238",
  dataKey: "users",
  percentage: 45,
  chartData: [
    { name: "Jan", users: 400 },
    { name: "Feb", users: 600 },
    { name: "March", users: 500 },
    { name: "April", users: 700 },
    { name: "May", users: 400 },
    { name: "June", users: 500 },
    { name: "July", users: 450 },
    { name: "Aug", users: 450 },
  ],
};

export const chartBoxNutrionists = {
  color: "skyblue",
  icon: { usericon },
  title: "Total Nutrionists",
  number: "238",
  dataKey: "nutrionists",
  percentage: 21,
  chartData: [
    { name: "Jan", nutrionists: 400 },
    { name: "Feb", nutrionists: 600 },
    { name: "March", nutrionists: 500 },
    { name: "April", nutrionists: 700 },
    { name: "May", nutrionists: 400 },
    { name: "June", nutrionists: 500 },
    { name: "July", nutrionists: 450 },
    { name: "Aug", nutrionists: 450 },
  ],
};
export const chartBoxRevenue = {
  color: "teal",
  icon: { usericon },
  title: "Total Revenue This Week",
  number: "$56.432",
  dataKey: "revenue",
  percentage: -12,
  chartData: [
    { name: "Sun", revenue: 400 },
    { name: "Mon", revenue: 600 },
    { name: "Tue", revenue: 500 },
    { name: "Wed", revenue: 700 },
    { name: "Thu", revenue: 400 },
    { name: "Fri", revenue: 500 },
    { name: "Sat", revenue: 450 },
  ],
};
export const barChartBoxRevenue = {
  title: "Profit Earned",
  color: "#8884d8",
  dataKey: "profit",
  chartData: [
    {
      name: "January",
      profit: 4000,
    },
    {
      name: "Febuarary",
      profit: 3000,
    },
    {
      name: "March",
      profit: 2000,
    },
    {
      name: "April",
      profit: 2780,
    },
    {
      name: "May",
      profit: 1890,
    },
    {
      name: "June",
      profit: 2390,
    },
    {
      name: "July",
      profit: 3490,
    },
  ],
};
