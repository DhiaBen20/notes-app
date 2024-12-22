import { ActionFunctionArgs, redirect } from "@remix-run/cloudflare";
import { supabaseClient } from "~/utils/supabase";

export async function action({ request, context }: ActionFunctionArgs) {
	const { PROJECT_URL, SUPABASE_KEY } = context.cloudflare.env;
	const headers = new Headers();

	await supabaseClient(
		PROJECT_URL,
		SUPABASE_KEY,
		request,
		headers
	).auth.signOut();

	return redirect("/login");
}
