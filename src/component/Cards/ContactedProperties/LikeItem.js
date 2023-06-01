import * as React from "react";
import { styled } from "@mui/material/styles";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { postRequest, postWWWRequest } from "../../../apis/baseApi";
import { useAlert } from "react-alert";
import { useState } from "react";
import LoginDialog from "../../Dialog/LoginDialog";

var delayInMilliseconds = 1000;

const HeartToggleButton = styled(ToggleButton)({
  height: "60px",
  width: "60px",
  padding: "20px",
  borderRadius: "50%",
  backgroundColor: "#fff",
  border: "none",
  color: "#FF6584",
  "&:hover": {
    // color: "#fff",
    // backgroundColor: "#FF6584",
    transform: "scale(1.2)",
    transitionDuration: "0.5s",
  },
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "#fff",
    backgroundColor: "#FF6584",
    borderColor: "#FFEED6",
    border: "1px solid #FF6584",
    borderRadius: "50%",
    fontSize: "400px",
  },
});

const HeartToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    borderRadius: "50%",
    border: "none",
    "&.Mui-disabled": {
      border: "1px solid #FF6584",
      borderRadius: "50%",
    },
    "&:not(:first-of-type)": {
      borderRadius: "50%",
      border: "1px solid #FF6584",
    },
    "&:first-of-type": {
      borderRadius: "50%",
      border: "1px solid #FF6584",
    },
  },
}));

export function HeartItem({ type, propertyData, listType, currentIndex, setCurrentIndex, selected }) {
  const [alignment, setAlignment] = React.useState("left");
  const [formats, setFormats] = React.useState(() => ["italic"]);
  
  const [buttonSelected, setButtonSelected] = useState(
    false
  );

  React.useEffect(() => {
    setButtonSelected(selected);
  }, [selected])

  const alert = useAlert();

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  const handleAlignment = (event, newAlignment) => {
    if (localStorage?.getItem("token")) {
      addMatches(newAlignment);
      setButtonSelected(!buttonSelected);
    } else {
      setOpen(true);
    }
  };

  // React.useEffect(() => {
  //   setButtonSelected(false);
  // }, [currentIndex])

  const addMatches = (newAlignment) => {
    const body = {
      property: propertyData?.id,
      property_type: type === "rental" ? 1 : type === "pghostel" ? 2 : 3,
    };
    // postWWWRequest(`api/user_wishlist/user_wishlist/`, body)
    postRequest(`user_wishlist/user_wishlist/`, body)
      .then((res) => {
        if (res?.data?.status_code === 1) {
          alert.success("Added to loved property!");
          setButtonSelected(!buttonSelected);
          setAlignment(newAlignment);
          setTimeout(function() {
            //your code to be executed after 1 second
            setCurrentIndex(currentIndex + 1);
          }, delayInMilliseconds);
        } else if (res?.data?.status_code === 2) {
          alert.success("Removed from loved property!");
          setAlignment(newAlignment);
          setButtonSelected(!buttonSelected);
          setTimeout(function() {
            //your code to be executed after 1 second
            setCurrentIndex(currentIndex + 1);
            setButtonSelected(false);
          }, delayInMilliseconds);
        } else {
          alert.error("Error in changing match status!!");
        }
      })
      .catch((err) => {
        alert.error("Error in adding to matches!!");
      });
  };

  const [open, setOpen] = useState(false);

  return (
    <div style={{ marginLeft: "20px", marginRight: "20px" }}>
      <HeartToggleButtonGroup
        size="small"
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
        defaultValue={selected ? "left" : ""}
      >
        <HeartToggleButton
          value="left"
          aria-label="left aligned"
          selected={buttonSelected}
        >
          <FavoriteIcon style={{ fontSize: "30px" }} />
        </HeartToggleButton>
      </HeartToggleButtonGroup>
      <LoginDialog open={open} setOpen={setOpen} />
    </div>
  );
}

const LikeToggleButton = styled(ToggleButton)({
  height: "45px",
  width: "45px",
  padding: "20px",
  borderRadius: "50%",
  backgroundColor: "#fff",
  border: "none",
  color: "#69D2E7",
  "&:hover": {
    // color: "#fff",
    // backgroundColor: "#69D2E7",
    transform: "scale(1.2)",
    transitionDuration: "0.5s",
  },
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "#fff",
    backgroundColor: "#69D2E7",
    border: "1px solid #69D2E7",
    borderRadius: "50%",
    fontSize: "400px",
  },
});

const LikeToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    borderRadius: "50%",
    border: "none",
    "&.Mui-disabled": {
      border: "1px solid #69D2E7",
      borderRadius: "50%",
    },
    "&:not(:first-of-type)": {
      borderRadius: "50%",
      border: "1px solid #69D2E7",
    },
    "&:first-of-type": {
      borderRadius: "50%",
      border: "1px solid #69D2E7",
    },
  },
}));

