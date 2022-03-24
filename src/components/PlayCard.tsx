import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Stack,
  Chip,
  Box,
  Container,
  Collapse,
  CardActions,
  IconButton,
} from "@mui/material";
import Router from "next/router";
import Image from "next/image";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import type { Play } from "@prisma/client";
import { ExpandMore } from "@mui/icons-material";
import type { PlayWithAudienceAndTags } from "pages/dashboard/plays";

export default function PlayCard({ play }: { play: PlayWithAudienceAndTags }) {
  console.log(play)
  return (
    <Container component="section" sx={{ mt: 20, mb: 20, display: "flex" }}>
      <Grid container>
        <Grid item xs={12} md={9} sx={{ zIndex: 1 }}>
          <Box
            onClick={() => Router.push("/plays/[id]", `/plays/${play.id}`)}
            sx={{
              display: "flex",
              justifyContent: "center",
              bgcolor: "warning.main",
              py: 8,
              px: 0,
            }}
          >
            <Box
              component="form"
              //   onSubmit={handleSubmit}
              sx={{ maxWidth: 500 }}
            >
              <Typography variant="h4" component="h2" gutterBottom>
                {play.title}
              </Typography>
              <Chip
                icon={<AccessTimeIcon />}
                variant="outlined"
                label={`${play.duration} min`}
              />

              <Typography variant="h5" color="inherit" sx={{ mt: 3 }}>
                {play.abstract ? play.abstract.slice(0, 400) : null}...
              </Typography>
              <Stack direction="row" spacing={2} sx={{ py: 2 }}>
                {play.audienceCategories?.map((categ, i) => {
                  <Chip key={i} label={categ.title} />
                })}
              </Stack>
              <Stack direction="row" spacing={2} sx={{ py: 2 }}>
                {play.tags?.map((categ, i) => {
                  <Chip key={i} label={categ.title} />
                })}
              </Stack>
              {/* <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon /> */}
              {/* </ExpandMore> */}
            </Box>
            <CardActions disableSpacing></CardActions>
            {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography variant="h5"></Typography>
                <Typography variant="h5">{artist.biography}</Typography>
              </CardContent>
            </Collapse> */}
          </Box>
        </Grid>
        <Grid
          item
          xs={10}
          md={30}
          sx={{ display: { md: "block", xs: "none" }, position: "relative" }}
        >
          {/* <Box
            sx={{
              position: "absolute",
              top: -67,
              left: -67,
              right: 0,
              bottom: 0,
              width: "100%",
            }}
          /> */}
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
