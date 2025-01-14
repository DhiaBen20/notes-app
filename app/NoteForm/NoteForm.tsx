import { SubmissionResult } from "@conform-to/react";
import { Form, useNavigation } from "@remix-run/react";
import Button from "~/components/Button";
import Errors from "~/components/Errors";
import Input from "~/components/Input";
import Label from "~/components/Label";
import TextArea from "~/components/TextArea";
import { Tables } from "~/types/supabase";
import { useNoteForm } from "./useNoteForm";

export default function NoteForm({
	note: oldNote,
	submission,
}: {
	note?: Tables<"notes">;
	submission?: SubmissionResult;
}) {
	const {
		form,
		fields,
		props: { form: formProps, title, tags, note },
	} = useNoteForm(submission);
	const navigation = useNavigation();

	return (
		<Form className="space-y-6" method="post" {...formProps}>
			<Errors errorId={form.errorId} errors={form.errors} />
			<div className="flex flex-col gap-1">
				<Label htmlFor={title.id}>Title</Label>
				<Input
					placeholder="e.g., My First Note"
					defaultValue={oldNote ? oldNote.title : undefined}
					{...title}
				/>
				<Errors
					errorId={fields.title.errorId}
					errors={fields.title.errors}
				/>
			</div>
			<div className="flex flex-col gap-1">
				<Label htmlFor={tags.id}>Tags</Label>
				<p className="text-zinc-500 text-sm" id="tags-desc">
					Separate multiple tags with a comma
				</p>
				<Input
					{...tags}
					placeholder="e.g., work, personal, ideas"
					aria-describedby="tags-desc"
					defaultValue={oldNote ? oldNote.tags : undefined}
				/>
				<Errors
					errorId={fields.tags.errorId}
					errors={fields.tags.errors}
				/>
			</div>
			<div className="flex flex-col gap-1">
				<Label htmlFor={note.id}>Note</Label>
				<TextArea
					{...note}
					rows={6}
					placeholder="Write your note here..."
					defaultValue={oldNote ? oldNote.content : undefined}
				/>
				<Errors
					errorId={fields.content.errorId}
					errors={fields.content.errors}
				/>
			</div>

			<Button
				isLoading={
					navigation.formMethod === "POST" &&
					navigation.state === "submitting"
				}
			>
				Save
			</Button>
		</Form>
	);
}
