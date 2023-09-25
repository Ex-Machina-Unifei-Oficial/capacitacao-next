import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import { ObjectId } from "mongodb";

type FormValues = {
  title: string;
  alternatives: {
    text: string;
  }[];
  answer: number;
};

type Question = {
  question: FormValues;
};

export async function GET() {
  try {
    const db = await connectToDatabase(process.env.MONGODB_URI || "");
    const collection = db.collection("questions");
    const questions = await collection.find().toArray();
    return NextResponse.json({ questions }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const db = await connectToDatabase(process.env.MONGODB_URI || "");
    const collection = db.collection("questions");

    const { question }: Question = await req.json();

    const newQuestion = {
      ...question,
      answer: question.answer - 1,
      alternatives: question.alternatives.map((alt) => alt.text),
    };

    await collection.insertOne(newQuestion);
    return NextResponse.json(
      { message: "Question added successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const db = await connectToDatabase(process.env.MONGODB_URI || "");
    const collection = db.collection("questions");

    const { question }: Question = await req.json();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id)
      return NextResponse.json({ message: "id not informed" }, { status: 400 });

    const updatedQuestion = {
      ...question,
      answer: question?.answer - 1,
      alternatives: question?.alternatives.map((alt) => alt.text),
    };

    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updatedQuestion } }
    );
    return NextResponse.json(
      { message: "Question updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const db = await connectToDatabase(process.env.MONGODB_URI || "");
    const collection = db.collection("questions");

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id)
      return NextResponse.json({ message: "id not informed" }, { status: 400 });

    await collection.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json(
      { message: "Question deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
