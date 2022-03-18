import { Box } from "@mui/material"
import MenuLateral from "components/dasboard/MenuLateral"

const Dashboard = () => {
  return (
    <Box sx={{display: 'flex', flexDirection: 'row'}}>
      <MenuLateral/>
      <h1>DASHBOARD</h1>
    </Box>
  )

}

export default Dashboard