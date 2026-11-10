import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { profile } from "../data/profile";

export const postChat = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3.2",
        messages: [
          {
            role: "system",
            content: `
          You are my personal AI assistant.
          Here is my profile:

          Name: ${profile.name}
          Role: ${profile.role}
          Experience: ${profile.experience}

          Skills:
          ${profile.skills.join(", ")}

          Currently learning:
          ${profile.learning.join(", ")}
          Your responsibilities:
          - My name is Angaleesh
          - Help me manage my tasks and goals.
          - Help me with software development and learning.
          - Give practical and concise answers.
          - Ask for clarification when necessary.
          - Never invent information about my personal data.
        `,
          },
          {
            role: "user",
            content: req?.body?.message,
          },
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error("Ollama request failed");
    }

    const data = await response.json();

    res.json({
      message: data.message.content,
    });
  },
);
