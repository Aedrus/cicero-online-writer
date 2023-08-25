import { useState } from "react";

interface props {
    username: string;
    password: string;
    setUsername: any;
    setPassword: any;
    label: string
    onSubmit: any;
}

export const Auth = () => {
    return (
        <div className="auth">
            <Login />
            <Register />
        </div>
    )
};

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const onSubmit = async (event: any) => {
        event.preventDefault();

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            const data = await response.json();

            if (response.status === 200) {
                localStorage.setItem("token", data.token);
                window.location.reload();
            }
        } catch (error) {

        }
    }

    return <Form username={username} setUsername={setUsername} password={password} setPassword={setPassword} label="Login" onSubmit={onSubmit}/>;
};

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const onSubmit = async (event: any) => {
        event.preventDefault();

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            const data = await response.json();

            if (response.status === 200) {
                localStorage.setItem("token", data.token);
                window.location.reload();
            }
        } catch (error) {

        }
    }

    return <Form username={username} setUsername={setUsername} password={password} setPassword={setPassword} label="Register" onSubmit={onSubmit}/>;
};

const Form: React.FC<props> = ({
    username, 
    setUsername, 
    password, 
    setPassword, 
    label, 
    onSubmit }) => {
    return (
        <div className="register">
            <form action="">
                <h2>{label}</h2>
                <div className="form-group">
                    <label htmlFor="username">Username: </label>
                    <input type="text" id="username" onChange={(event) => setUsername(event.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input type="text" id="password" onChange={(event) => setPassword(event.target.value)}/>
                </div>
                <button type="submit">{label}</button>
            </form>
        </div>
    )
}