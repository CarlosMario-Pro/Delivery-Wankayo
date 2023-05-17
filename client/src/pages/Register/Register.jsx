import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../redux/actions/index";
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import { toast } from "react-toastify";
import styles from "./Register.module.css";


export default function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        docIdentity: "",
        email: "",
        password: "",
        phone: "",
    });

    const { name, lastName, docIdentity, email, password, phone } = formData;

    const onChange = (e) =>
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(registerUser(formData));
            toast.success("Registrado correctamente");
            navigate("/login");
        } catch (error) {
            console.log(error);
            toast.error("Error en el registro");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={`${styles.register} `}>
            <h1>Wankayo</h1>
            <form className={`${styles.form} `} onSubmit={onSubmit}>
                <div>
                    <label className={`${styles.label} `} htmlFor="name">Nombre</label>
                    <input className={`${styles.input} `} type="text" name="name" value={name} onChange={onChange} required />
                </div>
                <div>
                    <label className={`${styles.label} `} htmlFor="lastName">Apellido</label>
                    <input className={`${styles.input} `} type="text" name="lastName" value={lastName} onChange={onChange} required />
                </div>
                <div>
                    <label className={`${styles.label} `} htmlFor="docIdentity">Número de identidad</label>
                    <input className={`${styles.input} `} type="text" name="docIdentity" value={docIdentity} onChange={onChange} required />
                </div>
                <div>
                    <label className={`${styles.label} `} htmlFor="email">Email</label>
                    <input className={`${styles.input} `} type="email" name="email" value={email} onChange={onChange} required />
                </div>
                <div>
                    <label className={`${styles.label} `} htmlFor="phone">Número de celular</label>
                    <input className={`${styles.input} `} type="tel" name="phone" value={phone} onChange={onChange} required />
                </div>
                <div>
                    <div className={`${styles.Labelpassword} `}>
                        <label htmlFor="password">Contraseña</label>
                        {showPassword ? (
                                <RiEyeOffFill onClick={togglePasswordVisibility} className={`${styles.passwordIcon}`} />
                            ) : (
                                <RiEyeFill onClick={togglePasswordVisibility} className={`${styles.passwordIcon}`} />
                        )}                    
                    </div>
                    <input className={`${styles.input} `} type={showPassword ? "text" : "password"} name="password" value={password} onChange={onChange} minLength="6" required />
                </div>
                <button className={`${styles.button} `} type="submit">Regístrate</button>
                <div className={`${styles.login} `}>¿Ya tienes una cuenta? <Link className={`${styles.loginLink} `} to="/login">Inicia sesión aquí</Link></div>
            </form>
        </div>
    );
};