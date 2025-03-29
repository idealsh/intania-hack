import { supabase } from '../../../../lib/utils/supabase';
import type { RequestEvent } from '@sveltejs/kit';

export async function POST({ request }: RequestEvent) {

    const today = new Date().toISOString().split('T')[0];

    const { data: existingTasks, error: taskError } = await supabase
        .from('daily_tasks')
        .select('*')
        .eq('assigned_date', today);

    if (taskError) {
        console.error('Error checking existing tasks:', taskError.message);
        return new Response(
            JSON.stringify({ error: 'Error checking tasks' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }

    if (existingTasks && existingTasks.length > 0) {
        return new Response(
            JSON.stringify({ tasks: existingTasks }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    }

    const { data: islands, error: islandError } = await supabase
        .from('islands')
        .select('id, name');

    if (islandError || !islands || islands.length === 0) {
        console.error('Error fetching islands:', islandError?.message);
        return new Response(
            JSON.stringify({ error: 'Unable to fetch islands' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }


    let taskInserts = [];
    const uniqueTriviaIds = new Set();

    for (const island of islands) {

        const { data: trivia, error: triviaError } = await supabase
          .from('trivia')
          .select('*')
          .eq('island_id', island.id)
          .order('id', { ascending: false })
          .limit(3);

        if (triviaError) {
            console.error(`Error fetching trivia for island: ${island.name}`, triviaError.message);
            continue;
        }

        if (!trivia || trivia.length === 0) {
            console.warn(`No trivia found for island: ${island.name}`);
            continue;
        }

        for (const question of trivia) {
            if (!uniqueTriviaIds.has(question.id)) {
                taskInserts.push({
                    trivia_id: question.id,
                    assigned_date: today,
                    completed: false
                });
                uniqueTriviaIds.add(question.id);
            }
        }
    }

    if (taskInserts.length > 0) {
        const { data: insertedTasks, error: insertError } = await supabase
            .from('daily_tasks')
            .insert(taskInserts)
            .select();

        if (insertError) {
            console.error('Error inserting tasks:', insertError.message);
            return new Response(
                JSON.stringify({ error: 'Error generating tasks' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }
        return new Response(
            JSON.stringify({ tasks: insertedTasks }),
            { status: 201, headers: { 'Content-Type': 'application/json' } }
        );
    } else {
        console.warn(' No tasks generated for today.');
        return new Response(
            JSON.stringify({ error: 'No tasks generated' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
