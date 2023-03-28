import { NextApiRequest, NextApiResponse } from "next";

interface PostRequest extends NextApiRequest {
  body: {
    prompt: { humanLanguageValue: string };
  };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const {
      body: { prompt },
    } = req as PostRequest;

    if (!prompt) return res.status(304).end();

    return res
      .status(200)
      .json(`Hola estoy en la api con la prompt: ${prompt.humanLanguageValue}`);
  }

  return res.status(304).end();
};
