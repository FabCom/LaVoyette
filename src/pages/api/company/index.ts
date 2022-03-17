// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Prisma } from "@prisma/client";
import { COMPANY_NAME } from "config";
import models from "lib/models";

import type { NextApiRequest, NextApiResponse } from "next";

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

  if (method === 'PUT') {
    
    updateCompany(body, response)
    
    return
  }
  
  else {
    return response.status(403).json({ err: "Error" });
  }


};

export default doRequest