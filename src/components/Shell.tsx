import React, { ReactNode } from 'react';
import {
    IconButton,
    Box,
    CloseButton,
    Flex,
    HStack,
    useColorModeValue,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps,
    Heading,
    Show,
    Button,
    Link,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import List from './List';
import Strip from './Strip';

export default function Shell({ children }: { children: ReactNode }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'brand.900')}>
            <SidebarContent onClose={() => onClose} display={{ base: 'none', lg: 'block' }} />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full"
            >
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav onOpen={onOpen} />
            <Box ml={{ base: 0, lg: 60 }} px="6" pt="6">
                {children}
            </Box>
        </Box>
    );
}

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    return (
        <Box
            bg={useColorModeValue('white', 'brand.800')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'brand.700')}
            w={{ base: 'full', lg: 60 }}
            pos="fixed"
            overflow="auto"
            paddingBottom="4"
            h="full"
            onClick={onClose}
            {...rest}
        >
            <Flex h="14" alignItems="center" justifyContent="space-between">
                <Heading fontSize="xl" fontWeight="bold" paddingX="2" color="brand.500" as="h1">
                    Top Crypto
                </Heading>
                <CloseButton display={{ base: 'flex', lg: 'none' }} onClick={onClose} />
            </Flex>
            <List onClose={onClose} />
        </Box>
    );
};

interface MobileProps extends FlexProps {
    onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
    return (
        <Flex
            ml={{ base: 0, lg: 60 }}
            px={{ base: 4, lg: 4 }}
            height="14"
            alignItems="center"
            bg={useColorModeValue('white', 'brand.800')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'brand.700')}
            justifyContent={{ base: 'space-between', lg: 'flex-end' }}
            {...rest}
        >
            <IconButton
                display={{ base: 'flex', lg: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text display={{ base: 'flex', lg: 'none' }} fontSize="xl" fontWeight="bold">
                Top Crypto
            </Text>

            <HStack
                spacing={{ base: '0', lg: '6' }}
                justifyContent="space-between"
                w={{ xl: '100%' }}
            >
                <Show above="lg">
                    <Flex alignItems={'center'}>
                        <Strip />
                    </Flex>
                </Show>
                <HStack>
                    <Link href="https://github.com/andyhuntdev/top-crypto-dashboard" target="_blank" isExternal _hover={{textDecoration: 'none'}}>
                        <Button>Github</Button>
                    </Link>
                    <ColorModeSwitcher />
                </HStack>
            </HStack>
        </Flex>
    );
};
