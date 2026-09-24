import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

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
