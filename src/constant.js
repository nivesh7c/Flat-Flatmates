import {
  R1Icon,
  R2Icon,
  R3Icon,
  R4Icon,
  R5Icon,
  R6Icon,
  LiftIcon,
  ACIcon,
  WaterPurifierIcon,
  GymIcon,
  CCTVIcon,
  LaundaryIcon
} from "./component/Cards/Common/CustomIcon/CustomIcon";

export const LOCATION = [
    {
      title: "Delhi",
      lat: 28.7041,
      long: 77.1025,
      alias: ["Delhi"]
    },
    {
      title: "Gurugram",
      lat: 28.4595,
      long: 77.0266,
      alias: ["Gurugram", "Gurgaon"]
    },
    {
      title: "Noida",
      lat: 28.5355,
      long: 77.3910,
      alias: ["Noida"]
    },
    {
      title: "Kolkata",
      lat: 22.5726,
      long: 88.3639,
      alias: ["Kolkata", "Calcutta"]
    },
    {
      title: "Mumbai",
      lat: 19.0760,
      long: 72.8777,
      alias: ["Mumbai", "Bombay"]
    },
    {
      title: "Pune",
      lat: 18.5204,
      long: 73.8567,
      alias: ["Pune"]
    },{
      title: "Hyderabad",
      lat: 17.3850,
      long: 78.4867,
      alias: ["Hyderabad"]
    },
    {
      title: "Bangalore",
      lat: 12.9716,
      long: 77.5946,
      alias: ["Bangalore", "Bengaluru"]
    },
    {
      title: "Chennai",
      lat: 13.0827,
      long: 80.2707,
      alias: ["Chennai"]
    },
  ];

export const PROPERTY_TYPE = [
    {
      title: "Builder Floor",
      value: "Builder+Floor"
    },
    {
      title: "High Rise Apartment",
      value: "High+Rise+Apartment"
    },
    {
      title: "Studio",
      value: "Studio"
    },
    {
      title: "Villa",
      value: "Villa"
    },
  ];

export const GENDER = [
    {
      title: "Male",
      value: "boys"
    },
    {
      title: "Female",
      value: "girls"
    },
    {
      title: "Any",
      value: "both"
    }
  ];

  export const AVAILABILITY = [
    {
      title: "immediate",
      value: "immediate"
    },
    {
      title: "within 15 Days",
      value: "within+15+days"
    },
    {
        title: "within 30 Days",
        value: "within+30+days"
    },
    {
        title: "After 30 Days",
        value: "after+30+days"
    },
  ];

  export const BHK_DATA = [
    {
      title: "1RK",
      value: 0
    },
    {
      title: "1BHK",
      value: 1
    },
    {
        title: "2BHK",
        value: 2
    },
    {
        title: "3BHK",
        value: 3
    },
    {
        title: "4BHK",
        value: 4
    },
    {
        title: "4+ BHK",
        value: 5
    },
  ];

  export const getBHKTitle = (value) => {
    let data = {};
    data =  BHK_DATA.find(item => item.value === value);
    return data?.title || "1RK";
  }

  export const SHARING_TYPE = [
    {
      title: "Single",
      value: "single"
    },
    {
      title: "Double",
      value: "double"
    },
    {
        title: "Triple",
        value: "tripple"
    },
    {
        title: "Any",
        value: "any"
    }
  ];

  export const AMENITIES = [
    {
      key: "ac",
      icon: <ACIcon />,
      name: "AC",
    },
    {
      key: "lift",
      icon: <LiftIcon />,
      name: "Lift",
    }, 
    {
      key: "waterPurifier",
      icon: <WaterPurifierIcon />,
      name: "Water Purifier",
    },
    {
      key: "wifi",
      icon: <R6Icon />,
      name: "Internet Services",
    },
    {
      key: "gym",
      icon: <GymIcon />,
      name: "Gym",
    },
    {
      key: "security",
      icon: <R4Icon />,
      name: "Security Gaurd",
    },
    {
      key: "cctv",
      icon: <CCTVIcon />,
      name: "CCTV",
    },
    {
      key: "laundary",
      icon: <LaundaryIcon />,
      name: "Laundary",
    },
    {
      key: "maid",
      icon: <R1Icon />,
      name: "Maid",
    },
    {
      key: "clubhouse",
      icon: <R1Icon />,
      name: "Clubhouse",
    },
    {
      key: "shopping",
      icon: <R2Icon />,
      name: "Shopping Center",
    },
    {
      key: "park",
      icon: <R3Icon />,
      name: "Park",
    },
    {
      key: "swimming",
      icon: <R5Icon />,
      name: "Swimming Pool",
    },
  ];

  export const FLOORS = [
    { label: "Ground Floor", value: "Ground Floor" },
    { label: "1st Floor", value: "1st Floor", },
    { label: "2nd Floor", value: "2nd Floor", },
    { label: "3rd Floor", value: "3rd Floor", },
    { label: "4th Floor", value: "4th Floor", },
    { label: "5th Floor", value: "5th Floor", },
    { label: "6th Floor", value: "6th Floor", },
    { label: "7th Floor", value: "7th Floor", },
    { label: "8th Floor", value: "8th Floor", },
    { label: "9th Floor", value: "9th Floor", },
    { label: "10th Floor", value: "10th Floor", },
    { label: "10+ Floor", value: "10+", },
  ];

  export const PG_FLOORS = [
    { label: "Ground Floor", value: "ground floor" },
    { label: "1st Floor", value: "1st floor", },
    { label: "2nd Floor", value: "2nd floor", },
    { label: "3rd Floor", value: "3rd floor", },
    { label: "4th Floor", value: "4th floor", },
    { label: "5th Floor", value: "5th floor", },
    { label: "5th+ Floor", value: "5th+ Floor", },
  ];

  export const TOTAL_FLOORS = [
    { label: "Ground Only", value: "Ground Only" },
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "7", value: "7" },
    { label: "8", value: "8" },
    { label: "9", value: "9" },
    { label: "10", value: "10" },
    { label: "10+", value: "10+" },
  ];

  export const SHARING_TYPE_MAP = {
    all: "All",
    single: "Single",
    double: "Double",
    tripple: "Triple"
  }

  export const GENDER_MAP = {
    boys: "Male",
    girls: "Female",
    both: "Both",
  }

  export const FURNISHING_TYPE_MAP = {
    "semi furnished": "Semi Furnished",
    "unfurnished": "Unfurnished",
    "fully furnished": "Fully Furnished"
  }