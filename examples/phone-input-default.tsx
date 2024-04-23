import { Code } from "@/components/code";
import { PhoneInput, getPhoneData } from "@/components/phone-input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import * as React from "react";

export function PhoneInputDefault() {
	const [phone, setPhone] = React.useState("+1 (408) 996–1010");

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPhone(e.target.value);
	};

	const phoneData = getPhoneData(phone);

	return (
		<div className="w-full space-y-8">
			<div className="flex flex-col gap-4">
				<PhoneInput value={phone} onChange={handleOnChange} />
			</div>
			<p className="text-muted-foreground">
				We can use the <Code>getPhoneData</Code> utility function to get a lot
				of information about the selected number.
			</p>
			<div className="flex flex-col gap-2 border rounded-lg p-3 text-sm">
				<div className="flex gap-2">
					<p>Phone number: </p>
					<span className="font-semibold">{phoneData.phoneNumber || "-"}</span>
				</div>
				<Separator />
				<div className="flex gap-2">
					<p>Country code: </p>
					<span className="font-semibold">{phoneData.countryCode || "-"}</span>
				</div>
				<Separator />
				<div className="flex gap-2">
					<p>Country calling code: </p>
					<span className="font-semibold">
						{phoneData.countryCallingCode || "-"}
					</span>
				</div>
				<Separator />
				<div className="flex gap-2">
					<p>National number: </p>
					<span className="font-semibold">
						{phoneData.nationalNumber || "-"}
					</span>
				</div>
				<Separator />
				<div className="flex gap-2">
					<p>International number: </p>
					<span className="font-semibold">
						{phoneData.internationalNumber || "-"}
					</span>
				</div>
				<Separator />
				<div className="flex gap-2">
					<p>URI: </p>
					<span className="font-semibold">{phoneData.uri || "-"}</span>
				</div>
				<Separator />
				<div className="flex gap-2">
					<p className="flex-shrink-0">Possible countries: </p>
					<span className="font-semibold">
						{phoneData.possibleCountries || "-"}
					</span>
				</div>
				<Separator />
				<Badge
					className={cn(
						"w-fit",
						phoneData.isValid
							? "bg-green-500 text-green-50"
							: "bg-destructive text-destructive-foreground",
					)}
				>
					VALID NUMBER
				</Badge>
				<Separator />
				<Badge
					className={cn(
						"w-fit",
						phoneData.isPossible
							? "bg-green-500 text-green-50"
							: "bg-destructive text-destructive-foreground",
					)}
				>
					POSSIBLE NUMBER
				</Badge>
			</div>
		</div>
	);
}
