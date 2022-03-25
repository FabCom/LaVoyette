// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Company, Prisma, Role } from "@prisma/client";
import { COMPANY_NAME } from "config";
import models from "lib/models";

import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const getALL = async (response: NextApiResponse) => {
  try {
    const result = await models.companyStory.findMany({});
    response.status(200).json(result);
  } catch (err) {
    console.log(err);
    response.status(404).json({ err: "Stories not found" });
  }
};

const create = async (
  body: Prisma.CompanyStoryCreateInput,
  response: NextApiResponse,
  company: Company
) => {
  const data: Prisma.CompanyStoryCreateInput = {
    title: body.title,
    description: body.description,
    start: body.start,
    end: body.end,

    Company: { connect: { id: company.id } },
  };

  try {
    const result = await models.companyStory.create({
      data: {
        ...data,
      },
    });
    response.status(200).json(result);
  } catch (err) {
    console.log(err);
    response
      .status(403)
      .json({ err: "Error occured while adding a new partner." });
  }
};

const doRequest = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const { body, method, query } = request;
  // console.log(query)
  if (method === "GET") {
    getALL(response);

    return;
  }

  const session = await getSession({ req: request })

  if (!session) {
    response.status(401).json({err: "unauthorized"});
    return
  }

  if (method === "POST" && session.user.role === Role.ADMIN) {
    const company = await models.company.findUnique({
      where: { name: COMPANY_NAME },
    });

    if (company) {
      create(body, response, company);
    }

    return;
  }

  else {
    return response.status(403).json({ err: "Error" });
  }
};

export default doRequest;
