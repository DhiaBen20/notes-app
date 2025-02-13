import {
	createServerClient,
	parseCookieHeader,
	serializeCookieHeader,
} from "@supabase/ssr";
import { Database } from "~/types/supabase";

function parseCookie(request: Request) {
	return parseCookieHeader(request.headers.get("cookie") ?? "");
}

export function supabaseClient(
	supabaseUrl: string,
	supabaseKey: string,
	request: Request,
	headers?: Headers
) {
	return createServerClient<Database>(supabaseUrl, supabaseKey, {
		cookies: {
			getAll() {
				return parseCookie(request);
			},
			setAll(cookiesToSet) {
				cookiesToSet.forEach(({ name, value, options }) => {
					if (!headers) return;

					headers.set(
						"Set-Cookie",
						serializeCookieHeader(name, value, options)
					);
				});
			},
		},
	});
}
