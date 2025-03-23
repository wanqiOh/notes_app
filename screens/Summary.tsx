import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, Image } from "react-native";
import { getCategoryCount } from "../storage/storage";
import styles from "../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./Home";
import NoteCard from "../components/NoteCard";

const categoryIcons: any = {
    "Work and Study": require("../assets/work.png"),
    "Life": require("../assets/home.png"),
    "Health and Wellness": require("../assets/health.png"),
};

const SummaryScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, "Summary">>();
    const [categoryCounts, setCategoryCounts] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        const fetchCategoryCounts = async () => {
            const counts = await getCategoryCount();
            setCategoryCounts(counts);
        };
        fetchCategoryCounts();
    }, []);

    const handleDetailPress = (category: string) => {
        navigation.navigate("Home", { selectedCategory: category });
    };

    const renderItem = ({ item }: any) => (
        <View style={styles.noteItem}>
            <View style={styles.iconContainer}>
                <Image
                    source={categoryIcons[item.category]}
                    style={[styles.categoryIcon, { width: 24, height: 24, tintColor: "#A463F2", resizeMode: "contain" }]} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.categoryTitle}>{item.category}</Text>
                <Text style={styles.recordCount}>This topic has a total of {item.count} records.</Text>
            </View>
            <TouchableOpacity style={styles.detailButton} onPress={() => handleDetailPress(item.category)}>
                <Text style={styles.detailButtonText}>Detail</Text>
            </TouchableOpacity>
        </View>
    );

    const categories = Object.keys(categoryCounts).map((key) => ({
        category: key,
        count: categoryCounts[key],
    }));

    return (
        <NoteCard
            onPress={() => navigation.goBack()}
            title={"Summary"}
            children={
                <>
                    <FlatList
                        data={categories}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.category}
                    />
                </>
            } />
    );
};

export default SummaryScreen;