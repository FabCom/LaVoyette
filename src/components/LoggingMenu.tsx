import { useSession, signOut } from "next-auth/react";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Role } from "@prisma/client";



let settings_session = []

const settings = [{ title: "Se connecter", path: "/auth/email-signin" }];

export default function LoggingMenu({handleCloseUserMenu}: {handleCloseUserMenu: () => void}) {
  const { data: session } = useSession();
  

  // function LoggingOut()
  // {
  //   props.handleCloseUserMenu();
  //   signOut();
  // }
  if (session) {
    const settings_session_USER = [
      { title: "Profile", path: `/profile/${session.user.email}` },
    ];
    
    const settings_session_ADMIN = [
      { title: "Profile", path: `/profile/${session.user.email}` },
      { title: "Dashboard", path: "/dashboard/company" },
    ];
    session.user.role === Role.ADMIN ? settings_session = settings_session_ADMIN : settings_session = settings_session_USER
    // console.log(session.user);
    // console.log(session.user.id);
    // console.log(session)
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
