import type { NextApiRequest, NextApiResponse } from 'next'
import type { Prisma } from "@prisma/client"
import models from 'lib/models';

const getONE = async (artistId: number, response: NextApiResponse) => {
  try {
    const result = await models.artist.findUnique({
      where: {
        id: artistId,
      },
    })
    response.status(200).json(result);
  } catch (err) {
    console.log(err);
    response.status(404).json({ err: "Posts not found" });
  }
}

const deleteONE = async (artistId: number, response: NextApiResponse) => {
  try {
    const result = await models.artist.delete({
      where: { id: Number(artistId) }
    })
    response.status(200).json(result);
  } catch (err) {
    console.log(err);
    response.status(404).json({ err: "artists not found" });
  }
}

const updateONE = async (body: Prisma.ArtistUpdateInput, artistId: number, response: NextApiResponse) => {
  const data: Prisma.ArtistUpdateInput = { 
    firstname: body.firstname,
    lastname: body.lastname,
    biography: body.biography,
    email: body.email,
    facebook_link: body.facebook_link,
    instagram_link: body.instagram_link
  };
  try {
    const result = await models.artist.update({
      where: {
        id: artistId,
      },
      data: {
        ...data,
      },
    });
    response.status(200).json(result);
  } catch (err) {
    console.log(err);
    response.status(403).json({ err: "Error occured while adding a new artist." });
  }

}

 const doRequest = async (request: NextApiRequest, response: NextApiResponse) => {
  const {method, query, body } = request;
  const artistId: number = parseInt(query.id as string, 10);
  
  if (method === 'GET') {
    getONE(artistId, response)
    
    return
  }

  if (method === 'DELETE') {
    deleteONE(artistId, response)

    return
  }

  if (method === 'PUT') {
    updateONE(body, artistId, response)

    return
  }

  return response.status(403).json({ err: "Error occured while adding a new artist." });
};
export default doRequest
