"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CatetgoryInput from "../Inputs/CatetgoryInput";
import CountrySelect from "../Inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../Inputs/Counter";
import ImageUpload from "../Inputs/ImageUpload";
import Input from "../Inputs/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STETPS {
	CATEGOY = 0,
	LOCATION = 1,
	INFO = 2,
	IMAGES = 3,
	DESCRIPTION = 4,
	PRICE = 5,
}

const RentModal = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
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
		mode: "onChange",
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
	const imageSrc = watch("imageSrc");
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

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		if (step !== STETPS.PRICE) return onNext();

		setIsLoading(true);
		// Create listing
		axios
			.post("/api/listings", data)
			.then(() => {
				// Show success message.
				toast.success("Listing created!");
				// Refresh the page.
				router.refresh();
				// Reset the react form
				reset();
				// Go back to first step.
				setStep(STETPS.CATEGOY);
				// Close the modal.
				rentModal.onClose();
			})
			.catch((err) => {
				toast.error("Something went wrong.");
				console.error("Error: ", err);
			})
			.finally(() => {
				setIsLoading(false);
			});
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
	} else if (step === STETPS.INFO) {
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
	} else if (step === STETPS.IMAGES) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Add a photo of your place"
					subTitle="Show guests what your place looks like!"
				/>

				<ImageUpload
					value={imageSrc}
					onChange={(value) => setCustomValue("imageSrc", value)}
				/>
			</div>
		);
	} else if (step === STETPS.DESCRIPTION) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="How would you describe your place?"
					subTitle="Short and sweet works best!"
				/>
				<Input
					id="title"
					label="Title"
					disabled={isLoading}
					register={register}
					errors={errors}
					required
				/>
				<hr />
				<Input
					id="description"
					label="Description"
					disabled={isLoading}
					register={register}
					errors={errors}
					required
				/>
			</div>
		);
	} else if (step === STETPS.PRICE) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Now, set your price"
					subTitle="How much do you charge per night?"
				/>
				<Input
					id="price"
					label="Price"
					formatPrice
					type="number"
					disabled={isLoading}
					register={register}
					errors={errors}
					required
				/>
			</div>
		);
	}

	return (
		<Modal
			disabled={isLoading}
			isOpen={rentModal.isOpen}
			title="Airbnb your home!"
			actionLabel={actionLabel}
			seconndaryActionLabel={secondaryActtionLabel}
			secondaryAction={step === STETPS.CATEGOY ? undefined : onBack}
			onClose={rentModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
		/>
	);
};

export default RentModal;
