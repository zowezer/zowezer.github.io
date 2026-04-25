export async function getSettings(): Promise<{ defaultMode: 'normal' | 'red' | 'blue', contactEmail: string, socials: any }> { 
  return { defaultMode: 'normal', contactEmail: 'contact@ecosoap.se', socials: { instagram: '', facebook: '', archive: '' } }; 
}
export async function updateSettings() { return { success: true }; }
export async function updateDefaultMode() { return { success: true }; }
export async function updateContactEmail() { return { success: true }; }
export async function updateSocials() { return { success: true }; }
