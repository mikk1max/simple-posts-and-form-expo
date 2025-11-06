import { FormData } from "@/types/types";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Modal, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function FormPage() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onSubmit = (data: FormData) => {
    console.log(data);
    setModalVisible(false);
  };

  const onError = (_errors: any) => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Full Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="John Smith"
            mode="outlined"
          />
        )}
        name="username"
        rules={{ required: true }}
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="QWERTY123"
            secureTextEntry={true}
            mode="outlined"
          />
        )}
        name="password"
        rules={{ required: true }}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ color: "red" }}>Please fill in all fields.</Text>
            <Button
              onPress={() => setModalVisible(false)}
              mode="contained"
              style={{ marginTop: 15 }}
            >
              Close
            </Button>
          </View>
        </View>
      </Modal>

      <Button onPress={handleSubmit(onSubmit, onError)} mode="contained">
        Submit
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
