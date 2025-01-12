import { LoaderFunctionArgs, redirect } from "@remix-run/cloudflare";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { data } from "@remix-run/router";
import { useParams } from "react-router";
import { buttonStyles } from "~/components/Button";
import Header from "~/notes/Header";
import Main from "~/notes/Main";
import Nav from "~/notes/Nav";
import Notes from "~/notes/Notes";
import { getAuthUser } from "~/utils/auth";
import { fetchNotesByTag, fetchTags } from "~/utils/notes";

export async function loader({ request, context, params }: LoaderFunctionArgs) {
	const { PROJECT_URL, SUPABASE_KEY } = context.cloudflare.env;
	const user = await getAuthUser(PROJECT_URL, SUPABASE_KEY, request);

	if (!user) return redirect("/login");

	const tags = await fetchTags(PROJECT_URL, SUPABASE_KEY, request);
	const notes = await fetchNotesByTag(
		PROJECT_URL,
		SUPABASE_KEY,
		request,
		params.tag!
	);

	return data({ tags, notes });
}

export default function TagNotesPage() {
	const { tags, notes } = useLoaderData<typeof loader>();
	const { tag } = useParams();

	return (
		<div className="h-screen grid grid-cols-[17rem_1fr]">
			<Nav tags={tags} />
			<div className="flex flex-col">
				<Header title={`Notes with tag: ${tag}`} />
				<Main>
					<div className="border-r px-3 pt-4 space-y-4">
						<Link className={buttonStyles()} to="create">
							+ Create New Note
						</Link>
						<Notes notes={notes} />
					</div>

					<Outlet />
				</Main>
			</div>
		</div>
	);
}
