import { createClient, isSupabaseConfigured } from "../supabase/client";
import { UserProfile } from "@/types/nutrition";

const DEMO_USER_KEY = "nutritrack_demo_user";
const DEMO_PROFILE_KEY = "nutritrack_demo_profile";

export interface AuthSession {
  user: {
    id: string;
    email: string;
    fullName: string;
  } | null;
  isDemo: boolean;
}

const DEFAULT_DEMO_USER = {
  id: "demo-user-101",
  email: "sathwik@nutritrack.io",
  fullName: "Sathwik Kumar",
};

const DEFAULT_DEMO_PROFILE: UserProfile = {
  id: "demo-user-101",
  email: "sathwik@nutritrack.io",
  fullName: "Sathwik Kumar",
  age: 23,
  gender: "male",
  heightCm: 175,
  weightKg: 68,
  dietaryPreference: "vegetarian",
  allergies: [],
  activityLevel: "moderate",
  nutritionGoal: "balanced_nutrition",
  isOnboarded: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export async function getCurrentUser(): Promise<AuthSession> {
  if (typeof window === "undefined") {
    return { user: null, isDemo: false };
  }

  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        return { user: null, isDemo: false };
      }
      return {
        user: {
          id: user.id,
          email: user.email || "",
          fullName: user.user_metadata?.full_name || user.email?.split("@")[0] || "User",
        },
        isDemo: false,
      };
    } catch {
      // Fall through to demo storage
    }
  }

  // Demo / local fallback mode
  const storedUser = localStorage.getItem(DEMO_USER_KEY);
  if (storedUser) {
    try {
      return { user: JSON.parse(storedUser), isDemo: true };
    } catch {
      // fallback
    }
  }

  // Initialize demo user if nothing exists yet
  localStorage.setItem(DEMO_USER_KEY, JSON.stringify(DEFAULT_DEMO_USER));
  if (!localStorage.getItem(DEMO_PROFILE_KEY)) {
    localStorage.setItem(DEMO_PROFILE_KEY, JSON.stringify(DEFAULT_DEMO_PROFILE));
  }

  return { user: DEFAULT_DEMO_USER, isDemo: true };
}

export async function loginWithEmail(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  if (isSupabaseConfigured()) {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  }

  // Local demo login
  const demoUser = {
    id: "demo-user-" + Math.abs(email.split("").reduce((a, b) => (a << 5) - a + b.charCodeAt(0), 0)),
    email,
    fullName: email.split("@")[0].replace(/[._]/g, " "),
  };
  localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
  return { success: true };
}

export async function registerWithEmail(
  email: string,
  password: string,
  fullName: string
): Promise<{ success: boolean; error?: string }> {
  if (isSupabaseConfigured()) {
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  }

  // Local demo registration
  const newUser = {
    id: "user-" + Date.now(),
    email,
    fullName,
  };
  localStorage.setItem(DEMO_USER_KEY, JSON.stringify(newUser));

  const newProfile: UserProfile = {
    id: newUser.id,
    email,
    fullName,
    dietaryPreference: "omnivore",
    allergies: [],
    activityLevel: "moderate",
    nutritionGoal: "balanced_nutrition",
    isOnboarded: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(DEMO_PROFILE_KEY, JSON.stringify(newProfile));

  return { success: true };
}

export async function logoutUser(): Promise<void> {
  if (isSupabaseConfigured()) {
    const supabase = createClient();
    await supabase.auth.signOut();
  }
  if (typeof window !== "undefined") {
    localStorage.removeItem(DEMO_USER_KEY);
  }
}

export async function resetPasswordForEmail(email: string): Promise<{ success: boolean; error?: string }> {
  if (isSupabaseConfigured()) {
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/dashboard/settings`,
    });
    if (error) return { success: false, error: error.message };
    return { success: true };
  }

  // Demo simulation
  return { success: true };
}
