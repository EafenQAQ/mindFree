import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://cbcrqhaccgfbytquaare.supabase.co";
const supabaseKey = "sb_publishable_tG6hPUHofHppIv1EOv7RRA_t-2CEOgG";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
