import { getFormProps, SubmissionResult } from "@conform-to/react";
import { Form, useNavigation } from "@remix-run/react";
import Button from "~/components/Button";
import Errors from "~/components/Errors";
import Input from "~/components/Input";
import Label from "~/components/Label";
import { useAuthForm } from "./useAuthForm";

export function AuthForm({
	submission,
	buttonLabel,
}: {
	submission?: SubmissionResult;
	buttonLabel: "login" | "register";
}) {
	const { form, fields, props: inputsProps } = useAuthForm(submission);
	const navigation = useNavigation();

	return (
		<Form {...getFormProps(form)} method="post" className="space-y-4">
			<Errors errorId={form.errorId} errors={form.errors} />
			<input type="hidden" name="auth" />
			<div className="flex flex-col gap-1">
				<Label htmlFor={fields.email.id}>Email Address</Label>
				<Input
					{...inputsProps.email}
					id={fields.email.id}
					placeholder="johndoe@dommain.com"
				/>
				<Errors
					errorId={fields.email.errorId}
					errors={fields.email.errors}
				/>
			</div>
			<div className="flex flex-col gap-1">
				<Label htmlFor={fields.password.id}>Password</Label>
				<Input
					{...inputsProps.password}
					id={fields.password.id}
					placeholder="••••••••"
				/>
				<Errors
					errorId={fields.password.errorId}
					errors={fields.password.errors}
				/>
			</div>
			<div className="flex flex-col">
				<Button isLoading={navigation.formData?.has("auth")}>
					{buttonLabel}
				</Button>
			</div>
		</Form>
	);
}
