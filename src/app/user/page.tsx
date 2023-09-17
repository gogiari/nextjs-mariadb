"use client"

import Image from 'next/image'
import { User } from '../types/user';
import Link from 'next/link';
import '../css/userlist.css'
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
export default function UserList() {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
           fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, { cache: 'no-store' })
           .then(resp => resp.json())
           .then(result => {
            setUsers(result);
           })
    },[])

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>이름</th>
                        <th>이메일</th>
                        <th>가입일</th>
                    </tr>
                </thead>
                <tbody>

                    {users.map((user) => (
                        <tr className='hoho' key={user.userid} onClick={() => router.push(`/user/editor/${user.userid}`)}>
                            <td>{user.userid}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{dayjs(user.indate).format('YYYY-MM-DD HH:mm:ss')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link href={'/user/create'}>회원 생성</Link>
        </>
    )
}
