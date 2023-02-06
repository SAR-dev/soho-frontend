import { ReactNode, useLayoutEffect } from 'react'
import { Paper, ScrollArea, createStyles, Text, SimpleGrid, Group, Divider } from '@mantine/core'
import DoubleNav from '../reusable/nav/DoubleNav'
import { HeaderMenu } from '../reusable/nav/HeaderMenu'
import { TopClaps } from '../reusable/stats/TopClaps'
import { Moderators } from '../reusable/stats/Moderators'
import useStore from 'src/store'
import { useNavigate } from 'react-router-dom'
import { AiOutlineBank, AiOutlineHome } from 'react-icons/ai'
import { FaRegUserCircle, FaStripe } from "react-icons/fa"
import { GoTriangleRight } from 'react-icons/go';
import { CgCommunity } from "react-icons/cg";
import {SiTampermonkey} from "react-icons/si";

const NavHeight = 50

const useStyles = createStyles((theme) => ({
    mainpaper: {
        height: "100vh",
        display: "flex",
        borderRadius: 0
    },
    subpaper: {
        height: "100vh",
        width: "100%"
    },
    mainBody: {
        height: `calc(100vh - ${NavHeight}px)`
    },
    wrapper: {
        display: "flex"
    },
    cards: {
        flexShrink: 0,
        paddingTop: 3,
        paddingRight: theme.spacing.sm,
        paddingLeft: theme.spacing.sm,
    },
    sticky: {
        position: 'sticky',
        top: 3
    },
    menuContainer: {
        width: "100%",
        borderRadius: theme.radius.lg,
        backgroundColor: theme.colors.dark,
        fontWeight: 600,
        fontSize: theme.fontSizes.lg,
        overflow: 'hidden',
        color: "#fff",
    },
    blueMenu: {
        backgroundColor: theme.colors.blue[7]
    },

    pinkMenu: {
        backgroundColor: theme.colors.pink[7]
    },
}));

export function SettingsLayout({ children }: { children: ReactNode }) {
    const { classes, cx } = useStyles();
    const { token } = useStore()
    const navigate = useNavigate();

    useLayoutEffect(() => {
        if (!token) {
            navigate("/")
        }
    }, [])

    return (
        <Paper className={classes.mainpaper}>
            <Paper className={classes.subpaper}>
                <HeaderMenu NavHeight={NavHeight} />
                <ScrollArea className={classes.mainBody}>
                    <div style={{ width: 400, backgroundColor: "#424242", height: "100vh" }}>
                        <Text color='dimmed' size="xl" weight={700} align='center' p={15} style={{ backgroundColor: "#000" }}>
                            DASHBOARD
                        </Text>
                        <SimpleGrid cols={1} p={5} mt="xl" spacing="xl">
                            <div className={classes.menuContainer}>
                                <Group p={10} align='center' className={classes.blueMenu}>
                                    <AiOutlineHome size={20} />
                                    <Text>General</Text>
                                </Group>
                                <Group p={10} align='center'>
                                    <FaRegUserCircle size={20} />
                                    <Text>Personal Profile</Text>
                                </Group>
                                <Divider color='#424242' />
                                <Group p={10} align='center'>
                                    <CgCommunity size={20} />
                                    <Text>Community Profile</Text>
                                    <GoTriangleRight style={{ marginLeft: "auto" }} size={20} />
                                </Group>
                            </div>

                            <div className={classes.menuContainer}>
                                <Group p={10} align='center' className={classes.pinkMenu}>
                                    <AiOutlineBank size={20} />
                                    <Text>Manage Account</Text>
                                </Group>
                                <Group p={10} align='center'>
                                    <SiTampermonkey size={20} />
                                    <Text>Subscriptions</Text>
                                </Group>
                                <Divider color='#424242' />
                                <Group p={10} align='center'>
                                    <FaStripe size={20} />
                                    <Text>Payment</Text>
                                </Group>
                            </div>
                        </SimpleGrid>
                    </div>
                </ScrollArea>
            </Paper>
        </Paper>
    )
}