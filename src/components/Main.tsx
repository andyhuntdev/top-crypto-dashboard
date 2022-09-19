import { Box, Grid, GridItem, Hide, Link, Text, useColorModeValue } from '@chakra-ui/react';

import CoinChart from './CoinChart';
import Timeframe from './Timeframe';
import CoinInfo from './CoinInfo';
import CoinSupply from './CoinSupply';
import CapitalizationCard from './CoinCap';
import CoinHeader from './CoinHeader';
import Strip from './Strip';

export default function Main() {
    return (
        <Box position="relative" minHeight="calc(100vh - 56px - 1.5rem)" paddingBottom={10}>
            <Hide above="lg">
                <Strip />
            </Hide>
            <Grid
                templateRows={{ base: 'none', xl: 'repeat(4, auto)' }}
                gap={5}
                templateColumns={{ base: 'none', xl: '350px 200px 1fr' }}
                overflow="hidden"
            >
                <GridItem gridColumn={{ xl: '1 / span 2' }}>
                    <CoinHeader />
                </GridItem>
                <GridItem gridColumn={{ xl: '1 / span 1' }}>
                    <CapitalizationCard />
                </GridItem>
                <GridItem gridColumn={{ xl: '1 / span 1' }}>
                    <CoinSupply />
                </GridItem>
                <GridItem gridColumn={{ xl: '1 / span 1' }}>
                    <CoinInfo />
                </GridItem>
                <GridItem gridColumn={{ xl: '3 / span 3' }} gridRow={{ xl: '1 / span 1' }}>
                    <Timeframe />
                </GridItem>
                <GridItem gridColumn={{ xl: '2 / span 3' }} gridRow={{ xl: '2 / span 3' }}>
                    <CoinChart />
                </GridItem>
            </Grid>
            <Box position="absolute" bottom={0} left={0} right={0} p={3} borderTop="1px" borderColor={useColorModeValue('gray.300', 'brand.700')}>
                <Text color="gray.500" textAlign="center" fontSize={12}>Designed and developed with love and passion by <Link href="https://andreacaccia.com" isExternal>@andyhuntdev</Link></Text>
            </Box>
        </Box>
    );
}
