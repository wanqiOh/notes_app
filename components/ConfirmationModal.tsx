import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ConfirmationModal = ({ visible, onCancel, onConfirm }: { visible: boolean; onCancel: () => void; onConfirm: () => void }) => {
    if (!visible) return null;

    return (
        <Modal transparent animationType="fade" visible={visible}>
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Confirm</Text>
                    <Text style={styles.modalMessage}>Are you sure you want to delete all notes?</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={onConfirm}>
                            <Text style={styles.deleteText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
    modalContainer: { backgroundColor: "#fff", padding: 20, borderRadius: 10, width: "80%", alignItems: "center" },
    modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
    modalMessage: { fontSize: 16, color: "#666", marginBottom: 20, textAlign: "center" },
    buttonContainer: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
    button: { flex: 1, paddingVertical: 10, borderRadius: 5, alignItems: "center", marginHorizontal: 5 },
    cancelButton: { backgroundColor: "#ccc" },
    deleteButton: { backgroundColor: "#FF3B78" },
    cancelText: { color: "#000", fontWeight: "bold" },
    deleteText: { color: "#fff", fontWeight: "bold" },
});

export default ConfirmationModal;