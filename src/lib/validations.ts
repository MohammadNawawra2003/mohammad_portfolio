import { z } from "zod";

/** Contact form schema, shared by the client form and the API route. */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "That name is a little long."),
  email: z.string().trim().email("Please enter a valid email address."),
  message: z
    .string()
    .trim()
    .min(10, "Tell me a bit more (at least 10 characters).")
    .max(2000, "Message is too long (2000 characters max)."),
  /** Honeypot — must stay empty. */
  company: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
