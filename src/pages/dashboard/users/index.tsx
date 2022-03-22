import Dashboard from "components/dashboard/LayoutDashboard"
import models from "lib/models"
import { deserialize, serialize } from "superjson";
import { User } from "@prisma/client"
import { SuperJSONResult } from "superjson/dist/types"


const UsersDashboard = ({ser_users}:{ser_users: SuperJSONResult}) => {
  const users: User[] = deserialize(ser_users);
  console.log(users);
  return (
    <Dashboard >
     <>UTILISATEURS</>
    </Dashboard>
  )
}

export default UsersDashboard


export async function getServerSideProps<GetServerSideProps>() {

  const users = await models.user.findMany()
  const ser_users = serialize(users)
  return { props: { ser_users } }
}