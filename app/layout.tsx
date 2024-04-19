import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});
export const metadata: Metadata = {
	title: "Shadcn Phone Input",
	description: "Display content divided into a steps sequence",
	openGraph: {
		title: "Shadcn Phone Input",
		description: "Display content divided into a steps sequence",
		url: "https://shadcn-phone-input-five.vercel.app/",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable,
				)}
			>
				<Analytics />
				<SpeedInsights />
				<ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
					<Toaster richColors />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
