"use client";
import { Reservation } from "@prisma/client";
import { SafeUser } from "@/app/@types/user";

import { format } from "date-fns";

import Image from "next/image";

import useCountries from "@/app/hooks/useCountries";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import HeartButton from "../HeartButton";
import Button from "../Button";
import { SafeListing } from "@/app/@types/listing";

type ListingCardProps = {
	/** Listing datat */
	data: SafeListing;
	/** Optional current signed in user as `<SafeUser | null>` */
	currentUser?: SafeUser | null;
	/** // TODO: */
	reservation?: Reservation;
	/** Disables the card if `true` */
	disabled?: boolean;
	/** Label for listing card action. */
	actionLabel?: string;
	/** Id for listing card action */
	actionId?: string;
	/**
	 * Handles on listing card action.
	 * @param id Action id
	 */
	onAction?: (id: string) => void;
};
const ListingCard: React.FC<ListingCardProps> = ({
	data,
	currentUser,
	reservation,
	disabled,
	actionLabel,
	actionId = "",
	onAction,
}) => {
	const router = useRouter();
	const { getByValue } = useCountries();

	/** Listing card location object */
	const location: IFormattedCountry | undefined = getByValue(
		data.locationValue
	);

	/** Handle cancel pressed */
	const handleCancel = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			event.stopPropagation();
			if (disabled) return;
			// Listing card is not disabled.
			onAction?.(actionId);
		},
		[onAction, actionId, disabled]
	);

	/**
	 * Listing price
	 * @depends [reservation, data.price]
	 */
	const price: number = useMemo(() => {
		if (reservation) {
			// If listing have a resevation:
			// use the reservation price
			return reservation.totalPrice;
		}
		return data.price;
	}, [reservation, data.price]);

	/**
	 * Optional reservation date
	 * @depends [reservation]
	 */
	const reservationDate: string | null = useMemo(() => {
		if (!reservation) {
			return null;
		}
		// Reservvatin `start` and `end` date
		const start = new Date(reservation.startDate);
		const end = new Date(reservation.endDate);
		// Return formatted `start - end` date
		return `${format(start, "PP")} - ${format(end, "PP")}`;
	}, [reservation]);

	return (
		<div
			onClick={() => router.push(`/listings/${data.id}`)}
			className="col-span-1 cursor-pointer group"
		>
			<div className="flex flex-col gap-2 w-full">
				{/* Listing image */}
				<div
					className="
                        aspect-square 
                        w-full 
                        relative
                        overflow-hidden
                        rounded-xl
                    "
				>
					<Image
						alt="Listing"
						src={data.imageSrc}
						fill
						className="
                            object-cover    
                            h-full 
                            w-full 
                            group 
                            hover:scale-110 
                            transition
                        "
					/>
					{/* Heart button */}
					<div className="absolute top-3 right-3">
						<HeartButton listingId={data.id} currentUser={currentUser} />
					</div>
				</div>

				{/* Listing region */}
				<div className="font-semibold text-lg">
					{location?.region}, {location?.label}
				</div>

				{/* Listing category */}
				<div className="font-light text-neutral-500">
					{reservationDate || data.category}
				</div>

				{/* Listing price */}
				<div className="flex flex-row items-center gap-1">
					<div className="font-semibold">$ {price}</div>
					{!reservation && <div className="font-light">per night</div>}
				</div>

				{/* Listing action */}
				{onAction && actionLabel && (
					<Button
						disabled={disabled}
						small
						label={actionLabel}
						onClick={handleCancel}
					/>
				)}
			</div>
		</div>
	);
};

export default ListingCard;
