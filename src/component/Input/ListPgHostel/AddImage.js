import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  CardContent,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import ImageUploading from "react-images-uploading";
import { CommonButton } from "../../Cards/Common/CommonButton";
import { getWWWRequest, deleteWWWRequest, getRequest, deleteRequest } from "../../../apis/baseApi";
import Grid from "@mui/material/Unstable_Grid2";

function AddImage({
  setStep,
  flatmateDetail,
  setFlatMateDetail,
  createFlatmateListing,
  isEdit = false,
  propertyId = null,
}) {
  const alert = useAlert();
  const [editImages, seteditImages] = useState([]);
  const [editImages1, seteditImages1] = useState([]);
  const [loadAgain, setLoadAgain] = useState(false);
  const [deletedImages, setDeletedImages] = useState([]);
  const [images, setImages] = React.useState([]);

  const [loading, setLoading] = useState(false);

  const maxNumber = 10;

  useEffect(() => {
    if (loadAgain) {
      seteditImages([]);
      seteditImages1([]);
    }
  }, [loadAgain]);

  const [open, setOpen] = React.useState(false);

  const onChange = (imageList, addUpdateIndex) => {
    if (imageList.length <= maxNumber) {
      setImages(imageList);
      const existingImagelength = existingImage.length;
      let tempImage = [];
      imageList
        .slice(-(imageList.length - existingImagelength))
        .forEach((item) => {
          if (item?.file) {
            tempImage.push(item?.file);
          }
        });
      setFlatMateDetail({
        ...flatmateDetail,
        step4: { ...flatmateDetail?.step4, images: tempImage },
      });
      // let tempImage = [];
      // if (imageList.length === 0){
      //   setFlatMateDetail({...flatmateDetail, step4: {...flatmateDetail?.step4, images: []}})
      // }else{
      //   imageList.forEach(item => {
      //     tempImage.push(item?.file);
      //   })
      //   setFlatMateDetail({...flatmateDetail, step4: {...flatmateDetail?.step4, images: tempImage}})
      // }
    } else {
      alert.error("Max 10 images allowed");
    }
  };

  const removeImages = (item) => {
    const result = editImages1.findIndex((element) => element.url === item.url);
    const filter = editImages.filter((element) => element.url !== item.url);
    const array2 = deletedImages;
    array2.push(result);
    setDeletedImages(array2);
    seteditImages(filter);
  };

  useEffect(() => {
    if (!open) {
      setImages([]);
      seteditImages([]);
    }
  }, [open]);

  const [existingImage, setExistingImage] = useState([]);

  useEffect(() => {
    if (isEdit && propertyId) {
      getRequest(
        `seller_dasboard/get_pg_properties_images/${propertyId}/`
      )
        .then((res) => {
          if (res?.data?.data) {
            setExistingImage(res?.data?.data);
            let temp = [];
            res?.data?.data.forEach((item) => {
              temp.push(item?.image);
            });
            setImages(temp);
          }
        })
        .catch((err) => {
          alert.error("Something went wrong.Please try again!");
        });
    }
  }, [isEdit]);

  const deleteImage = (index) => {
    if (existingImage && existingImage.length > 0) {
      if (index + 1 <= existingImage.length) {
        let imageData = existingImage.at(index);
        deleteRequest(
          `seller_dasboard/del_pg_properties_images/${imageData.id}/`
        )
          .then((res) => {
            alert.success("Image successfully removed!!");
            let tempArray = [...existingImage];
            tempArray.splice(index, 1);
            setExistingImage(tempArray);
            let tempImage = [...images];
            tempImage.splice(index, 1);
            setImages(tempImage);
          })
          .catch((err) => {
            alert.error("Something went wrong. Please try again!!");
          });
      } else {
        let tempImage = [...images];
        tempImage.splice(index, 1);
        setImages(tempImage);
        alert.success("Image successfully removed!!");
      }
    } else {
      let tempImage = [...images];
      tempImage.splice(index, 1);
      setImages(tempImage);
      alert.success("Image successfully removed!!");
    }
  };

  return (
    <>
      <Typography variant="h6">
        {isEdit ? "Edit your Pg/Hostel Listing" : "List your PG/Hostel with us"}
      </Typography>
      {!isEdit && (
        <Typography variant="body1" sx={{ color: "#ABA7A7" }}>
          Kindly fill out this form*
        </Typography>
      )}
      <br />

      <>
        <div style={{ marginTop: "20px" }}>
          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
              errors,
            }) => (
              // write your building UI
              <>
                <Grid container spacing={2}>
                  {imageList.map((image, index) => (
                    <Grid xs={6} sm={4} md={4}>
                      <div>
                        <div key={index}>
                          <CardContent
                            sx={{
                              color: "#ffffff",
                              border: "1px solid #D7D7D7",
                              backgroundImage: `url(${image.data_url})`,
                              backgroundPosition: "center",
                              backgroundSize: "cover",
                              backgroundRepeat: "no-repeat",
                              minHeight: "35px",
                              maxWidth: "100px",
                              borderRadius: "12px",
                            }}
                          >
                            {!image?.data_url && (
                              <img
                                src={image}
                                alt="recipe thumbnail"
                                height="35px"
                                width="100px"
                              />
                            )}
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                marginTop: "-12px",
                                marginRight: "-12px",
                              }}
                            >
                              <IconButton
                                sx={{ p: 0.6, backgroundColor: "#fff" }}
                                onClick={() => deleteImage(index)}
                              >
                                <CloseIcon
                                  style={{ color: "#000", fontSize: "14px" }}
                                />
                              </IconButton>
                            </div>
                          </CardContent>
                        </div>

                        {/* <div style={{ display: "flex", flexDirection: "row" }}>
                    {editImages.length >= 1
                      ? editImages?.map((image, index) => {
                          return (
                            <div key={index}>
                              <CardContent
                                sx={{
                                  color: "#ffffff",
                                  border: "1px solid #D7D7D7",
                                  backgroundImage: `url(${image.data_url})`,
                                  backgroundPosition: "center",
                                  backgroundSize: "cover",
                                  backgroundRepeat: "no-repeat",
                                  minHeight: "35px",
                                  maxWidth: "100px",
                                  borderRadius: "12px",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    marginTop: "-12px",
                                    marginRight: "-12px",
                                  }}
                                >
                                  <IconButton
                                    sx={{ p: 0.6, backgroundColor: "#fff" }}
                                    onClick={() => onImageRemove(index)}
                                  >
                                    <CloseIcon
                                      style={{
                                        color: "#000",
                                        fontSize: "14px",
                                      }}
                                    />
                                  </IconButton>
                                </div>
                              </CardContent>
                            </div>
                          );
                        })
                      : null}
                  </div> */}
                      </div>
                    </Grid>
                  ))}
                </Grid>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={onImageUpload}
                    sx={{
                      backgroundColor: "#367CFF",
                      color: "#fff",
                      pl: 10,
                      height: "50px",
                      display: "flex",
                      alignItems: "center",
                      boxsShadow: "none",
                      pr: 10,
                    }}
                    // {...dragProps}
                  >
                    Upload Property Images
                  </Button>
                </div>
                {errors && (
                  <div style={{ textAlign: "center" }}>
                    {errors.maxNumber && (
                      <span style={{ color: "Red" }}>
                        You can upload maximum 6 images.
                      </span>
                    )}
                    {errors.resolution && (
                      <span style={{ color: "Red" }}>
                        Selected file is not match your desired resolution
                      </span>
                    )}
                  </div>
                )}
              </>
            )}
          </ImageUploading>
        </div>
      </>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "250px",
        }}
      >
        <div
          style={{
            position: "relative",
            float: "left",
          }}
        >
          <Button
            onClick={() => {
              setStep(4);
            }}
          >
            Back
          </Button>
        </div>

        <div
          style={{
            position: "relative",
            // float: "right"
          }}
        >
          <CommonButton
            onClick={() => {
              if (images?.length === 0) {
                alert.error("Please add atleast one images");
                return;
              }
              createFlatmateListing(setLoading);
            }}
          >
            {loading ? <CircularProgress /> : "Submit"}
          </CommonButton>
        </div>
      </div>
    </>
  );
}

export default AddImage;
