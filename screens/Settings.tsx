import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, FlatList, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/styles";
import { getSettingsOptions, saveSettingsOptions, clearNotes } from "../storage/storage";
import { useNavigation } from "@react-navigation/native";
import ConfirmationModal from "../components/ConfirmationModal";
import PopoutMessage from "../components/PopupMessage";
import NoteCard from "../components/NoteCard";

const SettingsScreen: React.FC = () => {
    const navigation = useNavigation();
    const [showModal, setShowModal] = useState(false);
    const [showPopout, setShowPopout] = useState(false);
    const [settingsOptions, setSettingsOptions] = useState<any[]>([]);

    useEffect(() => {
        const loadSettings = async () => {
            await saveSettingsOptions();
            const options = await getSettingsOptions();
            setSettingsOptions(options ?? []);
        };

        loadSettings();
    }, []);

    const handleDeleteNotes = async () => {
        setShowModal(true); // Show confirmation modal
    };

    const confirmDelete = async () => {
        setShowModal(false);
        await clearNotes();
        setShowPopout(true); // Show popout notification
    };

    return (
        <NoteCard
            onPress={() => navigation.goBack()}
            title={"Settings"}
            children={
                <>
                    {/* Settings List */}
                    <FlatList
                        data={settingsOptions}
                        keyExtractor={(item: any) => item.id.toString()}
                        renderItem={({ item }: any) => (
                            <TouchableOpacity style={styles.noteItem}>
                                <View style={styles.iconContainer}>
                                    <Ionicons name={item.icon} size={24} color="#A463F2" />
                                </View>
                                <View style={styles.noteTextContainer}>
                                    <Text style={styles.titleText}>{item.title}</Text>
                                </View>
                                <Ionicons name="chevron-forward-outline" size={20} color="#FF3B78" />
                            </TouchableOpacity>
                        )}
                    />

                    {/* Delete All Notes Button */}
                    <TouchableOpacity style={styles.button} onPress={handleDeleteNotes}>
                        <Text style={styles.buttonText}>Delete All Notes</Text>
                    </TouchableOpacity>


                    {/* Confirmation Modal */}
                    <ConfirmationModal visible={showModal} onCancel={() => setShowModal(false)} onConfirm={confirmDelete} />

                    {/* Popout Message */}
                    <PopoutMessage message="All notes have been cleared" visible={showPopout} onHide={() => setShowPopout(false)} />
                </>
            } />
    );
};

export default SettingsScreen;