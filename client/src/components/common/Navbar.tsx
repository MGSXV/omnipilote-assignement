import { Box, Flex, Text, IconButton, Button, Stack, Collapse, Icon, Popover, PopoverTrigger, PopoverContent, useColorModeValue, useBreakpointValue, useDisclosure, Link, Image } from '@chakra-ui/react'
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import { IoIosMenu } from "react-icons/io";
import logo from "../../assets/logo.svg"
import { cn } from '../../lib/utils';

export default function WithSubnavigation() {
	const { isOpen, onToggle } = useDisclosure()

	return (
		<Box>
			<Flex
				bg={useColorModeValue('white', 'gray.800')}
				color={useColorModeValue('gray.600', 'white')}
				minH={'60px'}
				py={{ base: 2 }}
				px={{ base: 4 }}
				borderBottom={1}
				borderStyle={'solid'}
				borderColor={useColorModeValue('gray.200', 'gray.900')}
				align={'center'}>
				<Flex
					flex={{ base: 1, md: 'auto' }}
					ml={{ base: -2 }}
					display={{ base: 'flex', md: 'none' }}>
					<IconButton
						onClick={onToggle}
						icon={isOpen ? <IoCloseOutline width={3} height={3} /> : <IoIosMenu width={5} height={5} />}
						variant={'ghost'}
						aria-label={'Toggle Navigation'}
					/>
				</Flex>
				<Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
					<Link href='/'>
						<Image src={logo} h={50} />
					</Link>
					<Flex display={{ base: 'none', md: 'flex' }} ml={10}>
						<DesktopNav />
					</Flex>
				</Flex>

				<Stack
					flex={{ base: 1, md: 0 }}
					justify={'flex-end'}
					direction={'row'}
					spacing={6}>
					<Button className='text-black' color={cn('text-black')} _hover={cn('text-gray-700')} as={'a'} fontSize={'sm'} fontWeight={400} variant={'link'} href={'/login'}>
						Sign In
					</Button>
					<Button
						as={'a'}
						display={{ base: 'none', md: 'inline-flex' }}
						fontSize={'sm'}
						fontWeight={600}
						color={'white'}
						bg={cn("bg-primary")}
						className='bg-primary hover:bg-primary-dark'
						href={'#'}
						_hover={{
							bg: cn("bg-primary-dark"),
						}}>
						Sign Up
					</Button>
				</Stack>
			</Flex>

			<Collapse in={isOpen} animateOpacity>
				<MobileNav />
			</Collapse>
		</Box>
	)
}

const DesktopNav = () => {
	const linkColor = useColorModeValue(cn('text-black'), cn('text-gray-800'))
	const linkHoverColor = useColorModeValue(cn('text-gray-800'), 'white')
	const popoverContentBgColor = useColorModeValue('white', 'gray.800')

	return (
		<Stack direction={'row'} spacing={4} align={'center'}>
			{NAV_ITEMS.map((navItem) => (
				<Box key={navItem.label}>
					<Popover trigger={'hover'} placement={'bottom-start'}>
						<PopoverTrigger>
							<Box
								as="a"
								p={2}
								href={navItem.href ?? '#'}
								fontSize={'sm'}
								fontWeight={500}
								color={linkColor}
								className='text-black hover:text-gray-800'
								_hover={{
									textDecoration: 'none',
									color: linkHoverColor,
								}}>
								{navItem.label}
							</Box>
						</PopoverTrigger>

						{navItem.children && (
							<PopoverContent
								border={0}
								boxShadow={'xl'}
								bg={popoverContentBgColor}
								p={4}
								rounded={'xl'}
								minW={'sm'}>
								<Stack>
									{navItem.children.map((child) => (
										<DesktopSubNav key={child.label} {...child} />
									))}
								</Stack>
							</PopoverContent>
						)}
					</Popover>
				</Box>
			))}
		</Stack>
	)
}

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
	return (
		<Box
			as="a"
			href={href}
			role={'group'}
			display={'block'}
			p={2}
			rounded={'md'}
			className='hover:bg-primary-light'
			_hover={{ bg: useColorModeValue(cn('bg-primary-light'), 'gray.900') }}>
			<Stack direction={'row'} align={'center'}>
				<Box>
					<Text
						className='hover:text-primary'
						transition={'all .3s ease'}
						_groupHover={{ color: cn('text-primary') }}
						fontWeight={500}>
						{label}
					</Text>
					<Text fontSize={'sm'}>{subLabel}</Text>
				</Box>
				<Flex
					transition={'all .3s ease'}
					transform={'translateX(-10px)'}
					opacity={0}
					_groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
					justify={'flex-end'}
					align={'center'}
					flex={1}>
					<Icon color={cn('text-primary')} className='text-primary' w={5} h={5} as={MdOutlineKeyboardArrowRight} />
				</Flex>
			</Stack>
		</Box>
	)
}

const MobileNav = () => {
	return (
		<Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
			{NAV_ITEMS.map((navItem) => (
				<MobileNavItem key={navItem.label} {...navItem} />
			))}
		</Stack>
	)
}

const MobileNavItem = ({ label, children, href }: NavItem) => {
	const { isOpen, onToggle } = useDisclosure()

	return (
		<Stack spacing={4} onClick={children && onToggle}>
			<Box
				py={2}
				as="a"
				href={href ?? '#'}
				display={'flex'}
				justifyContent="space-between"
				alignItems="center"
				flexDirection={'row'}
				_hover={{
					textDecoration: 'none',
				}}>
				<Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')} w={'auto'} maxWidth="max-content"
					className={cn('w-auto', 'flex-nowrap')}>
					{label}
				</Text>
				{children && (
					<Icon
						as={MdKeyboardArrowDown}
						transition={'all .25s ease-in-out'}
						transform={isOpen ? 'rotate(180deg)' : ''}
						w={6}
						h={6}
					/>
				)}
			</Box>

			<Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
				<Stack
					mt={2}
					pl={4}
					borderLeft={1}
					borderStyle={'solid'}
					borderColor={useColorModeValue('gray.200', 'gray.700')}
					align={'start'}>
					{children &&
						children.map((child) => (
							<Box as="a" key={child.label} py={2} href={child.href}>
								{child.label}
							</Box>
						))}
				</Stack>
			</Collapse>
		</Stack>
	)
}

interface NavItem {
	label: string
	subLabel?: string
	children?: Array<NavItem>
	href?: string
}

const NAV_ITEMS: Array<NavItem> = [
	{
		label: 'Cool page',
		children: [
			{
				label: 'Explore the cool page',
				subLabel: 'Cool page that contains cool stuff',
				href: '#',
			},
			{
				label: 'Or explore this cool page',
				subLabel: 'Another cool page with cool stuff',
				href: '#',
			},
		],
	},
	{
		label: 'Even cooler',
		children: [
			{
				label: 'Cool choice',
				subLabel: 'Find how to build cool pages',
				href: '#',
			},
			{
				label: 'Slighly cooler choice',
				subLabel: 'An exclusive list cool stuff',
				href: '#',
			},
		],
	},
	{
		label: 'Normal page',
		href: '#',
	},
	{
		label: 'Last one',
		href: '#',
	},
]