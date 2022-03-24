import { MenuItem, MenuList, Paper, styled } from "@mui/material"
import Typography from "components/Typography"
import { dashboard_contents } from "config/dashboard_content"
import Link from "next/link"
// import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

const MenuLateral = () => {

  return (
    <Paper>
      <Typography variant='h4'>MENU</Typography>
    <MenuList>
      {dashboard_contents.map((item, i) => (
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




