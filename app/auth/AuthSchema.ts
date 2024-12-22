import { z } from "zod";

export const AuthSchema = z.object({
	email: z.string({ required_error: "Email address is required" }).email(),
	password: z
		.string({ required_error: "Password is required" })
		.min(8, { message: "Password must contain at least 8 characters" }),
});
