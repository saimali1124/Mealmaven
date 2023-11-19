import home from "../../images/Home.svg";
import setting from "../../images/Setting.svg";
import userlogo from "../../images/User.svg";
import usericon from "../../images/UserIcon.svg";
import manageusers from "../../images/ManageUsers.svg";
import managerecipe from "../../images/ManageRecipe.svg";
import dashboard from "../../images/Dashboard.svg";
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
        url: "/SuperAdminProfile",
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
        icon: { managerecipe },
      },
      {
        id: 2,
        title: "Manage Users",
        url: "/Users",
        icon: { manageusers },
      },
      {
        id: 2,
        title: "Manage Nutrionists",
        url: "/Nutrionists",
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
        icon: { dashboard },
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
export const columns = [
  { field: "id", headerName: "ID", width: 100 },
  // {
  //   field: "img",
  //   headerName: "Avatar",
  //   width: 100,
  //   sortable: false,
  //   disableColumnMenu: true,
  //   renderCell: (params) => {
  //     return <img src={params.row.img || "/noavatar.png"} alt="" />;
  //   },
  // },
  {
    field: "name",
    headerName: "Name",
    width: 250,
  },
  {
    field: "email",
    headerName: "Email",
    width: 250,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 250,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 250,
  },
];
export const userRows = [
  {
    id: 1,
    img: "https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    name: "Hubbard",
    firstName: "Eula",
    email: "kewez@@gmail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
  },
  {
    id: 2,
    img: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=1600",
    name: "Manning",
    email: "comhuhmit@gmail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
  },
  {
    id: 3,
    img: "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1600",
    name: "Greer",
    email: "ujudokon@hottmail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
  },
  {
    id: 4,
    img: "https://images.pexels.com/photos/871495/pexels-photo-871495.jpeg?auto=compress&cs=tinysrgb&w=1600",
    name: "Williamson",
    email: "tinhavabe@gmail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
  },
  {
    id: 5,
    img: "https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=1600",
    name: "Gross",

    email: "gobtagbes@yahoo.com",
    phone: "123 456 789",
  },
  {
    id: 6,
    img: "https://images.pexels.com/photos/769745/pexels-photo-769745.jpeg?auto=compress&cs=tinysrgb&w=1600",
    name: "Sharp",

    email: "vulca.eder@mail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
  },
  {
    id: 7,
    img: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1600",
    name: "Lowe",

    email: "reso.bilic@gmail.com",
    phone: "123 456 789",
  },
  {
    id: 8,
    img: "https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1600",
    name: "Dean",

    email: "codaic@mail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
  },
  {
    id: 9,
    img: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1600",
    name: "Parsons",

    email: "uzozor@gmail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
  },
  {
    id: 10,
    img: "https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg?auto=compress&cs=tinysrgb&w=1600",
    name: "Reid",

    email: "tuhkabapu@gmail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
  },
  {
    id: 11,
    img: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1600",
    name: "Dunn",

    email: "gibo@gmail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
  },
  {
    id: 12,
    img: "https://images.pexels.com/photos/774095/pexels-photo-774095.jpeg?auto=compress&cs=tinysrgb&w=1600",
    name: "Williams",

    email: "tic.harvey@hotmail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
  },
  {
    id: 13,
    img: "https://images.pexels.com/photos/761977/pexels-photo-761977.jpeg?auto=compress&cs=tinysrgb&w=1600",
    name: "Cruz",

    email: "ceuc@gmail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
  },
  {
    id: 14,
    img: "https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=1600",
    name: "Harper",

    email: "bafuv@hotmail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
  },
  {
    id: 15,
    img: "https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    name: "Griffin",

    email: "ubi@gmail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
  },
];
