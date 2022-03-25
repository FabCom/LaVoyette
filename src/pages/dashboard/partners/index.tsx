import { Button, Card, CardActions, CardContent, Chip, IconButton } from "@mui/material"
import { Box } from "@mui/system"
import { CompanyPartner, Role } from "@prisma/client"
import Dashboard from "components/dashboard/LayoutDashboard"
import Typography from "components/Typography"
import { COMPANY_NAME } from "config"
import models from "lib/models"
import Image from "next/image"
import Link from "next/link"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const PartnersDashboard = ({partners}: {partners: CompanyPartner[]}) => {
  // console.log(partners)
  return (
    <Dashboard >
      <Typography variant='h2' sx={{marginTop: 5}}>Partenaires de la compagnie</Typography>
      <Link href="/dashboard/partners/create" passHref><Button color="secondary" variant="contained">Ajouter</Button></Link>
      <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', flexWrap: 'wrap', marginTop:5, width: "100%"}}>
        <Box sx={{ width: '100%', padding:5 , display: 'flex', flexDirection: 'row'}}>
          <Box sx={{width:"60%"}}>
            <span>Nom</span>
          </Box>
          <Box sx={{width:"30%"}}>
            <span>Logo</span>
          </Box>
          <Box sx={{width:"10%"}}>
          </Box>
        </Box>
        {partners.map((partner, i) => 
          <Card sx={{ width: '100%', marginBottom: 3, display: 'flex', flexDirection: 'row' }} key={i}>
            <CardContent sx={{width: "60%"}}>
              <Typography variant='h5'>{partner.name}</Typography>
            </CardContent>
            <CardContent sx={{width: "30%"}}>
              {partner.logo_src && <img src={partner.logo_src} width='150px' height= '100%'/>}
            </CardContent>
            <CardActions sx={{width: "10%", justifyContent: 'center'}}>
              <Link href={`/dashboard/partners/${partner.id}/delete`} passHref><IconButton color="primary"><DeleteIcon /></IconButton></Link>
              <Link href={`/dashboard/partners/${partner.id}`} passHref><IconButton color="secondary"><EditIcon /></IconButton></Link>
            </CardActions>
          </Card>
        )}

      </Box>
    </Dashboard>
  )
}

PartnersDashboard.auth = {
  role: Role.ADMIN,
};

export default PartnersDashboard

export async function getServerSideProps<GetServerSideProps>() {
  
  const company = await models.company.findUnique({where: {name: COMPANY_NAME}, include: {companyPartners: true}})
  const partners = company?.companyPartners
  return { props: { partners } }
}
