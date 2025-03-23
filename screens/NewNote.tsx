import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert } from "react-native";
import { RouteProp, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParamList } from "./Home";
import { StackNavigationProp } from "@react-navigation/stack";
import styles from "../styles/styles";
import PopoutMessage from "../components/PopupMessage";

const CATEGORIES_KEY = "categories";
const NOTES_KEY = "notes";

const NewNoteScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, "NewNote">>();
    const route = useRoute<RouteProp<RootStackParamList, "NewNote">>();

    // Get params (noteId means we are editing an existing note)
    const { noteId, selectedCategory, noteContent } = route.params || {};

    // State for note fields
    const [category, setCategory] = useState(selectedCategory || null);
    const [content, setContent] = useState(noteContent || "");
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState<{ label: string; value: string }[]>([]);

    const clearFields = () => {
        setCategory(null);
        setContent("");
    }

    useFocusEffect(
        useCallback(() => {
            return () => {
                clearFields();
                navigation.setParams({ noteId: undefined, selectedCategory: undefined, noteContent: undefined });
            };
        }, [navigation])
    );

    // Load categories from storage
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const storedCategories = await AsyncStorage.getItem(CATEGORIES_KEY);
                if (storedCategories) {
                    setCategories(JSON.parse(storedCategories));
                }
            } catch (error) {
                console.error("Failed to load categories:", error);
            }
        };
        loadCategories();
    }, []);

    // Load existing note if editing
    useEffect(() => {
        if (noteId) {
            const loadExistingNote = async () => {
                try {
                    const storedNotes = await AsyncStorage.getItem(NOTES_KEY);
                    const notes = storedNotes ? JSON.parse(storedNotes) : [];
                    const existingNote = notes.find((note: { id: string }) => note.id === noteId);

                    if (existingNote) {
                        setCategory(existingNote.category);
                        setContent(existingNote.content);
                    }
                } catch (error) {
                    console.error("Failed to load existing note:", error);
                }
            };
            loadExistingNote();
        }
    }, [noteId]);

    // Save or update note
    const handleSaveNote = async () => {
        if (!category) {
            Alert.alert("Error", "Please select a category");
            return;
        }
        if (!content.trim()) {
            Alert.alert("Error", "Note content cannot be empty");
            return;
        }

        try {
            const notes = await AsyncStorage.getItem(NOTES_KEY);
            let parsedNotes = notes ? JSON.parse(notes) : [];

            if (noteId) {
                // Update existing note
                parsedNotes = parsedNotes.map((note: { id: string }) =>
                    note.id === noteId ? { ...note, category, content } : note
                );
                Alert.alert("Success", "Note updated!");
            } else {
                // Add new note
                const newNote = { id: Date.now().toString(), category, content };
                parsedNotes = [newNote, ...parsedNotes];
                Alert.alert("Success", "Note saved!");
            }

            await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(parsedNotes));
            clearFields();
            navigation.goBack();
        } catch (error) {
            console.error("Failed to save note:", error);
        }
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.container}>
                {/* Header */}
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
                    <TouchableOpacity onPress={() => {
                        clearFields();
                        navigation.setParams({ noteId: undefined, selectedCategory: undefined, noteContent: "" });
                        navigation.goBack();
                    }}>
                        <Ionicons name="chevron-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={{ color: "#fff", fontSize: 20, marginLeft: 10 }}>
                        {noteId ? "Edit Note" : "New Note"}
                    </Text>
                </View>

                {/* Category Dropdown */}
                <DropDownPicker
                    open={open}
                    value={category}
                    items={categories}
                    setOpen={setOpen}
                    setValue={setCategory}
                    setItems={setCategories}
                    placeholder="Choose a category"
                    containerStyle={{ marginBottom: 20 }}
                    style={{ backgroundColor: "#2A1244", borderWidth: 0 }}
                    dropDownContainerStyle={{ backgroundColor: "#2A1244" }}
                    textStyle={{ color: "#fff" }}
                />

                {/* Note Input */}
                <TextInput
                    style={{
                        height: 150,
                        backgroundColor: "#2A1244",
                        color: "#fff",
                        padding: 10,
                        borderRadius: 10,
                        textAlignVertical: "top"
                    }}
                    placeholder="Please input note content"
                    placeholderTextColor="#999"
                    multiline
                    value={content}
                    onChangeText={setContent}
                />

                {/* Save Button */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSaveNote}
                >
                    <Text style={styles.buttonText}>{noteId ? "Update Note" : "Save"}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default NewNoteScreen;
