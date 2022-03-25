import type { NextApiRequest, NextApiResponse } from 'next'
import { Prisma, Role } from "@prisma/client"
import models from 'lib/models';
import { getSession } from 'next-auth/react';

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
    response.status(404).json({ err: "Plays not found" });
  }
}

const updateONE = async (body: any, playId: number, response: NextApiResponse) => {
  const data: Prisma.PlayCreateInput = {
    title: body.title,
    abstract: body.abstract,
    duration: parseInt(body.duration),
    audienceCategories: {
      connectOrCreate: body.audienceCategories.map((categ: string) => {
        return {
          where: { title: categ },
          create: { title: categ },
        };
      }),
    },
    tags: {
      connectOrCreate: body.tags.map((tag: string) => {
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
  const { method, query, body } = request;
  const playId: number = parseInt(query.id as string, 10);
  const session = await getSession({req: request})

  if (method === 'GET') {
    getONE(playId, response)

    return
  }

  if (!session) {
    response.status(401).json({err: "unauthorized"});
    return 
  }

  if (method === 'DELETE' && session.user.role === Role.ADMIN) {
    deleteONE(playId, response)

    return
  }

  if (method === 'PUT' && session.user.role === Role.ADMIN) {
    updateONE(body, playId, response)

    return
  }

  return response.status(403).json({ err: "Error occured while adding a new play." });
};
export default doRequest
