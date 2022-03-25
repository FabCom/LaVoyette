import { MenuItem, MenuList, Paper, styled } from "@mui/material";
import Typography from "components/Typography";
import Link from "next/link"; // import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import * as React from "react";
import { createTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

const MenuLateral = () => {
  const menu_contents = [
    { title: "Compagnie", path: "/dashboard/company" },
    { title: "Utilisateurs", path: "/dashboard/users" },
    { title: "Spectacles", path: "/dashboard/plays" },
    { title: "Spectacles sur-mesure", path: "/dashboard/taylored_plays" },
    { title: "Artistes", path: "/dashboard/artists" },
    { title: "Partenaires", path: "/dashboard/partners" },
    { title: "Historiques", path: "/dashboard/stories" },
  ];

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <><Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
         <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              
            </IconButton>
            
        <IconButton onClick={toggleDrawer}>
        <ChevronRightIcon />
        </IconButton>
        </Toolbar>
      </Toolbar>
      
      <Divider />
    <Paper>
        
        <MenuList component="nav">
          {menu_contents.map((item, i) => (
            <Link href={item.path} key={i} passHref>
              <Typography variant="h6" marked="left">
              <MenuItem sx={{mt: 5}}>{item.title}</MenuItem>
              </Typography>
            </Link>
          ))}
        </MenuList>
      </Paper></Drawer></>
  );
};

export default MenuLateral;

