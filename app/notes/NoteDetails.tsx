import { Clock, LoaderPinwheel, TagIcon } from "lucide-react";
import { Tables } from "~/types/supabase";

export default function NoteDetails({ note }: { note: Tables<"notes"> }) {
	return (
		<div className="border-r dark:border-slate-800 px-6 pt-4">
			<h2 className="font-bold text-2xl mb-4 dark:text-neutral-300">{note.title}</h2>

			<dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 text-sm">
				<dt className="flex items-center gap-2 text-zinc-500 dark:text-neutral-400">
					<TagIcon className="size-4" />
					Tags
				</dt>
				<dd className="text-zinc-800 dark:text-neutral-500">{note.tags}</dd>
				{note.archived && (
					<>
						<dt className="flex items-center gap-2 text-zinc-500 dark:text-neutral-400">
							<LoaderPinwheel className="size-4" />
							Status
						</dt>
						<dd className="text-zinc-800 dark:text-neutral-500">archived</dd>
					</>
				)}
				<dt className="flex items-center gap-2 text-zinc-500 dark:text-neutral-400">
					<Clock className="size-4" />
					Last edited
				</dt>
				<dd className="text-zinc-800 dark:text-neutral-500">
					{new Date(note.created_at).toLocaleDateString(undefined, {
						year: "numeric",
						month: "short",
						day: "2-digit",
					})}
				</dd>
			</dl>
			<hr className="my-6 -mx-6 dark:border-slate-800" />
			<p className="text-zinc-700 dark:text-neutral-400">{note.content}</p>
		</div>
	);
}
