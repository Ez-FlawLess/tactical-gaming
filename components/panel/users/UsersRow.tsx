import { TableCell, TableRow } from "@mui/material";
import { FC } from "react";
import { IUser } from "../../../features/users/usersTypes";

const UsersRow: FC<{
    user: IUser,
}> = ({
    user,
}) => {
    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">{user.username}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.roles.admin ? 'admin' : 'user'}</TableCell>
        </TableRow>
    )
}

export default UsersRow