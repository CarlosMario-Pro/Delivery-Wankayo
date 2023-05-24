import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/actions/index";
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import { toast } from "react-toastify";
import styles from "./Register.module.css";


function validate (product) {
    let errors = {};
    if(!product.name){
        errors.name = "Tu nombre es requerido";
    }
    if(!product.lastName){
        errors.lastName = "Tu apellido es requerido";
    }
    if(!product.docIdentity){
        errors.docIdentity = "Tu número de identidad es requerido";
    }
    if(!product.email) {
        errors.email = "Ingresa un email válido";
    } else if(!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(product.email)) {
        errors.email = "Ingresa un email válido";
    }
    if (!product.password) {
        errors.password = "Tu contraseña es requerida";
    } else if (product.password.length < 8) {
        errors.password = "La contraseña debe tener al menos 8 caracteres";
    }
    if(!product.phone){
        errors.phone = "Tu número de celular o teléfono es requerido";
    }
    return errors;
};


export default function Register() {
    const [ errors, setErrors ] = useState({});
    const [touched, setTouched] = useState({});
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

    const [confirmPassword, setConfirmPassword] = useState("");
    function onChangeConfirmPassword (e) {
        if (e.target.name === "confirmPassword") {
            setConfirmPassword(e.target.value);
        }
    };

    const { name, lastName, docIdentity, email, password, phone } = formData;

    function onChange (e) {
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

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Las contraseñas no coinciden");
            return;
        }
        try {
            dispatch(registerUser(formData));
            setFormData({
                name: "",
                lastName: "",
                docIdentity: "",
                email: "",
                password: "",
                phone: "",
            });
        } catch (error) {
            toast.error("Error en el registro");
            return;
        }
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <div className={`${styles.register} centerColumn`}>
            <h1>Wankayo</h1>
            <form className={styles.form} onSubmit={onSubmit}>
                <div>
                    <label className={styles.label} htmlFor="name">Nombre <span className={styles.requirement}>*</span></label>
                    <input className={styles.input} placeholder="Nombre" type="text" name="name" value={name} onChange={onChange} />
                    {touched.name && errors.name && <p className={`${styles.danger} `}>{errors.name}</p>}
                </div>
                <div>
                    <label className={styles.label} htmlFor="lastName">Apellido <span className={styles.requirement}>*</span></label>
                    <input className={styles.input} placeholder="Apellido" type="text" name="lastName" value={lastName} onChange={onChange} />
                    {touched.lastName && errors.lastName && <p className={`${styles.danger} `}>{errors.lastName}</p>}
                </div>
                <div>
                    <label className={styles.label} htmlFor="docIdentity">Número de identidad <span className={styles.requirement}>*</span></label>
                    <input className={styles.input} placeholder="Número de documento de identidad" type="text" name="docIdentity" value={docIdentity} onChange={onChange} />
                    {touched.docIdentity && errors.docIdentity && <p className={`${styles.danger} `}>{errors.docIdentity}</p>}
                </div>
                <div>
                    <label className={styles.label} htmlFor="email">Email <span className={styles.requirement}>*</span></label>
                    <input className={styles.input} placeholder="Correo electrónico" type="email" name="email" value={email} onChange={onChange} />
                    {touched.email && errors.email && <p className={`${styles.danger} `}>{errors.email}</p>}
                </div>
                <div>
                    <label className={styles.label} htmlFor="phone">Número de celular <span className={styles.requirement}>*</span></label>
                    <input className={styles.input} placeholder="Número de celular" type="tel" name="phone" value={phone} onChange={onChange} />
                    {touched.phone && errors.phone && <p className={`${styles.danger} `}>{errors.phone}</p>}
                </div>
                <div>
                    <div className={`${styles.labelpassword} `}>
                        <label htmlFor="password">Contraseña <span className={styles.requirement}>*</span></label>
                        {showPassword ? <RiEyeOffFill onClick={togglePasswordVisibility} className={styles.passwordIcon} /> : <RiEyeFill onClick={togglePasswordVisibility} className={styles.passwordIcon} />}
                    </div>
                    <input className={styles.input} placeholder="Contraseña" type={showPassword ? "text" : "password"} name="password" value={password} onChange={onChange} />
                    {touched.password && errors.password && <p className={`${styles.danger} `}>{errors.password}</p>}
                </div>
                <div >
                    <div  className={`${styles.labelpassword} `}>
                        <label className={styles.label} htmlFor="confirmPassword">Confirmar contraseña <span className={styles.requirement}>*</span></label>
                        {showPassword ? <RiEyeOffFill onClick={togglePasswordVisibility} className={styles.passwordIcon} /> : <RiEyeFill onClick={togglePasswordVisibility} className={styles.passwordIcon} />}
                    </div>
                    <input className={styles.input} placeholder="Confirma tu contraseña" type={showPassword ? "text" : "password"} name="confirmPassword" value={confirmPassword} onChange={onChangeConfirmPassword} />
                    {touched.confirmPassword && errors.confirmPassword && <p className={`${styles.danger} `}>{errors.confirmPassword}</p>}
                </div>
                <button type="submit" className={styles.button}>Registrarse</button>
            </form>
        </div>
    );
}
