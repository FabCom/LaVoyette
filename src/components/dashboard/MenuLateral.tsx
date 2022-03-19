import { MenuItem, MenuList, Paper } from "@mui/material"
import Typography from "components/Typography"
import Link from "next/link"

const MenuLateral = () => {

  const menu_contents = [
    {title: "Compagnie",  query: "company"},
    {title: "Utilisateurs", query: "users"},
    {title: "Spectacles", query: "plays"},
    {title: "Sur-mesure", query: "taylored_plays"},
  ]
  return (
    <Paper>
      <Typography variant='h4'>MENU</Typography>
    <MenuList>
      {menu_contents.map((item, i) => (
        <Link href={{pathname: "dashboard/[query]", query: {query: item.query}}} key={i} passHref>
          <MenuItem>{item.title}</MenuItem>
        </Link>
      ))}
    </MenuList>
  </Paper>
    
  )
}

export default MenuLateral