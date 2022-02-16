import { AppBar, Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Theme, Toolbar, Typography } from "@mui/material";
import { FC, useState } from "react";
import { ChevronLeft, Inbox, Mail, Menu as MenuIcon } from "@mui/icons-material";
import Link from "next/link";
import { useAppSelector } from "../../../store/hook";
import { PANEL_MENU_ITEMS_ADMIN } from "../../../utils/constants/panelMenuItems";

const drawerWidth = 240

const openedMixin = (theme: Theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  });
  
  const closedMixin = (theme: Theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
  });

const PanelLayout: FC = ({children}) => {

    const { auth } = useAppSelector(state => ({
        auth: state.auth,
    }))

    const [open, setOpen] = useState<boolean>(false)

    const handleDrawerOpen = () => setOpen(true)
    
      const handleDrawerClose = () => setOpen(false)
    
    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline />
            <AppBar 
                position="fixed"
                sx={theme => ({
                        zIndex: theme.zIndex.drawer + 1,
                        transition: theme.transitions.create(['width', 'margin'], {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.leavingScreen,
                        }),
                        ...(open && {
                            marginLeft: drawerWidth,
                            width: `calc(100% - ${drawerWidth}px)`,
                            transition: theme.transitions.create(['width', 'margin'], {
                                easing: theme.transitions.easing.sharp,
                                duration: theme.transitions.duration.enteringScreen,
                            }),
                        })
                    })
                }
            >
                <Toolbar sx={theme => theme.mixins.toolbar}>
                    <IconButton
                        color="inherit"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: '36px',
                            ...(open && {display: 'none'}),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        <Link href="/">
                            LOGO
                        </Link>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer 
                variant="permanent" 
                open={open}
                sx={theme => ({
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                    boxSizing: 'border-box',
                    ...(open 
                            ? {
                                ...openedMixin(theme),
                                '& .MuiDrawer-paper': openedMixin(theme),
                            }
                            : {
                                ...closedMixin(theme),
                                '& .MuiDrawer-paper': closedMixin(theme),
                            }
                    )
                })}

            >
                <Box
                    component="div"
                    sx={theme => ({
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        padding: theme.spacing(0, 1),
                        ...theme.mixins.toolbar,
                    })}
                >
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeft />
                    </IconButton>
                </Box>
                <Divider />
                <List>
                    {PANEL_MENU_ITEMS_ADMIN.map(item => (
                        <Link key={item.link} href={'/panel/' + item.link} passHref>
                            <ListItem button >
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        </Link>

                    ))}
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <Inbox /> : <Mail />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <Inbox /> : <Mail />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{flexGrow: 1, p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh'}}>
                <Box
                    component="div"
                    sx={theme => ({
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        padding: theme.spacing(0, 1),
                        ...theme.mixins.toolbar,
                    })}
                >
                </Box>
                {children}
            </Box>
        </Box>
    )
}

export default PanelLayout