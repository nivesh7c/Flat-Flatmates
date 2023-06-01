import {
  Avatar,
  Button, InputBase, Paper, Typography, IconButton
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import user from "../../../../assets/png/user.jpg";
import {
  ImageMessageLeft,
  ImageMessageRight,
  MessageLeft,
  MessageRight,
  PdfMessageLeft,
  PdfMessageRight
} from "../Message";

import {
  addDoc,
  collection, doc, onSnapshot, orderBy, query, updateDoc, getDocs
} from "firebase/firestore";
import { fireStoreDb } from "../../../../utility/firebase";
import {useAlert} from "react-alert";
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { postRequest } from "../../../../apis/baseApi";
import { useHistory } from "react-router-dom";
import { DeleteOutline } from "@mui/icons-material";

export default function MsgPanel({roomDetails, roomId, isOwner=false, deleteChatGroup=() => {}}) {

  const history = useHistory();
  const theme = useTheme();
  const [allMessages, setAllMessages] = useState([]);

  const userDetails = JSON.parse(localStorage?.getItem('user_details'));

  const messagesEndRef = useRef(null);
  const hiddenFileInput = React.useRef(null);
  const [message, setMessage] = useState("");
  const alert = useAlert();

  const ref = useChatScroll(allMessages);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  function sendMessage(e) {
    e.preventDefault();
    handlePress(message, "", "");
    setMessage("");
  }
const handleChange = (event) => { 
  const fileUploaded = event.target.files; 
  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg'];
  Array.from(fileUploaded)?.forEach((files, index) => {
    var data = new FormData(); 
    const  fileType = files['type'];
    let image1 = false;
    if(validImageTypes.includes(fileType)){
      image1=true;
    }
    data.append("image", files);
    data.append("reciecer", isOwner ? roomDetails?.userSlug : roomDetails?.ownerSlug);
    uploadChatFiles(data, image1);
    alert.success("Uploading File "  + index); 
  })
  
};

const uploadChatFiles = (data, type) => {
  postRequest("chatServicesuploadChatImage/", data).then(res => {
    if(type){
    handlePress("", {
      link: res?.data?.data?.image,
      type: "image"
    }
      , "")
  }else{
    handlePress("", ""
      , {
        link: res?.data?.data?.image,
        type: "pdf"
      })
  }
  }).catch(err => { 
    alert.error("Error in uploading");
  })
}



  useEffect(() => {

    async function getAllMessages(){
    if(roomDetails?.id){
      const messgaeRef = collection( fireStoreDb, "CHATROOM",
      roomId, "MESSAGES" 
       ); 
      const q = query(messgaeRef, orderBy("createdAt")); 
      const unsubscribe = onSnapshot(q, (querySnapshot) => 
      { 
        const temp = [];
        querySnapshot.forEach((doc) => { 
         
          temp.push(doc.data()); 
        
        }); 
        setAllMessages(temp);
      });
    }else{
      setAllMessages([]);
    }
  }
  getAllMessages();
    
  }, [roomDetails?.id]);

  const handlePress = async (message, image, pdf) => {
    if (
      (userDetails?.slug && message && image === "" && pdf === "") ||
      (userDetails?.slug && (image !== "" || pdf !== ""))
    ) {
      const data = {
        text: message ? message : "",
        createdAt: new Date().getTime(),
        system: false,
        sentBy: userDetails?.slug,
        name: (userDetails?.first_name ? userDetails?.first_name : "FNF User") + " " + userDetails?.last_name,
        image: image ? image?.link  : "",
        type: image ? image?.type : "",
        docImage: pdf ? pdf?.link  : "",
        doc: pdf ? pdf?.type : "",
        user: {
          _id: userDetails?.slug,
        },
      }
      
      const data_latest_message = {
        text: message || "File",
        createdAt: new Date().getTime(),
      };
      const lref = doc(
        fireStoreDb,
        "CHATROOM",
        roomId
      );
      const updateLatestMessageRef = await updateDoc(lref, {
        latestMessage: data_latest_message,
      });
      
      const docRef = addDoc(
        collection(
          fireStoreDb,
          "CHATROOM",
          roomId,
          "MESSAGES"
        ),
        data
      );
      // setAllMessages([...allMessages, data]);
    }
    
    setMessage("");
  };

  const getDetailUrl = () => {
    return `/detail/${roomDetails?.propertyType}/${roomDetails?.city}/${roomDetails?.propertyId}`;
  }

  return (
    <div style={{ display: "flex" }}>
      {/* {selectroomIdedRoom */}
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "12px",
        }}
        // style={{ borderLeft: "1px solid #e2e6ea" }}
      >
        
        <Paper
          sx={{
            height: "75vh",
            width: "100%",
            //  maxWidth: "900px",
            boxShadow: "none",
            // maxHeight: "600px",
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            position: "relative",
            justifyContent: "flex-start",
            borderTopRightRadius: "12px",
          }}
          zDepth={2}
        >
          {roomId ? 
          <>
          <div
            style={{
              padding: "15.5px",
              // borderLeft: "1px solid #e2e6ea",
              borderBottom: "1px solid #e2e6ea",
              width: '100%'
            }}
          >
            <Grid container wrap="nowrap" spacing={2}>
              <Grid md={2} xs={2} sm={2} item style={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  src={roomDetails?.groupIcon ? roomDetails?.groupIcon : user}
                  alt="group"
                  sx={{
                    borderColor: theme.palette.primary.main,
                    border: "1px solid",
                  }}
                />
              </Grid>

              <Grid md={8} xs={8} sm={8} item style={{cursor: "pointer"}} onClick={() => {
                  history.push(getDetailUrl());
              }}>
                <Typography variant="h6" noWrap style={{ fontWeight: 600 }}>
                  {roomDetails?.name} {isOwner ? `(${roomDetails?.userName})` : ""}
                </Typography>
                <Button
                  color="primary"
                  // onClick={() => setisOpen(!isOpen)}
                  style={{ padding: "0px" }}
                >
                  {" "}
                  {roomDetails?.area}
                </Button>
              </Grid>
              <Grid md={2} xs={2} sm={2} item style={{ display: "flex", alignItems: "center"}}>
                <DeleteOutline style={{cursor: "pointer"}} onClick={() => {
                    deleteChatGroup();
                }}/>
              </Grid>
            </Grid>
          </div>
          <Paper
          ref={ref}
            id="style-1"
            sx={{
              //width: "calc( 100% - 20px )",
               marginTop: "1.5px",
              width: "100%",
              //   margin: 10,
              overflowY: "scroll",
              height: "calc( 100% - 80px )",
              boxShadow: "none",
              // borderTop: "1px solid #e2e6ea",
              borderRadius: "0px",

              //borderLeft: "1px solid #e2e6ea",
            }}
          >
            {allMessages.map((item) => {
              if (item?.sentBy === userDetails?.slug) {
                if (item?.doc === "pdf") {
                  return (
                    <PdfMessageRight
                      messagedetails={item?.text}
                      timestamp={moment(item?.createdAt).format("LT")}
                      thumbnail={item?.docImage}
                      link={item?.docImage}
                      message={item?.doc?.name}
                    />
                  );
                } else if (item?.type === "image" && item?.image !== "") {
                  return (
                    <ImageMessageRight
                      messagedetails={item?.text}
                      timestamp={moment(item?.createdAt).format("LT")}
                      thumbnail={item?.image}
                      link={item?.image}
                      message={item?.name}
                    />
                  );
                } else {
                  return (
                    <MessageRight
                      messagedetails={item?.text}
                      timestamp={moment(item?.createdAt).format("LT")}
                    />
                  );
                }
              } else {
                if (item.doc === "pdf") {
                  return (
                    <PdfMessageLeft
                      message={item.doc.name}
                      messagedetails={item?.text}
                      timestamp={moment(item?.createdAt).format("LT")}
                      thumbnail={item.docImage}
                      link={item.docImage}
                    />
                  );
                } else if (item?.type === "image" && item?.image !== "")  {
                  return (
                    <ImageMessageLeft
                      message={item?.name}
                      messagedetails={item?.text}
                      timestamp={moment(item?.createdAt).format("LT")}
                      thumbnail={item?.image}
                      link={item?.image}
                    />
                  );
                } else {
                  return (
                    <MessageLeft
                      message={item?.name}
                      messagedetails={item?.text}
                      timestamp={moment(item?.createdAt).format("LT")}
                    />
                  );
                }
              }
            })}
            {/* <div>{loader && <>uploading</>}</div> */}

            <div ref={messagesEndRef}></div>
          </Paper>

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderTop: "1px solid #e2e6ea",
            }}
          >


            <Paper
              // component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                borderRadius: 0,
                width: "100%",
                boxShadow: "none",
                borderTop: "1px solid #D7D7D7",
                borderLeft: "1px solid #D7D7D7",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Type Message ..."
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                value={message}
              />
              <IconButton
                          onClick={handleClick}
                          style={{ marginRight: "10px" }}
                        >
                          <AttachFileRoundedIcon />
                          <input
                            type="file"
                            ref={hiddenFileInput}
                            onChange={handleChange}
                            style={{ display: "none" }}
                            multiple="multiple"
                          />
                        </IconButton>
              {/* <EmojiPicker /> */}
              <IconButton 
                  type="button"
                  sx={{ p: "10px" }} 
                  aria-label="search" 
                  onClick={(e) => {sendMessage(e)}}
                  >
                {/* Send */}
                <SendRoundedIcon />
              </IconButton>
            </Paper>
          </div>
          </>
          : 
          <div style={{margin: "50px"}}>
          Please Select A Chat Room
          </div>
}
        </Paper>
        
      </div>
    </div>
  );
}


function useChatScroll(dep) {
  const ref = React.useRef();
  React.useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dep]);
  return ref;
}
