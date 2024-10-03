import { MouseEvent, useEffect, useState } from "react";
import {
	Flex,
	Heading,
	Input,
	Button,
	InputGroup,
	Stack,
	InputLeftElement,
	chakra,
	Box,
	Link,
	FormControl,
	FormHelperText,
	InputRightElement,
	Image,
	Avatar,
	useToast,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import logo from "../../assets/logo.svg";
import { cn } from "../../lib/utils";
import { API_URL } from "../../conf/globals";
import Loader from "../common/Loader";
import authentication_handler from "../../lib/authentication_handler";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const App = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [loginError, setLoginError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const toast = useToast();

	const handleShowClick = () => setShowPassword(!showPassword);

	const auth_handler = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setLoading(true);
		setLoginError(null);
		setSuccess(false);

		const username = (document.getElementById("username") as HTMLInputElement)
			.value;
		const password = (document.getElementById("password") as HTMLInputElement)
			.value;

		try {
			const response = await fetch(`${API_URL}/data/auth.json`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, password }),
			});

			if (!response.ok) {
				throw new Error("Login failed");
			}
			const result = await response.json();
			setSuccess(true);
			console.log(result);
			const is_valid = authentication_handler(username, password, result);
			if (!is_valid) {
				throw new Error("Invalid credentials");
			}
			window.location.href = "/dashboard";
		} catch (err: any) {
			setLoginError(err.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (loginError) {
			toast({
				title: `Authentication failed`,
				status: "error",
				isClosable: true,
			});
		}
	}, [loginError]);

	return (
		<Flex
			flexDirection="column"
			width="100wh"
			height="100vh"
			justifyContent="center"
			className={cn("bg-background")}
			alignItems="center"
		>
			<Stack
				flexDir="column"
				mb="2"
				justifyContent="center"
				alignItems="center"
			>
				<Image src={logo} />
				<Heading
					color={cn("text-primary")}
					size={"md"}
					className={cn("text-primary", "font-base")}
				>
					Welcome
				</Heading>
				<Box minW={{ base: "90%", md: "468px" }}>
					<Stack
						className={cn("rounded-md")}
						alignItems="center"
						spacing={4}
						justifyContent={"center"}
						p="1rem"
						backgroundColor="whiteAlpha.900"
						boxShadow="md"
						h={300}
					>
						{loading ? (
							<Loader />
						) : (
							<>
								<Avatar className={cn("bg-primary")} bg="bg-primary" />
								<FormControl>
									<InputGroup>
										<InputLeftElement
											pointerEvents="none"
											children={<CFaUserAlt color="gray.300" />}
										/>
										<Input type="text" id="username" placeholder="username" />
									</InputGroup>
								</FormControl>
								<FormControl>
									<InputGroup>
										<InputLeftElement
											id="username"
											pointerEvents="none"
											color="gray.300"
											children={<CFaLock color="gray.300" />}
										/>
										<Input
											id="password"
											type={showPassword ? "text" : "password"}
											placeholder="Password"
										/>
										<InputRightElement width="4.5rem">
											<span
												onClick={handleShowClick}
												className="cursor-pointer"
											>
												{!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
											</span>
										</InputRightElement>
									</InputGroup>
									<FormHelperText textAlign="right">
										<Link>forgot password?</Link>
									</FormHelperText>
								</FormControl>
								<Button
									borderRadius={0}
									type="submit"
									variant="solid"
									bg={cn("bg-primary", "hover:bg-primary-dark")}
									_hover={cn("bg-primary-dark")}
									textColor={cn("text-white")}
									rounded={"md"}
									className={cn(
										"bg-primary",
										"hover:bg-primary-dark",
										"text-white",
										"rounded-md"
									)}
									width="full"
									onClick={auth_handler}
								>
									Login
								</Button>
							</>
						)}
					</Stack>
				</Box>
			</Stack>
			<Box>
				New to us?{" "}
				<Link
					color={cn("text-primary")}
					className={cn("text-primary")}
					href="#"
				>
					Sign Up
				</Link>
			</Box>
		</Flex>
	);
};

export default App;
