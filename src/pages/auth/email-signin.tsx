import { Button, FormGroup, TextField } from "@mui/material"
import { Box } from "@mui/system"
import { CtxOrReq } from "next-auth/client/_utils"
import { getCsrfToken } from "next-auth/react"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import useRequest from "hooks/useRequest";
import Router from "next/router";
import { useEffect } from "react";

type SignInForm = {
  email: string,
  csrfToken: string
}
export const validFormEmailSignin = yup.object().shape({
  email: yup.string().email("Format d'email non valide").required('requis'),
});

export default function SignIn({ csrfToken }: {csrfToken: string}) {
  const router = Router;
  const {
    control,
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    defaultValues: {csrfToken: csrfToken},
      resolver: yupResolver(validFormEmailSignin)});

      const { isLoading, apiData, request } = useRequest<SignInForm>(
        `auth/signin/email`,
        "POST"
      );

  useEffect(()=> {
    if (isLoading === false && apiData !== null)
    {router.push('/auth/verify-request')}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  const onSubmit = async (data: SignInForm) => {
    request(data)
  }

  return (
    <Box sx={{mt: 8, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <h1>Inscrivez-vous en renseignant votre email </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup sx={{mt: 8, display:'flex', flexDirection: 'column'}}  >
          <input type="hidden" {...register("csrfToken")} />
          <TextField label="Email" 
              focused
              {...register("email")}
              error={errors.email ? true : false}
              helperText={errors.email ? errors.email.message : null}
          />
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