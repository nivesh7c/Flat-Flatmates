import { CircularProgress, Container, Box } from "@mui/material";
import SecondLayout from "../../component/Common/Layout/SecondLayout";

import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { getRequest, postRequest } from "../../apis/baseApi";
import bg from "../../assets/svg/backpanel2.svg";
import FlatmateListingCard from "../../component/Cards/Common/FlatmateListingCard";
import PgHostelListing from "../../component/Cards/Common/PgHostelListingCard";
import RentalListingCard from "../../component/Cards/Common/RentalListingCard";
import ViewApartment from "../../component/Cards/ContactedProperties/ViewApartment";
import MyShortlistsFilter from "../../component/Common/Filter/MyShortlistFilter";
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

export default function MyShortlists() {

    const [data, setData] = useState([]);

    const [next, setNext] = useState(null);

    const [page, setPage] = useState(1);

    const alert = useAlert();

    const [selectedPropertyId, setSelectedPropertyId] = useState(null);

    const [selectedPropertyData, setSelectedPropertyData] = useState({});

    const getFilter = () => {
        return `?`;
      }
    
    const [loadingMore, setLoadingMore] = useState(false);

    const [loadingSelectedProperty, setLoadingSelectedProperty] = useState(false);
    
    // const getFirstUrl = () => {
    //     switch(type){
    //         case "rental":
    //             return `api/rent_properties/listing/`;
    //         case "flatmates":
    //             return `api/flatmate/flatmates_list_filter/`;
    //         case "pghostel":
    //             return `api/pg_hostel/pg_hostel_listing/`;
    //     }
    // }

    // const getNextUrl = () => {
    //     switch(type){
    //         case "rental":
    //             return `https://admin.flatandflatmates.com/rent_properties/listing/`;
    //         case "flatmates":
    //             return `https://admin.flatandflatmates.com/flatmate/flatmates_list_filter/`;
    //         case "pghostel":
    //             return `https://admin.flatandflatmates.com/pg_hostel/pg_hostel_listing/`;
    //     }
    // }

    const [listType, setListType] = useState('Liked');

    const [type, setType] = useState();

    const getUrl = () => {
        switch(listType){
            // case 'Loved':
            //     return `api/user_wishlist/user_wishlist/`;
            // case 'Liked':
            //     return `api/userShortlist/user_shortlist/`;
            // default:
            //     return `api/user_wishlist/user_wishlist/`;
            case 'Loved':
                return `user_wishlist/user_wishlist/`;
            case 'Liked':
                return `userShortlist/user_shortlist/`;
            default:
                return `user_wishlist/user_wishlist/`;
        }
    }

    const [rentData, setRentData] = useState([]);
    const [pghostelData, setPGHostelData] = useState([]);
    const [flatmateData, setFlatmateData] = useState([]);
    const [liked, setLiked] = useState(false);
    const [loved, setLoved] = useState(false);

    useEffect(() => {
        setSelectedPropertyId(null);
        getRequest(`${getUrl()}`).then(res => {
            if(res?.status === 200){
                let flagType = true;
                let temp =[];
                if(res?.data?.rent_properties && res?.data?.rent_properties.length > 0){
                let temp =[];
                res?.data?.rent_properties?.forEach(item => {
                    temp.push({...item?.property, images: item?.property?.images?.length > 0 ? item?.property?.images[0] : null})
                })
                setRentData(temp);
                if(flagType && !type){
                setType("Rental");    
                flagType = false;
                }
            }
            if(res?.data?.pg_hostel_properties && res?.data?.pg_hostel_properties.length > 0){
                temp =[];
                res?.data?.pg_hostel_properties?.forEach(item => {
                    temp.push({...item?.property, images: item?.property?.images?.length > 0 ? item?.property?.images[0] : null})
                })
                setPGHostelData(temp);
                if(flagType && !type){
                setType("PG/Hostel");
                flagType = false;
                }
            }
            if(res?.data?.flatmates_properties && res?.data?.flatmates_properties.length > 0){
                temp =[];
                res?.data?.flatmates_properties?.forEach(item => {
                    temp.push({...item?.property, images: item?.property?.images?.length > 0 ? item?.property?.images[0] : null})
                })
                setFlatmateData(temp);
                
                if(flagType && !type){
                    setType("Flatmates");
                flagType = false;
                }
            }
            if((!res?.data?.rent_properties || res?.data?.rent_properties.length === 0)  && (!res?.data?.pg_hostel_properties || res?.data?.rent_properties.length === 0) && (!res?.data?.flatmates_properties || res?.data?.rent_properties.length === 0)){
                setType("Flatmates");
            }
            }
            
            else{
                alert.error("Error in fetching shortlist data!!");
            }
        }).catch(err => {
            alert.error("Error in fetching shortlist data!!");
        })
    }, [listType])


    useEffect(() => {
        switch(type){
            case 'Rental':
                if(rentData?.length > 0){
                    setSelectedPropertyId(rentData[0]?.id);
                }else{
                    setSelectedPropertyId(null);
                }
                
                setData(rentData);
                break;
            case 'PG/Hostel':
                if(pghostelData?.length > 0){
                    setSelectedPropertyId(pghostelData[0]?.id);
                }else{
                    setSelectedPropertyId(null);
                }
                setData(pghostelData);
                break;
            case 'Flatmates':
                if(flatmateData?.length > 0){
                    setSelectedPropertyId(flatmateData[0]?.id);
                }else{
                    setSelectedPropertyId(null);
                }
                setData(flatmateData);
                break;
        }
    }, [type, rentData, pghostelData, flatmateData])

    const getListingCardComponent = (data) => {
        switch(type){
            case "Rental":
                return <RentalListingCard data={data} />
            case "Flatmates":
                return <FlatmateListingCard data={data} />
            case "PG/Hostel":
                return <PgHostelListing data={data} />
        }
    }

    

    const getDetailUrl = () => {
        switch(type){
            case "Rental":
                return `rent_properties/property_details/${selectedPropertyId}/`;
            case "Flatmates":
                return `flatmate/flatmates_list_details/${selectedPropertyId}/`;
            case "PG/Hostel":
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
                    setOpen(true);
                }else{
                    alert.error("Error in fetching details");
                }
            }).catch(err => {
                setLoadingSelectedProperty(false);
                alert.error("Error in fetching detail!")
            })
        }
    }, [selectedPropertyId]);

    const getSetViewCountUrl = () => {
        switch(type){
            case "Rental":
                return `rent_properties/property_details_views/`;
            case "Flatmates":
                return `flatmate/flatmates_list_details_views/`;
            case "PG/Hostel":
                return `pg_hostel/pg_hostel_details_views/`;
        }
    }


  return (
    <>
      <SecondLayout>
        <BackPanel>
          <Container maxWidth="lg">
            <MyShortlistsFilter propertyType={type} shortlistType={listType}  setPropertyType={setType} setShortlistType={setListType} />
            <Grid container spacing={2}>
              <Grid
                sm={5}
                className="scrollgrid"
                sx={{
                  overflowY: "scroll",
                  height: "80vh",
                }}
              >
                {data && data?.map(item => {
                    return (
                        <div onClick={() => {
                            setSelectedPropertyId(item?.id);
                            // setViewCount(item?.id);
                        }} style={{cursor: "pointer"}}>
                        {getListingCardComponent(item)}
                        <br/>
                        </div>
                    )
                })}
                {
                    !data || data?.length === 0 && 
                    <div style={{marginTop: "30px"}}>
                        No {listType} {type} Property added.
                    </div>
                }
                
              </Grid>
              
              <Grid sm={7}>
              <Box sx={{ display: { md: 'block' ,xs: 'none' } }}>
                {loadingSelectedProperty ?
                    <CircularProgress />
                :
                (selectedPropertyId ? 
                    <ViewApartment propertyData={selectedPropertyData} type={type == 'PG/Hostel' ? 'pghostel' : type==='Flatmates' ? 'flatmates':'rental'} listType={listType} liked={liked} loved={loved}/>
                    : 
                <></>
                )}
                </Box>
              </Grid>
            </Grid>
            <PropertyViewMobile open={open} setOpen={setOpen} propertyData={selectedPropertyData} type={type == 'PG/Hostel' ? 'pghostel' : type==='Flatmates' ? 'flatmates':'rental'} liked={liked} loved={loved}/>
          </Container>
        </BackPanel>
      </SecondLayout>
    </>
  );
}
