import type { NextApiResponse } from "next";

const getErrorMessage = (error: unknown) => {
  if (!error) return "";
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
};

const respondInternalError = (
  res: NextApiResponse,
  context: string,
  error: unknown
) => {
  const message = getErrorMessage(error);
  console.error(context, error);
  return res.status(500).json({
    code: "INTERNAL_ERROR",
    ...(process.env.NODE_ENV !== "production" && message
      ? { details: message }
      : {}),
  });
};

export { respondInternalError };
