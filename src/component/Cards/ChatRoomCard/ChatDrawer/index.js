// import { Avatar, Box, Button, Grid } from "@material-ui/core";
// import AppBar from "@material-ui/core/AppBar";
// import Drawer from "@material-ui/core/Drawer";
// import IconButton from "@material-ui/core/IconButton";
// import { makeStyles, useTheme } from "@material-ui/core/styles";
// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
// import AddCircleIcon from "@material-ui/icons/AddCircle";
// import CloseIcon from "@material-ui/icons/Close";
// import EditIcon from "@material-ui/icons/Edit";
// import ImageIcon from "@material-ui/icons/Image";
// import React, { useState } from "react";
// import loo from "../../../../assets/company/social/linkedin.png";
// import Member from "../CompanyChat/Member";

// const useStyles = makeStyles(theme => ({
//   grow: {
//     flexGrow: 1,
//   },
//   app_bar: {
//     position: "relative",
//     boxShadow: "none",
//     // maxWidth: 600,
//     // height: "800px",
//     [theme.breakpoints.up("sm")]: {
//       left: "50%",
//       transform: "translate(-50%, 0)",
//     },
//   },
//   title: {
//     flexGrow: 1,
//   },
//   toolbar: {
//     justifyContent: "space-between",
//   },
//   hide: {
//     display: "none",
//   },
//   modal: {
//     paddingRight: 500,
//   },
//   drawer: {
//     minWidth: 200,
//     /// width: "60%",
//     height: "40%",
//     flexShrink: 0,
//   },
//   drawerPaper: {
//     minWidth: 100,
//     width: "40%",
//     position: "absolute",
//     right: "0%",
//     //backgroundColor: "red",
//     height: "585px",
//   },
//   drawerHeader: {
//     display: "flex",
//     alignItems: "center",
//     padding: theme.spacing(0, 1),
//     // necessary for content to be below app bar
//     ...theme.mixins.toolbar,
//     borderBottom: "1px solid #e2e6ea",
//     justifyContent: "flex-start",
//   },
//   company: {
//     paddingTop: "10px",
//     paddingLeft: "25px",
//     paddingRight: "25px",
//     paddingBottom: "10px",
//     borderBottom: "1px solid #e2e6ea",
//   },
//   box: {
//     border: "1px solid #b0b7c3",
//     width: "70px",
//     height: "70px",
//     padding: "20px",
//     borderRadius: "10px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: "10px",
//   },
//   btn: {
//     borderRadius: "30px",
//     display: "flex",
//     paddingRight: "70px",
//     paddingLeft: "70px",
//     height: "48px",
//     boxShadow: "none",
//   },
// }));

// function ChatDrawer() {
//   const classes = useStyles();
//   const theme = useTheme();

//   const [open, setOpen] = useState(false);

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };
//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   const renderDrawer = (
//     <React.Fragment>
//       <Drawer
//         className={classes.drawer}
//         variant="persistent"
//         anchor="right"
//         open={open}
//         classes={{
//           paper: classes.drawerPaper,
//         }}
//         ModalProps={{
//           container: document.getElementById("appContainerDiv"),
//           style: { position: "absolute" },
//         }}
//       >
//         <div className={classes.drawerHeader}>
//           <IconButton onClick={handleDrawerClose}>
//             {theme.direction === "rtl" ? <CloseIcon /> : <CloseIcon />}
//           </IconButton>
//           <Typography variant="h6" style={{ marginLeft: "12px" }}>
//             {" "}
//             Group Info
//           </Typography>
//         </div>
//         <div className={classes.company}>
//           <div style={{ display: "flex", alignItems: "center" }}>
//             <Typography variant="body2" style={{ fontWeight: "bold" }}>
//               Microsoft Placement Group
//             </Typography>
//             <IconButton>
//               <EditIcon style={{ fontSize: "18px" }} />
//             </IconButton>
//           </div>
//           <Typography variant="overline" style={{ color: "#6c757d" }}>
//             Create Date: 20-07-2021
//           </Typography>
//         </div>
//         <div className={classes.company}>
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
//             <Button color="primary">View All</Button>
//           </div>
//           <div
//             style={{
//               display: "flex",
//               marginTop: "10px",
//               paddingBottom: "10px",
//             }}
//           >
//             <Box className={classes.box}>
//               <ImageIcon style={{ color: "#6c757d" }} />
//             </Box>
//             <Box className={classes.box}>
//               <ImageIcon style={{ color: "#6c757d" }} />
//             </Box>
//             <Box className={classes.box}>
//               <ImageIcon style={{ color: "#6c757d" }} />
//             </Box>
//             <Box className={classes.box}>
//               <ImageIcon style={{ color: "#6c757d" }} />
//             </Box>
//           </div>
//         </div>
//         <div className={classes.company}>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <Typography variant="body2" style={{ fontWeight: "bold" }}>
//               Members (5)
//             </Typography>
//           </div>
//           <div
//             style={{
//               display: "flex",
//               marginTop: "10px",
//               paddingBottom: "10px",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <Button
//               variant="contained"
//               startIcon={<AddCircleIcon />}
//               color="primary"
//               className={classes.btn}
//             >
//               Add Member
//             </Button>
//           </div>
//           <Member />
//           <Member />
//           <Member />
//         </div>
//       </Drawer>
//     </React.Fragment>
//   );

//   return (
//     <div className={classes.grow}>
//       <AppBar className={classes.app_bar} color="inherit">
//         <Toolbar className={classes.toolbar}>
//           <div className={classes.item}>
//             <Grid container wrap="nowrap" spacing={2}>
//               <Grid item style={{ display: "flex", alignItems: "center" }}>
//                 <Avatar src={loo} />
//               </Grid>

//               <Grid item>
//                 <Typography variant="h6" noWrap style={{ fontWeight: 600 }}>
//                   Microsoft Placement Group
//                 </Typography>
//                 <Button
//                   color="primary"
//                   style={{ padding: "0px" }}
//                   onClick={handleDrawerOpen}
//                   //className={clsx(open && classes.hide)}
//                 >
//                   {" "}
//                   Click here to view group info
//                 </Button>
//               </Grid>
//             </Grid>
//           </div>
//         </Toolbar>
//       </AppBar>
//       {renderDrawer}
//     </div>
//   );
// }

// export default ChatDrawer;
