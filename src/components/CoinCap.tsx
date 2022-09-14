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
import { useContext } from 'react';
import { AppContext } from '../App';

export default function CoinCap() {
    const { selected, globalData } = useContext(AppContext);
    const boxBg = useColorModeValue('white', 'brand.800');
    const borderBox = useColorModeValue('gray.300', 'brand.700');

    return Object.keys(selected).length ? (
        <Box borderWidth="1px" width="100%" p="5" overflow="hidden" bg={boxBg} borderColor={borderBox}>
            <Heading as="h6" size="xs" marginBottom="3" color="brand.500">
                Capitalization
            </Heading>
            <TableContainer>
                <Table variant="simple" size="sm" colorScheme="brand">
                    <Tbody>
                        <Tr>
                            <Td px={0}>Market cap</Td>
                            <Td px={0} isNumeric>
                                {dollarFormat(selected.market_cap)}
                            </Td>
                        </Tr>
                        <Tr>
                            <Td px={0}>Total percentage</Td>
                            <Td px={0} isNumeric>
                                {!!globalData?.total_market_cap?.usd &&
                                    (
                                        (selected?.market_cap / globalData?.total_market_cap?.usd) *
                                        100
                                    ).toFixed(2)}
                                %
                            </Td>
                        </Tr>
                        <Tr>
                            <Td px={0}>24 hour trading volume</Td>
                            <Td px={0} isNumeric>
                                {dollarFormat(selected.total_volume)}
                            </Td>
                        </Tr>
                        <Tr>
                            <Td px={0} borderColor="transparent">
                                Fully diluted valuation
                            </Td>
                            <Td px={0} borderColor="transparent" isNumeric>
                                {dollarFormat(selected.fully_diluted_valuation)}
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    ) : (
        <Skeleton h="200px" />
    );
}
