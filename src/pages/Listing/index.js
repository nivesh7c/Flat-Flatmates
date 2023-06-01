import { CircularProgress, Container, Box } from "@mui/material";
import SecondLayout from "../../component/Common/Layout/SecondLayout";

import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import axios from "axios";
import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { getWWWRequest, getRequest, postRequest } from "../../apis/baseApi";
import bg from "../../assets/svg/backpanel2.svg";
import { CommonButton } from "../../component/Cards/Common/CommonButton";
import FlatmateListingCard from "../../component/Cards/Common/FlatmateListingCard";
import PgHostelListing from "../../component/Cards/Common/PgHostelListingCard";
import RentalListingCard from "../../component/Cards/Common/RentalListingCard";
import ViewApartment from "../../component/Cards/ContactedProperties/ViewApartment";
import HomeFilter from "../../component/Common/Filter/HomeFilter";
import PropertyViewMobile from "../../component/Dialog/Property/PropertyViewMobile";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { TickIcon } from "../../component/Cards/Common/CustomIcon/CustomIcon";

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

export default function Listing({type}) {

    const [data, setData] = useState([]);

    const [next, setNext] = useState(null);

    const [page, setPage] = useState(1);

    const alert = useAlert();

    const history = useHistory();

    const [selectedPropertyId, setSelectedPropertyId] = useState(null);

    const [selectedPropertyData, setSelectedPropertyData] = useState({});

    const location = useLocation();

    useEffect(() => {
        getRequest(`${getFirstUrl()}${getFilter()}`).then(res => {
            if(res?.data?.results){
                setData(res?.data?.results);
                setNext(res?.data?.next);
                if(res?.data?.results?.length > 0){
                    setSelectedPropertyId(res?.data?.results[0].id);
                }else{
                    setSelectedPropertyId(null);
                }
            }
        }).catch(err => {
            alert.error("Error in fetching details!!")
        })
    }, [location.pathname])

    // const getFilter = () => {
    //     return `?`;
    //   }
    
    const [loadingMore, setLoadingMore] = useState(false);

    const [loadingSelectedProperty, setLoadingSelectedProperty] = useState(false);

    localStorage.setItem('property_type', type=== 'rental' ? "RENT" : type==='pghostel' ? "RENT_SHARED" : "FLATMATES")
    
    const getFirstUrl = () => {
        switch(type){
            case "rental":
                return `rent_properties/listing/`;
            case "flatmates":
                return `flatmate/flatmates_list_filter/`;
            case "pghostel":
                return `pg_hostel/pg_hostel_listing/`;
        }
    }

    const getNextUrl = () => {
        switch(type){
            case "rental":
                return `https://admin.flatandflatmates.com/rent_properties/listing/`;
            case "flatmates":
                return `https://admin.flatandflatmates.com/flatmate/flatmates_list_filter/`;
            case "pghostel":
                return `https://admin.flatandflatmates.com/pg_hostel/pg_hostel_listing/`;
        }
    }

    const [isRefresh, setIsRefresh] = useState(false);
    
    //   useEffect(() => {
    //     getWWWRequest(`${getFirstUrl()}${getFilter()}`).then(res => {
    //         if(res?.data?.results){
    //             setData(res?.data?.results);
    //             setNext(res?.data?.next);
    //             if(res?.data?.results?.length > 0){
    //                 setSelectedPropertyId(res?.data?.results[0].id);
    //             }else{
    //                 setSelectedPropertyId(null);
    //             }
    //         }
    //     }).catch(err => {
    //         alert.error("Error in fetching details!!")
    //     })
    //   }, []);

    useEffect(() => {
        history.push(`${location.pathname}${getFilter()}`);
    }, [])

      useEffect(() => {
        if(isRefresh){
        // getWWWRequest(`${getFirstUrl()}${getFilter()}`).then(res => {
        //     if(res?.data?.results){
        //         setData(res?.data?.results);
        //         setNext(res?.data?.next);
        //         if(res?.data?.results?.length > 0){
        //             setSelectedPropertyId(res?.data?.results[0].id);
        //         }else{
        //             setSelectedPropertyId(null);
        //         }
        //     }
        // }).catch(err => {
        //     alert.error("Error in fetching details!!")
        // })
        history.push(`${location.pathname}/${getFilter()}`);
        setIsRefresh(false);
    }
      }, [isRefresh])


      const getFilter = () => {
        if(type === 'rental' && localStorage.getItem('RENT_PREFERENCES')){
            const rent_preference = JSON.parse(localStorage.getItem('RENT_PREFERENCES'));
            let str = '?';
            if(rent_preference?.city){
                str += `city=${rent_preference?.city}&`
            }
            if(rent_preference?.rent){
                str += `min_price=0&max_price=${rent_preference?.rent}&`
            }
            if(rent_preference?.bhk){
                str += `bedrooms=${rent_preference?.bhk}&`
            }
            if(rent_preference?.availability){
                str += `availibilty=${rent_preference?.availability}&`
            }
            if(rent_preference?.propertyType){
                str += `property_type=${rent_preference?.propertyType}&`
            }
            if(rent_preference?.area && rent_preference?.area.length > 0 ){
                let latLong = "";
                rent_preference?.area?.map((item, index) => {
                    if(index < rent_preference?.area.length - 1){
                        latLong += `${item?.lat},`
                        latLong += `${item?.long}-`
                    }
                    else{
                        latLong += `${item?.lat},`
                        latLong += `${item?.long}`
                        }
    
                })
                str += `lat_long=${latLong}&`
            }
            return str;
        }
    else if(type === 'flatmates' && localStorage.getItem('FLATMATES_PREFERENCES')){ 
        const rent_preference = JSON.parse(localStorage.getItem('FLATMATES_PREFERENCES'));
        let str = '?';
        if(rent_preference?.city){
            str += `city=${rent_preference?.city}&`
        }
        if(rent_preference?.rent){
            str += `min_price=0&max_price=${rent_preference?.rent}&`
        }
        if(rent_preference?.sharingType){
            str += `sharing=${rent_preference?.sharingType}&`
        }
        if(rent_preference?.availability){
            str += `availibilty=${rent_preference?.availability}&`
        }
        if(rent_preference?.gender){
            str += `avialable_for=${rent_preference?.gender}&`
        }
        if(rent_preference?.area && rent_preference?.area.length > 0 ){
            let latLong = "";
            rent_preference?.area?.map((item, index) => {
                if(index < rent_preference?.area.length - 1){
                    latLong += `${item?.lat},`
                    latLong += `${item?.long}-`
                }
                else{
                    latLong += `${item?.lat},`
                    latLong += `${item?.long}`
                    }

            })
            str += `lat_long=${latLong}&`
        }
        return str;

    }
    else if(type === 'pghostel' && localStorage.getItem('RENT_SHARED_PREFERENCES')){ 
        const rent_preference = JSON.parse(localStorage.getItem('RENT_SHARED_PREFERENCES'));
            let str = '?';
            if(rent_preference?.city){
                str += `city=${rent_preference?.city}&`
            }
            if(rent_preference?.rent){
                str += `min_price=0&max_price=${rent_preference?.rent}&`
            }
            if(rent_preference?.sharingType){
                str += `sharing=${rent_preference?.sharingType}&`
            }
            if(rent_preference?.availability){
                str += `availibilty=${rent_preference?.availability}&`
            }
            if(rent_preference?.gender){
                str += `avialable_for=${rent_preference?.gender}&`
            }
            if(rent_preference?.area && rent_preference?.area.length > 0 ){
                let latLong = "";
                rent_preference?.area?.map((item, index) => {
                    if(index < rent_preference?.area.length - 1){
                        latLong += `${item?.lat},`
                        latLong += `${item?.long}-`
                    }
                    else{
                        latLong += `${item?.lat},`
                        latLong += `${item?.long}`
                        }
    
                })
                str += `lat_long=${latLong}&`
            }
            return str;
    }
        else
            return ``;
    }

    const getListingCardComponent = (data) => {
        switch(type){
            case "rental":
                return <RentalListingCard data={data} selectedPropertyId={selectedPropertyId}/>
            case "flatmates":
                return <FlatmateListingCard data={data} selectedPropertyId={selectedPropertyId}/>
            case "pghostel":
                return <PgHostelListing data={data} selectedPropertyId={selectedPropertyId}/>
        }
    }

    const loadMore = () => {
        if(next){
        setLoadingMore(true);
        const url = `${getNextUrl()}${getFilter()}&page=${page+1}`;
        axios.get(url).then(res => {
            setData([...data, ...res?.data?.results])
            setLoadingMore(false);
            setPage(page + 1);
            setNext(res?.data?.next);
        }).catch(err => {
            setLoadingMore(false);
            alert.error("Error in fetching properties!!")
        })
    }
    }

    const getDetailUrl = () => {
        switch(type){
            case "rental":
                return `rent_properties/property_details/${selectedPropertyId}/`;
            case "flatmates":
                return `flatmate/flatmates_list_details/${selectedPropertyId}/`;
            case "pghostel":
                return `pg_hostel/pg_hostel_details/${selectedPropertyId}`;
        }
    }
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if(selectedPropertyId){
            setLoadingSelectedProperty(true);
            getRequest(`${getDetailUrl()}`).then(res => {
                if(res?.data?.status){
                    setLoadingSelectedProperty(false);
                    setSelectedPropertyData(res?.data?.data);
                    setLiked(res?.data?.in_ShortList);
                    setLoved(res?.data?.in_wishList);
                }else{
                    alert.error("Error in fetching details");
                }
            }).catch(err => {
                setLoadingSelectedProperty(false);
                alert.error("Error in fetching detail!")
            })
        }
    }, [selectedPropertyId]);

    const [currentIndex, setCurrentIndex] = useState(0);


    useEffect(() => {
        if(currentIndex < data.length){
            setSelectedPropertyId(data[currentIndex].id);
        }
    }, [currentIndex])
    

    const getSetViewCountUrl = () => {
        switch(type){
            case "rental":
                return `rent_properties/property_details_views/`;
            case "flatmates":
                return `flatmate/flatmates_list_details_views/`;
            case "pghostel":
                return `pg_hostel/pg_hostel_details_views/`;
        }
    }

    const setViewCount = (propertyId) => {
        postRequest(`${getSetViewCountUrl()}${propertyId}/`, {}).then(res => {
            // console.log("res");
        }).catch(err => {
            // alert.error("");
        })
    }

    const [liked, setLiked] = useState(false);
    const [loved, setLoved] = useState(false);


  return (
    <>
      <SecondLayout showCity={true} isListing={true} setRefresh={setIsRefresh} isRefresh={isRefresh}>
        <BackPanel>
          <Container maxWidth="lg">
            <HomeFilter type={type} refreshData={setIsRefresh} isListing={true} isRefresh={isRefresh}/>
            <Grid container spacing={2}>
              <Grid
                sm={5}
                xs={12}
                md={5}
                className="scrollgrid"
                sx={{
                  overflowY: "scroll",
                  height: "80vh",
                }}
              >
                {data && data?.map((item, index) => {
                    return (
                        <div onClick={() => {
                            setSelectedPropertyId(item?.id);
                            setCurrentIndex(index);
                            setOpen(true);
                            setViewCount(item?.id);
                        }} style={{cursor: "pointer"}}>
                        {getListingCardComponent(item)}
                        <br/>
                        </div>
                    )
                })}
                {(!data || data.length === 0 ) ? 
                        <div style={{marginTop: "20px"}}>
                        No property Found.
                        </div>
                :
                <>
                {next && (
                  <div
                    style={{ justifyContent: "center", marginBottom: "45px" }}
                  >
                    <CommonButton
                      onClick={() => {
                        loadMore();
                      }}
                    >
                      {loadingMore ? <CircularProgress /> : "Show More"}
                    </CommonButton>
                  </div>
                )}
                {
                  data &&  !next && (
                        <div style={{marginTop: "20px"}}>
                            {/* <TickIcon /> */}
                         Oops, No property Left In Your Searches.
                        </div>
                    )
                  }
                </>
                }
              </Grid>
              
              <Grid sm={7}>
                <Box sx={{ display: { md: 'block' ,xs: 'none' } }}>
                {loadingSelectedProperty ?
                    <CircularProgress />
                :
                selectedPropertyId ? 
                    <ViewApartment propertyData={selectedPropertyData} type={type} setCurrentIndex={setCurrentIndex} currentIndex={currentIndex} liked={liked} loved={loved}/> :
                <></>
                }
                </Box>
              </Grid>
            </Grid>
            <PropertyViewMobile open={open} setOpen={setOpen} propertyData={selectedPropertyData} type={type} setCurrentIndex={setCurrentIndex} currentIndex={currentIndex} liked={liked} loved={loved}/>
          </Container>
        </BackPanel>
      </SecondLayout>
    </>
  );
}
