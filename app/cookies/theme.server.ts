import { createCookie } from "@remix-run/cloudflare";

export const themeCookie = createCookie("theme", {
	maxAge: 30 * 24 * 60 * 60 * 3600,
});

export async function getThemeValue(cookie: string) {
	const theme = await themeCookie.parse(cookie);

	if (!theme) return "dark";

	return theme === "dark" ? "dark" : "light";
}
