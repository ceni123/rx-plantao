"use client";

import { createClient } from "../utils/supabase/client";

export default function SignOutButton() {
  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.assign("/login");
  }

  return (
    <button className="signout" type="button" onClick={signOut}>
      Sair
    </button>
  );
}
