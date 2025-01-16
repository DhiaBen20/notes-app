import { NavLink } from "@remix-run/react";
import { Tables } from "~/types/supabase";

type NoteType = Pick<Tables<"notes">, "id" | "title" | "tags" | "created_at">;

function Note({ note }: { note: NoteType }) {
	return (
		<div className="relative has-[.active]:bg-slate-100 dark:has-[.active]:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg p-2 flex flex-col gap-1.5">
			<NavLink
				to={`${note.id}`}
				className={({ isActive }) =>
					`absolute inset-0 ${isActive ? "active" : ""}`
				}
			/>
			<div className="font-bold dark:text-neutral-300">{note.title}</div>
			<div className="text-sm flex flex-wrap gap-2">
				{note.tags.split(",").map((tag) => (
					<div
						key={tag}
						className="bg-slate-200 dark:bg-slate-700 dark:text-neutral-300 rounded text-neutral-700 px-2"
					>
						{tag}
					</div>
				))}
			</div>
			<time
				dateTime={new Date(note.created_at).toISOString()}
				className="text-sm text-zinc-500"
			>
				{new Date(note.created_at).toLocaleDateString(undefined, {
					year: "numeric",
					month: "short",
					day: "numeric",
				})}
			</time>
		</div>
	);
}

export default function Notes({ notes }: { notes: NoteType[] }) {
	return (
		<ul className="space-y-2">
			{notes.map((note) => (
				<li key={note.id}>
					<Note note={note} />
				</li>
			))}
		</ul>
	);
}
