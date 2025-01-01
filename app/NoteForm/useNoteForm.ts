import {
	getFormProps,
	getInputProps,
	SubmissionResult,
	useForm,
} from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { NoteSchema } from "./NoteSchema";

export function useNoteForm<T extends SubmissionResult>(submission?: T) {
	const [form, fields] = useForm({
		lastResult: submission,
		constraint: getZodConstraint(NoteSchema),
		shouldValidate: "onSubmit",
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: NoteSchema });
		},
	});

	const formProps = getFormProps(form);
	const titleProps = getInputProps(fields.title, { type: "text" });
	const tagsProps = getInputProps(fields.tags, {
		type: "text",
	});
	const noteProps = getInputProps(fields.content, { type: "text" });

	return {
		form,
		fields,
		props: {
			form: formProps,
			title: titleProps,
			tags: tagsProps,
			note: noteProps,
		},
	};
}
