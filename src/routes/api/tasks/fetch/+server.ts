import { supabase } from '../../../../lib/utils/supabase';
import type { RequestEvent } from '@sveltejs/kit';


export async function GET({ request }: RequestEvent) {

    const today = new Date().toISOString().split('T')[0];

    const { data: tasks, error } = await supabase
        .from('daily_tasks')
        .select('id, trivia_id, completed')
        .eq('assigned_date', today);

    if (error || !tasks || tasks.length === 0) {
        return new Response(
            JSON.stringify({ error: 'No tasks available for today' }),
            { status: 404, headers: { 'Content-Type': 'application/json' } }
        );
    }

    const triviaIds = tasks.map((task) => task.trivia_id);
    const { data: trivia, error: triviaError } = await supabase
        .from('trivia')
        .select('*')
        .in('id', triviaIds);

    if (triviaError) {
        return new Response(
            JSON.stringify({ error: 'Error fetching trivia' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }

    return new Response(
        JSON.stringify({ tasks: trivia }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
}
