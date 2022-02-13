import { GetStaticProps, NextPage } from "next";
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Box, Button, Grid, TextField } from "@mui/material";
import { useAppDispatch } from "../../store/hook";
import authThunks from "../../store/thunks/autrhThunks";

const validationSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    confirmPassword:  yup
        .string()
        .required()
        .test(
            'passwords-match', 
            'Passwords must match', 
            (value, t) => t.parent.password === value,
        ),
})

const Register: NextPage = () => {

    const dispatch = useAppDispatch()

    const formik = useFormik<{
        email: string,
        password: string,
        confirmPassword: string,
    }>({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema,
        onSubmit: values => {
            console.log('on submit values', values)
            dispatch(authThunks.createUser({
                email: values.email,
                password: values.password,
            }))
        },
        validateOnChange: true,
    })

    return (
        <Box>
            <form onSubmit={formik.handleSubmit}>
                <Grid container direction="column" spacing={2}>
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
                        <TextField
                            fullWidth
                            id="confirmPassword"
                            name="confirmPassword"
                            label="confirmPassword"
                            type="password"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
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

export default Register