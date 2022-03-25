// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Prisma, Role } from "@prisma/client";
import { COMPANY_NAME } from "config";
import models from "lib/models";

import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

type BodyRequest = {description: string, email: string, facebook_link: string, instagram_link: string}
const getCompany = async (response: NextApiResponse) => {
  try {
    const result = await models.company.findUnique({
      where: {
        name: COMPANY_NAME,
      },
      include: {
        companyPartners: true, // Returns all fields for all posts
        companyStories: true, // Returns all Profile fields
      }
    })
    response.status(200).json(result);
  } catch (err) {
    console.log(err);
    response.status(404).json({ err: "Error" });
  }
}

const updateCompany = async (body: BodyRequest, response: NextApiResponse) => {
  const data: Prisma.CompanyUpdateInput = { 
    description: body.description,
    email: body.email,
    facebook_link: body.facebook_link,
    instagram_link: body.instagram_link

  };
  try {
    const result = await models.company.update({
      where: {
        name: COMPANY_NAME,
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

  const {body, method } = request;

  if (method === 'GET') {
    
    getCompany(response)
    
    return
  }
  const session = await getSession({ req: request })
  
  if (!session) {
    response.status(401).json({err: "unauthorized"});
    return 
  }

  if (method === 'PUT' && session.user.role === Role.ADMIN) {
    
    updateCompany(body, response)
    
    return
  }
  
  else {
    return response.status(403).json({ err: "Error" });
  }


};

export default doRequest