import {
    Box,
    Flex,
    Avatar,
    Heading,
    Text,
    Skeleton,
} from '@chakra-ui/react';
import { dollarFormat } from '../utils';
import { useContext } from 'react';
import { AppContext } from '../App';

export default function Header() {
    const { selected } = useContext(AppContext);

    return Object.keys(selected).length ? (
        <Box>
            <Flex alignItems="flex-end">
                <Avatar src={selected.image} marginRight="3" />
                <Heading as="h1" size="2xl" marginRight="3">
                    {selected.name}
                </Heading>
                <Text fontSize={20}>
                    {selected.symbol} #{selected.market_cap_rank}
                </Text>
            </Flex>
            <Flex alignItems="baseline" gap={3} marginTop="2">
                <Text fontSize={24} fontWeight="bold">
                    {dollarFormat(selected.current_price)}
                </Text>
                <Text
                    fontSize={24}
                    fontWeight="bold"
                    color={selected.price_change_percentage_24h > 0 ? 'teal.400' : 'red.500'}
                >
                    {selected.price_change_percentage_24h.toFixed(2)}%
                </Text>
                <Text fontSize="12">in last 24h</Text>
            </Flex>
        </Box>
    ) : (
        <Skeleton h="90px" />
    );
}
