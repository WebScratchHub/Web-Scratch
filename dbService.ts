import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { User, GeneratedImage, WebsiteProject, LearningProgress } from '../types';

const DB_NAME = 'WebScratchDB';
const DB_VERSION = 4; // Incremented version for new object store
const USER_STORE = 'users';
const IMAGE_STORE = 'images';
const WEBSITE_STORE = 'websites';
const SETTINGS_STORE = 'settings';
const LEARNING_PROGRESS_STORE = 'learningProgress';

interface WebScratchDB extends DBSchema {
  [USER_STORE]: {
    key: string;
    value: User;
    indexes: { 'by-email': string };
  };
  [IMAGE_STORE]: {
    key: string;
    value: GeneratedImage;
    indexes: { 'by-userId': string };
  };
  [WEBSITE_STORE]: {
    key: string;
    value: WebsiteProject;
    indexes: { 'by-userId': string };
  };
  [SETTINGS_STORE]: {
    key: string;
    value: { key: string; value: any };
  };
  [LEARNING_PROGRESS_STORE]: {
    key: string; // compound key `userId-courseId`
    value: LearningProgress;
    indexes: { 'by-userId': string };
  };
}

let db: IDBPDatabase<WebScratchDB>;

async function getDb() {
  if (!db) {
    db = await openDB<WebScratchDB>(DB_NAME, DB_VERSION, {
      upgrade(db, oldVersion) {
        if (oldVersion < 1) {
            if (!db.objectStoreNames.contains(USER_STORE)) {
              const userStore = db.createObjectStore(USER_STORE, { keyPath: 'id' });
              userStore.createIndex('by-email', 'email', { unique: true });
            }
            if (!db.objectStoreNames.contains(IMAGE_STORE)) {
              const imageStore = db.createObjectStore(IMAGE_STORE, { keyPath: 'id' });
              imageStore.createIndex('by-userId', 'userId');
            }
            if (!db.objectStoreNames.contains(SETTINGS_STORE)) {
              db.createObjectStore(SETTINGS_STORE, { keyPath: 'key' });
            }
        }
        if (oldVersion < 2) {
             if (!db.objectStoreNames.contains(WEBSITE_STORE)) {
              const websiteStore = db.createObjectStore(WEBSITE_STORE, { keyPath: 'id' });
              websiteStore.createIndex('by-userId', 'userId');
            }
        }
        if (oldVersion < 3) {
            if (db.objectStoreNames.contains('generatedCourses')) {
                db.deleteObjectStore('generatedCourses');
            }
        }
        if (oldVersion < 4) {
             if (!db.objectStoreNames.contains(LEARNING_PROGRESS_STORE)) {
                const progressStore = db.createObjectStore(LEARNING_PROGRESS_STORE, { keyPath: ['userId', 'courseId'] });
                progressStore.createIndex('by-userId', 'userId');
            }
        }
      },
    });
  }
  return db;
}

// User functions
export const putUser = async (user: User) => (await getDb()).put(USER_STORE, user);
export const getUserByEmail = async (email: string) => (await getDb()).getFromIndex(USER_STORE, 'by-email', email);
export const getUserById = async (id: string) => (await getDb()).get(USER_STORE, id);

// Image functions
export const addImage = async (image: GeneratedImage) => (await getDb()).add(IMAGE_STORE, image);
export const getImagesByUserId = async (userId: string) => (await getDb()).getAllFromIndex(IMAGE_STORE, 'by-userId', userId);
export const updateImage = async (image: GeneratedImage) => (await getDb()).put(IMAGE_STORE, image);
export const clearImagesByUserId = async (userId: string) => {
    const tx = (await getDb()).transaction(IMAGE_STORE, 'readwrite');
    const index = tx.store.index('by-userId');
    let cursor = await index.openCursor(userId);
    while (cursor) {
        await cursor.delete();
        cursor = await cursor.continue();
    }
    await tx.done;
};
export const addMultipleImages = async (images: GeneratedImage[]) => {
    const tx = (await getDb()).transaction(IMAGE_STORE, 'readwrite');
    await Promise.all(images.map(image => tx.store.add(image)));
    return tx.done;
};

// Website functions
export const addWebsite = async (website: WebsiteProject) => (await getDb()).add(WEBSITE_STORE, website);
export const getWebsitesByUserId = async (userId: string) => (await getDb()).getAllFromIndex(WEBSITE_STORE, 'by-userId', userId);
export const updateWebsite = async (website: WebsiteProject) => (await getDb()).put(WEBSITE_STORE, website);
export const deleteWebsite = async (id: string) => (await getDb()).delete(WEBSITE_STORE, id);
export const clearWebsitesByUserId = async (userId: string) => {
    const tx = (await getDb()).transaction(WEBSITE_STORE, 'readwrite');
    const index = tx.store.index('by-userId');
    let cursor = await index.openCursor(userId);
    while (cursor) {
        await cursor.delete();
        cursor = await cursor.continue();
    }
    await tx.done;
};
export const addMultipleWebsites = async (websites: WebsiteProject[]) => {
    const tx = (await getDb()).transaction(WEBSITE_STORE, 'readwrite');
    await Promise.all(websites.map(site => tx.store.add(site)));
    return tx.done;
};

// Settings functions
export const getSetting = async (key: string): Promise<any> => (await getDb()).get(SETTINGS_STORE, key).then(res => res?.value);
export const setSetting = async (key: string, value: any) => (await getDb()).put(SETTINGS_STORE, { key, value });

// Learning Progress Functions
export const getLearningProgressForUser = async (userId: string): Promise<LearningProgress[]> => {
    return (await getDb()).getAllFromIndex(LEARNING_PROGRESS_STORE, 'by-userId', userId);
}

export const updateLearningProgress = async (progress: LearningProgress) => {
    return (await getDb()).put(LEARNING_PROGRESS_STORE, progress);
}