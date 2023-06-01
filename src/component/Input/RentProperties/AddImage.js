import {
  TextField,
  Typography,
  IconButton,
  Button,
  CardContent,
  InputBase,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { CommonButton } from "../../Cards/Common/CommonButton";
import ImageUploading from "react-images-uploading";
import { useAlert } from "react-alert";
import CloseIcon from "@mui/icons-material/Close";

function AddImage() {
  const [file, setFile] = useState(null);
  const alert = useAlert();
  const [editImages, seteditImages] = useState([]);
  const [editImages1, seteditImages1] = useState([]);
  const hiddenFileInput = React.useRef(null);
  const [loadAgain, setLoadAgain] = useState(false);
  const [deletedImages, setDeletedImages] = useState([]);
  const [deletedDoc, setDeleteddoc] = useState(false);
  const [images, setImages] = React.useState([]);
  const maxNumber = 6;

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
    } else {
      alert.error("Max 3 images allowed");
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

  return (
    <>
      <Typography variant="h6">List your Rental property with us </Typography>
      <Typography variant="body1" sx={{ color: "#ABA7A7" }}>
        Kindly fill out this form*
      </Typography>
      <br />
      <Typography variant="body1" sx={{ fontWeight: "500" }}>
        Add photos
      </Typography>

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
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto auto auto",
                    gridGap: "10px",
                  }}
                >
                  {imageList.map((image, index) => (
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
                              style={{ color: "#000", fontSize: "14px" }}
                            />
                          </IconButton>
                        </div>
                      </CardContent>
                    </div>
                  ))}
                  <div style={{ display: "flex", flexDirection: "row" }}>
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
                  </div>
                </div>
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
                    Upload
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
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <CommonButton sx={{ width: "80%" }}>Submit</CommonButton>
      </div>
    </>
  );
}

export default AddImage;
