import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';

function TeamHero() {
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container component="section" sx={{ mt: 10, mb: 20, display: 'flex' }}>
      <Grid container>
        <Grid item xs={12} md={6} sx={{ zIndex: 1 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              bgcolor: 'warning.main',
              py: 8,
              px: 3,
            }}
          >
            <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400 }}>
              <Typography variant="h2" component="h2" gutterBottom>
                Zendaya
              </Typography>
              <Typography variant="h5">
              Zendaya est une actrice, chanteuse et danseuse américaine révélée dans la série de Disney Channel Shake It Up.
              Maecenas dignissim ex eget enim lobortis, ac dapibus nulla efficitur. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque posuere ac mi at rutrum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec pulvinar velit ac erat rutrum tempor. Ut efficitur laoreet turpis tempor venenatis. Vivamus tempor imperdiet urna, vel elementum mauris hendrerit ut.
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { md: 'block', xs: 'none' }, position: 'relative' }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: -67,
              left: -67,
              right: 0,
              bottom: 0,
              width: '100%',
              background: 'url(/static/themes/onepirate/TeamHeroImageDots.png)',
            }}
          />
          <Box
            component="img"
            src="https://media.gettyimages.com/photos/zendaya-attends-the-bvlgari-bzero1-rock-collection-event-at-duggal-picture-id1204545842?s=594x594"
            alt="call to action"
            sx={{
              position: 'absolute',
              top: -28,
              left: -28,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: 300,
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default TeamHero;