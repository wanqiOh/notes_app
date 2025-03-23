import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import styles from "../styles/styles";
import { Ionicons } from "@expo/vector-icons";

const NoteCard = ({ onPress, title, children }: { onPress: () => void; title: string; children: React.ReactNode; }) => {
    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.container}>
                <View style={
                    ["Edit Note", "New Note", "Settings"].includes(title) ? styles.backHeader : styles.header}>
                    {
                        ["Edit Note", "New Note", "Settings"].includes(title) && <TouchableOpacity onPress={onPress}>
                            <Ionicons name="chevron-back" size={24} color="#A0A0A0" />
                        </TouchableOpacity>
                    }
                    <Text style={
                        ["Edit Note", "New Note", "Settings"].includes(title) ? styles.backHeaderText : styles.headerText}>
                        {title}
                    </Text>
                    {
                        title === "Home" && <TouchableOpacity onPress={onPress}>
                            <Ionicons name="settings-outline" size={24} color="#A0A0A0" />
                        </TouchableOpacity>
                    }
                </View>

                {children}
            </View>
        </SafeAreaView>
    );
};

export default NoteCard;