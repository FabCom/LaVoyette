import { useSession, signIn, signOut } from "next-auth/react";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { AppProps } from "next/dist/shared/lib/router/router";

const settings_session = [
  { title: "Profile", path: "/profil" },
  { title: "Admin", path: "/admin" },
  { title: "Dashboard", path: "/dashboard" },
];

const settings = [{ title: "Se connecter", path: "/auth/email-signin" }];

export default function LoggingMenu({handleCloseUserMenu}: {handleCloseUserMenu: () => void}) {
  const { data: session } = useSession();

  // function LoggingOut()
  // {
  //   props.handleCloseUserMenu();
  //   signOut();
  // }
  if (session) {
    return (
      <React.Fragment>
        {settings_session.map((setting, i) => (
          <Link href={setting.path} key={i} passHref>
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center">{setting.title}</Typography>
            </MenuItem>
          </Link>
        ))}
        <MenuItem onClick={() => { handleCloseUserMenu(); signOut();}}>
        {/* <MenuItem onClick={LoggingOut}> */}

          <Typography textAlign="center">Se déconnecter</Typography>
        </MenuItem>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {settings.map((setting, i) => (
        <Link href={setting.path} key={i} passHref>
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center">{setting.title}</Typography>
          </MenuItem>
        </Link>
      ))}
    </React.Fragment>
  );
}