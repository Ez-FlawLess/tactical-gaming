import { Card, CardContent, Grid, Typography } from "@mui/material";
import { GetStaticProps, NextPage } from "next";
import { ReactElement, useEffect } from "react";
import PanelLayout from "../../components/panel/panelLayout/PanelLayout";
import { useAppSelector } from "../../store/hook";

const Users = () => {

    const { users } = useAppSelector(state => ({
        users: state.users,
    }))

    useEffect(() => {
        
    }, [])

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Card sx={{width: '100%'}}>
                    <CardContent>
                        <Typography
                            sx={{color: theme => theme.palette.primary.main, marginBottom: '1rem'}}
                            variant="h5"
                            component="div"
                        >
                            Total Users
                        </Typography>
                        <Typography
                            variant="h3"
                            component="div"
                        >
                            2432343
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6}>

            </Grid>
            <Grid item xs={12}>
                <Card>
                    <CardContent>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

Users.getLayout = function getLayout(page: ReactElement) {
    return (
        <PanelLayout>
            {page}
        </PanelLayout>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    return {
      props: {
        protected: true,
      },
    }
}

export default Users