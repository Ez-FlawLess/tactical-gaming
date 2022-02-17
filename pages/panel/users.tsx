import { Card, CardContent, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { GetStaticProps, NextPage } from "next";
import { ReactElement, useEffect } from "react";
import PanelLayout from "../../components/panel/panelLayout/PanelLayout";
import UsersRow from "../../components/panel/users/UsersRow";
import { usersActions } from "../../features/users/usersSlice";
import usersThunk from "../../features/users/usersThunk";
import { useAppDispatch, useAppSelector } from "../../store/hook";

const Users = () => {

    const dispatch = useAppDispatch()

    const { users } = useAppSelector(state => ({
        users: state.users,
    }))

    useEffect(() => {
        console.log('effect called')
        dispatch(usersThunk.getUsers())
        return () => {
            dispatch(usersActions.setUserList([]))
        }
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
                    <TableContainer component={CardContent}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Username</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Role</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.usersList.map(user => (
                                    <UsersRow 
                                        key={user.email}
                                        user={user}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
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