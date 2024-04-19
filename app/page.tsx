import { PhoneInputExamples } from "@/components/examples";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { GitPullRequestArrow, Star } from "lucide-react";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center py-24 px-5 gap-8 max-w-2xl mx-auto">
			<div className="flex flex-col gap-2 items-center">
				<h1 className="font-bold text-4xl">Shadcn Phone Input</h1>
				<h2 className="font-medium text-xl text-muted-foreground text-center">
					<Balancer>
						Simple and formatted phone input component built with Shadcn UI y
						libphonenumber-js
					</Balancer>
				</h2>
				<p className="font-normal text-md text-muted-foreground text-center my-2">
					<Balancer>
						*With country data and ISO codes obtained from the API of the OSS{" "}
						<Link
							className="underline"
							href="https://github.com/dr5hn/countries-states-cities-database"
						>
							countries-states-cities-database
						</Link>{" "}
						project.
					</Balancer>
				</p>
			</div>
			<div className="flex flex-col gap-2 items-center">
				<div className="flex gap-4 items-center">
					<Button variant="outline">
						<GitPullRequestArrow className="mr-2 size-4" />
						PR for Shadcn UI (soon)
					</Button>
					<Button asChild>
						<Link
							href="https://github.com/damianricobelli/shadcn-phone-input"
							target="_blank"
						>
							<Star className="mr-2 size-4" />
							GitHub
						</Link>
					</Button>
					<ThemeSwitcher />
				</div>
				<Button
					asChild
					variant="link"
					className="underline text-muted-foreground"
				>
					Documentation (soon)
				</Button>
			</div>
			<PhoneInputExamples />
		</main>
	);
}
