import { Form, Link, useNavigation, useParams } from "@remix-run/react";
import { Archive, ArchiveX, Pen, Trash, Trash2 } from "lucide-react";
import Button, { buttonStyles } from "~/components/Button";
import * as Dialog from "@radix-ui/react-dialog";

export default function NoteControls({ isArchived }: { isArchived: boolean }) {
	const { note } = useParams();
	const navigation = useNavigation();

	return (
		<div className="flex flex-col gap-2 px-3 py-6">
			{!isArchived && (
				<Link
					to={`/notes/${note}/edit`}
					className={buttonStyles({
						shape: "outlined",
						align: "start",
					})}
				>
					<Pen className="size-5 stroke-zinc-700 dark:stroke-zinc-500" />
					edit
				</Link>
			)}
			<Dialog.Root>
				<Dialog.Trigger asChild>
					<Button shape="outlined" align="start">
						<Trash className="size-5 stroke-zinc-700 dark:stroke-zinc-500" />
						delete
					</Button>
				</Dialog.Trigger>
				<Dialog.Portal>
					<Dialog.Overlay className="absolute inset-0 bg-black/50" />
					<Dialog.Content className="max-w-md bg-white dark:bg-slate-800 rounded-lg absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full px-4 py-5">
						<div className="flex items-start gap-4">
							<div className="bg-slate-100 dark:bg-slate-700 size-9 rounded-md shrink-0 flex items-center justify-center">
								<Trash2 className="stroke-zinc-600 dark:stroke-zinc-400" />
							</div>
							<div>
								<Dialog.Title className="font-semibold mb-2 dark:text-neutral-300">
									Delete Note
								</Dialog.Title>
								<Dialog.Description className="text-sm text-zinc-700 dark:text-neutral-400">
									Are you sure you want to permanently delete
									this note? This action cannot be undone.
								</Dialog.Description>

								<hr className="my-3 dark:border-slate-600" />

								<div className="flex justify-end gap-4">
									<Dialog.Close asChild>
										<Button color="transparent">
											Cancel
										</Button>
									</Dialog.Close>
									<Form
										method="post"
										action={`/notes/${note}/delete`}
										className="flex flex-col"
									>
										<Button
											color="red"
											loading={
												navigation.state ===
												"submitting"
											}
										>
											Delete Note
										</Button>
									</Form>
								</div>
							</div>
						</div>
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
			{isArchived ? (
				<Dialog.Root>
					<Dialog.Trigger asChild>
						<Button shape="outlined" align="start">
							<ArchiveX className="size-5 stroke-zinc-700 dark:stroke-zinc-500" />
							restore
						</Button>
					</Dialog.Trigger>
					<Dialog.Portal>
						<Dialog.Overlay className="absolute inset-0 bg-black/50" />
						<Dialog.Content className="max-w-md bg-white dark:bg-slate-800 rounded-lg absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full px-4 py-5">
							<div className="flex items-start gap-4">
								<div className="bg-slate-100 dark:bg-slate-700 size-9 rounded-md shrink-0 flex items-center justify-center">
									<Archive className="stroke-zinc-600 dark:stroke-zinc-400" />
								</div>
								<div>
									<Dialog.Title className="font-semibold mb-2 dark:text-neutral-300">
										Restore Note
									</Dialog.Title>
									<Dialog.Description className="text-sm text-zinc-700 dark:text-neutral-400">
										Are you sure you want to Unarchive this
										note? You can find it in the Unarchived
										Notes section and restore it anytime.
									</Dialog.Description>

									<hr className="my-3 dark:border-slate-600" />

									<div className="flex justify-end gap-4">
										<Dialog.Close asChild>
											<Button color="transparent">
												Cancel
											</Button>
										</Dialog.Close>
										<Form
											method="post"
											action={`/notes/${note}/restore`}
											className="flex flex-col"
										>
											<Button
												loading={
													navigation.state ===
													"submitting"
												}
											>
												Restore Note
											</Button>
										</Form>
									</div>
								</div>
							</div>
						</Dialog.Content>
					</Dialog.Portal>
				</Dialog.Root>
			) : (
				<Dialog.Root>
					<Dialog.Trigger asChild>
						<Button shape="outlined" align="start">
							<Archive className="size-5 stroke-zinc-700 dark:stroke-zinc-500" />
							archive
						</Button>
					</Dialog.Trigger>
					<Dialog.Portal>
						<Dialog.Overlay className="absolute inset-0 bg-black/50" />
						<Dialog.Content className="max-w-md bg-white dark:bg-slate-800 rounded-lg absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full px-4 py-5">
							<div className="flex items-start gap-4">
								<div className="bg-slate-100 dark:bg-slate-700 size-9 rounded-md shrink-0 flex items-center justify-center">
									<Archive className="stroke-zinc-600 dark:stroke-zinc-400" />
								</div>
								<div>
									<Dialog.Title className="font-semibold mb-2 dark:text-neutral-300">
										Archive Note
									</Dialog.Title>
									<Dialog.Description className="text-sm text-zinc-700 dark:text-neutral-400">
										Are you sure you want to archive this
										note? You can find it in the Archived
										Notes section and restore it anytime.
									</Dialog.Description>

									<hr className="my-3 dark:border-slate-600" />

									<div className="flex justify-end gap-4">
										<Dialog.Close asChild>
											<Button color="transparent">
												Cancel
											</Button>
										</Dialog.Close>
										<Form
											method="post"
											action={`/notes/${note}/archive`}
											className="flex flex-col"
										>
											<Button
												loading={
													navigation.state ===
													"submitting"
												}
											>
												Archive Note
											</Button>
										</Form>
									</div>
								</div>
							</div>
						</Dialog.Content>
					</Dialog.Portal>
				</Dialog.Root>
			)}
		</div>
	);
}
