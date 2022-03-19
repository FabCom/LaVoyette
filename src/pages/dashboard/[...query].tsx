import { Box } from "@mui/material"
import CompanyDashboard from "components/dashboard/Company"
import MenuLateral from "components/dashboard/MenuLateral"
import PlaysDashboard from "components/dashboard/Plays"
import TayloredPlaysDashboard from "components/dashboard/TayloredPlays"
import UsersDashboard from "components/dashboard/Users"
import { useRouter } from "next/router"

const Dashboard = () => {
  const router = useRouter()
  const query = router.query

  console.log(query.page)

  let component = (<></>)

  if (query.page) {
    switch (query.page) {
      case 'company':
        component = <CompanyDashboard />
        break;
      case 'plays':
        component = <PlaysDashboard />
        break;
      case 'users':
        component = <UsersDashboard />
        break;
      case 'taylored_plays':
        component = <TayloredPlaysDashboard />
        break;
    }

  }

  return (
    <Box sx={{display: 'flex', flexDirection: 'row'}}>
      <Box sx={{width: 250, marginLeft: 1, marginTop: 2}}>
        <MenuLateral/>
      </Box>
      <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h1>{ component }</h1>
      </Box>
      
    </Box>
  )

}

export default Dashboard