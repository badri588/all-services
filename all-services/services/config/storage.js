import AsyncStorage from "@react-native-async-storage/async-storage";

const memoryStorage = globalThis.__servicesMemoryStorage ?? {};
globalThis.__servicesMemoryStorage = memoryStorage;
const PROFILE_EXTRAS_PREFIX = "adminProfileExtras:";

export async function getStoredItem(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ?? memoryStorage[key] ?? null;
  } catch (error) {
    return memoryStorage[key] ?? null;
  }
}

export async function setStoredItem(key, value) {
  memoryStorage[key] = value;

  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log("Using temporary in-memory storage", error?.message || error);
  }
}

export async function removeStoredItem(key) {
  delete memoryStorage[key];

  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("Could not remove item from native storage", error?.message || error);
  }
}

function getProfileExtrasKey(profile) {
  const identifier = profile?.id ?? profile?.mobile;
  return identifier ? `${PROFILE_EXTRAS_PREFIX}${identifier}` : null;
}

export async function getStoredProfileExtras(profile) {
  const key = getProfileExtrasKey(profile);
  if (!key) return {};

  try {
    const value = await getStoredItem(key);
    return value ? JSON.parse(value) : {};
  } catch (error) {
    console.log("Could not read stored profile extras", error?.message || error);
    return {};
  }
}

export async function setStoredProfileExtras(profile, extras) {
  const key = getProfileExtrasKey(profile);
  if (!key) return;

  const previousExtras = await getStoredProfileExtras(profile);
  const mergedExtras = { ...previousExtras, ...extras };
  await setStoredItem(key, JSON.stringify(mergedExtras));
}
