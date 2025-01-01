import { z } from "zod";

export const NoteSchema = z.object({
	title: z.string({ required_error: "Title is required" }).max(100),
	tags: z.string({ required_error: "Tags is required" }),
	content: z.string({ required_error: "Note is required" }),
});
