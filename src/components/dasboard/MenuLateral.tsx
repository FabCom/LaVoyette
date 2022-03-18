import { MenuItem, MenuList, Paper } from "@mui/material"
import Typography from "components/Typography"
import Link from "next/link"

const MenuLateral = () => {

  const menu_contents = [
    {title: "Compagnie", path: "company"},
    {title: "Utilisateurs", path: "users"},
    {title: "Spectacles", path: "plays"},
    {title: "Sur-mesure", path: "taylored_plays"},
  ]
  return (
    <Paper>
      <Typography variant='h4'>MENU</Typography>
    <MenuList>
      {menu_contents.map((item, i) => (
        <Link href={item.path} key={i} >
          <MenuItem>{item.title}</MenuItem>
        </Link>
      ))}
    </MenuList>
  </Paper>
    
  )
}

export default MenuLateral