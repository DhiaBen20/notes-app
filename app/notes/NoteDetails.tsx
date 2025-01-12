import { Clock, LoaderPinwheel, TagIcon } from "lucide-react";
import { Tables } from "~/types/supabase";

export default function NoteDetails({ note }: { note: Tables<"notes"> }) {
	return (
		<div className="border-r px-6 pt-4">
			<h2 className="font-bold text-2xl mb-4">{note.title}</h2>

			<dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 text-sm">
				<dt className="flex items-center gap-2 text-zinc-500">
					<TagIcon className="size-4" />
					Tags
				</dt>
				<dd className="text-zinc-800">{note.tags}</dd>
				{note.archived && (
					<>
						<dt className="flex items-center gap-2 text-zinc-500">
							<LoaderPinwheel className="size-4" />
							Status
						</dt>
						<dd className="text-zinc-800">archived</dd>
					</>
				)}
				<dt className="flex items-center gap-2 text-zinc-500">
					<Clock className="size-4" />
					Last edited
				</dt>
				<dd className="text-zinc-800">
					{new Date(note.created_at).toLocaleDateString(undefined, {
						year: "numeric",
						month: "short",
						day: "2-digit",
					})}
				</dd>
			</dl>
			<hr className="my-6 -mx-6" />
			<p className="text-zinc-700">{note.content}</p>
		</div>
	);
}
