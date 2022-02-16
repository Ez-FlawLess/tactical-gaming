import { Box, CircularProgress } from "@mui/material";
import { FC } from "react";
import { useAppSelector } from "../../store/hook";

const GlobalLoading: FC = () => {

    const {
        network
    } = useAppSelector(state => ({
        network: state.network,
    }))

    if (network.loading) return (
        <Box 
            sx={{
                position: "fixed",
                zIndex: 9999,
                height: '100vh',
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme => theme.palette.grey[400] + '70',
            }}
        >
            <CircularProgress size={50} />
        </Box>
    )
    
    return null
}

export default GlobalLoading