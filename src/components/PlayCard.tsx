import React from "react";
import {
  Typography,
  Grid,
  Stack,
  Chip,
  Box,
  Container,
  CardActions,
} from "@mui/material";
import Router from "next/router";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import type { PlayWithAudienceAndTags } from "pages/dashboard/plays";

export default function PlayCard({ play }: { play: PlayWithAudienceAndTags }) {
  // console.log(play);
  return (
    <Container component="section" sx={{ mt: 20, mb: 20, display: "flex" }}>
      <Grid container>
        <Grid item xs={12} md={9} sx={{ zIndex: 1 }}>
          <Box
            onClick={() => Router.push("/plays/[id]", `/plays/${play.id}`)}
            sx={{
              display: "flex",
              justifyContent: "center",
              bgcolor: "primary.dark",
              py: 8,
              px: 0,
            }}
          >
            <Box component="form" sx={{ maxWidth: 500 }}>
              <Typography
                variant="h4"
                component="h2"
                color="secondary.main"
                gutterBottom
              >
                {play.title}
              </Typography>
              <Chip
                icon={<AccessTimeIcon />}
                variant="outlined"
                label={`${play.duration} min`}
                color="secondary"
              />

              <Typography variant="h5" color="secondary.light" sx={{ mt: 3 }}>
                {play.abstract ? play.abstract.slice(0, 400) : null}...
              </Typography>
              <Stack direction="row" spacing={2} sx={{ py: 2 }}>
                {play.audienceCategories?.map((categ, i) => {
                  <Chip key={i} label={categ.title} color="secondary" />;
                })}
              </Stack>
              <Stack direction="row" spacing={2} sx={{ py: 2 }}>
                {play.tags?.map((categ, i) => {
                  <Chip key={i} label={categ.title} />;
                })}
              </Stack>
            </Box>
            <CardActions disableSpacing></CardActions>
          </Box>
        </Grid>
        <Grid
          item
          xs={10}
          md={30}
          sx={{ display: { md: "block", xs: "none" }, position: "relative" }}
        >
          <Box
            component="img"
            src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.theatre-madeleine.com%2Fwp-content%2Fuploads%2F2019%2F10%2Ftheatre-de-la-madeleine-03.jpg&f=1&nofb=1"
            alt="call to action"
            sx={{
              position: "absolute",
              top: -450,
              right: -200,
              bottom: 0,
              width: "250%",
              maxWidth: 500,
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
