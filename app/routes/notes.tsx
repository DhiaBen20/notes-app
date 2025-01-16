import { data, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

import InfoMessage from "~/notes/InfoMessage";
import Header from "~/notes/Header";
import Main from "~/notes/Main";
import Nav from "~/notes/Nav";
import Notes from "~/notes/Notes";
import { requireAuth } from "~/utils/auth";
import { fetchNotes, fetchTags } from "~/utils/notes";
import { buttonStyles } from "~/components/Button";

export async function loader({ request, context }: LoaderFunctionArgs) {
	const { PROJECT_URL, SUPABASE_KEY } = context.cloudflare.env;

	await requireAuth(PROJECT_URL, SUPABASE_KEY, request);

	const tags = await fetchTags(PROJECT_URL, SUPABASE_KEY, request);
	const notes = await fetchNotes(PROJECT_URL, SUPABASE_KEY, request);

	return data({ tags, notes });
}

export default function NotesPage() {
	const { tags, notes } = useLoaderData<typeof loader>();

	return (
		<div className="h-screen grid grid-cols-[17rem_1fr]">
			<Nav tags={tags} />
			<div className="flex flex-col">
				<Header title={`All Notes`} />
				<Main>
					<div className="dark:bg-slate-950 dark:border-slate-800 border-r px-3 pt-4 space-y-4">
						<Link className={buttonStyles()} to="create">
							+ Create New Note 
						</Link>

						{notes.length > 0 ? (
							<Notes notes={notes} />
						) : (
							<InfoMessage>
								You don&rsquo;t have any notes yet. Start a new
								note to capture your thoughts and ideas.
							</InfoMessage>
						)}
					</div>

					<Outlet />
				</Main>
			</div>
		</div>
	);
}
