import Form from "../../AuthForm"

function Login() {
    return <Form route="/api/token/" method="login" />
}

export default Login