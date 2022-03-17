import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '../components/Typography';
import HeroLayout from './HeroLayout';

const backgroundImage =
  'https://images.pexels.com/photos/109669/pexels-photo-109669.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260';

export default function ContainerStory() {
    return (
      <HeroLayout
        sxBackground={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundColor: '#7fc7d9', // Average color of the background image.
        //   backgroundPosition: 'center',
        }}
      >
        {/* Increase the network loading priority of the background image. */}
        <img
          style={{ display: 'none' }}
          src={backgroundImage}
          alt="increase priority"
        />
        <Typography color="inherit" align="center" variant="h2" >
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
      </HeroLayout>
    );
  }