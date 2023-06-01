// import {
//   Box,
//   Button,
//   Dialog,
//   TextField,
//   useMediaQuery,
//   Typography,
//   IconButton,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import EditIcon from "@mui/icons-material/Edit";
// import moment from "moment";
// import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";

// const grow = {
//   flexGrow: 1,
// };
// const app_bar = {
//   position: "relative",
//   boxShadow: "none",
//   // maxWidth: 600,
//   // height: "800px",
//   [theme.breakpoints.up("sm")]: {
//     left: "50%",
//     transform: "translate(-50%, 0)",
//   },
// };
// const title = {
//   flexGrow: 1,
// };
// const toolbar = {
//   justifyContent: "space-between",
// };
// const hide = {
//   display: "none",
// };
// const modal = {
//   paddingRight: 500,
// };
// const drawer = {
//   // minWidth: 200,
//   boxShadow: "none",
//   //    maxHeight: "500px",

//   display: "flex",
//   alignItems: "flex-start",
//   flexDirection: "column",
//   position: "relative",
//   justifyContent: "flex-start",
// };
// const drawerPaper = {
//   //  minWidth: 50,
//   //  width: "90%",
//   //  position: "absolute",

//   //backgroundColor: "red",
//   overflowX: "scroll",
//   // height: "600px",
//   height: "70vh",
//   borderLeft: "1px solid #e2e6ea",
// };
// drawerHeader = {
//   display: "flex",
//   alignItems: "center",
//   padding: "21px",
//   // padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
//   borderBottom: "1px solid #e2e6ea",
//   justifyContent: "flex-start",
// };
// const company = {
//   paddingTop: "10px",
//   paddingLeft: "25px",
//   paddingRight: "25px",
//   paddingBottom: "10px",
//   borderBottom: "1px solid #e2e6ea",
// };
// const box = {
//   border: "1px solid #b0b7c3",
//   width: "70px",
//   height: "70px",
//   padding: "20px",
//   borderRadius: "10px",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   marginRight: "10px",
// };
// const btn = {
//   borderRadius: "30px",
//   display: "flex",
//   paddingRight: "70px",
//   paddingLeft: "70px",
//   height: "40px",
//   boxShadow: "none",
// };
// const root1 = {
//   borderRadius: "20px",
//   border: ".5px solid #707070",
//   boxShadow: "none",
// };
// const button = {
//   display: "flex",
//   borderRadius: "30px",
//   boxShadow: "none",
//   height: "40px",
//   marginRight: "20px",
//   paddingLeft: "40px",
//   paddingRight: "40px",
// };
// const btngrid = {
//   paddingRight: "40px",
//   display: "flex",
//   paddingLeft: "40px",
//   justifyContent: "flex-start",
//   paddingBottom: "35px",
// };

// const add = {
//   paddingLeft: "40px",
//   paddingRight: "40px",
//   paddingTop: "20px",
//   paddingBottom: "10px",
//   width: "450px",
//   display: "flex",
//   flexDirection: "column",
//   // justifyContent: "center",
//   //alignItems: "center",
// };
// const cycle = {
//   borderRadius: "30px",
//   //  margin: theme.spacing(1),
//   boxShadow: "none",
//   padding: "7px",
//   marginRight: "10px",
//   height: "40px",
//   paddingLeft: "30px",
//   paddingRight: "30px",
//   display: "flex",
// };

// function RightInfo(props) {
//   const classes = useStyles();
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);
//   const [groupName, setGroupName] = React.useState(props.ChatRoomTitile);
//   const userRolesPermission = useSelector(userRolesActionsFn);
//   const { ListOfUsers } = props;

//   const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const editGroupName = async () => {
//     if (groupName.length > 0) {
//       const threadRef = doc(
//         db,
//         config.prod ? "CHATGROUP_PROD" : "CHATGROUP_DEV",
//         props.ThreadId
//       );

//       await updateDoc(threadRef, {
//         name: groupName,
//       });
//       setOpen(false);
//     }
//   };

