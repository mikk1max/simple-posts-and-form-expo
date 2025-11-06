import { Post } from "@/types/types";
import axios from "axios";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://dummyjson.com/posts");
        // console.log(response.data);
        setPosts(response.data.posts);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const renderItem = ({ item }: { item: Post }) => {
    return (
      <TouchableOpacity
        style={styles.postContainer}
        onPress={() => router.push(`/post/${item.id}`)}
      >
        <Image
          source={{ uri: `https://static.photos/200x200/${item.id}` }}
          style={{ width: 100, height: 100 }}
        />
        <Text style={styles.postTitle}>{item.title}</Text>
        {/* <Text>{item.body}</Text> */}
      </TouchableOpacity>
    );
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (posts.length === 0) {
    return <Text>No posts available</Text>;
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.mainTitle}>New posts</Text> */}
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  postContainer: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "100%",
    gap: 10,
    backgroundColor: "#f7f7f7",
    padding: 10,
    marginBottom: 10,
  },
  postTitle: {
    textTransform: "uppercase",
    fontSize: 20,
    flexShrink: 1,
  },
});
