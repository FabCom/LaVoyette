import type { NextApiRequest, NextApiResponse } from 'next'
import type { Prisma } from "@prisma/client"
import models from '../../../lib/models';

// DELETE /api/play/:id
// export default async function handle(req: NextApiRequest, res: NextApiResponse) {
//   const playId = req.query.id;

//   const session = await getSession({ req })

//   if (req.method === "DELETE") {
//     if (session) {
//       const play = await prisma.play.delete({
//         where: { id: Number(playId) },
//       });
//       res.json(play);
//     } else {
//       res.status(401).send({ message: 'Unauthorized' })
//     }
//   } else {
//     throw new Error(
//       `The HTTP ${req.method} method is not supported at this route.`
//     );
//   }
// }

const getONE = async (playId: number, response: NextApiResponse) => {
  try {
    const result = await models.play.findUnique({
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
    const result = await models.play.delete({
      where: { id: Number(playId) }
    })
    response.status(200).json(result);
  } catch (err) {
    console.log(err);
    response.status(404).json({ err: "Posts not found" });
  }
}

const updateONE = async (body: any, playId: number, response: NextApiResponse) => {
  const data: Prisma.PlayCreateInput = { 
    title: body.title,
    abstract: body.abstract,
    duration: parseInt(body.duration),
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
    const result = await models.play.update({
      where: {
        id: playId,
      },
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

  return response.status(403).json({ err: "Error occured while adding a new play." });
};
export default doRequest
