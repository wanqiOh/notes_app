import AsyncStorage from "@react-native-async-storage/async-storage";
import { Note } from "../screens/Home";

const NOTES_KEY = "notes";

// 初始化默认笔记
const defaultNotes = [
    { id: "1", category: "Work and Study", content: "Overview of basic computer networking knowledge" },
    { id: "2", category: "Work and Study", content: "How to calculate float multiplication and division in JavaScript?" },
    { id: "3", category: "Life", content: "Pan-fried chicken breast with vegetable salad" },
    { id: "4", category: "Health and Wellness", content: "Maintain sufficient daily water intake" },
];

// **检查是否已有笔记，否则初始化**
export const initializeNotes = async () => {
    const storedNotes = await AsyncStorage.getItem(NOTES_KEY);
    if (!storedNotes) {
        await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(defaultNotes));
    }
};

// **获取所有笔记**
export const getNotes = async () => {
    const jsonNotes = await AsyncStorage.getItem(NOTES_KEY);
    return jsonNotes ? JSON.parse(jsonNotes) : [];
};

// **编辑笔记**
export const editNote = async (id: string, newCategory: string, newContent: string) => {
    const notes = await getNotes();
    const updatedNotes = notes.map((note: Note) =>
        note.id === id ? { ...note, category: newCategory, content: newContent, icon: getCategoryIcon(newCategory) } : note
    );

    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(updatedNotes));
};

// **添加新笔记**
export const addNote = async (category: string, content: string) => {
    const notes = await getNotes();
    const newNote = { id: Date.now().toString(), category, content, icon: getCategoryIcon(category) };
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify([newNote, ...notes]));
};

// **获取分类笔记数量**
export const getCategoryCount = async () => {
    const notes = await getNotes();
    return notes.reduce((acc: { [x: string]: any; }, note: { category: string | number; }) => {
        acc[note.category] = (acc[note.category] || 0) + 1;
        return acc;
    }, {});
};

// **清空所有笔记**
export const clearNotes = async () => {
    await AsyncStorage.removeItem(NOTES_KEY);
};

// **根据分类获取图标**
const getCategoryIcon = (category: any) => {
    switch (category) {
        case "Work and Study": return "school";
        case "Life": return "restaurant";
        case "Health and Wellness": return "fitness-center";
        default: return "note";
    }
};

const SETTINGS_KEY = "settingsOptions";

// 默认设置选项
const defaultSettings = [
    { id: "1", title: "Online Customer", icon: "headset-outline" },
    { id: "2", title: "User Agreement", icon: "document-text-outline" },
    { id: "3", title: "Privacy Policy", icon: "shield-checkmark-outline" },
    { id: "4", title: "About Us", icon: "information-circle-outline" },
];

// 存储设置选项（只运行一次）
export const saveSettingsOptions = async () => {
    const existingSettings = await AsyncStorage.getItem(SETTINGS_KEY);
    if (!existingSettings) {
        await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(defaultSettings));
    }
};

// 获取设置选项
export const getSettingsOptions = async () => {
    const jsonSettings = await AsyncStorage.getItem(SETTINGS_KEY);
    return jsonSettings ? JSON.parse(jsonSettings) : defaultSettings;
};