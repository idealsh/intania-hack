import { supabase } from '../../../../lib/utils/supabase';
import type { RequestEvent } from '@sveltejs/kit';

export async function POST({ request }: RequestEvent) {
    try {
        const { user_id } = await request.json();

        if (!user_id) {
            return new Response(
                JSON.stringify({ error: 'User ID is required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        
        const { data: user, error: userError } = await supabase
            .from('users')
            .select('streak, last_completed_date')
            .eq('id', user_id)
            .single();

        if (userError || !user) {
            return new Response(
                JSON.stringify({ error: 'User not found' }),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const today = new Date().toISOString().split('T')[0];
        const lastCompletedDate = user.last_completed_date || null;

        let updatedStreak = user.streak || 0;

        // Check if last completed date is yesterday
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = yesterday.toISOString().split('T')[0];

        //  Continue Streak
        if (lastCompletedDate === yesterdayString) {
            updatedStreak += 1; // Increment streak
        } 
        //  Missed Day, Reset Streak
        else if (lastCompletedDate !== today) {
            updatedStreak = 1; // Reset streak
        }

        // Update streak and last completed date
        const { error: updateError } = await supabase
            .from('users')
            .update({ streak: updatedStreak, last_completed_date: today })
            .eq('id', user_id);

        if (updateError) {
            console.error('Error updating streak:', updateError.message);
            return new Response(
                JSON.stringify({ error: 'Error updating streak' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }

        return new Response(
            JSON.stringify({
                message: 'Streak updated successfully!',
                streak: updatedStreak,
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (err) {
        console.error('Error:', err);
        return new Response(
            JSON.stringify({ error: 'Internal server error' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
