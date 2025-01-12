import { Link, useParams } from "@remix-run/react";
import { Archive, ArchiveX, Pen, Trash } from "lucide-react";
import Button, { buttonStyles } from "~/components/Button";

export default function NoteControls({ isArchived }: { isArchived: boolean }) {
	const { note } = useParams();

	return (
		<div className="flex flex-col gap-2 px-3 py-6">
			{!isArchived && (
				<Link
					to={`/notes/${note}/edit`}
					className={buttonStyles({
						variant: "secondary",
						align: "start",
					})}
				>
					<Pen className="size-5 stroke-zinc-700" />
					edit
				</Link>
			)}
			<Button variant="secondary" align="start">
				<Trash className="size-5 stroke-zinc-700" />
				delete
			</Button>
			{isArchived ? (
				<Button variant="secondary" align="start">
					<ArchiveX className="size-5 stroke-zinc-700" />
					restore
				</Button>
			) : (
				<Button variant="secondary" align="start">
					<Archive className="size-5 stroke-zinc-700" />
					archive
				</Button>
			)}
		</div>
	);
}
