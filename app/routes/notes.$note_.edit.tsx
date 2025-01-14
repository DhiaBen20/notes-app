import { parseWithZod } from "@conform-to/zod";
import {
	ActionFunctionArgs,
	data,
	LoaderFunctionArgs,
	redirect,
} from "@remix-run/cloudflare";
import { useActionData, useLoaderData } from "@remix-run/react";
import { NoteSchema } from "~/NoteForm/NoteSchema";
import { fetchNoteById, updateNote } from "~/utils/notes";
import NoteForm from "../NoteForm/NoteForm";

export async function loader({ context, request, params }: LoaderFunctionArgs) {
	const { PROJECT_URL, SUPABASE_KEY } = context.cloudflare.env;
	const note = await fetchNoteById(
		PROJECT_URL,
		SUPABASE_KEY,
		request,
		Number(params.note)!
	);

	return data({ note });
}

export async function action({ context, request, params }: ActionFunctionArgs) {
	const submission = parseWithZod(await request.formData(), {
		schema: NoteSchema,
	});

	if (submission.status !== "success") {
		return data({ status: "error", result: submission.reply() } as const);
	}

	const { PROJECT_URL, SUPABASE_KEY } = context.cloudflare.env;
	const updateResponse = await updateNote(
		PROJECT_URL,
		SUPABASE_KEY,
		request,
		Number(params.note),
		submission.value
	);

	if (updateResponse.error) {
		return data({
			status: "error",
			result: submission.reply({
				formErrors: [updateResponse.error.message],
			}),
		} as const);
	}

	return redirect(`/notes/${updateResponse.data.id}`);
}

export default function NoteCreatePage() {
	const loaderData = useLoaderData<typeof loader>();
	const actionData = useActionData<typeof action>();

	return (
		<div className="grid grid-cols-[1fr_17rem] h-full">
			<div className="border-r px-6">
				<h2 className="font-bold text-xl pt-5 mb-8">
					Edit Note: {loaderData.note.title}
				</h2>
				<NoteForm
					submission={
						actionData?.status === "error"
							? actionData.result
							: undefined
					}
					note={loaderData.note}
				/>
			</div>
		</div>
	);
}
