import {
	Flex, Heading, Stack, Table, Thead, Tbody, Tr, Th, Td, IconButton, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button
} from "@chakra-ui/react";
import { cn } from "../../lib/utils";
import { useState } from "react";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { useDisclosure } from "@chakra-ui/react";
const DashboardTable = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [products, setProducts] = useState([
		{ id: 1, name: "Apple" },
		{ id: 2, name: "Banana" },
		{ id: 3, name: "Carrot" },
		{ id: 4, name: "Detergent" },
		{ id: 5, name: "Eggs" },
		{ id: 6, name: "Flour" },
		{ id: 7, name: "Grapes" },
		{ id: 8, name: "Honey" },
		{ id: 9, name: "Ice Cream" },
		{ id: 10, name: "Juice" },
	]);

	const { isOpen, onOpen, onClose } = useDisclosure();
	const [productIdToDelete, setProductIdToDelete] = useState<number | null>(null);
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [editProduct, setEditProduct] = useState<{ id: number, name: string } | null>(null);
	const [newProductName, setNewProductName] = useState("");

	const handleDelete = (id: number) => {
		setProducts(products.filter(product => product.id !== id));
		onClose();
	};

	const confirmDelete = (id: number) => {
		setProductIdToDelete(id);
		onOpen();
	};

	const handleEdit = (id: number) => {
		const product = products.find(product => product.id === id);
		if (product) {
			setEditProduct(product);
			setIsEditOpen(true);
		}
	};

	const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (editProduct) {
			setEditProduct({ ...editProduct, name: e.target.value });
		}
	};

	const saveEdit = () => {
		if (editProduct) {
			setProducts(products.map(product => 
				product.id === editProduct.id ? editProduct : product
			));
			setIsEditOpen(false);
			setEditProduct(null);
		}
	};

	const handleAddProduct = () => {
		const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
		const newProduct = { id: newId, name: newProductName };
		setProducts([...products, newProduct]);
		setNewProductName("");
	};

	const filteredProducts = products.filter(product =>
		product.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<>
			<div className="w-full flex flex-row gap-x-4">
				<input type="text" placeholder="Add new product"
					className={`px-2 py-1 border-b border-black mb-2 tex-xl bg-transparent
						focus:outline-none focus:border-primary`}
					value={newProductName} onChange={(e) => setNewProductName(e.target.value)} />
				<Button onClick={handleAddProduct} bg={cn("bg-primary", "hover:bg-primary-dark")}
					_hover={cn("bg-primary-dark")}
					textColor={cn("text-white")}
					rounded={"md"}
					className={cn(
						"bg-primary",
						"hover:bg-primary-dark",
						"text-white",
						"rounded-md"
				)} >Add Product</Button>
			</div>
			<input type="text" placeholder="Search products"
				className={`px-2 py-1 border-b border-black mb-2 tex-xl bg-transparent
					focus:outline-none focus:border-primary`}
				value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
			<Table variant="normal">
				<Thead>
					<Tr>
						<Th>ID</Th>
						<Th>Product</Th>
						<Th>Actions</Th>
					</Tr>
				</Thead>
				<Tbody>
					{filteredProducts.map(product => (
						<Tr key={product.id}
							className="hover:bg-primary-light"
						>
							<Td>{product.id}</Td>
							<Td w={'80%'}>{product.name}</Td>
							<Td>
								<IconButton
									aria-label="Edit"
									icon={<MdOutlineEdit />}
									mr={2}
									bg={'transparent'}
									_hover={{bg: "transparent"}}
									className="text-success"
									color={cn("text-success")}
									onClick={() => handleEdit(product.id)}
								/>
								<IconButton
									aria-label="Delete"
									icon={<MdDeleteOutline />}
									bg={'transparent'}
									_hover={{bg: "transparent"}}
									className="text-danger"
									color={cn("text-danger")}
									onClick={() => confirmDelete(product.id)}
								/>
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Confirm Delete</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						Are you sure you want to delete this product?
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="red" onClick={() => handleDelete(productIdToDelete!)}>Delete</Button>
						<Button variant="ghost" onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			<Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Edit Product</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<input type="text"
							className={`px-2 py-1 border-b border-black mb-2 tex-xl bg-transparent
								focus:outline-none focus:border-primary w-full`}
								value={editProduct?.name || ""} onChange={handleEditChange} />
					</ModalBody>
					<ModalFooter>
						<Button 
							bg={cn("bg-primary", "hover:bg-primary-dark")}
							_hover={cn("bg-primary-dark")}
							textColor={cn("text-white")}
							rounded={"md"}
							className={cn(
								"bg-primary",
								"hover:bg-primary-dark",
								"text-white",
								"rounded-md"
							)} onClick={saveEdit}>Save</Button>
						<Button variant="ghost" onClick={() => setIsEditOpen(false)}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

const Dashboard = () => {
	return (
		<Flex
			flexDirection="column"
			width="100wh"
			height="100vh"
			justifyContent="start"
			alignItems="start"
			p={50}
			className={cn("bg-background")}>
			<div className="w-full border-b border-b-primary mb-10">
				<Heading color={cn("text-primary")} 
					className={cn("text-primary", "font-base")}>
					Dashboard
				</Heading>
			</div>
			<Stack spacing='4' w={'100%'}>
				<DashboardTable />
			</Stack>
		</Flex>
	);
}

export default Dashboard;