import type { NextApiRequest, NextApiResponse } from 'next'
import { Prisma, Role } from "@prisma/client"
import models from 'lib/models';
import { getSession } from 'next-auth/react';

const getONE = async (partnerId: number, response: NextApiResponse) => {
  try {
    const result = await models.companyPartner.findUnique({
      where: {
        id: partnerId,
      },
    });
    response.status(200).json(result);
  } catch (err) {
    console.log(err);
    response.status(404).json({ err: "Partner not found" });
  }
};

const deleteONE = async (partnerId: number, response: NextApiResponse) => {
  try {
    const result = await models.companyPartner.delete({
      where: { id: Number(partnerId) },
    });
    response.status(200).json(result);
  } catch (err) {
    console.log(err);
    response.status(404).json({ err: "companyPartners not found" });
  }
};

const updateONE = async (
  body: Prisma.CompanyPartnerUpdateInput,
  partnerId: number,
  response: NextApiResponse
) => {
  const data: Prisma.CompanyPartnerUpdateInput = {
    name: body.name,
    description: body.description,
    logo_src: body.logo_src,
  };
  try {
    const result = await models.companyPartner.update({
      where: {
        id: partnerId,
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
  const partnerId: number = parseInt(query.id as string, 10);
  const session = await getSession({req: request})

  if (method === "GET") {
    getONE(partnerId, response);

    return;
  }

  if (!session) {
    response.status(401).json({err: "unauthorized"});
    return 
  }

  if (method === "DELETE"  && session.user.role === Role.ADMIN) {
    deleteONE(partnerId, response);

    return;
  }

  if (method === "PUT"  && session.user.role === Role.ADMIN) {
    updateONE(body, partnerId, response);

    return;
  }

  return response
    .status(403)
    .json({ err: "Error occured while adding a new companyPartner." });
};
export default doRequest;

