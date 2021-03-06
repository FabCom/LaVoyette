// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Prisma, Role } from "@prisma/client";
import models from "lib/models";

import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const getALL = async (response: NextApiResponse) => {
  try {
    const result = await models.artist.findMany({})
    response.status(200).json(result);
  } catch (err) {
    console.log(err);
    response.status(404).json({ err: "Artists not found" });
  }
}

const create = async (body: Prisma.ArtistCreateInput, response: NextApiResponse) => {
  const data:Prisma.ArtistCreateInput  = { 
    firstname: body.firstname,
    lastname: body.lastname,
    biography: body.biography,
    email: body.email,
    facebook_link: body.facebook_link,
    instagram_link: body.instagram_link
  };

  try {
    const result = await models.artist.create({
      data: {
        ...data,
        // audienceCategories: { connectOrCreate: data_audienceCategories }
      },
    });
    response.status(200).json(result);
  } catch (err) {
    console.log(err);
    response.status(403).json({ err: "Error occured while adding a new artist." });
  }
}

const doRequest = async (request: NextApiRequest, response: NextApiResponse) => {

  

  const {body, method, query } = request;
  // console.log(query)
  console.log(method);

  if (method === 'GET') {
    
    getALL(response)
    
    return
  }
  
  const session = await getSession({ req: request })
  
  if (!session) {
    response.status(401).json({err: "unauthorized"});
    return 
  }

  if (method === 'POST' && session.user.role === Role.ADMIN) {
    create(body, response)

    return
  }


};

export default doRequest