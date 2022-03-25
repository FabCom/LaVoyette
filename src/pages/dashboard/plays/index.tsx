<<<<<<< HEAD
import React from "react";
import {
  Container,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  CardActions,
  IconButton,
  Stack,
  Chip,
} from "@mui/material";
import Dashboard from "components/dashboard/LayoutDashboard";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import models from "lib/models";
import { AudienceCategory, Tag } from "@prisma/client";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export type PlayWithAudienceAndTags = {
  id: number;
  title: string;
  abstract: string;
  audienceCategories: AudienceCategory[];
  tags: Tag[];
  duration: number;
};
type Props = { plays: PlayWithAudienceAndTags[] };

const PlaysDashboard: React.FC<Props> = ({ plays }) => {
  return (
    <Dashboard>
      <Typography variant="h2" sx={{ marginTop: 5 }}>
        Les spectacles
      </Typography>
      <Link href="/dashboard/plays/create" passHref>
        <Button
          color="secondary"
          variant="contained"
          type="submit"
          sx={{ mt: 10 }}
        >
          Ajouter
        </Button>
      </Link>
      <Box
        sx={{ mt: 5, width: "100%", display: "flex", flexDirection: "column" }}
      >
        <Box
          sx={{
            width: "100%",
            padding: 5,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box sx={{ width: "30%" }}>
            <span>Titre</span>
=======
import React from 'react'
import { Container, Box, Button, Card, CardContent, Typography, Grid, CardActions, IconButton, Stack, Chip } from '@mui/material'
import Dashboard from 'components/dashboard/LayoutDashboard';
import Link from 'next/link';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import models from "lib/models"
import { AudienceCategory, Role, Tag } from "@prisma/client"
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export type PlayWithAudienceAndTags = { id: number, title: string, abstract: string, audienceCategories: AudienceCategory[], tags: Tag[], duration: number}


const PlaysDashboard= ({ plays }: { plays: PlayWithAudienceAndTags[] }) => {
	return (
		<Dashboard>
			<Typography variant='h2' sx={{marginTop: 5}}>Les spectacles</Typography>
				<Link href="/dashboard/plays/create" passHref>
					<Button color="secondary" variant="contained" type="submit">Ajouter</Button>
				</Link>
			<Box sx={{ mt: 5,width: '100%', display: 'flex', flexDirection: 'column' }}>
				<Box sx={{ width: '100%', padding:5 , display: 'flex', flexDirection: 'row'}}>
          <Box sx={{width:"30%"}}>
          <span>Titre</span>
>>>>>>> ae9ae1f11a8e15fb79b3fd8b84a9345f0653e173
          </Box>
          <Box sx={{ width: "10%" }}>
            <span>Durée</span>
          </Box>
          <Box sx={{ width: "25%" }}>
            <span>Public</span>
          </Box>
          <Box sx={{ width: "25%" }}>
            <span>Tags</span>
          </Box>
          <Box sx={{ width: "10%" }}></Box>
        </Box>
        {plays.map((play, i) => (
          <Grid item xs={4} key={i}>
            <Card
              sx={{
                mb: 3,
                display: "flex",
                flexDirection: "row",
                width: "100%",
                flexWrap: "wrap",
              }}
            >
              <CardContent sx={{ width: "30%" }}>
                <Typography variant="h5" component="div">
                  {play.title}
                </Typography>
              </CardContent>
              <CardContent sx={{ width: "10%" }}>
                <Chip
                  sx={{ marginLeft: 1 }}
                  icon={<AccessTimeIcon />}
                  variant="outlined"
                  label={`${play.duration} min`}
                />
              </CardContent>
              <CardContent sx={{ width: "25%" }}>
                <Stack direction="row" spacing={2} sx={{ my: 1 }}>
                  {play.audienceCategories.map((item, k) => (
                    <Chip
                      size="small"
                      variant="outlined"
                      label={item.title}
                      key={k}
                    />
                  ))}
                </Stack>
              </CardContent>
              <CardContent sx={{ width: "25%" }}>
                <Stack direction="row" spacing={2} sx={{ my: 1 }}>
                  {play.tags.map((item, k) => (
                    <Chip size="small" label={item.title} key={k} />
                  ))}
                </Stack>
              </CardContent>
              <CardActions sx={{ width: "10%" }}>
                <Link href={`/plays/${play.id}`} passHref>
                  <IconButton>
                    <RemoveRedEyeIcon />
                  </IconButton>
                </Link>
                <Link href={`plays/${play.id}`} passHref>
                  <IconButton color="secondary">
                    <EditIcon />
                  </IconButton>
                </Link>
                <Link href={`/dashboard/plays/${play.id}/delete`} passHref>
                  <IconButton color="primary">
                    <DeleteIcon />
                  </IconButton>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Box>
    </Dashboard>
  );
};


PlaysDashboard.auth = {
  role: Role.ADMIN,
};


export default PlaysDashboard;

export async function getServerSideProps<GetServerSideProps>() {
  const plays = await models.play.findMany({
    include: { audienceCategories: true, tags: true },
  });

  return { props: { plays } };
}
