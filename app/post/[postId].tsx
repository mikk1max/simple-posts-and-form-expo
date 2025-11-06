import { Post } from "@/types/types";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

export default function PostPage() {
  const { postId } = useLocalSearchParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://dummyjson.com/posts/${postId}`
        );
        setPost(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!post) {
    return <Text>Post not found</Text>;
  }

  return (
    <View style={{ alignItems: "center", paddingHorizontal: 20 }}>
      <Image
        source={{ uri: `https://static.photos/1024x576/${post.id}` }}
        style={{
          width: screenWidth,
          height: screenWidth * 0.6,
          marginBottom: 20,
        }}
      />
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.body}>{post.body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  body: {
    fontSize: 16,
    lineHeight: 22,
  },
});
