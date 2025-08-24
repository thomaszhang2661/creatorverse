import { createClient } from "@supabase/supabase-js";

const URL = "https://gjombvdjymhsjyyovyrm.supabase.co";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdqb21idmRqeW1oc2p5eW92eXJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5NTU2MzcsImV4cCI6MjA3MTUzMTYzN30.OSb9-KuyctSzHe35lLGWBo9B4dH6NE5l_F64EN0BJ5k";

export const supabase = createClient(URL, API_KEY);
