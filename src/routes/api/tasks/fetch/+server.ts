import { supabase } from '../../../../lib/utils/supabase';
import type { RequestEvent } from '@sveltejs/kit';

const QUESTIONS_PER_ISLAND = 3;

export async function GET({ request }: RequestEvent) {
    try {
        const today = new Date().toISOString().split('T')[0];

        const { data: existingTasks, error: taskError } = await supabase
            .from('daily_tasks')
            .select('id, trivia_id, completed')
            .eq('assigned_date', today);

        if (taskError) {
            console.error('Error checking tasks:', taskError.message);
            return new Response(
                JSON.stringify({ error: 'Error checking tasks' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }

        if (existingTasks && existingTasks.length > 0) {
            return await fetchTriviaForTasks(existingTasks);
        }

        const generatedTasks = await generateDailyTasks(today);

        if (generatedTasks.length > 0) {
            return await fetchTriviaForTasks(generatedTasks);
        } else {
            console.warn('⚠️ No tasks generated.');
            return new Response(
                JSON.stringify({ error: 'No tasks generated for today' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }
    } catch (err) {
        console.error('Internal Error:', err);
        return new Response(
            JSON.stringify({ error: 'Internal server error' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}

// 🎲 Generate Daily Tasks If No Tasks Exist
async function generateDailyTasks(today: string) {
    const { data: islands, error: islandError } = await supabase
        .from('islands')
        .select('id, name');

    if (islandError || !islands || islands.length === 0) {
        console.error('Error fetching islands:', islandError?.message);
        return [];
    }

    let taskInserts = [];
    const uniqueTriviaIds = new Set();


    for (const island of islands) {
        const { data: trivia, error: triviaError } = await supabase
            .from('trivia')
            .select('*')
            .eq('island_id', island.id)
            .order('id', { ascending: false }) // Get the latest questions
            .limit(QUESTIONS_PER_ISLAND);

        if (triviaError || !trivia || trivia.length === 0) {
            console.warn(`No trivia found for island: ${island.name}`);
            continue;
        }

        for (const question of trivia) {
            if (!uniqueTriviaIds.has(question.id)) {
                taskInserts.push({
                    trivia_id: question.id,
                    assigned_date: today,
                    completed: false,
                    sub_category_id: question.sub_category_id,
                    island_id: island.id
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
            return [];
        }
        return insertedTasks;
    }
    return [];
}


async function fetchTriviaForTasks(tasks: any[]) {
    const triviaIds = tasks.map((task) => task.trivia_id);

    const { data: trivia, error: triviaError } = await supabase
        .from('trivia')
        .select('*')
        .in('id', triviaIds);

    if (triviaError) {
        console.error('Error fetching trivia:', triviaError.message);
        return new Response(
            JSON.stringify({ error: 'Error fetching trivia' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }

    const taskDetails = tasks.map((task) => {
        const question = trivia.find((q) => q.id === task.trivia_id);
        return {
            ...task,
            question: question ? question.question : 'Question not found',
            options: {
                a: question?.option_a,
                b: question?.option_b,
                c: question?.option_c
            },
            correct_option: question?.correct_option?.toLowerCase()
        };
    });

    return new Response(
        JSON.stringify({ tasks: taskDetails }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
}
