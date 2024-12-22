import { redirect } from "@remix-run/cloudflare";
import { supabaseClient } from "./supabase";

export async function requireAuth(
	PROJECT_URL: string,
	SUPABASE_KEY: string,
	request: Request
) {
	const supabase = supabaseClient(PROJECT_URL, SUPABASE_KEY, request);

	const response = await supabase.auth.getUser();

	if (!response.data.user) throw redirect("/login");
}

export async function getAuthUser(
	PROJECT_URL: string,
	SUPABASE_KEY: string,
	request: Request
) {
	const supabase = supabaseClient(PROJECT_URL, SUPABASE_KEY, request);

	const response = await supabase.auth.getSession();

	if (!response.data.session) return null;

	return response.data.session.user;
}
