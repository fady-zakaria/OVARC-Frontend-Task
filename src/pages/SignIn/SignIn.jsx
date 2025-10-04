import { Formik, Form, Field, ErrorMessage } from "formik";
import { getValidationSchema } from "./SignIn.factory";
import { useSignIn } from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/AuthSlice";
import { useNavigate } from "react-router-dom";

const SignIn = () => {

    const dispatch = useDispatch();

    const { mutateAsync: login } = useSignIn();
    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(false);
        const user = await login(values);
        dispatch(setUser({ userId: user?.id, email: user?.email, username: user?.name }));
        navigate('/');
    };

    console.log('sda', import.meta)

    return (
        <div className="flex items-center justify-center mt-12 px-4">
            <div className="w-full max-w-sm">
                <h1 className="text-2xl font-semibold mb-6">Sign In</h1>
                <Formik initialValues={{ email: '', password: '' }} validationSchema={getValidationSchema()} onSubmit={handleSubmit} className="w-full max-w-sm">
                    {({
                        values,
                        handleChange,
                        handleBlur,
                        isSubmitting,
                    }) => (
                        <Form>
                            <label className="block mb-2 font-medium" htmlFor="email">Email</label>
                            <Field
                                id="email"
                                className="border border-gray-300 rounded p-2 w-full mb-1"
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                autoFocus
                            />
                            <div className="text-sm text-red-600 mb-4">
                                <ErrorMessage name="email" />
                            </div>
                            <label className="block mb-2 font-medium" htmlFor="password">Password</label>
                            <Field
                                id="password"
                                className="border border-gray-300 rounded p-2 w-full mb-1"
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            <div className="text-sm text-red-600 mb-4">
                                <ErrorMessage name="password" />
                            </div>
                            <button
                                type="submit"
                                className="bg-main text-white px-4 py-2 rounded w-full"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "..." : "Sign In"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>

    )
}

export default SignIn