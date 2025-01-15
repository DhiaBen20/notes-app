import { ActionFunctionArgs, redirect } from "@remix-run/cloudflare";
import { updateNote } from "~/utils/notes";

export async function action({ context, request, params }: ActionFunctionArgs) {
	const { PROJECT_URL, SUPABASE_KEY } = context.cloudflare.env;

	const updateResponse = await updateNote(
		PROJECT_URL,
		SUPABASE_KEY,
		request,
		Number(params.note),
		{ archived: false }
	);

	if (updateResponse.error) throw updateResponse.error;

	return redirect(`/notes/${updateResponse.data.id}`);
}
