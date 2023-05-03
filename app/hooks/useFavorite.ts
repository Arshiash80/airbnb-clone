import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import type { SafeUser } from "../@types/user";
import useLoginModal from "./useLoginModal";


interface IUseFavorite {
    /** Id of the liked listing */
    listingId: string
    /** Opttional currently logged in user */
    currentUser?: SafeUser | null
}

/**
 * @param listingId Id of the liked listing
 * @param currentUser Opttional currently logged in user
 * @returns `{ hasFavorited, toggleFavorite }`
 */
const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
    const router = useRouter()
    const loginModal = useLoginModal()

    /** Is user favoritted the listing. */
    const hasFavorited: boolean = useMemo(() => {
        const list = currentUser?.favoriteIds || []
        return list.includes(listingId)
    }, [listingId, currentUser])


    /**
     * Toggle favorite 
     * @param event React.MouseEvent<HTMLDivElement>
     */
    const toggleFavorite = useCallback(async (
        event: React.MouseEvent<HTMLDivElement>
    ) => {
        event.stopPropagation()
        if (!currentUser) {
            // User not logged in.
            // Open login modal.
            return loginModal.onOpen()
        }

        try {
            let request;

            if (hasFavorited) {
                // Already favoritted.
                // Unlike the listing.
                request = () => axios.delete(`/api/favorites/${listingId}`)
            } else {
                // Like the listing
                request = () => axios.post(`/api/favorites/${listingId}`)
            }

            await request()
            router.refresh()
            toast.success("Success")
        } catch (error) {
            toast.error("Something went wrong.")
            console.log("Error: ", error)
        }
    }, [currentUser, hasFavorited, listingId, loginModal, router])


    return { hasFavorited, toggleFavorite }
}


export default useFavorite