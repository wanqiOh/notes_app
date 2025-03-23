import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, FlatList, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/styles";
import { getSettingsOptions, saveSettingsOptions, clearNotes } from "../storage/storage";
import { useNavigation } from "@react-navigation/native";
import ConfirmationModal from "../components/ConfirmationModal";
import PopoutMessage from "../components/PopupMessage";

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
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={24} color="#A0A0A0" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Settings</Text>
                    <View style={{ width: 24 }} />
                </View>

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
            </View>
        </SafeAreaView>
    );
};

export default SettingsScreen;