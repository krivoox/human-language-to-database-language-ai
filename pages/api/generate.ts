import translateToSQL from "@/querys/translate-to-query";
import { NextApiRequest, NextApiResponse } from "next";

interface PostRequest extends NextApiRequest {
  prompt: { humanLanguageValue: string };
  tableSchema: string;
}

if (!process.env.OPENAI_API_KEY) {
  throw new Error(
    "OPENAI_API_KEY is not defined in .env file. Please add it there (see README.md for more details)."
  );
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { prompt, tableSchema } = req.body as PostRequest;

    if (!prompt) return res.status(304).end();

    try {
      const result = await translateToSQL(
        prompt,
        process.env.OPENAI_API_KEY,
        tableSchema
      );
      res.status(200).json({ outputText: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error translating to SQL" });
    }
  }

  return res.status(304).end();
};
