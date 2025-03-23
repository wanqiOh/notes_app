import React, { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, SafeAreaView } from "react-native";
import { RouteProp, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { getNotes, initializeNotes } from "../storage/storage";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import styles from "../styles/styles";
import { StackNavigationProp } from "@react-navigation/stack";
import NoteCard from "../components/NoteCard";

export interface Note {
    id: string;
    category: string;
    content: string;
}

export type RootStackParamList = {
    Home: { selectedCategory?: string } | undefined;
    Summary: undefined;
    Settings: undefined;
    NewNote: { noteId?: string, selectedCategory?: string, noteContent?: string } | undefined;
};

const categoryIcons: { [key: string]: keyof typeof MaterialIcons.glyphMap } = {
    "Work and Study": "school",
    "Life": "restaurant",
    "Health and Wellness": "fitness-center",
};

const HomeScreen: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, "Home">>();
    const route = useRoute<RouteProp<RootStackParamList, "Home">>();
    const { selectedCategory } = route.params || {};
    const [notes, setNotes] = useState<Note[]>([]);

    const loadNotes = async () => {
        await initializeNotes();
        const storedNotes = await getNotes();
        const filteredNotes = selectedCategory
            ? storedNotes.filter((note: { category: string; }) => note.category === selectedCategory)
            : storedNotes;

        setNotes(filteredNotes);
    };

    useFocusEffect(
        useCallback(() => {
            loadNotes();
            return () => {
                navigation.setParams({ selectedCategory: undefined });
            };
        }, [selectedCategory])
    );

    const renderItem = ({ item }: { item: Note }) => (
        <TouchableOpacity
            style={styles.noteItem}
            onPress={() =>
                navigation.navigate("NewNote", {
                    noteId: item.id, selectedCategory: item.category, noteContent: item.content
                })}>
            <View style={styles.iconContainer}>
                <MaterialIcons name={categoryIcons[item.category]} size={20} color="#A463F2" />
            </View>
            <View style={styles.noteTextContainer}>
                <Text style={styles.categoryText}>{item.category}</Text>
                <Text style={styles.titleText}>{item.content}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#FF3B78" />
        </TouchableOpacity>
    );

    return (
        <NoteCard
            onPress={() => navigation.navigate("Settings")}
            title={"Home"}
            children={
                <>
                    <Text style={styles.recentNotes}>⏳ Recently created notes</Text>
                    <FlatList data={notes} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
                </>
            } />
    );
};

export default HomeScreen;
