import { ActionFunctionArgs, redirect } from "@remix-run/cloudflare";
import { getThemeValue, themeCookie } from "~/cookies/theme.server";

export async function action({ request }: ActionFunctionArgs) {
	const theme = await getThemeValue(request.headers.get("Cookie")!);

	return redirect(request.headers.get("Referer")!, {
		headers: {
			"Set-Cookie": await themeCookie.serialize(
				theme === "dark" ? "light" : "dark"
			),
		},
	});
}
