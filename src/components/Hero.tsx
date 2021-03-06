import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "../components/Typography";
import HeroLayout from "./HeroLayout";

const backgroundImage = "illustration_06_src-pexel.jpeg";

export default function Hero() {
  return (
    <HeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: "#7fc7d9",
        backgroundPosition: "center",
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        style={{ display: "none" }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        La Voyette
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
      >
        Lorem ipsum dolor sit amet.
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        href="/contact"
        sx={{ minWidth: 200 }}
      >
        Nous contacter
      </Button>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Compagnie de spéctacles vivants
      </Typography>
    </HeroLayout>
  );
}
