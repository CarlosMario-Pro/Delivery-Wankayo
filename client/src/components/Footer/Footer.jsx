import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import SocialNetwork from '../SocialNetwork/SocialNetwork';
import Logo from '../../assets/logoW.png';


export default function Footer () {

    return (
        <div className={`${styles.footer}`}>
            <div className={`${styles.network} center `}>
                <Link to='/'>
                    <div className={`${styles.logo}`}>
                        <img className={`${styles.imageLogo} center `} src={Logo} alt="" />
                    </div>
                </Link>
                <SocialNetwork />
            </div>
            
            <div className={`${styles.links__container} jcspaceBetween marginCenter`}>
                <div className={`${styles.column} `}>
                    <h3>Categorías</h3>
                    <Link className={`linkTitle`} to='#'><p className={`${styles.link}`}>Promociones y Ofertas</p></Link>
                    <Link className={`linkTitle`} to='#'><p className={`${styles.link}`}>Boxes</p></Link>
                    <Link className={`linkTitle`} to='#'><p className={`${styles.link}`}>Combos</p></Link>
                    <Link className={`linkTitle`} to='#'><p className={`${styles.link}`}>Conos Personales</p></Link>
                    <Link className={`linkTitle`} to='#'><p className={`${styles.link}`}>Hamburguesas</p></Link>
                    <Link className={`linkTitle`} to='#'><p className={`${styles.link}`}>Snacks</p></Link>
                    <Link className={`linkTitle`} to='#'><p className={`${styles.link}`}>Bebidas</p></Link>
                </div>
                <div className={`${styles.column} `}>
                    <h3>Únete a Wancayo</h3>
                    <Link className={`linkTitle`} to='/WorkWithUs' ><p className={`${styles.link}`}>Trabaja con nosotros</p></Link>
                </div>
                <div className={`${styles.column} `}>
                    <h3>Sobre Wancayo</h3>
                    <Link className={`linkTitle`} to='/ourHistory' ><p className={`${styles.link}`}>Nuestra historia</p></Link>
                    <Link className={`linkTitle`} to='/termsConditions' ><p className={`${styles.link}`}>Términos y Condiciones</p></Link>
                    <Link className={`linkTitle`} to='/dataTreatment' ><p className={`${styles.link}`}>Tratamiento de Datos</p></Link>
                    <Link className={`linkTitle`} to='/contact' ><p className={`${styles.link}`}>Contacto</p></Link>
                </div>
            </div>

            <div className={`${styles.copy} marginCenter`}>
                <p>Wancayo Sabor Peruano</p>
                <p>© 2023 Desarrollado por Carlos Mario. Todos los derechos reservados.</p>
            </div>

        </div>
    )
}