import { NextApiRequest, NextApiResponse } from "next";
import { Collection, ObjectId } from "mongodb";

import { connectToDatabase } from "@/utils/db";
import { Handler, Handlers } from "@/utils/types";

type FormValues = {
  title: string;
  alternatives: {
    text: string;
  }[];
  answer: number;
};

const getQuestionsHandler = async (
  _: NextApiRequest,
  res: NextApiResponse,
  collection: Collection
) => {
  const questions = await collection.find().toArray();
  return res.status(200).json({ questions });
};

const postQuestionHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  collection: Collection
) => {
  const question: FormValues = req.body.question;

  const newQuestion = {
    ...question,
    answer: question.answer - 1,
    alternatives: question.alternatives.map((alt) => alt.text),
  };

  await collection.insertOne(newQuestion);
  return res.status(201).json({ message: "Question added successfully" });
};

const putQuestionHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  collection: Collection
) => {
  const question: FormValues = req.body.question;
  const id = req.query.id;
  if (typeof id != "string")
    return res.status(400).json({ message: "id not informed" });

  const updatedQuestion = {
    ...question,
    answer: question.answer - 1,
    alternatives: question.alternatives.map((alt) => alt.text),
  };

  await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...updatedQuestion } }
  );
  return res.status(200).json({ message: "Question updated successfully" });
};

const deleteQuestionHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  collection: Collection
) => {
  const question: FormValues = req.body.question;
  const id = req.query.id;
  if (typeof id != "string")
    return res.status(400).json({ message: "id not informed" });

  await collection.deleteOne({ _id: new ObjectId(id) });
  return res.status(200).json({ message: "Question deleted successfully" });
};

const handlers: Handlers = {
  GET: getQuestionsHandler,
  POST: postQuestionHandler,
  DELETE: deleteQuestionHandler,
  PUT: putQuestionHandler,
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const handler: Handler | undefined = handlers[req.method as keyof Handlers];

  if (!handler) {
    return res.status(400).json({ error: "Invalid request method" });
  }

  try {
    const db = await connectToDatabase(process.env.MONGODB_URI || "");
    const collection = db.collection("questions");
    return await handler(req, res, collection);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
