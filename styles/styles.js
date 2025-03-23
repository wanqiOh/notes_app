import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: "#1B0B2B",
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    headerText: {
        fontSize: 28,
        fontWeight: "bold",
        color: "white",
    },
    noteItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#2E1653",
        padding: 15,
        borderRadius: 15,
        marginBottom: 10,
    },
    iconContainer: {
        backgroundColor: "#3B2266",
        padding: 8,
        borderRadius: 50,
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    noteTextContainer: {
        flex: 1,
    },
    categoryText: {
        fontSize: 12,
        color: "#A0A0A0",
    },
    titleText: {
        fontSize: 16,
        color: "white",
        fontWeight: "500",
    },
    button: {
        backgroundColor: "#FF3B78",
        paddingVertical: 12,
        paddingHorizontal: 100,
        borderRadius: 25,
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    recentNotes: {
        fontSize: 14,
        color: "#A0A0A0",
        marginBottom: 10,
    },
    categoryCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#2A2A2A",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    categoryIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    categoryTitle: {
        fontSize: 16,
        color: "#FFFFFF",
        fontWeight: "bold",
    },
    recordCount: {
        fontSize: 14,
        color: "#A0A0A0",
    },
    detailButton: {
        backgroundColor: "#FF3B78",
        padding: 10,
        borderRadius: 8,
    },
    detailButtonText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "bold",
    },
    loadingText: {
        fontSize: 16,
        color: "#A0A0A0",
        textAlign: "center",
        marginTop: 20,
    },
    emptyText: {
        fontSize: 16,
        color: "#A0A0A0",
        textAlign: "center",
        marginTop: 40,
    },
    backHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    backHeaderText: {
        fontSize: 28,
        fontWeight: "bold",
        color: "white",
        marginLeft: 10
    },
});

export default styles;