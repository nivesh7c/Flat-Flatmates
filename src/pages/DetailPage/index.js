import { CircularProgress, Container, Typography, Box } from "@mui/material";
import SecondLayout from "../../component/Common/Layout/SecondLayout";

import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import axios from "axios";
import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useLocation, useParams } from "react-router-dom";
import { getRequest, getWWWRequest } from "../../apis/baseApi";
import bg from "../../assets/svg/backpanel2.svg";
import { CommonButton } from "../../component/Cards/Common/CommonButton";
import FlatmateListingCard from "../../component/Cards/Common/FlatmateListingCard";
import PgHostelListing from "../../component/Cards/Common/PgHostelListingCard";
import RentalListingCard from "../../component/Cards/Common/RentalListingCard";
import ViewApartment from "../../component/Cards/ContactedProperties/ViewApartment";
import PropertyViewMobile from "../../component/Dialog/Property/PropertyViewMobile";

const BackPanel = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100vh",
  position: "fixed",
  backgroundImage: `url(${bg})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundColor: "#FEF8F0",
  display: "flex",
  justifyContent: "center",
  //position: "fixed",
}));

export default function DetailPage({type}) {

    const [data, setData] = useState([]);

    const [next, setNext] = useState(null);

    const alert = useAlert();

    const [selectedPropertyId, setSelectedPropertyId] = useState(null);

    const [selectedPropertyData, setSelectedPropertyData] = useState({});

    const location = useLocation();

    const {city, propertyId} = useParams();

    const [liked, setLiked] = useState(false);
    const [loved, setLoved] = useState(false);

    const getFilter = () => {
        if(city)
            return `?city=${city}`;
        return ``;
      }
    
    const [loadingMore, setLoadingMore] = useState(false);

    const [loadingSelectedProperty, setLoadingSelectedProperty] = useState(false);
    
    const getSimilarPropertiesUrl = () => {
        switch(type){
            case "rental":
                return `rent_properties/listing/`;
            case "flatmates":
                return `flatmate/flatmates_list_filter/`;
            case "pghostel":
                return `pg_hostel/pg_hostel_listing/`;
        }
    }
    
      useEffect(() => {
        getRequest(`${getSimilarPropertiesUrl()}${getFilter()}`).then(res => {
            if(res?.data?.results){
                setData(res?.data?.results);
                setNext(res?.data?.next);
            }
        }).catch(err => {
            alert.error("Error in fetching shared apartments!!")
        })
      }, [])

    const getListingCardComponent = (data, isSelected=false) => {
        let newData = {}
        if(isSelected){
             newData = {...data, images: data?.images && data?.images.length > 0 ? data?.images[0] : null}
        }
        else{
             newData = data;
        }
        switch(type){
            case "rental":
                return <RentalListingCard data={newData} />
            case "flatmates":
                return <FlatmateListingCard data={newData} />
            case "pghostel":
                return <PgHostelListing data={newData} />
        }
    }

    const loadMore = () => {
        if(next){
        setLoadingMore(true);
        axios.get(next).then(res => {
            setData([...data, ...res?.data?.results])
            setLoadingMore(false);
        }).catch(err => {
            setLoadingMore(false);
            alert.error("Error in fetching properties!!")
        })
    }
    }

    const getDetailUrl = () => {
        switch(type){
            case "rental":
                return `rent_properties/property_details/${propertyId}/`;
            case "flatmates":
                return `flatmate/flatmates_list_details/${propertyId}/`;
            case "pghostel":
                return `pg_hostel/pg_hostel_details/${propertyId}`;
        }
    }

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if(propertyId){
            setLoadingSelectedProperty(true);
            getRequest(`${getDetailUrl()}`).then(res => {
                if(res?.data?.status){
                    setLoadingSelectedProperty(false);
                    setSelectedPropertyData(res?.data?.data);
                    setLiked(res?.data?.in_ShortList);
                    setLoved(res?.data?.in_wishList);
                    setOpen(true);
                }else{
                    alert.error("Error in fetching details");
                }
            }).catch(err => {
                setLoadingSelectedProperty(false);
                alert.error("Error in fetching detail!")
            })
        }
    }, [propertyId])


  return (
    <>
      <SecondLayout>
        <BackPanel>
          <Container maxWidth="lg">
            {/* <HomeFilter type={type}/> */}
            <Grid container spacing={2} style={{marginTop: "30px"}}>
              <Grid
                sm={5}
                className="scrollgrid"
                sx={{
                  overflowY: "scroll",
                  height: "80vh",
                }}
              >
                {getListingCardComponent(selectedPropertyData, true)}
                <div style={{marginTop: "10px", marginBottom: "10px"}}>
                    <Typography variant="h6">
                        Similar Properties
                    </Typography>
                </div>
                {data && data?.map(item => {
                    return (
                        <div onClick={() => {
                            const url = `/detail/${type}/${city}/${item?.id}`;
                            window.open(url)
                            setSelectedPropertyId(item?.id);
                        }} style={{cursor: "pointer"}}>
                        {getListingCardComponent(item)}
                        <br/>
                        </div>
                    )
                })}
              </Grid>
              <Grid sm={7}>
              <Box sx={{ display: { md: 'block' ,xs: 'none' } }}>
                {loadingSelectedProperty ?
                    <CircularProgress />
                :
                    <ViewApartment propertyData={selectedPropertyData} type={type} liked={liked} loved={loved}/>
                }
                </Box>
              </Grid>
            </Grid>
            <PropertyViewMobile open={open} setOpen={setOpen} propertyData={selectedPropertyData} type={type} liked={liked} loved={loved}/>
          </Container>
        </BackPanel>
      </SecondLayout>
    </>
  );
}
