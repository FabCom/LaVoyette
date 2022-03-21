import type { NextApiRequest, NextApiResponse } from 'next'
import type { Prisma } from "@prisma/client"
import models from 'lib/models';

const getONE = async (playId: number, response: NextApiResponse) => {
  try {
    const result = await models.tayloredPlay.findUnique({
      where: {
        id: playId,
      },
      include: {
        audienceCategories: true,
        tags: true
      },
    })
    response.status(200).json(result);
  } catch (err) {
    console.log(err);
    response.status(404).json({ err: "Posts not found" });
  }
}

const deleteONE = async (playId: number, response: NextApiResponse) => {
  try {
    const result = await models.tayloredPlay.delete({
      where: { id: Number(playId) }
    })
    response.status(200).json(result);
  } catch (err) {
    console.log(err);
    response.status(404).json({ err: "Plays not found" });
  }
}

const updateONE = async (body: any, playId: number, response: NextApiResponse) => {
  const data: Prisma.TayloredPlayCreateInput = { 
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
    const removeOldAudienceCategAndTags = await models.tayloredPlay.update({
      where: {
        id: playId,
      },
      data: {
        audienceCategories: {set: []},
        tags: {set: []},
      },
    });
    const result = await models.tayloredPlay.update({
      where: {
        id: playId,
      },
      data: {
        audienceCategories: {set: []},
        tags: {set: []},
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
  const {method, query, body } = request;
  const playId: number = parseInt(query.id as string, 10);
  
  if (method === 'GET') {
    getONE(playId, response)
    
    return
  }

  if (method === 'DELETE') {
    deleteONE(playId, response)

    return
  }

  if (method === 'PUT') {
    updateONE(body, playId, response)

    return
  }

  return response.status(403).json({ err: "Error occured while adding a new taylored play." });
};
export default doRequest