export function LikeItem({ type, propertyData, listType, currentIndex, setCurrentIndex, selected }) {
  const [alignment, setAlignment] = React.useState("left");
  const alert = useAlert();
  const [open, setOpen] = useState(false);

  const [buttonSelected, setButtonSelected] = useState(
    false
  );

  React.useEffect(() => {
    setButtonSelected(selected);
  }, [selected])

  const handleAlignment = (event, newAlignment) => {
    if (localStorage?.getItem("token")) {
      setButtonSelected(!buttonSelected);
      addLike(newAlignment);
    } else {
      setOpen(true);
    }
  };

  // React.useEffect(() => {
  //   setButtonSelected(false);
  // }, [currentIndex])

  const addLike = (newAlignment) => {
    const body = {
      property: propertyData?.id,
      property_type: type === "rental" ? 1 : type === "pghostel" ? 2 : 3,
    };
    // postWWWRequest(`api/userShortlist/user_shortlist/`, body)
    postRequest(`userShortlist/user_shortlist/`, body)
      .then((res) => {
        if (res?.data?.msg === "added successfully") {
          alert.success("Added to liked property!");
          setButtonSelected(!buttonSelected);
          setAlignment(newAlignment);
          var delayInMilliseconds = 1000;
          setTimeout(function() {
            //your code to be executed after 1 second
            setCurrentIndex(currentIndex + 1);
          }, delayInMilliseconds);
        } else if (res?.data?.msg === "deleted successfully") {
          setButtonSelected(!buttonSelected);
          alert.success("Removed from liked property!");
          setAlignment(newAlignment);
          var delayInMilliseconds = 1000;
          setTimeout(function() {
            //your code to be executed after 1 second
            setCurrentIndex(currentIndex + 1);
          }, delayInMilliseconds);
        } else {
          alert.error("Error in changing match status!!");
        }
      })
      .catch((err) => {
        alert.error("Error in adding to matches!!");
      });
  };

  return (
    <div>
      <LikeToggleButtonGroup
        size="small"
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        <LikeToggleButton
          value="left"
          aria-label="left aligned"
          selected={buttonSelected}
        >
          <ThumbUpIcon style={{ fontSize: "20px" }} />
        </LikeToggleButton>
      </LikeToggleButtonGroup>
      <LoginDialog open={open} setOpen={setOpen} />
    </div>
  );
}

const DislikeToggleButton = styled(ToggleButton)({
  height: "45px",
  width: "45px",
  padding: "20px",
  borderRadius: "50%",
  backgroundColor: "#367CFF",
  border: "none",
  color: "#fff",
  "&:hover": {
    
    color: "#fff",
    backgroundColor: "#367CFF",
    transform: "scale(1.2)",
    transitionDuration: "0.5s",
  },
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "#367CFF",
    backgroundColor: "#fff",

    border: "1px solid #367CFF",
    borderRadius: "50%",
    fontSize: "400px",
  },
});

const DislikeToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    borderRadius: "50%",
    border: "none",
    "&.Mui-disabled": {
      border: "1px solid #367CFF",
      borderRadius: "50%",
    },
    "&:not(:first-of-type)": {
      borderRadius: "50%",
      border: "1px solid #367CFF",
    },
    "&:first-of-type": {
      borderRadius: "50%",
      border: "1px solid #367CFF",
    },
  },
}));

export function DislikeItem({type, propertyData, listType, currentIndex, setCurrentIndex}) {
  const [alignment, setAlignment] = React.useState("left");
  const [formats, setFormats] = React.useState(() => ["italic"]);
  const [open, setOpen] = useState(false);
  const alert = useAlert();

  React.useEffect(() => {
    setButtonSelected(false);
  }, [currentIndex])

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  const handleAlignment = (event, newAlignment) => {
    if (localStorage?.getItem("token")) {
      // setAlignment(newAlignment);
      dislike(newAlignment);
      // alert.success("You disliked this property!");
      // setButtonSelected(!buttonSelected);
      // var delayInMilliseconds = 1000; //1 second

      // setTimeout(function() {
      //   //your code to be executed after 1 second
      //   setCurrentIndex(currentIndex + 1);
      // }, delayInMilliseconds);
      
    } else {
      setOpen(true);
    }
  };

  const dislike = (newAlignment) => {
    const body = {
      property: propertyData?.id,
      property_type: type === "rental" ? 1 : type === "pghostel" ? 2 : 3,
    };
    // postWWWRequest(`api/user_dislike/user_dislike/`, body)
    postRequest(`user_dislike/user_dislike/`, body)
      .then((res) => {
        if (res?.data?.msg === "added successfully") {
          alert.success("You disliked this property!");
          setButtonSelected(!buttonSelected);
          setAlignment(newAlignment);
          var delayInMilliseconds = 1000;
          setTimeout(function() {
            //your code to be executed after 1 second
            setCurrentIndex(currentIndex + 1);
          }, delayInMilliseconds);
        } else if (res?.data?.msg === "deleted successfully") {
          setButtonSelected(!buttonSelected);
          alert.success("Removed from liked property!");
          setAlignment(newAlignment);
          var delayInMilliseconds = 1000;
          setTimeout(function() {
            //your code to be executed after 1 second
            setCurrentIndex(currentIndex + 1);
          }, delayInMilliseconds);
        } else {
          alert.error("Error in changing match status!!");
        }
      })
      .catch((err) => {
        alert.error("Error in adding to matches!!");
      });
  };

  const [buttonSelected, setButtonSelected] = useState(false);

  return (
    <div>
      <DislikeToggleButtonGroup
        size="small"
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        <DislikeToggleButton value="left" aria-label="left aligned" selected={buttonSelected ? false : true}>
          <ThumbDownIcon style={{ fontSize: "20px" }}/>
        </DislikeToggleButton>
      </DislikeToggleButtonGroup>
      <LoginDialog open={open} setOpen={setOpen} />
    </div>
  );
}