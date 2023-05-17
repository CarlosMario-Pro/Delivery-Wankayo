import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getUserInfo } from "../../redux/actions/index";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import styles from "./Login.module.css";
import axios from 'axios';


export default function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const { email, password } = formData;

    const onChange = (e) => setFormData({
            ...formData,
            [e.target.name]: e.target.value,
    });

    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/login", { email, password }, { withCredentials: true });
            if (response.status === 200) {
                dispatch(getUserInfo(dispatch, response.data));
                toast.success("Bienvenido de vuelta");
                navigate("/");
            }
            else {
                toast.error("Error en el inicio de sesion")
            }
        } catch (error) {
            toast.error("Error en el inicio de sesion")
        }
    };

    return (
        <div className={`${styles.login} centerColumn`}>
            <h1>Wankayo</h1>
            <h1>Poner un limitante de intentos fallidos</h1>
            <form className={`${styles.form} `} onSubmit={onSubmit}>
                <div>
                    <label className={`${styles.label} `} htmlFor="email">Email</label>
                    <input className={`${styles.input} `} type="email" name="email" value={email} onChange={onChange} required />
                </div>
                <div className={`${styles.password} `}>
                    <div className={styles.passwordInput}>
                        <label htmlFor="password">Contraseña</label>
                        {showPassword ? (
                                <RiEyeOffFill onClick={toggleShowPassword} className={`${styles.passwordIcon}`} />
                            ) : (
                                <RiEyeFill onClick={toggleShowPassword} className={`${styles.passwordIcon}`} />
                        )}
                    </div>
                    <input type={showPassword ? "text" : "password"} name="password" value={password} onChange={onChange} minLength="6" required />
                </div>
                <button className={`${styles.button} `} type="submit">Login</button>
                <div className={`${styles.register} `}><Link className={`${styles.registerLink} `} to="/changePassword">¿Olvidaste tu comtraseña?</Link></div>
                <div className={`${styles.register} `}>¿No tienes una cuenta? <Link className={`${styles.registerLink} `} to="/register">Regístrate aquí</Link></div>
            </form>
        </div>
    );
};