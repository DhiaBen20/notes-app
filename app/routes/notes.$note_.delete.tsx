import { ActionFunctionArgs, redirect } from "@remix-run/cloudflare";
import { deleteNote } from "~/utils/notes";

export async function action({ context, request, params }: ActionFunctionArgs) {
	const { PROJECT_URL, SUPABASE_KEY } = context.cloudflare.env;

	const deleteResponse = await deleteNote(
		PROJECT_URL,
		SUPABASE_KEY,
		request,
		Number(params.note)
	);

	if (deleteResponse.error) throw deleteResponse.error;

	return redirect("/notes");
}
