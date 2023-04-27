"use client";

import { IconType } from "react-icons";

type ButtonProps = {
	/** Button label */
	label: string;
	/** Disables buttomn if `true` */
	disabled?: boolean;
	/** Outline version of button */
	outline?: boolean;
	/** Small version of button */
	small?: boolean;
	/** Optional Icon for button */
	icon?: IconType;
	/**
	 * On click action for button
	 * @param e: Mouse event. `<React.MouseEvent<HTMLButtonElement>>`
	 */
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button: React.FC<ButtonProps> = ({
	label,
	disabled,
	outline,
	small,
	icon: Icon,
	onClick,
}) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`
            relative
            disabled:opacity-70
            disabled:cursor-not-allowed
            rounded-lg
            hover:opacity-80
            transition
            w-full
            ${outline ? "bg-white" : "bg-rose-500"}
            ${outline ? "border-black" : "border-rose-500"}
            ${outline ? "text-black" : "text-white"}
            ${small ? "py-1" : "py-3"}
            ${small ? "text-sm" : "text-md"}
            ${small ? "font-light" : "font-semibold"}
            ${small ? "border-[1px]" : "border-2"}
        `}
		>
			{Icon && (
				<Icon
					size={24}
					className="
                        absolute
                        left-4
                        top-3
                    "
				/>
			)}
			{label}
		</button>
	);
};

export default Button;
