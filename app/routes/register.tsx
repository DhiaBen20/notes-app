import { parseWithZod } from "@conform-to/zod";
import {
	ActionFunctionArgs,
	data,
	LoaderFunctionArgs,
	redirect,
} from "@remix-run/cloudflare";
import { Link, useActionData } from "@remix-run/react";
import { AuthSchema } from "~/auth/AuthSchema";
import { AuthForm } from "~/auth/Form";
import Layout from "~/auth/Layout";
import { getAuthUser } from "~/utils/auth";
import { supabaseClient } from "~/utils/supabase";

export async function loader({ request, context }: LoaderFunctionArgs) {
	const { PROJECT_URL, SUPABASE_KEY } = context.cloudflare.env;

	const user = await getAuthUser(PROJECT_URL, SUPABASE_KEY, request);

	if (user) return redirect("/notes");

	return data({});
}

export async function action({ request, context }: ActionFunctionArgs) {
	const formData = await request.formData();

	const submission = parseWithZod(formData, {
		schema: AuthSchema,
	});

	if (submission.status !== "success") {
		return data({
			status: "error",
			result: submission.reply({ hideFields: ["password"] }),
		} as const);
	}

	const { PROJECT_URL, SUPABASE_KEY } = context.cloudflare.env;
	const headers = new Headers();
	const client = supabaseClient(PROJECT_URL, SUPABASE_KEY, request, headers);

	const authResponse = await client.auth.signUp({
		email: submission.value.email,
		password: submission.value.password,
	});

	if (authResponse.error) {
		return {
			status: "error",
			result: submission.reply({
				formErrors: [authResponse.error.message],
				hideFields: ["password"],
			}),
		};
	}

	return redirect("/notes", { headers });
}

export default function Register() {
	const actionData = useActionData<typeof action>();

	return (
		<Layout>
			<div className="mb-8">
				<h1 className="text-center font-bold text-2xl dark:text-neutral-300">Register</h1>
				<p className="text-center font-medium text-sm text-gray-600 dark:text-zinc-500">
					Already have an account?{" "}
					<Link to={"/login"} className="text-blue-600">
						login.
					</Link>
				</p>
			</div>

			<AuthForm
				submission={
					actionData?.status === "error"
						? actionData.result
						: undefined
				}
				buttonLabel={"register"}
			/>
		</Layout>
	);
}
