"use client";

import { FieldValues, useForm } from "react-hook-form";
import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CatetgoryInput from "../Inputs/CatetgoryInput";
import CountrySelect from "../Inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../Inputs/Counter";

enum STETPS {
	CATEGOY = 0,
	LOCATION = 1,
	INFO = 2,
	IMAGES = 3,
	DESCRIPTION = 4,
	PRICE = 5,
}

const RentModal = () => {
	const rentModal = useRentModal();
	const [step, setStep] = useState<STETPS>(STETPS.CATEGOY);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
		reset,
	} = useForm<FieldValues>({
		defaultValues: {
			category: "",
			location: null,
			guestCount: 1,
			roomCount: 1,
			bathroomCount: 1,
			imageSrc: "",
			price: 1,
			title: "",
			description: "",
		},
	});

	const category = watch("category");
	const location = watch("location");
	const guestCount = watch("guestCount");
	const roomCount = watch("roomCount");
	const bathroomCount = watch("bathroomCount");

	const Map = useMemo(
		() =>
			// Import custom Map component.
			// And reimport every time locaiton changes.
			dynamic(() => import("../Map"), {
				ssr: false,
			}),
		[location]
	);

	const setCustomValue = (id: string, value: any) => {
		setValue(id, value, {
			shouldDirty: true,
			shouldTouch: true,
			shouldValidate: true,
		});
	};

	const onBack = () => {
		setStep((value) => value - 1);
	};

	const onNext = () => {
		setStep((value) => value + 1);
	};

	const actionLabel = useMemo(() => {
		if (step === STETPS.PRICE) {
			// Last step
			return "Creaet";
		}
		return "Next";
	}, [step]);

	const secondaryActtionLabel = useMemo(() => {
		if (step === STETPS.CATEGOY) {
			// First step
			return undefined;
		}
		return "Back";
	}, [step]);

	let bodyContent = (
		<div className="flex flex-col gap-8">
			<Heading
				title="Which of these best describes your place?"
				subTitle="Pick a catetgory"
			/>
			<div
				className="
                grid 
                grid-cols-1 
                md:grid-cols-2 
                gap-3 
                max-h-[50vh] 
                overflow-y-auto"
			>
				{categories.map((item) => (
					<div key={item.label} className="col-span-1">
						<CatetgoryInput
							label={item.label}
							onClick={(category) => {
								setCustomValue("category", category);
							}}
							selected={category === item.label}
							icon={item.icon}
						/>
					</div>
				))}
			</div>
		</div>
	);

	if (step === STETPS.LOCATION) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Where is your place located?"
					subTitle="Help guests find you!"
				/>
				<CountrySelect
					onChange={(value) => {
						setCustomValue("location", value);
					}}
					value={location}
				/>
				<Map center={location?.latlng} label={location?.label} />
			</div>
		);
	}

	if (step === STETPS.INFO) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Share some basics about your place"
					subTitle="What amenities do you have."
				/>
				<Counter
					title="Guests"
					subTitle="How many guests do you allow?"
					value={guestCount}
					onChange={(value) => setCustomValue("guestCount", value)}
				/>
				<hr />
				<Counter
					title="Rooms"
					subTitle="How many rooms do you have?"
					value={roomCount}
					onChange={(value) => setCustomValue("roomCount", value)}
				/>
				<hr />
				<Counter
					title="Bathrooms"
					subTitle="How many bathrooms do you have?"
					value={bathroomCount}
					onChange={(value) => setCustomValue("bathroomCount", value)}
				/>
			</div>
		);
	}

	return (
		<Modal
			isOpen={rentModal.isOpen}
			title="Airbnb your home!"
			actionLabel={actionLabel}
			seconndaryActionLabel={secondaryActtionLabel}
			secondaryAction={step === STETPS.CATEGOY ? undefined : onBack}
			onClose={rentModal.onClose}
			onSubmit={onNext}
			body={bodyContent}
		/>
	);
};

export default RentModal;
