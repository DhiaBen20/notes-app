import {
	getFormProps,
	getInputProps,
	SubmissionResult,
	useForm,
} from "@conform-to/react";
import { AuthSchema } from "./AuthSchema";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";

export function useAuthForm<T extends SubmissionResult>(submission?: T) {
	const [form, fields] = useForm({
		lastResult: submission,
		constraint: getZodConstraint(AuthSchema),
		shouldValidate: "onSubmit",
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: AuthSchema });
		},
	});

	const formProps = getFormProps(form);
	const emailProps = getInputProps(fields.email, { type: "email" });
	const passwordProps = getInputProps(fields.password, {
		type: "password",
	});

	return {
		form,
		fields,
		props: {
			form: formProps,
			email: emailProps,
			password: passwordProps,
		},
	};
}
