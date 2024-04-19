import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import parsePhoneNumberFromString, {
	AsYouType,
	type CarrierCode,
	type CountryCallingCode,
	type E164Number,
	type NationalNumber,
	type CountryCode,
	type NumberType,
} from "libphonenumber-js";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import { countries } from "./countries";

export type Country = (typeof countries)[number];

export type PhoneData = {
	phoneNumber?: E164Number;
	countryCode?: CountryCode;
	countryCallingCode?: CountryCallingCode;
	carrierCode?: CarrierCode;
	nationalNumber?: NationalNumber;
	internationalNumber?: string;
	possibleCountries?: string;
	isValid?: boolean;
	isPossible?: boolean;
	uri?: string;
	type?: NumberType;
};

interface PhoneInputProps extends React.ComponentPropsWithRef<"input"> {
	value?: string;
	initialCountryCode?: CountryCode;
}

export function getPhoneData(phone: string): PhoneData {
	const asYouType = new AsYouType();
	asYouType.input(phone);
	const number = asYouType.getNumber();
	return {
		phoneNumber: number?.number,
		countryCode: number?.country,
		countryCallingCode: number?.countryCallingCode,
		carrierCode: number?.carrierCode,
		nationalNumber: number?.nationalNumber,
		internationalNumber: number?.formatInternational(),
		possibleCountries: number?.getPossibleCountries().join(", "),
		isValid: number?.isValid(),
		isPossible: number?.isPossible(),
		uri: number?.getURI(),
		type: number?.getType(),
	};
}

export function PhoneInput({
	value,
	initialCountryCode = "US",
	className,
	id,
	required = true,
	...rest
}: PhoneInputProps) {
	const asYouType = new AsYouType();

	const inputRef = React.useRef<HTMLInputElement>(null);

	if (value && value.length > 0) {
		initialCountryCode =
			parsePhoneNumberFromString(value)?.getPossibleCountries()[0] || "US";
	}

	const [openCommand, setOpenCommand] = React.useState(false);
	const [countryCode, setCountryCode] =
		React.useState<CountryCode>(initialCountryCode);

	const selectedCountry = countries.find(
		(country) => country.iso2 === countryCode,
	);

	const initializeDefaultValue = () => {
		if (value) {
			return value;
		}

		return `+${selectedCountry?.phone_code}`;
	};

	const handleOnInput = (event: React.FormEvent<HTMLInputElement>) => {
		let value = event.currentTarget.value;
		if (!value.startsWith("+")) {
			value = `+${value}`;
		}
		const formattedValue = asYouType.input(value);
		const number = asYouType.getNumber();
		setCountryCode(number?.country || "US");
		event.currentTarget.value = formattedValue;
	};

	return (
		<div className={cn("flex gap-2", className)}>
			<Popover open={openCommand} onOpenChange={setOpenCommand}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={openCommand}
						className="w-max items-center justify-between whitespace-nowrap"
					>
						{selectedCountry?.name ? (
							<span className="relative top-0.5">{selectedCountry.emoji}</span>
						) : (
							"Select country"
						)}
						<ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="max-w-[300px] p-0" align="start">
					<Command>
						<CommandInput placeholder="Search country..." />
						<CommandList>
							<CommandEmpty>No country found.</CommandEmpty>
							<CommandGroup>
								<ScrollArea className="h-[280px]">
									{countries.map((country) => {
										return (
											<CommandItem
												key={country.iso3}
												value={`${country.name} (+${country.phone_code})`}
												onSelect={() => {
													if (inputRef.current) {
														inputRef.current.value = `+${country.phone_code}`;
														inputRef.current.focus();
													}
													setCountryCode(country.iso2 as CountryCode);
													setOpenCommand(false);
												}}
											>
												<Check
													className={cn(
														"mr-2 size-4",
														countryCode === country.iso2
															? "opacity-100"
															: "opacity-0",
													)}
												/>
												<span className="relative top-0.5 mr-2">
													{country.emoji}
												</span>
												{country.name}
												<span className="text-gray-11 ml-1">
													(+{country.phone_code})
												</span>
											</CommandItem>
										);
									})}
								</ScrollArea>
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			<Input
				ref={inputRef}
				type="text"
				pattern="^(\+)?[0-9\s]*$"
				name="phone"
				id={id}
				placeholder="Phone"
				defaultValue={initializeDefaultValue()}
				onInput={handleOnInput}
				required={required}
				aria-required={required}
				{...rest}
			/>
		</div>
	);
}
