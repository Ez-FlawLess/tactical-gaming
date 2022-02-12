import { FC } from 'react'
import { 
    Box, 
    Container, 
    Paper
} from '@mui/material'

import Header from './header/Header'

const Layout: FC = ({
    children,
}) => {
    return (
        <Box>
            <Header />
            <Container
                sx={{mt: 4, minHeight: 100}}
            >
                {children}
            </Container>
            
        </Box>
    )

}

export default Layout