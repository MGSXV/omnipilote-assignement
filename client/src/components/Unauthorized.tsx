import { Flex, Heading, Image, Link, Stack, Text } from "@chakra-ui/react"
import { cn } from "../lib/utils"
import unauthorized from "../assets/imgs/unauthorized.svg"

const Unauthorized = () => {
	return (
		<Flex
			flexDirection="column"
			width="100wh"
			flexGrow={1}
			height="100vh"
			justifyContent="center"
			className={cn("bg-background")}
			alignItems="center">
				<Stack
				flexDir="column"
				mb="2"
				justifyContent="center"
				alignItems="center">
					<Heading color={cn("text-primary")}
						size={"xl"} className={cn("text-primary", "font-base")}>
						You have been caught lackin
					</Heading>
					<Image src={unauthorized} w={500} />
					<Text color={cn("text-black")} className={cn("text-black", "font-base")}>
						You are not authorized to view this page
					</Text>
					<Text>
						<Link href="/login" className={cn("text-primary")} color={cn('text-primary')}>
							Login
						</Link>
						{" "}to view this page, or go back {" "}
						<Link href="/" className={cn("text-primary")} color={cn('text-primary')}>
							Home
						</Link>
					</Text>
					
				</Stack>
		</Flex>
	)
}

export default Unauthorized