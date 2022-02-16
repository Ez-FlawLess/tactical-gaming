import { FC, useEffect, useState } from "react";
import { 
    AppBar, 
    Box, 
    Button, 
    Container, 
    Toolbar, 
    Typography,
    IconButton,
    Menu,
    MenuItem,
} from "@mui/material";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { AccountCircle } from "@mui/icons-material";
import authThunks from "../../../features/auth/autrhThunks";

const Header: FC = () => {

    const dispatch = useAppDispatch()

    const {
        auth,
    } = useAppSelector(state => ({
        auth: state.auth,
    }))

    const [anchorEl, setAnchorEl] = useState<any>(null)

    const handleMenu = (event: any) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{mr: 2, display: { xs: 'none', md: 'flex'}}}
                    >
                        <Link href="/">
                            LOGO
                        </Link>
                    </Typography>
                    {/* <Box sx={{ flexGrow: 1, display: { sx: 'flex', }}}>

                    </Box> */}
                    <Box sx={{ flexGrow: 1, display: { sx: 'flex', md: 'flex'}}}>
                        <Link href="/test" passHref>
                            <Button
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Testing
                            </Button>
                        </Link>
                    </Box>
                    {
                        auth.user
                        ? (
                            <div>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose}>
                                        <Link href="/panel">
                                            Panel
                                        </Link>
                                    </MenuItem>
                                    <MenuItem 
                                        onClick={() => {
                                            dispatch(authThunks.signOut())
                                            handleClose()
                                        }}
                                    >
                                        Log Out
                                    </MenuItem>
                                </Menu>
                            </div>
                        )
                        : (
                            <>
                                <Link href="/auth/login" passHref>
                                    <Button color="inherit">Login</Button>
                                </Link>
                                <Link href="/auth/register" passHref>
                                    <Button color="inherit">sign up</Button>
                                </Link>
                            </>
                        )
                    }
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header
