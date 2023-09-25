import { NextApiRequest, NextApiResponse } from "next";
import { Collection } from "mongodb";

export type Handler = (
  req: NextApiRequest,
  res: NextApiResponse,
  client: Collection
) => Promise<unknown>;

export type Handlers = {
  GET?: Handler;
  POST?: Handler;
  PUT?: Handler;
  DELETE?: Handler;
};

// export type UserItem = {
//   user: string;
// };

// export type ResultItem = {
//   user: string;
//   correctAnswers: number;
//   total: number;
// };

// export type QuestionItem = {
//   title: string;
//   alternatives: string[];
//   answer: number;
// };
