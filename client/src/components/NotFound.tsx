import { Flex, Heading, Image, Link, Stack, Text } from "@chakra-ui/react"
import { cn } from "../lib/utils"
import notfound from "../assets/imgs/404.png"

const NotFound = () => {
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
						You are lost
					</Heading>
					<Image src={notfound} w={500} />
					<Text>
						Take me back {" "}
						<Link href="/" className={cn("text-primary")} color={cn('text-primary')}>
							Home
						</Link>
					</Text>
					
				</Stack>
		</Flex>
	)
}

export default NotFound