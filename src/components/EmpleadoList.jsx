import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Cell, Table, Row, TableWrapper } from "react-native-table-component";
import { useNavigation } from "@react-navigation/native";

const EmpleadoList = () => {
  const navigation = useNavigation();
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    // Aquí haces la llamada a tu API para obtener los datos de empleados
    fetch("https://apirest-production-90e7.up.railway.app/api/empleados/")
      .then((response) => response.json())
      .then((data) => setEmpleados(data))
      .catch((error) => console.error("Error fetching empleados:", error));
  }, []);

  const handleLink = (idEmpleado, nombreEmpleado) => {
    navigation.navigate("EmpleadoSubida", { idEmpleado, nombreEmpleado });
  };

  return (
    <View style={styles.container}>
      <Table borderStyle={{ borderWidth: 1 }}>
        <Row data={["Empleado"]} style={styles.head} textStyle={styles.text} />
        <TableWrapper>
          {empleados.map((empleado) => (
            <TableWrapper key={empleado.id} style={styles.row}>
              <Cell
                key={empleado.id}
                data={empleado.nombre_completo}
                textStyle={styles.text}
              />
              <TouchableOpacity
                onPress={() =>
                  handleLink(empleado.id, empleado.nombre_completo)
                }
              >
                <Text style={styles.link}>Link</Text>
              </TouchableOpacity>
            </TableWrapper>
          ))}
        </TableWrapper>
      </Table>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    padding: 30,
  },
  head: { height: 40, backgroundColor: "lightgreen", flexArr: [1, 1] },
  text: { textAlign: "center", fontWeight: "bold" },
  row: { flexDirection: "row", height: 28, alignItems: "center" },
  link: { color: "blue", marginLeft: 10 },
});

export default EmpleadoList;
