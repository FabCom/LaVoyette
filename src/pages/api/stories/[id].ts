import type { NextApiRequest, NextApiResponse } from "next";
import type { Prisma } from "@prisma/client";
import models from "lib/models";

const getONE = async (storyId: number, response: NextApiResponse) => {
  try {
    const result = await models.companyStory.findUnique({
      where: {
        id: storyId,
      },
    });
    response.status(200).json(result);
  } catch (err) {
    console.log(err);
    response.status(404).json({ err: "Story not found" });
  }
};

const deleteONE = async (storyId: number, response: NextApiResponse) => {
  try {
    const result = await models.companyStory.delete({
      where: { id: Number(storyId) },
    });
    response.status(200).json(result);
  } catch (err) {
    console.log(err);
    response.status(404).json({ err: "companyStory not found" });
  }
};

const updateONE = async (
  body: Prisma.CompanyStoryUpdateInput,
  storyId: number,
  response: NextApiResponse
) => {
  const data: Prisma.CompanyStoryUpdateInput = {
    title: body.title,
    description: body.description,
    start: body.start,
    end: body.end,
  };
  try {
    const result = await models.companyStory.update({
      where: {
        id: storyId,
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
      .json({ err: "Error occured while adding a new companyStory." });
  }
};

const doRequest = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const { method, query, body } = request;
  const storyId: number = parseInt(query.id as string, 10);

  if (method === "GET") {
    getONE(storyId, response);

    return;
  }

  if (method === "DELETE") {
    deleteONE(storyId, response);

    return;
  }

  if (method === "PUT") {
    updateONE(body, storyId, response);

    return;
  }

  return response
    .status(403)
    .json({ err: "Error occured while adding a new companyStory." });
};
export default doRequest;
