import { 
    Alert,
    Box, Button, Collapse, Grid, IconButton, TextField,
} from "@mui/material";
import * as yup from 'yup'
import { GetStaticProps, NextPage } from "next";
import { useFormik } from 'formik'
import { useAppDispatch, useAppSelector } from "../../store/hook";
import authThunks from "../../features/auth/autrhThunks";
import { Close } from "@mui/icons-material";
import { deleteLoginError } from "../../features/auth/authSlice";

const validationSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .required('Password is required'),
})

const Login: NextPage = () => {

    const dispatch = useAppDispatch()

    const {
        auth,
    } = useAppSelector(state => ({
        auth: state.auth,
    }))

    const formik = useFormik<{
        email: string,
        password: string,
    }>({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: values => {
            console.log('on submit values', values)
            dispatch(authThunks.signIn(values)).catch(e => {
                for (const [key, value] of Object.entries(e)) {
                    console.log(`${key}: ${value}`);
                  }
            })
        },
        validateOnChange: true,
    })

    return (
        <Box>
            <form onSubmit={formik.handleSubmit}>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <Box sx={{width: '100%'}}>
                            <Collapse in={Boolean(auth.loginError)}>
                                <Alert
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {
                                                dispatch(deleteLoginError())
                                            }}
                                        >
                                            <Close fontSize="inherit" />
                                        </IconButton>
                                    }
                                    severity="error"
                                >
                                    {auth.loginError}
                                </Alert>
                            </Collapse>
                        </Box>
                    </Grid>
                    <Grid item>
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                    </Grid>
                    <Grid item>
                        <Button color="primary" variant="contained" fullWidth type="submit">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    return {
      props: {
          nonAuth: true,
      },
    }
}

export default Login