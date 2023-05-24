import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changePassword } from "../../../../redux/actions/index";
import styles from "./ChangePassword.module.css";


export default function ChangePassword() {
    const dispatch = useDispatch();

    const [email, setEmail] = useState({
        email: "",
    });

    const onChange = (e) => setEmail({
        ...email,
        [e.target.name]: e.target.value
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(changePassword(email));
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className={styles.register}>
            <h1>Wankayo</h1>
            <form className={styles.form} onSubmit={onSubmit}>
                <div>
                    <div className={`${styles.labelpassword} centerColumn`}>
                        <label htmlFor="email">Escribe tu email</label>
                        <input className={styles.input} type="email" name="email" value={email.email} onChange={onChange} />
                    </div>
                </div>
                <button type="submit" className={styles.button}>Enviar</button>
            </form>
        </div>
    );
}


<h1>ChangePassword</h1>