"use client"
import { useState, useEffect } from 'react';
import styles from "./users.module.css"

type User = {
    id: number;
    name: string;
}

export default function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [name, setName] = useState('');

    useEffect(() => {
        fetch('/api/users')
            .then(response => response.json())
            .then(setUsers);
    }, [setUsers]);


    const handleCreateUser = async () => {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const newUser = await response.json();
        setUsers([...users, newUser]);
        setName('');
    };

    const handleDeleteUser = async (id: number) => {
        await fetch(`/api/users/${id}`, { method: 'DELETE' });

        setUsers(users.filter(user => user.id !== id));
    };

    return (
        <div className={styles.container}>
            <h1 style={{ textAlign: "center" }}>Kullanıcı Ekle</h1>
            <div className={styles.addUser} >
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    className={styles.input}
                    onChange={e => setName(e.target.value)}
                />
                <button className={styles.button} onClick={handleCreateUser}>EKLE</button>
            </div>

            <div className={styles.userWrapper}>
                <ul className={styles.userList}>
                    {users.map(user => (
                        <li className={styles.userListItem} key={user.id}>
                            <span className={styles.span}>{user.name}</span>
                            <button className={styles.button} data-testid={`${user.id}`} onClick={() => handleDeleteUser(user.id)}>Sil</button>

                        </li>

                    ))}
                </ul>
            </div>

        </div>

    );
}





































