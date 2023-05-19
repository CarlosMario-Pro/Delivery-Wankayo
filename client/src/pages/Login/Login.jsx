import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getUserInfo } from "../../redux/actions/index";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import styles from "./Login.module.css";
import axios from 'axios';


function validate (input) {
    let errors = {};
    if(!input.email) {
        errors.email = "Ingresa un email válido";
    } else if(!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(input.email)) {
        errors.email = "Ingresa un email válido";
    }
    return errors;
};


export default function Login() {
    const [ errors, setErrors ] = useState({});
    const [touched, setTouched] = useState({});
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showEmailInstructions, setShowEmailInstructions] = useState(false);
    const [showEmailInstructionsPPP, setShowEmailInstructionsPPP] = useState(false);

    const { email, password } = formData;

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
        setErrors(validate({
            ...formData,
            [name]: value
        }));
        setTouched((prevTouched) => ({
            ...prevTouched,
            [name]: true
        }));
    };

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
        } catch (error) {
            if (error.response.data.error === "Has bloqueado tu cuenta") {
                setShowEmailInstructions(true)
            }
            if (error.response.data.error === "Usuario bloqueado") {
                setShowEmailInstructionsPPP(true)
            }
            toast.error(error.response.data.error)
        }
    };


    return (
        <div className={`${styles.login} centerColumn`}>
            <h1>Wankayo</h1>
            <div className={`${styles.general} `}>
                <form className={`${styles.form} `} onSubmit={onSubmit}>
                    <div>
                        <div>
                            <label className={styles.label} htmlFor="email">Email</label>
                            <input className={styles.input} type="email" name="email" value={email} onChange={onChange} />
                            {touched.email && errors.email && <p className={`${styles.danger} `}>{errors.email}</p>}
                        </div>

                        <div className={styles.password}>
                            <div className={`${styles.passwordInput} jcspaceBetween`}>
                                <label className={`${styles.label} `} htmlFor="password">Contraseña</label>
                                {showPassword ? (
                                        <RiEyeOffFill onClick={toggleShowPassword} className={`${styles.passwordIcon}`} />
                                    ) : (
                                        <RiEyeFill onClick={toggleShowPassword} className={`${styles.passwordIcon}`} />
                                )}
                            </div>
                            <input className={`${styles.input} `} type={showPassword ? "text" : "password"} name="password" value={password} onChange={onChange} />
                            {errors.password && <p className={`${styles.danger} `}>{ errors.password }</p>}
                        </div>
                        {
                            !errors.email && formData.email.length > 0 &&
                            !errors.password && formData.password.length > 0 ?
                            <button className={`${styles.button} `} type="submit">Login</button> : <button className={`${styles.button} `} type="submit">Login</button>
                        }
                    </div>

                    <div className={`${styles.register} `}><Link className={`${styles.registerLink} `} to="/changePassword">¿Olvidaste tu comtraseña?</Link></div>
                    <div className={`${styles.register} `}>¿No tienes una cuenta? <Link className={`${styles.registerLink} `} to="/register">Regístrate aquí</Link></div>
                </form>
                {showEmailInstructions && (
                    <div className={`${styles.blockedAccount} `}>
                        <p>Revisa tu bandeja de correo electrónico para desbloquear tu cuenta</p>
                    </div>
                )}
                {showEmailInstructionsPPP && (
                    <div className={`${styles.blockedAccount} `}>
                        <p>Revisa tu bandeja de correo electrónico para desbloquear tu cuenta</p>
                    </div>
                )}
            </div>
        </div>
    );
};