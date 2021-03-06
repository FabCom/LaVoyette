import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";
import { CardActions, Collapse } from "@mui/material";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "../components/Typography";

import type { CompanyPartner } from "@prisma/client";

function PartnerHero({ companypartner }: { companypartner: CompanyPartner }) {
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

  return (
    <>
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
                sx={{ maxWidth: 800 }}
              >
                <Typography
                  variant="h4"
                  component="h2"
                  color="secondary.main"
                  gutterBottom
                >
                  {companypartner.name}
                </Typography>
              </Box>
              <CardActions disableSpacing>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon color="secondary" />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography variant="h5" color="secondary.light">
                    {companypartner.description}
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
                top: -200,
                right: -67,
                bottom: 0,
                width: "100%",
                maxWidth: 300,
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default PartnerHero;
