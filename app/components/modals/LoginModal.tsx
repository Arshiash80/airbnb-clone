"use client";
// import axios from "axios";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import { useState } from "react";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegiserModal";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Inputs/Input";
import Button from "../Button";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const LoginModal = () => {
	const router = useRouter();
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);
		signIn("credentials", {
			...data,
			redirect: false,
		}).then((callback) => {
			setIsLoading(false);
			if (callback?.ok) {
				toast.success("Logged in");
				router.refresh();
				loginModal.onClose();
			} else if (callback?.error) {
				toast.error(callback.error);
			}
		});
	};

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Heading title="Welcome back" subTitle="Login to your account!" />
			<Input
				id="email"
				label="Email"
				disabled={isLoading}
				register={register}
				errors={errors}
				type="email"
				required
			/>
			<Input
				id="password"
				label="Password"
				type="password"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
		</div>
	);

	const footerContent = (
		<div className="flex flex-col gap-4 mt-3">
			<hr />
			<Button
				outline
				label="Continue with Gooogle"
				icon={FcGoogle}
				onClick={() => signIn("google")}
			/>
			<Button
				outline
				label="Continue with GitHub"
				icon={AiFillGithub}
				onClick={() => signIn("github")}
			/>
			<div
				className="
					text-neutral-500 
					text-center 
					mt-4 
					font-light
				"
			>
				<div
					className="
						flex 
						flex-row 
						justify-center 
						items-center 
						gap-2
					"
				>
					<div>Don't have an account ?</div>
					<div
						onClick={() => {
							loginModal.onClose();
							registerModal.onOpen();
						}}
						className="
							text-neutral-800 
							cursor-pointer 
							hover:underline
						"
					>
						Register
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<Modal
			// Disable modal when something is loading
			disabled={isLoading}
			isOpen={loginModal.isOpen}
			title="Login"
			actionLabel="Continue"
			onClose={loginModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
};

export default LoginModal;
