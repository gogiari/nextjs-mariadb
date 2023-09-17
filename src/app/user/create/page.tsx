"use client"

import { useRouter } from 'next/navigation';
import React, { FormEvent } from 'react';

export default function Create() {
    const router = useRouter();
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // 페이지변경방지
        const form = e.currentTarget;
        const userid = e.currentTarget.userid.value;
        const password = e.currentTarget.password.value;
        const username = e.currentTarget.username.value;
        const email = e.currentTarget.email.value;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userid, password, username, email })
        }
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, options)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                // return res.json();
            })
            .then(result => {
                console.log(result);
                router.refresh();
                router.push('/user')
            })
            .catch(error => {
                console.error('Error:', error);
            });

    };

    return (
        <form onSubmit={handleSubmit}>
            <p>
                <input type="text" name="userid" placeholder="아이디" />
            </p>
            <p>
                <input type="text" name="password" placeholder="패스워드" />
            </p>
            <p>
                <input type="text" name="username" placeholder="이름" />
            </p>
            <p>
                <input type="text" name="email" placeholder="이메일" />
            </p>
            <p>
                <input type="submit" value="create" />
            </p>
        </form>
    );
}
