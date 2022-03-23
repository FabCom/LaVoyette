import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Container from "@mui/material/Container";
import Typography from "../Typography";
import Link from "next/link";

import { Artist } from "@prisma/client"
import { Button, Card, CardActions, CardContent } from "@mui/material";
import { Props } from "react";


const ImageBackdrop = styled("div")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: "#000",
  opacity: 0.5,
  transition: theme.transitions.create("opacity"),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  display: "block",
  padding: 0,
  borderRadius: 0,
  height: "40vh",
  [theme.breakpoints.down("md")]: {
    width: "100% !important",
    height: 100,
  },
  "&:hover": {
    zIndex: 1,
  },
  "&:hover .imageBackdrop": {
    opacity: 0.15,
  },
  "&:hover .imageMarked": {
    opacity: 0,
  },
  "&:hover .imageTitle": {
    border: "4px solid currentColor",
  },
  "& .imageTitle": {
    position: "relative",
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
  },
  "& .imageMarked": {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
}));

const ArtistDashboard: React.FC<Props> = ({artists}) => {
    // console.log(artists)
  

export default function ArtistsCards() {
  return (
    <Container component="section" sx={{ mt: 8, mb: 4 }}>
      <Typography variant="h4" marked="center" align="center" component="h2">
        Les artistes
      </Typography>
      <Box sx={{ mt: 8, display: "flex", flexWrap: "wrap" }}>
      <><Typography variant='h2' sx={{marginTop: 5}}>Les Artistes</Typography>
        <Link href="/dashboard/artists/create" passHref><Button color="secondary" variant="contained" type="submit">Ajouter</Button></Link>
        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap', marginTop:5, width: "100%"}}>
          {artists.map((artist: { firstname: any; lastname: any; id: any; }, i: React.Key | null | undefined) => 
            <Card sx={{ minWidth: 275, marginTop: 8 }} key={i}>
              <CardContent>
                <Typography variant='h5'>{artist.firstname} {artist.lastname}</Typography>
                {/* {artist.logo_src && <img src={artist.logo_src} width='150px' height= '100%'/>} */}
              </CardContent>
              <CardActions sx={{justifyContent: 'center'}}>
                <Link href={`/dashboard/artists/${artist.id}/delete`} passHref><Button variant="contained" size="small">Supprimer</Button></Link>
                <Link href={`/dashboard/artists/${artist.id}`} passHref><Button color="secondary" variant="contained" size="small">Éditer</Button></Link>
              </CardActions>
            </Card>
          )}
        </Box></>
        {artists.map((artist) => (
          <Link href={image.path} key={image.title} passHref>
            <ImageIconButton
              
              style={{
                width: image.width,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  backgroundSize: "cover",
                  backgroundPosition: "center 40%",
                  backgroundImage: `url(${image.url})`,
                }}
              />
              <ImageBackdrop className="imageBackdrop" />
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "common.white",
                }}
              >
                <Typography
                  component="h3"
                  variant="h6"
                  color="inherit"
                  className="imageTitle"
                >
                  {image.title}
                  <div className="imageMarked" />
                </Typography>
              </Box>
            </ImageIconButton>
          </Link>
        ))}
      </Box>
    </Container>
  );
}
