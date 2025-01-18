import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import {
	data,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useNavigation,
	useRouteLoaderData,
} from "@remix-run/react";

import { getThemeValue } from "./cookies/theme.server";
import "./tailwind.css";
import { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export const links: LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
	},
];

export async function loader({ request }: LoaderFunctionArgs) {
	const theme = await getThemeValue(request.headers.get("Cookie")!);

	return data({ theme } as const);
}

export function Layout({ children }: { children: React.ReactNode }) {
	const data = useRouteLoaderData<typeof loader>("root");
	const navigation = useNavigation();

	useEffect(() => {
		NProgress.configure({ showSpinner: false });
	}, []);

	if (navigation.state === "loading") {
		NProgress.start();
	} else if (navigation.state === "idle") {
		NProgress.done();
	}
	return (
		<html lang="en" className={data?.theme === "dark" ? "dark" : ""}>
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}
