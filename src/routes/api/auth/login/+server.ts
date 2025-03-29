import { supabase } from '../../../../lib/utils/supabase';
import { comparePassword, generateToken } from '../../../../lib/auth';
import type { RequestEvent } from '@sveltejs/kit';


interface LoginBody {
    username: string;
    password: string;
}

export async function POST({ request }: RequestEvent) {
    try {

        const { username, password }: LoginBody = await request.json();

        if (!username || !password) {
            return new Response(
                JSON.stringify({ error: 'Username and password are required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const { data: user, error } = await supabase
            .from('users')
            .select('id, username, password')
            .eq('username', username)
            .single();


        if (!user || error) {
            return new Response(
                JSON.stringify({ error: 'Invalid username or password' }),
                { status: 401, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const isPasswordValid = await comparePassword(password, user.password);

        if (!isPasswordValid) {
            return new Response(
                JSON.stringify({ error: 'Invalid username or password' }),
                { status: 401, headers: { 'Content-Type': 'application/json' } }
            );
        }

    
        const token = generateToken({ id: user.id, username: user.username });

        return new Response(
            JSON.stringify({
                message: 'Login successful!',
                token
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (err) {
        return new Response(
            JSON.stringify({ message: 'Internal Error' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}