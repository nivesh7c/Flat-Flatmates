import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Properties from "./Properties";
import { getRequest } from "../../../apis/baseApi";
import React, {useState, useEffect} from "react";
import { useAlert } from "react-alert";
import { Pagination } from "@mui/material";


export default function ContactedProperties({propertyType}) {

  const alert = useAlert();

  const [page, setPage] = useState(1);

  const [count, setCount] = useState(0);

  const [contactedData, setContactedData] = useState([]);


  React.useEffect(() => {
    setContactedData([]);
    setCount(0);
    const propType = propertyType === "rent_properties" ? 1 : propertyType === 'pg_hostel' ? 2 : 3;
    getRequest(`authentications/user-contacted-properties/?property_type=${propType}`).then(res => {
        setContactedData(res?.data?.results);
        setCount(res?.data?.count ? res?.data?.count : 0);
    }).catch(err => {
      alert.error("Error in fetching contacted properties!");
    })
  }, [propertyType])


  useEffect(() => {
    const propType = propertyType === "rent_properties" ? 1 : propertyType === 'pg_hostel' ? 2 : 3;
    // setLoading(true);
    setContactedData([]);
    setCount(0);
    getRequest(`authentications/user-contacted-properties/?property_type=${propType}&page=${page}`)
      .then((res) => {
        if (res?.data?.results) {
          setContactedData(res?.data?.results);
        setCount(res?.data?.count ? res?.data?.count : 0);
        } else {
        }
        // setLoading(false);
      })
      .catch((err) => {
        // setLoading(false);
        alert.error("Error in fetching data");
      });
  }, [page]);
 
  const handlePage = (event, value) => {
    setPage(value);
  };


  return (
    <>
      <Box
        sx={{
          border: "1px solid #d1d1d1",

          p: [1, 2, 4],
          borderRadius: "5px",
        }}
      >
        <Grid container spacing={2}>
          
          {
                !contactedData || contactedData?.length === 0 ? 
                        <div style={{margin: "20px"}}>
                          No contacted properties
                        </div>
                        : 
                        contactedData.map(item => {
                          return (
                              <Grid xs={12} sm={6} md={4} sx={{ display: "grid" }}>
                                <Properties data={propertyType === 'rent_properties' ? item?.rent_property : propertyType === 'pg_hostel' ? item?.pg_property  : item?.flatmates_property} propertyType={propertyType}/>
                              </Grid>
                          )
                        })
          }
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
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
    </>
  );
}
