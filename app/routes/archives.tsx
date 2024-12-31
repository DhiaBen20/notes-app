import { data, LoaderFunctionArgs, redirect } from "@remix-run/cloudflare";
import { Outlet, useLoaderData, Link } from "@remix-run/react";
import { buttonClasses } from "~/components/Button";
import InfoMessage from "~/notes/InfoMessage";
import Header from "~/notes/Header";
import Main from "~/notes/Main";
import Nav from "~/notes/Nav";
import Notes from "~/notes/Notes";
import { getAuthUser } from "~/utils/auth";
import { fetchNotes, fetchTags } from "~/utils/notes";

export async function loader({ request, context }: LoaderFunctionArgs) {
	const { PROJECT_URL, SUPABASE_KEY } = context.cloudflare.env;
	const user = await getAuthUser(PROJECT_URL, SUPABASE_KEY, request);

	if (!user) return redirect("/login");

	const tags = await fetchTags(PROJECT_URL, SUPABASE_KEY, request);
	const notes = await fetchNotes(PROJECT_URL, SUPABASE_KEY, request, true);

	return data({ tags, notes });
}

export default function ArchivesPage() {
	const { tags, notes } = useLoaderData<typeof loader>();

	return (
		<div className="h-screen grid grid-cols-[17rem_1fr]">
			<Nav tags={tags} />
			<div className="flex flex-col">
				<Header title="Archived notes" />
				<Main>
					<div className="border-r px-3 pt-4 space-y-4">
						<Link className={buttonClasses} to="create">
							+ Create New Note
						</Link>
						<p className="text-sm text-zinc-700">
							All your archived notes are stored here. You can
							restore or delete them anytime.
						</p>
						{notes.length > 0 ? (
							<Notes notes={notes} />
						) : (
							<InfoMessage>
								No notes have been archived yet. Move notes here
								for safekeeping, or create a new note.
							</InfoMessage>
						)}
					</div>

					<Outlet />
				</Main>
			</div>
		</div>
	);
}
