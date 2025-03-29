import { supabase } from '../../../../lib/utils/supabase';
import { hashPassword } from '../../../../lib/auth';
import type { RequestEvent } from '@sveltejs/kit';

interface SignUpBody {
    username: string;
    password: string;
    email: string;
}

export async function POST({ request }: RequestEvent) {
    try {
        const { username, password, email }: SignUpBody = await request.json();

        if (!username || !password || !email) {
            return new Response(
                JSON.stringify({ error: 'All fields are required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const { data: existingUser, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('username', username)
            .single();


        if (existingUser) {
            return new Response(
                JSON.stringify({ error: 'Username already exists' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const hashedPassword = await hashPassword(password);

        const { data, error } = await supabase
            .from('users')
            .insert([
                {
                    username,
                    password: hashedPassword,
                    email,
                    xp: 0,
                    level: 1,
                    streak: 0
                }
            ])
            .select()
            .single();


        if (error) {
            return new Response(
                JSON.stringify({ error: error.message }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }

        return new Response(
            JSON.stringify({
                message: 'User registered successfully!',
                user: data
            }),
            { status: 201, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (err) {
        return new Response(
            JSON.stringify({ message: 'Internal Error' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}