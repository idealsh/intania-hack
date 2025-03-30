import { supabase } from '../../../../lib/utils/supabase';
import type { RequestEvent } from '@sveltejs/kit';

export async function GET({ request }: RequestEvent) {
  try {
    // Get user_id from the request header (assumed to be passed from frontend)
    const userId = request.headers.get('user_id');

    // Validate user_id
    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'User ID is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Fetch user data from Supabase
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('username, xp, level, streak, gender, stats')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      console.error('Error fetching user:', userError?.message);
      return new Response(
        JSON.stringify({ error: 'User not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Fetch completed tasks for this user
    const { data: completedTasks, error: taskError } = await supabase
      .from('daily_tasks')
      .select('island_id, completed')
      .eq('user_id', userId)
      .eq('completed', true);

    if (taskError) {
      console.error('Error fetching tasks:', taskError.message);
    }

    // Check completion status per island
    const completedIslands = new Set(
      completedTasks?.map((task) => task.island_id)
    );

    // Check total islands available
    const { data: islands, error: islandError } = await supabase
      .from('islands')
      .select('id');

    if (islandError || !islands || islands.length === 0) {
      console.error('Error fetching islands:', islandError?.message);
    }

    const totalIslands = islands ? islands.length : 0;

    // Check if at least one island and all islands are completed
    const oneIslandFinished = completedIslands.size >= 1;
    const allIslandsFinished = completedIslands.size === totalIslands;

    const isBoy = user.gender?.toLowerCase() === 'male';

    return new Response(
      JSON.stringify({
        name: user.username,
        level: user.level,
        currentXP: user.xp,
        streak: user.streak,
        isBoy,
        stats: user.stats, 
        oneIslandFinished,
        allIslandsFinished
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error(' Internal Server Error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
