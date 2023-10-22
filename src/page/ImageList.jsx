import { styled } from "@mui/material/styles";

import { Box, Button, Card, Grid, Paper, TextField } from "@mui/material";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { Search } from "lucide-react";

const ImageList = () => {
  const valueRef = useRef("");
  const [images, setImages] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const sendValue = () => {
    setSearchKey(valueRef.current.value);
  };

  const searchImages = async () => {
    const accessKey = "oT_fk92Tz05ElgEfC9dYpEYyL0hUggVTg0XPKcIJZDM";
    const url = `https://api.unsplash.com/search/photos?page=${pageNumber}&query=${searchKey}&client_id=${accessKey}&client_secret`;
    const response = await fetch(url);
    const data = await response.json();
    setImages(data.results);
  };

  useEffect(() => {
    searchImages();
  }, [searchKey, pageNumber, images]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <div>
      <Box
        sx={{
          minHeight: "150px",
          display: "flex",
          justifyContent: "center",
          alignItems: "end",
          gap: 1,
          marginBottom: "20px",
        }}
      >
        <TextField
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
          inputRef={valueRef}
        />
        <Button color="warning" onClick={sendValue}>
          <Search />
        </Button>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {images.map((image, id) => (
            <Grid
              key={id}
              item
              xs={12}
              sm={12}
              md={6}
              lg={4}
              xxl={3}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Item>
                <img
                  src={image?.urls?.small}
                  alt={"item.title"}
                  loading="lazy"
                />
              </Item>
            </Grid>
          ))}
          {searchKey !== "" && images.length > 0 && (
            <Button
              sx={{ marginTop: "20px" }}
              onClick={() => setPageNumber(pageNumber + 1)}
            >
              Show More
            </Button>
          )}

          {images.length === 0 && (
            <Card
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "200px",
              }}
            >
              Sorry!! no images available!
            </Card>
          )}
        </Grid>
      </Box>
    </div>
  );
};

export default ImageList;
