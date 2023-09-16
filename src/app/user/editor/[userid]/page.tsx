"use client"

import { User } from "@/app/types/user";
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from "react";

export default function UserEditor({ params }: { params: { userid: string } }) {
    
    const apiUrl = `http://localhost:3001/api/users/${params.userid}`;
    const router = useRouter();
    const [user, setUser] = useState<User>();
    
    // 관리자면 변경금지 뒤로
    if(params.userid === 'admin'){
        alert('관리자 변경금지');
        router.replace('/user')
    }
    useEffect(() => {
        fetch(apiUrl)
            .then(resp => resp.json())
            .then(result => {
                setUser(result);
            })
    }, [apiUrl])

    const deleteClick = () => {
        if (!confirm(`ID : "${params.userid}" 정말 삭제 하겠습니까?`)) {
        } else {
            fetch(apiUrl, {
                method: 'DELETE'
            }).then(res => {
                if(!res.ok) {
                    throw new Error('Network response was not ok');
                }
            })
            .then(result => {
                console.log(result);
                router.refresh();
                router.push('/user');
            })
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const password = form.password.value;
        const username = form.username.value;
        const email = form.email.value;
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password, username, email })
        }
        fetch(apiUrl, options)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok')
                }
            })
            .then(result => {
                console.log(result);
                router.refresh();
                router.push('/user')
            })
            .catch(error => {
                console.error('Error', error);
            });
    }
    return (
        <>
            <h2>회원수정</h2>
            <p>{params.userid}</p>
            <form onSubmit={handleSubmit}>
                <p>
                    <input type="text" name="password" placeholder={user?.password} />
                </p>
                <p>
                    <input type="text" name="username" placeholder={user?.username} />
                </p>
                <p>
                    <input type="text" name="email" placeholder={user?.email} />
                </p>
                <input type="submit" value="수정" />
            </form>
            <button onClick={() => deleteClick()}>삭제</button>
            <button onClick={() => router.push('/user')}>뒤로</button>
        </>
    )
}