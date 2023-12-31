import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const res = await fetch('https://localhost:3001/api/users', {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const data = await res.json()

    return NextResponse.json({ data })
}