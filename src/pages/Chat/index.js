import {
  Box, Typography
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import {
  collection, onSnapshot, query, where, getDocs, updateDoc, doc
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import MsgPanel from "../../component/Cards/ChatRoomCard/Message/MsgPanel";
import ChatTabs from "../../component/Cards/ChatRoomCard/Tab/ChatTab";
import Layout from "../../component/Common/Layout/Layout";
import { fireStoreDb } from "../../utility/firebase";

function Chat({isOwner=false}) {
  const [isOpen, setisOpen] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const propertyId = params.get('propertyId');


  const [value, setValue] = useState(params.get('propertyType') ? params.get('propertyType') : "rental");

  const [data, setData] = useState([]);

  const [selectedRoom, setSelectedRoom] = useState();

  const [roomId, setRoomId] = useState();

  const [refreshChat, setRefreshChat] = useState(false);

  useEffect( () => {
    async function getAllRooms() {
    if(value || refreshChat){
      // test = getChatRooms();
      const userDetails = JSON.parse(localStorage?.getItem('user_details'));
      const chatRoomQuery = query(
        collection(fireStoreDb, "CHATROOM"),
        where(isOwner ? "ownerSlug" : "userSlug", "==", userDetails?.slug),
        where("propertyType", "==", value),
        where("deleted", "==", false)
        // orderBy("groupCreatedAt")
      );
      let tempData = [];
  
        // const testq = onSnapshot(chatRoomQuery, (querySnapshot) => {
        //   tempData = [];
          
        //   querySnapshot.forEach((doc) => {
        //     if(propertyId &&  doc.data()?.propertyId.toString() === propertyId){
        //       let temp = doc.data();
        //       temp._id = doc.id;
        //       tempData.unshift(temp)
        //     }else{
        //       let temp = doc.data();
        //       temp._id = doc.id;
        //       tempData.push(temp);
        //     }
        //   });
        //   setData(tempData);
        //   if(tempData?.length > 0 && !roomId){
        //     setSelectedRoom(tempData[0]);
        //     setRoomId(tempData[0]?._id);
        //   }
        // });
        // return () => {
        //   testq();
        // }
        const querySnapshot = await getDocs(chatRoomQuery);
          querySnapshot.forEach((doc) => {
            if(propertyId &&  doc.data()?.propertyId.toString() === propertyId){
              let temp = doc.data();
              temp._id = doc.id;
              tempData.unshift(temp)
            }else{
              let temp = doc.data();
              temp._id = doc.id;
              tempData.push(temp);
            }
          });
          setData(tempData);
          if(tempData?.length > 0 && !roomId){
            setSelectedRoom(tempData[0]);
            setRoomId(tempData[0]?._id);
          }
  }
}
getAllRooms();
  }, [value, refreshChat])

  const deleteChatGroup = async () => {
    const lref = doc(
      fireStoreDb,
      "CHATROOM",
      roomId
    );
    const updateLatestMessageRef = await updateDoc(lref, {
      deleted: true,
    });
    setRefreshChat(true);
    setRoomId();
    setSelectedRoom({});
  }

  return (
    <Layout>
      <Box sx={{ mt: 2, mb: 10 }}>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h4">Chat Room</Typography>
          <Typography variant="body2">{isOwner ? "Chat with interested users" : "Connect with Owner directly" }</Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            marginTop: "10px",
            height: "75vh",
            //width: "100%",
            // height: "600px",
            position: "relative",
          }}
        >
          <Grid
            container
            style={{ display: "flex", border: "1px solid #e2e6ea" }}
          >
            <Grid item xs={12} sm={4}>
              <div>
                {/* <div
                  style={{ borderBottom: "1px solid #e2e6ea", padding: "20px" }}
                >
                  <Paper
                    component="form"
                    sx={{
                      padding: "2px 4px",
                      display: "flex",
                      alignItems: "center",
                      boxShadow: "none",
                      border: "1px solid #e2e6ea",
                      borderRadius: "30px",
                    }}
                  >
                    <IconButton sx={{ padding: 1 }} aria-label="menu">
                      <SearchIcon />
                    </IconButton>
                    <InputBase
                      sx={{ marginLeft: 1, flex: 1 }}
                      // onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search By Name"
                      inputProps={{
                        style: {
                          fontSize: "15px",
                          color: "#6c757d",
                          padding: "10px",
                        },
                      }}
                    />
                  </Paper>
                </div> */}

                <div>
                  <ChatTabs value={value} setValue={setValue} data={data} setData={setData} setSelectedRoom={setSelectedRoom} setRoomId={setRoomId} selectedRoom={selectedRoom} roomId={roomId} isOwner={isOwner} deleteChatGroup={deleteChatGroup}/>
                </div>
              </div>
            </Grid>

            <Grid
              item
              xs={12}
              sm={isOpen ? 4 : 8}
              sx={{
                borderLeft: "1px solid #e2e6ea",
                display: { xs: "none", sm: "block" },
              }}
            >
              <MsgPanel roomDetails={selectedRoom} roomId={roomId} isOwner={isOwner} deleteChatGroup={deleteChatGroup}/>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
}

export default Chat;
