import models from "lib/models"
import { deserialize, serialize } from "superjson";
import { Role, User } from "@prisma/client"
import { SuperJSONResult } from "superjson/dist/types"
import { Button, Card, CardActions, CardContent, IconButton } from "@mui/material"
import { Box } from "@mui/system"
import Dashboard from "components/dashboard/LayoutDashboard"
import Typography from "components/Typography"
import Link from "next/link"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const UsersDashboard = ({ser_users}:{ser_users: SuperJSONResult}) => {
  const users: User[] = deserialize(ser_users);
  return (
    <Dashboard >
      <Typography variant='h2' sx={{marginTop: 5}}>Utilisateurs</Typography>
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'space-between', flexWrap: 'wrap', width: "100%"}}>
        <Box sx={{ width: '100%', padding:5 , display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
          <Box sx={{width:"60%"}}>
          <span>Titre</span>
          </Box>
          <Box sx={{width:"30%"}}>
            <span>Rôle</span>
          </Box>
          <Box sx={{width:"10%", display: 'flex', flexDirection: 'row', justifyContent: "space-between"}}>
          <span>Supprimer</span> <span>Éditer</span>
          </Box>
        </Box>
        {users.map((user, i) => 
          <Card sx={{ marginBottom: 3 , display: 'flex'}} key={i}>
            <CardContent sx={{width:"60%"}}>
              <Typography variant='h5'>{user.email}</Typography>
            </CardContent>
            <CardContent sx={{width:"30%"}}>
              <Typography variant='h5'>{user.role}</Typography>
            </CardContent>
            <CardActions sx={{width:"10%", justifyContent: 'center'}}>
              <Link href={`/dashboard/users/${user.id}/delete`} passHref><IconButton color="primary"><DeleteIcon /></IconButton></Link>
              <Link href={`/dashboard/users/${user.id}`} passHref><IconButton color="secondary"><EditIcon /></IconButton></Link>
            </CardActions>
          </Card>
        )}
      </Box>
    </Dashboard>
  )
}

UsersDashboard.auth = {
  role: Role.ADMIN,
};

export default UsersDashboard


export async function getServerSideProps() {

  const users = await models.user.findMany()
  const ser_users = serialize(users)
  return { props: { ser_users } }
}