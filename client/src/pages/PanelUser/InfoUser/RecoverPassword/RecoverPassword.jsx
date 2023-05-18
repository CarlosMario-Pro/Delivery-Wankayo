import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { recoverPassword } from "../../../../redux/actions/index";
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import styles from "./RecoverPassword.module.css";


export default function RecoverPassword() {
    const dispatch = useDispatch();
    const { idUser } = useParams();

    const [showPassword, setShowPassword] = useState(false);

    const [password, setPassword] = useState({
        password: "",
    });

    const onChange = (e) => setPassword({
        ...password,
        [e.target.name]: e.target.value
    });

    const [confirmPassword, setConfirmPassword] = useState("");
    const onChangeConfirmPassword = (e) => {
        if (e.target.name === "confirmPassword") {
            setConfirmPassword(e.target.value);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(recoverPassword(idUser, password));
        } catch (error) {
            console.log(error);
        }
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <div className={styles.register}>
            <h1>Wankayo</h1>
            <form className={styles.form} onSubmit={onSubmit}>
                <div>
                    <div className={`${styles.labelpassword} `}>
                        <label htmlFor="password">Nueva contraseña</label>
                        {showPassword ? <RiEyeOffFill onClick={togglePasswordVisibility} className={styles.passwordIcon} /> : <RiEyeFill onClick={togglePasswordVisibility} className={styles.passwordIcon} />}
                    </div>
                    <input className={styles.input} type={showPassword ? "text" : "password"} name="password" value={password.password} onChange={onChange} minLength="6" required />
                </div>
                <div >
                    <div  className={`${styles.labelpassword} `}>
                        <label className={styles.label} htmlFor="confirmPassword">Confirmar contraseña</label>
                        {showPassword ? <RiEyeOffFill onClick={togglePasswordVisibility} className={styles.passwordIcon} /> : <RiEyeFill onClick={togglePasswordVisibility} className={styles.passwordIcon} />}
                    </div>
                    <input className={styles.input} type={showPassword ? "text" : "password"} name="confirmPassword" value={confirmPassword} onChange={onChangeConfirmPassword} minLength="6" required />
                </div> 

                <button type="submit" className={styles.button}>Enviar</button>
            </form>
        </div>
    );
}
