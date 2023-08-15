
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

type User = {
    id: number;
    name: string;
}

let users: User[] = [
    { id: 1, name: 'Samet Mavzer' },
    { id: 2, name: 'Mehmet Demir ' },
    { id: 3, name: 'Fatma Şahin' },
    { id: 4, name: 'Ali Çelik' },
    { id: 5, name: 'Zeynep Arslan' },
    { id: 6, name: 'Mustafa Öztürk' },
    { id: 7, name: 'Elif Doğan' }

];



async function GET(request: NextApiRequest): Promise<NextResponse> {
    return NextResponse.json(users);
}

async function POST(request: NextApiRequest): Promise<NextResponse> {
    const newUser: User = await request.json();
    const newId = Math.max(...users.map(user => user.id)) + 1;
    newUser.id = newId;
    users.push(newUser);
    return NextResponse.json(newUser);
}


async function DELETE(request: NextApiRequest): Promise<NextResponse> {
    const id = Number(request.query.id);
    users = users.filter(user => user.id !== id);
    return new NextResponse(null, { status: 200 });
}

export { GET, POST, DELETE };


