import { Button, Flex, Stack, Text, Skeleton, Grid } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import { AppContext } from '../App';

export default function Timeframe() {
    const timeframes = [
        { label: '1h', value: 1 / 24 },
        { label: '4h', value: 4 / 24 },
        { label: '12h', value: 12 / 24 },
        { label: '24h', value: 24 / 24 },
        { label: '7d', value: 7 },
        { label: '15d', value: 15 },
        { label: '30d', value: 30 },
        { label: '90d', value: 90 },
        { label: '180d', value: 180 },
        { label: '1y', value: 360 },
        { label: 'max', value: 'max' },
    ];

    const { timeframe, setTimeframe, selected } = useContext(AppContext);

    useEffect(() => {
        !timeframe && setTimeframe(1);
    }, []);

    return timeframe && Object.keys(selected).length ? (
        <Flex h="100%" alignItems="flex-end" justifyContent="flex-end">
            <Stack
                spacing={2}
                alignContent="center"
                direction={{ base: 'column', md: 'row' }}
                w={{base: '100%', md: "auto"}}
            >
                <Text>Timeframe</Text>
                <Grid
                    templateRows="auto"
                    templateColumns={{ base: 'repeat(3, 1fr)', md: 'repeat(11,1fr)' }}
                    gap="2"
                >
                    {timeframes.map((tf) => (
                        <Button
                            key={tf.label}
                            size="sm"
                            variant="outline"
                            bg={tf.value === timeframe ? 'brand.500' : 'transparent'}
                            borderColor="brand.500"
                            color={tf.value === timeframe ? 'white' : 'brand.500'}
                            pointerEvents={tf.value === timeframe ? 'none' : 'initial'}
                            _hover={{ bg: tf.value === timeframe ? 'brand.500' : 'transparent' }}
                            onClick={() => {
                                setTimeframe(tf.value);
                            }}
                        >
                            {tf.label}
                        </Button>
                    ))}
                </Grid>
            </Stack>
        </Flex>
    ) : (
        <Skeleton h="20px" w="300px" />
    );
}