//   return (
//     <>
//       <div style={drawerPaper}>
//         <div style={drawerHeader}>
//           <IconButton>
//             {theme.direction === "rtl" ? (
//               <CloseIcon onClick={props.rightInfoClose} />
//             ) : (
//               <CloseIcon onClick={props.rightInfoClose} />
//             )}
//           </IconButton>
//           <Typography variant="h6" style={{ marginLeft: "12px" }}>
//             {" "}
//             Group Info
//           </Typography>
//         </div>
//         <div style={company}>
//           <div style={{ display: "flex", alignItems: "center" }}>
//             <Typography variant="body2" style={{ fontWeight: "bold" }}>
//               {props.ChatRoomTitile}
//             </Typography>
//             {userRolesPermission?.some(
//               (item) => item.access_control_key === "update_group"
//             ) && (
//               <IconButton
//                 onClick={() => {
//                   setOpen(true);
//                 }}
//               >
//                 <EditIcon style={{ fontSize: "18px" }} />
//               </IconButton>
//             )}
//             <Dialog
//               fullScreen={fullScreen}
//               maxWidth="md"
//               PaperProps={{ classes: { root: classes.root1 } }}
//               open={open}
//               onClose={handleClose}
//               aria-labelledby="responsive-dialog-title"
//             >
//               <div style={add}>
//                 <div
//                   style={{
//                     // padding: "10px",
//                     // paddingLeft: "20px",
//                     display: "flex",
//                     marginBottom: "25px",
//                     marginLeft: "10px",
//                     justifyContent: "flex-start",
//                     textAlign: "left",
//                   }}
//                 >
//                   <Typography variant="h6">Create Group Name</Typography>
//                 </div>

//                 <TextField
//                   variant="outlined"
//                   onChange={(e) => setGroupName(e.target.value)}
//                   value={groupName}
//                   placeholder={groupName}
//                   InputLabelProps={{
//                     className: classes.floatingLabelFocusStyle,
//                   }}
//                   inputProps={{
//                     style: {
//                       padding: "16px",
//                     },
//                   }}
//                   // fullWidth
//                   style={{ width: "100%", marginBottom: "20px" }}
//                   label="Enter Group Name"
//                   name="Amazon | Software Developer PC 2019"
//                 />
//               </div>

//               <div style={btngrid}>
//                 <Button
//                   variant="outlined"
//                   style={button}
//                   onClick={handleClose}
//                   color="primary"
//                 >
//                   Cancel
//                 </Button>

//                 <Button
//                   autoFocus
//                   onClick={editGroupName}
//                   style={button}
//                   variant="contained"
//                   color="primary"
//                 >
//                   Update
//                 </Button>
//               </div>
//               {/* </DialogActions> */}
//             </Dialog>
//           </div>
//           <Typography variant="overline" style={{ color: "#6c757d" }}>
//             Create Date: {moment(props.Created_Time).format("LLL")}
//           </Typography>
//         </div>

//         <div style={company}>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <Typography variant="body2" style={{ fontWeight: "bold" }}>
//               Media Files
//             </Typography>
//             {/*  <Button color="primary">Swipe Right</Button> */}
//           </div>
//           <div
//             style={{
//               display: "flex",
//               marginTop: "10px",
//               paddingBottom: "10px",
//               maxWidth: 1000,
//               overflowX: "scroll",
//             }}
//           >
//             {props.AllMessages.map((item, index) => {
//               if (item.type === "" && item.image !== "") {
//                 return (
//                   <Box image={item.image} style={box}>
//                     <img
//                       src={item.image}
//                       style={{ color: "#6c757d", height: 70, width: 70 }}
//                     />
//                   </Box>
//                 );
//               } else if (item.type === "pdf") {
//                 return (
//                   <Box style={box}>
//                     <img
//                       src={item.docImage}
//                       style={{ color: "#6c757d", height: 70, width: 70 }}
//                     />
//                   </Box>
//                 );
//               }
//             })}

//             {/* <Box style={box}>
//               <ImageIcon style={{ color: "#6c757d" }} />
//             </Box>
//             <Box style={box}>
//               <ImageIcon style={{ color: "#6c757d" }} />
//             </Box>
//             <Box style={box}>
//               <ImageIcon style={{ color: "#6c757d" }} />
//             </Box>
//             <Box style={box}>
//               <ImageIcon style={{ color: "#6c757d" }} />
//             </Box> */}
//           </div>
//         </div>

//         <div style={company}>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <Typography variant="body2" style={{ fontWeight: "bold" }}>
//               Members({props.numberOfUsers})
//             </Typography>
//           </div>
//           {userRolesPermission?.some(
//             (item) => item.access_control_key === "update_group"
//           ) && (
//             <div
//               style={{
//                 display: "flex",
//                 marginTop: "10px",
//                 paddingBottom: "10px",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <Link
//                 to={{
//                   pathname: `/chat-group/${props.ThreadId}`,
//                   state: ListOfUsers,
//                   groupTab: props?.groupTab,
//                 }}
//                 style={{ textDecoration: "none" }}
//               >
//                 <Button
//                   variant="contained"
//                   startIcon={<AddCircleIcon />}
//                   color="primary"
//                   style={btn}
//                 >
//                   Add Member
//                 </Button>
//               </Link>
//             </div>
//           )}
//           {props.ListOfUsers.map((user) => {
//             return (
//               <Member
//                 groupid={props.groupid}
//                 name={props.ChatRoomTitile}
//                 user={user}
//                 ThreadId={props.ThreadId}
//               />
//             );
//           })}
//         </div>
//       </div>
//     </>
//   );
// }

// export default RightInfo;
