// import { GetServerSideProps } from "next";
// import { getSession } from "next-auth/react"

// export const checkAuth = (context:GetServerSideProps) => {
//   const session = await getSession()
//   if (!session.isAuth) {
//     return () => {
//       // Le getServerSideProps qui redirige vers login par ex.
//     }
//   }
//   return getProps; // Le getServerSideProps qu'on lui passe en paramètre
// };

// const getServerSideProps: GetServerSideProps = checkAuth((context) => {
//   return {
//     // les props à envoyer à la page, comme d'hab
//   };
// });
