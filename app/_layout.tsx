import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="post/[postId]"
        options={({ route }) => ({
          title: `Post ${(route.params as { postId?: string })?.postId ?? ""}`,
          headerBackTitle: "Back",
        })}
      />
    </Stack>
  );
}
