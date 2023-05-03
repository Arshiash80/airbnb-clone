"use client";

import type { ICategory } from "@/app/@types/category";
import type { SafeUser } from "@/app/@types/user";
import type { ISafeListingWithSafeUser } from "@/app/@types/listing";

import { categories } from "@/app/components/navbar/Categories";

import { Reservation } from "@prisma/client";
import { useMemo } from "react";

import Container from "@/app/components/Container";
import ListingHead from "../../components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";

type ListingClientProps = {
	/** Listing object with owner as `SafeUser` */
	listing: ISafeListingWithSafeUser;
	/** //TODO: Reservations list */
	reservations?: Reservation[];
	/** Optional currently logged in user as `SafeUser` */
	currentUser?: SafeUser | null;
};

const ListingClient: React.FC<ListingClientProps> = ({
	listing,
	currentUser,
}: ListingClientProps) => {
	// Find selected category from categories listt as `ICategory`.
	const category: ICategory | undefined = useMemo(() => {
		return categories.find((item) => item.label === listing.category);
	}, [listing.category, categories]);

	return (
		<Container>
			<div className="max-w-screen-lg mx-auto">
				<div className="flex flex-col gap-6">
					<ListingHead
						title={listing.title}
						imageSrc={listing.imageSrc}
						locationValue={listing.locationValue}
						id={listing.id}
						currentUser={currentUser}
					/>
					<div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6 mb-10">
						<ListingInfo
							user={listing.user}
							category={category}
							description={listing.description}
							roomCount={listing.roomCount}
							guestCount={listing.guestCount}
							bathroomCount={listing.bathroomCount}
							locationValue={listing.locationValue}
						/>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default ListingClient;
