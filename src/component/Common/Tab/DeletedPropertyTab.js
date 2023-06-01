// import SwipeableViews from "react-swipeable-views";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { getRequest, getWWWRequest } from "../../../apis/baseApi";
import PropertyCard from "../../Cards/Common/PropertyCard";
import { Pagination } from "@mui/material";

export default function DeletedPropertyTab({propertyType}) {
  const [data, setData] = useState([]);
  const alert = useAlert();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const url=`seller_dasboard/${propertyType}_list/?is_deleted=true&page=${page}`;
    setLoading(true);
    setData([]);
    setCount(0);
    getRequest(url).then(res => {
      if(res?.data?.results){
        setData(res?.data?.results);
        setCount(res?.data?.count ? res?.data?.count :0);
      }else{
        
      }
      setLoading(false);
    }).catch(err => {
      setLoading(false);
        alert.error("Error in fetching data");
    })
  },[propertyType, page]);

  const handlePage = (event, value) => {
    setPage(value);
  };

  return (
    <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
        
      <Grid container spacing={2}>
      {loading ? 
        <CircularProgress />
         :
         (data && data.length > 0 ?  data?.map(item => {
          return (
          <Grid xs={12} sm={6} style={{ display: "grid" }}>
            <PropertyCard data={item} propertyType={propertyType} propertyId={item?.id} deleted/>
          </Grid>
          )
         }) : 
         <div>
         No property added
         </div>
         )
         }
         <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
              {count > 0 && (
                <Pagination
                  color="primary"
                  count={Math.ceil(count / 9)}
                  variant="outlined"
                  shape="rounded"
                  onChange={handlePage}
                />
              )}
            </div>
        </Grid>
    </Box>
  );
}
