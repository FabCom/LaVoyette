// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Prisma, Role } from "@prisma/client";
import models from "lib/models";

import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

type BodyRequest = {title: string,abstract: string, duration: number, audienceCategories: string[], tags: string[], images: Image[]}
type Image = {title: string, src: string}
const getALL = async (response: NextApiResponse) => {
  try {
    const result = await models.play.findMany({
      include: {
        audienceCategories: true,
        tags: true
      },
    })
    response.status(200).json(result);
  } catch (err) {
    console.log(err);
    response.status(404).json({ err: "Plays not found" });
  }
}

const create = async (body: BodyRequest, response: NextApiResponse) => {
  const data:Prisma.PlayCreateInput  = { 
    title: body.title,
    abstract: body.abstract,
    duration: body.duration,
    audienceCategories: {
      connectOrCreate: body.audienceCategories.map((categ:string) => {
        return {
            where: { title: categ },
            create: { title: categ },
        };
      }),
    } ,
    tags: {
      connectOrCreate: body.tags.map((tag:string) => {
          return {
              where: { title: tag },
              create: { title: tag },
          };
      }),
     },
    images: {
      create: body.images
    }
  };

  try {
    const result = await models.play.create({
      data: {
        ...data,
      },
    });
    response.status(200).json(result);
  } catch (err) {
    console.log(err);
    response.status(403).json({ err: "Error occured while adding a new play." });
  }
}

const doRequest = async (request: NextApiRequest, response: NextApiResponse) => {

  const {body, method, query } = request;
  // console.log(query)
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

  else {
    return response.status(403).json({ err: "Error" });
  }

};

export default doRequest