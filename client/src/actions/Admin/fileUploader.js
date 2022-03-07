export const fileUploader = (e) => async (dispatch) => {
  // files, is an array, since we have the ability to upload multiple
  // files we only want the first file.
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append("file", file);
  //Triggers the Loader component
  setUploading(true);

  //This makes the request to the backend
  try {
    const config = {
      headers: {
        // Has to have the multipart/form-data!
        // Also only Admins can upload a file, need token
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post("/api/upload", formData, config);

    //Once the post request is finished, setImage to data, setUploading to false, to remove Loader
    //Component
    setImage(data.data);
    setUploading(false);
    dispatch(setAlert(`Image uploaded successfully`, "success"));
  } catch (error) {
    console.error(error);
    setUploading(false);
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(setAlert(`Image did not upload: ${message}`, "danger"));
  }
};
