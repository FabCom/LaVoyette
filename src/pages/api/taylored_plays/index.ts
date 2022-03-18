// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Prisma } from "@prisma/client";
import models from "lib/models";

import type { NextApiRequest, NextApiResponse } from "next";

type BodyRequest = {title: string,concept: string, audienceCategories: string[], tags: string[]}

const getALL = async (response: NextApiResponse) => {
  try {
    const result = await models.tayloredPlay.findMany({
      include: {
        audienceCategories: true,
        tags: true
      },
    })
    response.status(200).json(result);
  } catch (err) {
    console.log(err);
    response.status(404).json({ err: "Taylored Plays not found" });
  }
}

const create = async (body: BodyRequest, response: NextApiResponse) => {
  const data:Prisma.TayloredPlayCreateInput  = { 
    title: body.title,
    concept: body.concept,
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
  };

  try {
    const result = await models.tayloredPlay.create({
      data: {
        ...data,
      },
    });
    response.status(200).json(result);
  } catch (err) {
    console.log(err);
    response.status(403).json({ err: "Error occured while adding a new taylored play." });
  }
}

const doRequest = async (request: NextApiRequest, response: NextApiResponse) => {

  const {body, method, query } = request;
  // console.log(query)
  if (method === 'GET') {
    
    getALL(response)
    
    return
  }
  
  // const session = await getSession({ req: request })
  
  // if (!session) {
  //   response.status(401).json({err: "unauthorized"});
  //   return 
  // }

  if (method === 'POST') {
    create(body, response)

    return
  }


};

export default doRequest