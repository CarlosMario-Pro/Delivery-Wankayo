import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logoW.png';
import styles from './NavBar.module.css';
import { FaUserCircle } from 'react-icons/fa';
import { TfiPanel } from 'react-icons/tfi';
import { IoMdCart } from 'react-icons/io';
import { useSelector } from 'react-redux';


export default function NavBar() {
    const { userInfoLogin } = useSelector(state => state);
    const idUser = userInfoLogin.id;
    const isAdmin = userInfoLogin.role === 'superAdmin' || userInfoLogin.role === 'admin';
    const isUser = userInfoLogin.role === 'user';


    return (
        <div className={`${styles.navBar} `}>
            <div className={`${styles.navBar__container} jcspaceBetween `}>
                <div>
                    <Link to='/' >
                        <div className={`${styles.logo} center `}>
                            <img className={`${styles.imageLogo} center `} src={Logo} alt="Logo" />
                        </div>
                    </Link>
                </div>

                <div className={` ${styles.panel} flex `}>
                    {isAdmin &&
                        <div className={`${styles.userPanel} `}>
                            <Link className={`${styles.linkUserPanel} linkTitle center`} to={`/panelAdmin/products`} >
                                <div className={`${styles.login}  `}><TfiPanel className={`${styles.icon}`}/><span className={`${styles.span}`}>Panel</span></div>
                            </Link>
                        </div>
                    }
                    {isUser &&
                        <div className={`${styles.userPanel}`}>
                            <Link className={`${styles.linkUserPanel} linkTitle center`} to={`/panelUser/allInfoUser/${idUser}`} >
                                <div className={`${styles.login} `}><TfiPanel className={`${styles.icon}`}/>Panel</div>
                            </Link>
                        </div>
                    }
                        {Object.keys(userInfoLogin).length === 0 ?
                            (
                                <Link className={`${styles.linkUserPanel} linkTitle center`} to='/login'>
                                    <div className={`${styles.login}`}><FaUserCircle className={`${styles.icon}`}/>Login</div>
                                </Link>
                            ): ""
                        }
                        {Object.keys(userInfoLogin).length === 0 ?
                            (
                                <Link className={`${styles.linkUserPanel} linkTitle center`} to='/register'>
                                    <div className={`${styles.register}`}><FaUserCircle className={`${styles.icon}`}/>Registro</div>
                                </Link>
                            ): ""
                        }
                        <Link className={`${styles.linkUserPanel} linkTitle center`} to='/'>
                            <div className={`${styles.car}`}><IoMdCart className={`${styles.icon}`}/></div>
                        </Link>
                </div>
            </div>
        </div>
    );
};