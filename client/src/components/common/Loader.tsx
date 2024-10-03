import { Spinner } from '@chakra-ui/react'
import { cn } from '../../lib/utils';

const Loader = () => {

	return (
		<div className='w-full h-full flex items-center justify-center'>
			<Spinner size='xl' color={cn('text-primary')} className='text-primary' />
		</div>
	)
}

export default Loader;