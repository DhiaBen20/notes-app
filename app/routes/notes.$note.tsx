import { data, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import NoteControls from "~/notes/NoteControls";
import NoteDetails from "~/notes/NoteDetails";
import { fetchNoteById } from "~/utils/notes";

export async function loader({ request, context, params }: LoaderFunctionArgs) {
	const { PROJECT_URL, SUPABASE_KEY } = context.cloudflare.env;
	const note = await fetchNoteById(
		PROJECT_URL,
		SUPABASE_KEY,
		request,
		Number(params.note)!
	);

	return data({ note });
}

export default function NotePage() {
	const { note } = useLoaderData<typeof loader>();

	return (
		<div className="h-full grid grid-cols-[1fr_17rem]">
			<NoteDetails note={note} />
			<NoteControls isArchived={Boolean(note.archived)} />
		</div>
	);
}
