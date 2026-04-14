import useLogin from "../hooks/useLogin";
import "./Login.css";

function Login(props) {

    const {
        formData,
        enableSubmit,
        handleChangeEmail,
        handleChangePassword,
        handleLoginSubmit
    } = useLogin(props.logIn);

    return (
        <div className="App-body">
            <p>Login to access the full dashboard</p>

            <form onSubmit={handleLoginSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChangeEmail}
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChangePassword}
                />
                <input type="submit" value="OK" disabled={!enableSubmit} />
            </form>
        </div>
    );
}

export default Login;
