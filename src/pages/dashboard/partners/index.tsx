import { Button, Card, CardActions, CardContent, Chip } from "@mui/material"
import { Box } from "@mui/system"
import { CompanyPartner } from "@prisma/client"
import Dashboard from "components/dashboard/LayoutDashboard"
import Typography from "components/Typography"
import { COMPANY_NAME } from "config"
import models from "lib/models"
import Image from "next/image"
import Link from "next/link"

type Props = {partners: CompanyPartner[] }

const TayloredPlaysDashboard: React.FC<Props> = ({partners}) => {
  // console.log(partners)
  return (
    <Dashboard >
      <Typography variant='h2' sx={{marginTop: 5}}>Partenaires de la compagnie</Typography>
      <Link href="/dashboard/partners/create"><Button color="secondary" variant="contained" type="submit">Ajouter</Button></Link>
      <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap', marginTop:5, width: "100%"}}>
        {partners.map((partner, i) => 
          <Card sx={{ minWidth: 275, marginTop: 8 }} key={i}>
            <CardContent>
              <Typography variant='h5'>{partner.name}</Typography>
              {partner.logo_src && <img src={partner.logo_src} width='150px' height= '100%'/>}
            </CardContent>
            <CardActions sx={{justifyContent: 'center'}}>
              <Link href={`/dashboard/partners/${partner.id}/delete`} passHref><Button variant="contained" size="small">Supprimer</Button></Link>
              <Link href={`/dashboard/partners/${partner.id}`} passHref><Button color="secondary" variant="contained" size="small">Éditer</Button></Link>
            </CardActions>
          </Card>
        )}

      </Box>
    </Dashboard>
  )
}

export default TayloredPlaysDashboard

export async function getServerSideProps<GetServerSideProps>() {
  
  const company = await models.company.findUnique({where: {name: COMPANY_NAME}, include: {companyPartners: true}})
  const partners = company?.companyPartners
  return { props: { partners } }
}