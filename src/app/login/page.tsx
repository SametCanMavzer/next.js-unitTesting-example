"use client"
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import styles from "./login.module.css"


export const LoginForm = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const router = useRouter();

    const isDisabled = (): boolean => !username || !password;

    const handleLogin = (e: FormEvent<HTMLButtonElement>) => {
        setError('');
        e.preventDefault();
        fetch('/api/auth', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password,
            }),
        })
            .then((res) => res.json())
            .then(() => {

                router.push('/');
            })
            .catch((err) => {
                setError('Error Logging In');
            });
    };

    return (
        <form className={styles.form}>
            <div>{error}</div>
            <h1 className={styles.title}>Giriş Yap</h1>
            <div className={styles.login} >


                <label className={styles.label} htmlFor="username">Kullanıcı Adı:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    className={styles.loginInput}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setUsername(e.target.value);
                    }}
                />

                <label className={styles.label} htmlFor="password">Şifre:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    className={styles.loginInput}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setPassword(e.target.value);
                    }}
                />
                <button className={styles.loginButton} onClick={handleLogin} disabled={isDisabled()}>
                    Giriş
                </button>
            </div>

        </form>
    );
};

export default LoginForm;