import {
    Box,
    Heading,
    TableContainer,
    useColorModeValue,
    Table,
    Tbody,
    Tr,
    Td,
    Progress,
    Skeleton,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { AppContext } from '../App';

export default function CoinSupply() {
    const bgBox = useColorModeValue('white', 'brand.800');
    const borderBox = useColorModeValue('gray.300', 'brand.700');

    const { selected } = useContext(AppContext);

    return Object.keys(selected).length ? (
        <Box
            borderWidth="1px"
            width="100%"
            p="5"
            overflow="hidden"
            bg={bgBox}
            borderColor={borderBox}
        >
            <Heading as="h6" size="xs" marginBottom="3" color="brand.500">
                Supply
            </Heading>
            <TableContainer>
                <Table variant="simple" size="sm" colorScheme="brand">
                    <Tbody>
                        <Tr>
                            <Td px={0}>Circulating</Td>
                            <Td px={0} isNumeric>
                                {selected?.circulating_supply ? selected.circulating_supply.toLocaleString() : '-'}
                            </Td>
                        </Tr>
                        <Tr>
                            <Td px={0}>Total</Td>
                            <Td px={0} isNumeric>
                                {selected?.total_supply ? selected.total_supply.toLocaleString() : '-'}
                            </Td>
                        </Tr>
                        <Tr>
                            <Td px={0} borderColor="transparent">
                                Max
                            </Td>
                            <Td px={0} borderColor="transparent" isNumeric>
                                {selected?.max_supply ? !!selected.max_supply ? selected.max_supply.toLocaleString() : 'infinity' : '-'}
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
            <Progress
                marginTop="3"
                colorScheme="brand"
                size="md"
                value={
                    !!selected.max_supply
                        ? (selected.circulating_supply / selected.max_supply) * 100
                        : 0
                }
            />
        </Box>
    ) : (
        <Skeleton h="200" />
    );
}
