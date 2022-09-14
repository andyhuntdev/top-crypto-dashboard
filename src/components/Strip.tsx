import { Text, keyframes, usePrefersReducedMotion, Skeleton, HStack } from '@chakra-ui/react';
import { dollarFormat } from '../utils';
import { useContext } from 'react';
import { AppContext } from '../App';

export default function Strip() {
    const { globalData } = useContext(AppContext);

    const prefersReducedMotion = usePrefersReducedMotion();

    const slide = keyframes`
        from { transform: translateX(100%); }
        to { transform: translateX(-180%); }
    `;

    const animation = prefersReducedMotion ? undefined : `${slide} infinite 15s linear`;

    let parsedData = () => {
        let parsedArray: { name: string; value: number }[] = [];
        for (const [key, value] of Object.entries(globalData.market_cap_percentage)) {
            parsedArray.push({ name: key, value: value as number });
        }
        return parsedArray;
    };

    return Object.keys(globalData).length ? (
        <HStack mb={{ base: '3', lg: 0 }} animation={{base:animation, lg: 'none'}}>
            <Text marginRight="3" fontSize={{ base: '11px', xl: '14px' }}>
                Total Market Cap: <strong>{dollarFormat(globalData?.total_market_cap?.usd)}</strong>
            </Text>
            {parsedData().map((el, i) => (
                <Text
                    key={el.name}
                    marginRight="3"
                    fontSize={{ base: '11px', xl: '14px' }}
                    color="gray.500"
                >
                    {el.name}: {el.value.toFixed(2)}%
                </Text>
            ))}
        </HStack>
    ) : (
        <Skeleton h="20px" w="500px" />
    );
}
