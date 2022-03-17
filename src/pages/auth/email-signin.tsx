import { Button, FormGroup, TextField } from "@mui/material"
import { Box } from "@mui/system"
import { CtxOrReq } from "next-auth/client/_utils"
import { getCsrfToken } from "next-auth/react"


export default function SignIn({ csrfToken }: {csrfToken: string}) {

  

  return (
    <Box sx={{mt: 8, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <h1>Inscrivez-vous en renseignant votre email </h1>
      <form method="post" action="/api/auth/signin/email">
        <FormGroup sx={{mt: 8, display:'flex', flexDirection: 'column'}}  >
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <TextField label="Email" type="email" id="email" name="email" />
          <Button sx={{mt: 2}} type="submit">Sign in with Email</Button>
        </FormGroup>  
      </form>
    </Box>
  )
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context: CtxOrReq) {
const csrfToken = await getCsrfToken(context)
  return {
    props: { csrfToken },
  }
}