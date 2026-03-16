import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";

const DEFAULT_PHONE = "(123) 456-7890";

async function getPhone(): Promise<string> {
  try {
    const { data, error } = await supabase
      .from("clinic_settings")
      .select("value")
      .eq("key", "phone")
      .single();

    if (error || !data) return DEFAULT_PHONE;
    return data.value || DEFAULT_PHONE;
  } catch {
    return DEFAULT_PHONE;
  }
}

export default async function NavbarWrapper() {
  const phone = await getPhone();
  return <Navbar phone={phone} />;
}
