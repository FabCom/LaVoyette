import { Box } from "@mui/material"
import MenuLateral from "components/dasboard/MenuLateral"
import { useRouter } from "next/router"

const Dashboard = () => {
  const router = useRouter()
  const { query } = router.query

  console.log(query)

  

  return (
    <Box sx={{display: 'flex', flexDirection: 'row'}}>
      <Box sx={{width: 250, marginLeft: 1, marginTop: 2}}>
        <MenuLateral/>
      </Box>
      <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h1>DASHBOARD</h1>
      </Box>
      
    </Box>
  )

}

export default Dashboard