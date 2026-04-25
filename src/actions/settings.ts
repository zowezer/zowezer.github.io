"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

const SETTINGS_PATH = path.join(process.cwd(), "data", "settings.json");

interface Settings {
  defaultMode: "normal" | "red" | "blue";
  contactEmail: string;
  socials: {
    instagram: string;
    facebook: string;
    archive: string;
  };
}

export async function getSettings(): Promise<Settings> {
  try {
    const data = await fs.readFile(SETTINGS_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return { 
      defaultMode: "normal", 
      contactEmail: "contact@ecosoap.se",
      socials: {
        instagram: "",
        facebook: "",
        archive: ""
      }
    };
  }
}

export async function updateSettings(updates: Partial<Settings>) {
  try {
    const current = await getSettings();
    const updated = { ...current, ...updates };
    await fs.writeFile(SETTINGS_PATH, JSON.stringify(updated, null, 2));
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Settings update error:", error);
    return { success: false, error: "Failed to update settings" };
  }
}

export async function updateDefaultMode(mode: "normal" | "red" | "blue") {
  return updateSettings({ defaultMode: mode });
}

export async function updateContactEmail(email: string) {
  return updateSettings({ contactEmail: email });
}

export async function updateSocials(socials: Settings["socials"]) {
  return updateSettings({ socials });
}
