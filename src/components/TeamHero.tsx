import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";
import { CardActions, Collapse } from "@mui/material";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "../components/Typography";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import Link from "next/link";

import type { Artist } from "@prisma/client";

function TeamHero({ artist }: { artist: Artist }) {
  interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }

  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.standard,
    }),
  }));

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [open, setOpen] = React.useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  artist.facebook_link = "https://www.facebook.com/compagnielavoyette";
  return (
    <Container component="section" sx={{ mt: 20, mb: 20, display: "flex" }}>
      <Grid container>
        <Grid item xs={12} md={10} sx={{ zIndex: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              bgcolor: "primary.dark",
              py: 8,
              px: 3,
            }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ maxWidth: 400 }}
            >
              <Typography
                variant="h4"
                component="h2"
                color="secondary.main"
                gutterBottom
              >
                {artist.firstname} {artist.lastname}
              </Typography>

              <Typography variant="h5" color="secondary.light">
                Biographie :
              </Typography>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon color="secondary" />
              </ExpandMore>
            </Box>
            <CardActions disableSpacing>
              <IconButton aria-label="Instagram">
                {artist.instagram_link && (
                  <Link href={artist.instagram_link} passHref>
                    <InstagramIcon color="secondary" fontSize="large" />
                  </Link>
                )}
              </IconButton>
              <IconButton aria-label="Facebook">
                {artist.facebook_link && (
                  <Link href={artist.facebook_link} passHref>
                    <FacebookRoundedIcon color="secondary" fontSize="large" />
                  </Link>
                )}
              </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography variant="h5" color="secondary.light">
                  {artist.biography}
                </Typography>
              </CardContent>
            </Collapse>
          </Box>
        </Grid>
        <Grid
          item
          xs={100}
          md={300}
          sx={{ display: { md: "block", xs: "none" }, position: "relative" }}
        >
          <Box
            component="img"
            src="https://media.gettyimages.com/photos/zendaya-attends-the-bvlgari-bzero1-rock-collection-event-at-duggal-picture-id1204545842?s=594x594"
            alt="call to action"
            sx={{
              position: "absolute",
              top: -300,
              right: -67,
              bottom: 0,
              width: "100%",
              maxWidth: 300,
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default TeamHero;
