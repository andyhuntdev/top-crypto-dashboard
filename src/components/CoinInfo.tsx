import {
    Box,
    Heading,
    TableContainer,
    useColorModeValue,
    Table,
    Tbody,
    Tr,
    Td,
    Skeleton,
} from '@chakra-ui/react';
import { dollarFormat } from '../utils';
import { AppContext } from '../App';
import { useContext } from 'react';

export default function InfoCard() {
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
                Info
            </Heading>
            <TableContainer>
                <Table variant="simple" size="sm" colorScheme="brand">
                    <Tbody>
                        <Tr>
                            <Td px={0}>Ath</Td>
                            <Td px={0} isNumeric>
                                {dollarFormat(selected.ath)}
                            </Td>
                        </Tr>
                        <Tr>
                            <Td px={0}>Ath date</Td>
                            <Td px={0} isNumeric>
                                {new Date(selected.ath_date).toLocaleDateString('en-us')}
                            </Td>
                        </Tr>
                        <Tr>
                            <Td px={0}>Ath change</Td>
                            <Td
                                px={0}
                                isNumeric
                                color={selected.ath_change_percentage > 0 ? 'teal.500' : 'red.400'}
                            >
                                {selected.ath_change_percentage.toFixed(2)}%
                            </Td>
                        </Tr>
                        <Tr>
                            <Td px={0}>Atl</Td>
                            <Td px={0} isNumeric>
                                {selected.atl}
                            </Td>
                        </Tr>
                        <Tr>
                            <Td px={0}>Atl date</Td>
                            <Td px={0} isNumeric>
                                {new Date(selected.atl_date).toLocaleDateString('en-us')}
                            </Td>
                        </Tr>
                        <Tr>
                            <Td px={0} borderColor="transparent">
                                Atl change
                            </Td>
                            <Td
                                px={0}
                                borderColor="transparent"
                                isNumeric
                                color={selected.atl_change_percentage > 0 ? 'teal.500' : 'red.400'}
                            >
                                {selected.atl_change_percentage.toFixed(2)}%
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    ) : (
        <Skeleton h="250" />
    );
}
