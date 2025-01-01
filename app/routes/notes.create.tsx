import { parseWithZod } from "@conform-to/zod";
import { ActionFunctionArgs, data, redirect } from "@remix-run/cloudflare";
import { useActionData } from "@remix-run/react";
import { getAuthUser } from "~/utils/auth";
import { createNote } from "~/utils/notes";
import NoteForm from "../NoteForm/NoteForm";
import { NoteSchema } from "../NoteForm/NoteSchema";

export async function action({ request, context }: ActionFunctionArgs) {
	const submission = parseWithZod(await request.formData(), {
		schema: NoteSchema,
	});

	if (submission.status !== "success") {
		return data({ status: "error", result: submission.reply() } as const);
	}
	const { PROJECT_URL, SUPABASE_KEY } = context.cloudflare.env;
	const user = (await getAuthUser(PROJECT_URL, SUPABASE_KEY, request))!;

	const noteResponse = await createNote(PROJECT_URL, SUPABASE_KEY, request, {
		...submission.value,
		user_id: user.id,
	});

	if (noteResponse.error) {
		return data({
			status: "error",
			result: submission.reply({
				formErrors: [noteResponse.error.message],
			}),
		} as const);
	}

	return redirect(`/notes/${noteResponse.data.id}`);
}

export default function NoteCreatePage() {
	const actionData = useActionData<typeof action>();

	return (
		<div className="grid grid-cols-[1fr_17rem] h-full">
			<div className="border-r px-6">
				<h2 className="font-bold text-xl pt-5 mb-8">Create Note</h2>
				<NoteForm
					submission={
						actionData?.status === "error"
							? actionData.result
							: undefined
					}
				/>
			</div>
		</div>
	);
}
