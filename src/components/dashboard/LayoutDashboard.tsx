import { Box } from "@mui/material"
import MenuLateral from "components/dashboard/MenuLateral"
import { AppProps } from "next/dist/shared/lib/router/router"

type Props = {
  children: React.ReactNode;
};

export default function Dashboard({ children }: Props): JSX.Element {
  return (
    <Box sx={{display: 'flex', flexDirection: 'row'}}>
      <Box sx={{width: 250, marginLeft: 1, marginTop: 2}}>
        <MenuLateral/>
      </Box>
      <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 5}}>
       {children}
      </Box>
    </Box>
  );
}
