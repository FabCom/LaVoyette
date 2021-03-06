import type { NextApiRequest, NextApiResponse } from 'next'
import type { Prisma } from "@prisma/client"
import models from 'lib/models';
import { getSession } from 'next-auth/react';

const updateONE = async (
  body: Prisma.UserUpdateInput,
  userId: string,
  response: NextApiResponse
) => {
  const data: Prisma.UserUpdateInput = {
    name: body.name,
    email: body.email,
    image: body.image,
  };
  try {
    const result = await models.user.update({
      where: {
        id: userId,
      },
      data: {
        ...data,
      },
    });
    response.status(200).json(result);
  } catch (err) {
    console.log(err);
    response
      .status(403)
      .json({ err: "Error occured while adding a new companyPartner." });
  }
};

const doRequest = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const { method, query, body } = request;
  const userId: string = query.id as string;

  const session = await getSession({ req: request })
  
  if (!session) {
    response.status(401).json({err: "unauthorized"});
    return 
  }


  if (method === "PUT" && session.user.id == userId) {
    updateONE(body, userId, response);

    return;
  }

  return response
    .status(403)
    .json({ err: "Error occured while adding a new companyPartner." });
};
export default doRequest;
