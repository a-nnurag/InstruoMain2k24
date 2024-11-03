import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Add as AddIcon, Close as CloseIcon } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

const EventRegistrationPage = () => {
  const [event, setEvent] = useState({
    name: "",
    description: "",
    venue: "",
    mainThumbnail: null,
    otherPosters: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleThumbnailChange = (e) => {
    setEvent({ ...event, mainThumbnail: e.target.files[0] });
  };

  const handlePosterChange = (index, poster) => {
    const updatedPosters = [...event.otherPosters];
    updatedPosters[index] = poster;
    setEvent({ ...event, otherPosters: updatedPosters });
  };

  const handleAddPoster = () => {
    setEvent({ ...event, otherPosters: [...event.otherPosters, null] });
  };

  const handleRemovePoster = (index) => {
    const updatedPosters = [...event.otherPosters];
    updatedPosters.splice(index, 1);
    setEvent({ ...event, otherPosters: updatedPosters });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    console.log("Submitting event:", event);
    setIsLoading(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Typography variant="h4" gutterBottom>
        Register an Event
      </Typography>
      <Paper elevation={3} sx={{ p: 1 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Event Name"
              name="name"
              value={event.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Venue"
              name="venue"
              value={event.venue}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              name="description"
              value={event.description}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Main Thumbnail
            </Typography>
            <Box
              component="label"
              htmlFor="main-thumbnail"
              sx={{ cursor: "pointer" }}
            >
              {event.mainThumbnail ? (
                <Box
                  component="img"
                  src={URL.createObjectURL(event.mainThumbnail)}
                  alt="Main Thumbnail"
                  sx={{ maxWidth: "100%", height: "auto" }}
                />
              ) : (
                <Paper
                  sx={{
                    p: 4,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <AddIcon sx={{ mb: 2 }} />
                  <Typography>Upload Main Thumbnail</Typography>
                </Paper>
              )}
              <input
                id="main-thumbnail"
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                style={{ display: "none" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Other Posters
            </Typography>
            <Stack direction="row" flexWrap="wrap" spacing={2}>
              {event.otherPosters.map((poster, index) => (
                <Box key={index} sx={{ position: "relative" }}>
                  <Box
                    component="label"
                    htmlFor={`other-poster-${index}`}
                    sx={{ cursor: "pointer" }}
                  >
                    {poster ? (
                      <Box
                        component="img"
                        src={URL.createObjectURL(poster)}
                        alt={`Other Poster ${index + 1}`}
                        sx={{ maxWidth: 120, height: "auto" }}
                      />
                    ) : (
                      <Paper
                        sx={{
                          width: 120,
                          height: 120,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <AddIcon />
                      </Paper>
                    )}
                    <input
                      id={`other-poster-${index}`}
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handlePosterChange(index, e.target.files[0])
                      }
                      style={{ display: "none" }}
                    />
                  </Box>
                  <IconButton
                    onClick={() => handleRemovePoster(index)}
                    sx={{
                      position: "absolute",
                      top: -8,
                      right: -8,
                      bgcolor: "background.paper",
                      "&:hover": {
                        bgcolor: "grey.300",
                      },
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              ))}
              <Button
                onClick={handleAddPoster}
                startIcon={<AddIcon />}
                sx={{ alignSelf: "center" }}
              >
                Add Poster
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4 }} />
        <Box display="flex" justifyContent="flex-end">
          <LoadingButton
            variant="contained"
            onClick={handleSubmit}
            loading={isLoading}
            sx={{
              bgcolor: "primary.main",
              "&:hover": {
                bgcolor: "primary.dark",
              },
            }}
          >
            Submit Event
          </LoadingButton>
        </Box>
      </Paper>
    </Container>
  );
};

export default EventRegistrationPage;
