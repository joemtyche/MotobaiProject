import Form from "../Pages/AuthForm"

function Register() {
    return <Form route="/api/user/register/" method="register" />
}

export default Register