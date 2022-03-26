import "../styles/globals.css";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { AppProps } from "next/dist/shared/lib/router/router";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "theme";
import Navbar from "components/navbar";
import { useEffect } from "react";
import { NextComponentType } from "next";
import { Role } from "@prisma/client";
import { useRouter } from "next/router";

type CustomAppProps = AppProps & {
  Component: NextComponentType & {auth?: {role: Role}} // add auth type
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: CustomAppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        {Component.auth ? (
          <Auth role={Component.auth.role}>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </ThemeProvider>
    </SessionProvider>
  );
}

const Auth = ({ children, role }: {children: JSX.Element, role: Role}) => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const hasUser = !!session?.user;
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!hasUser) {
        router.push("/auth/email-signin");
      } else if (session.user.role !== role) {
        router.push("/");
      }
    }
  }, [loading, hasUser]);

  if (loading || !hasUser || session.user.role !== role ) {
    return <div>Waiting for session...</div>;
  }
  return children;
};

export default MyApp;
