import { MenuItem, MenuList, Paper } from "@mui/material"

const MenuLateral = () => {
  return (
    <Paper>
      <h3>MENU</h3>
    <MenuList>
      <MenuItem>Profile</MenuItem>
      <MenuItem>My account</MenuItem>
      <MenuItem>Logout</MenuItem>
    </MenuList>
  </Paper>
    
  )
}

export default MenuLateral