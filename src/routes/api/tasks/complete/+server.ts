import { supabase } from '../../../../lib/utils/supabase';
import type { RequestEvent } from '@sveltejs/kit';

interface CompleteTaskBody {
    task_id: number;
    user_id: string;
}

const XP_PER_TASK = 10;
const XP_THRESHOLD = 100;

export async function POST({ request }: RequestEvent) {
    try {
        const { task_id, user_id }: CompleteTaskBody = await request.json();

        if (!task_id || !user_id) {
            return new Response(
                JSON.stringify({ error: 'Task ID and User ID are required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Step 1: Check if the task exists and is not already completed
        const { data: task, error: taskError } = await supabase
            .from('daily_tasks')
            .select('id, trivia_id, completed, island_id, sub_category_id')
            .eq('id', task_id)
            .single();

        if (taskError || !task) {
            return new Response(
                JSON.stringify({ error: 'Task not found or not available' }),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Step 2: Check if task is already completed
        if (task.completed) {
            return new Response(
                JSON.stringify({ message: 'Task is already completed!' }),
                { status: 200, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Step 3: Mark the task as completed
        const { error: updateError } = await supabase
            .from('daily_tasks')
            .update({ completed: true })
            .eq('id', task_id);

        if (updateError) {
            console.error('Error marking task as completed:', updateError.message);
            return new Response(
                JSON.stringify({ error: 'Error marking task as completed' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Step 4: Fetch the user's current XP and level
        const { data: user, error: userError } = await supabase
            .from('users')
            .select('xp, level')
            .eq('id', user_id)
            .single();

        if (userError || !user) {
            return new Response(
                JSON.stringify({ error: 'User not found' }),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Step 5: Update XP and check for level up
        let newXP = user.xp + XP_PER_TASK;
        let newLevel = user.level;
        let levelUp = false;

        // Level up if XP exceeds threshold
        if (newXP >= XP_THRESHOLD) {
            newXP -= XP_THRESHOLD; // Reset XP after level-up
            newLevel += 1; // Increase level
            levelUp = true;
        }

        // Step 6: Update user's XP and level
        const { error: xpError } = await supabase
            .from('users')
            .update({ xp: newXP, level: newLevel })
            .eq('id', user_id);

        if (xpError) {
            console.error( 'Error updating user XP/level:', xpError.message);
            return new Response(
                JSON.stringify({ error: 'Error updating user XP/level' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Return success response
        return new Response(
            JSON.stringify({
                message: 'Task marked as completed successfully!',
                xp_earned: XP_PER_TASK,
                level_up: levelUp
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (err) {
        console.error('Task Completion Error:', err);
        return new Response(
            JSON.stringify({ error: 'Internal server error' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
