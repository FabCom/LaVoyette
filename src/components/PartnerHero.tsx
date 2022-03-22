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
      duration: theme.transitions.duration.shortest,
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
                bgcolor: "warning.main",
                py: 8,
                px: 3,
              }}
            >
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ maxWidth: 400 }}
              >
                <Typography variant="h4" component="h2" gutterBottom>
                  {companypartner.name}
                </Typography>

                <Typography variant="h5" color="text.secondary"></Typography>
              </Box>
              <CardActions disableSpacing>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography variant="h5"></Typography>
                  <Typography variant="h5">
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
              sx={{
                position: "absolute",
                top: -67,
                left: -67,
                right: 0,
                bottom: 0,
                width: "100%",
                background:
                  "url(/static/themes/onepirate/TeamHeroImageDots.png)",
              }}
            />
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
    </>
  );
}

export default PartnerHero;
