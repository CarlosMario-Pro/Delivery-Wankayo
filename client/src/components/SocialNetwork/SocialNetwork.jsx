import React from 'react';
import { AiFillInstagram } from 'react-icons/ai';
import { FaFacebookF, FaTiktok } from 'react-icons/fa';
import { RiWhatsappFill } from 'react-icons/ri';
import styles from "./SocialNetwork.module.css";


export default function SocialNetwor () {
  return (
    <div className={`${styles.socialNetworks} AIflexEnd`}>
        <div className={`${styles.borderSocialNetworks} center`}>
            <a className={`links`} href='https://www.facebook.com/WankayoSaborPeruano' target="_blank" rel="noreferrer noopener"><FaFacebookF className={styles.iconSocialNetworks} /></a>
        </div>
        <div className={`${styles.borderSocialNetworks} center`}>
            <a className={`links`} href='https://www.instagram.com/wankayosaborperuano/?hl=es-la' target="_blank" rel="noreferrer noopener"><AiFillInstagram className={styles.iconSocialNetworks} /></a>
        </div>
        <div className={`${styles.borderSocialNetworks} center`}>
            <a className={`links`} href='https://www.tiktok.com/@wankayosaborperuano' target="_blank" rel="noreferrer noopener"><FaTiktok className={styles.iconSocialNetworks} /></a>
        </div>
        <div className={`${styles.borderSocialNetworks} center`}>
            <a className={`links`} href='https://web.whatsapp.com/send?phone=51902140618&text' target="_blank" rel="noreferrer noopener"><RiWhatsappFill className={styles.iconSocialNetworks} /></a>
        </div>
    </div>
    );
};