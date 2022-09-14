import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';
import {
    Avatar,
    useColorModeValue,
    Text,
    Stat,
    StatHelpText,
    StatArrow,
    StatNumber,
    Flex,
    Skeleton,
    InputGroup,
    InputLeftElement,
    Input,
    Stack,
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

function ListItem({ image, symbol, current_price, price_change_percentage_24h }: any) {
    const { selected, setSelected, marketData } = useContext(AppContext);

    const parsedPrice = (price: number) => {
        const splitted = price.toString().split('.');
        if (splitted.length > 1) {
            if (splitted[1].length > 5) {
                return price.toFixed(5);
            }
        }
        return price;
    };
    return (
        <Flex
            align="center"
            borderBottom="1px"
            borderColor={useColorModeValue('gray.200', 'brand.700')}
            px="2"
            py="2"
            role="group"
            cursor="pointer"
            bg={selected.symbol === symbol ? 'brand.500' : 'inherit'}
            color={selected.symbol === symbol ? 'white' : 'inherit'}
            pointerEvents={selected.symbol === symbol ? 'none' : 'inherit'}
            _hover={{
                bg: useColorModeValue(
                    selected.symbol === symbol ? 'brand.500' : 'gray.100',
                    selected.symbol === symbol ? 'brand.500' : 'brand.700'
                ),
            }}
            onClick={() =>
                setSelected(marketData.filter((el: { symbol: string }) => el.symbol === symbol)[0])
            }
        >
            <Avatar size="xs" src={image} marginRight="2" />
            <Text width="60px">{symbol.toUpperCase()}</Text>
            <Stat>
                <StatNumber fontSize="12">${parsedPrice(current_price)}</StatNumber>
            </Stat>
            <Stat>
                <StatHelpText fontSize="12" marginBottom={0}>
                    <StatArrow
                        color={price_change_percentage_24h > 0 ? 'teal.400' : 'red.500'}
                        type={price_change_percentage_24h > 0 ? 'increase' : 'decrease'}
                    />
                    {price_change_percentage_24h.toFixed(2)}%
                </StatHelpText>
            </Stat>
        </Flex>
    );
}

interface ListProps {
    onClose: () => void;
}

export default function List({ onClose }: ListProps) {
    const { marketData } = useContext(AppContext);

    const [marketList, setMarketList] = useState([]);

    useEffect(() => {
        setMarketList(marketData);
    }, [marketData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value;
        setMarketList(
            marketData.filter((el: { symbol: string }) => el.symbol.indexOf(inputValue) > -1)
        );
    };

    return marketData.length ? (
        <>
            <InputGroup>
                <InputLeftElement pointerEvents="none" children={<FaSearch color="gray.300" />} />
                <Input
                    placeholder="Symbol"
                    borderRadius={0}
                    onChange={handleChange}
                    textTransform="uppercase"
                />
            </InputGroup>
            {marketList.map((item: any, i: number) => (
                <ListItem key={i} onClick={() => onClose} {...item}  />
            ))}
        </>
    ) : (
        <Stack padding={2}>
            {[...Array(100)].map((el, i) => (
                <Skeleton height="30px" key={i} />
            ))}
        </Stack>
    );
}
