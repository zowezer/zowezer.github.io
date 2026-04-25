export async function getSettings(): Promise<{ defaultMode: 'normal' | 'red' | 'blue', contactEmail: string, socials: any }> { 
  return { defaultMode: 'normal', contactEmail: 'contact@ecosoap.se', socials: { instagram: '', facebook: '', archive: '' } }; 
}
export async function updateSettings(updates: any) { return { success: true }; }
export async function updateDefaultMode(mode: any) { return { success: true }; }
export async function updateContactEmail(email: string) { return { success: true }; }
export async function updateSocials(socials: any) { return { success: true }; }
