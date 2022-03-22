import { MenuItem, MenuList, Paper, styled } from "@mui/material"
import Typography from "components/Typography"
import Link from "next/link"
// import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

const MenuLateral = () => {

  
  

  const menu_contents = [
    {title: "Compagnie",  path: "/dashboard/company"},
    {title: "Utilisateurs", path: "/dashboard/users"},
    {title: "Spectacles", path: "/dashboard/plays"},
    {title: "Spectacles sur-mesure", path: "/dashboard/taylored_plays"},
    {title: "Artistes", path: "/dashboard/artists"},
    {title: "Partenaires", path: "/dashboard/partners"},
    {title: "Historiques", path: "/dashboard/stories"},
  ]

  return (
    <Paper>
      <Typography variant='h4'>MENU</Typography>
    <MenuList>
      {menu_contents.map((item, i) => (
        <Link href={item.path} key={i} passHref>
          <MenuItem>{item.title}</MenuItem>
        </Link>
      ))}
    </MenuList>
  </Paper>
    
  )
}

export default MenuLateral

function MuiAppBar(MuiAppBar: any, arg1: { shouldForwardProp: (prop: any) => boolean; }) {
  throw new Error("Function not implemented.");
}




