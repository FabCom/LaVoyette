import * as React from "react";
import Typography from "../components/Typography";
import HeroLayout from "./HeroLayout";

import type { Company } from "@prisma/client";
import company from 'pages/api/company';



export default function ContainerStory({ company }: { company: Company }) {
  return (
   
      <><Typography color="inherit" align="center" variant="h2" sx={{ mt: 10}}>
      {/* {company.name} */}
      La Voyette
    </Typography><Typography
      color="inherit"
      align="center"
      variant="h5"
      sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
    >
      {/* {company.description} */}
      
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus convallis justo at massa facilisis, id vulputate augue rutrum. Mauris pellentesque molestie sapien vel vehicula. Morbi sollicitudin viverra nunc, vitae vulputate sem imperdiet a. Maecenas ac libero commodo, hendrerit neque eu, pretium sem. Sed quis aliquam tortor. Sed et hendrerit quam. Nulla viverra, lectus a lacinia egestas, odio neque vehicula lacus, sed feugiat tortor erat et neque. Ut bibendum bibendum vestibulum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi dignissim dolor quis orci fermentum, eget mattis nisl dapibus. Donec eleifend, mauris non sollicitudin aliquam, risus augue cursus nisl, laoreet commodo turpis diam nec sem. Nulla non velit pharetra tortor feugiat tempor.

Nulla feugiat pharetra molestie. Vivamus malesuada arcu turpis, sed tristique augue vehicula sit amet. Quisque tincidunt quis augue vel fermentum. Nullam ac euismod enim. Cras dignissim fermentum nisl, sed consequat metus vehicula nec. Cras tincidunt arcu sem, vel mollis lectus vehicula at. Aenean volutpat sollicitudin pharetra.

Phasellus vel ante bibendum, auctor diam non, ultrices ligula. In hac habitasse platea dictumst. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent semper elementum nulla, a fringilla ipsum. Cras quis posuere odio. Proin euismod quam quam, ut laoreet velit ultricies sit amet. Nullam et fringilla magna. Aenean lacus orci, interdum non ornare nec, efficitur et magna.

Donec id auctor ante, et viverra elit. Praesent facilisis aliquet risus, nec pharetra augue laoreet in. Fusce quis sagittis enim. Proin rutrum odio nec sem ultricies rhoncus. Etiam eget feugiat quam, nec porttitor nibh. Sed nec odio eget urna eleifend maximus quis vel nisl. Morbi elementum libero mi, sit amet consectetur erat rutrum tristique. Nulla non efficitur metus. Fusce feugiat, odio id convallis tincidunt, neque tortor interdum quam, vel mattis turpis urna sed nisi.

Sed euismod tortor turpis, gravida eleifend metus mattis vel. Morbi tristique pulvinar sagittis. Suspendisse faucibus lorem id augue bibendum porttitor. Fusce id egestas eros. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec eget odio et arcu posuere pellentesque sed et nisl. Morbi tristique orci id scelerisque vestibulum. Aliquam tellus sapien, ultrices a velit ut, ornare ultrices justo. Integer ex augue, efficitur ut vulputate eget, sodales vel arcu. In malesuada lectus sit amet libero pulvinar finibus. Ut dictum urna in odio pellentesque tristique. Praesent ut mollis diam. Sed congue nisl eget sapien ultricies tristique.
      </Typography></>
  );
}
