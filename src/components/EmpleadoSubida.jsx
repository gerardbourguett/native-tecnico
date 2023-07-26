import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import axios from "axios";
import { Table, Row, TableWrapper, Cell } from "react-native-table-component";

const EmpleadoSubida = ({ route }) => {
  const { idEmpleado, nombreEmpleado } = route.params;
  const [loading, setLoading] = useState(true);
  const [empleadosPorId, setEmpleadosPorId] = useState([]);
  const [nombreArchivo, setNombreArchivo] = useState("");

  useEffect(() => {
    // Hacemos la solicitud a la API para obtener los empleados con el mismo idEmpleado
    axios
      .get(
        `https://api-nazar-production.up.railway.app/api/empleados/${idEmpleado}`
      )
      .then((response) => {
        setEmpleadosPorId(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching empleados por ID:", error);
        setLoading(false);
      });
  }, [idEmpleado]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  const tableData = {
    tableHead: ["#", "Nombre del Archivo", "Ver"],
    tableData: empleadosPorId.map((emp) => [
      emp.id_empleado,
      emp.nombre_archivo,
      "Ver",
    ]),
  };

  const actualizarDatos = () => {
    // Hacemos la solicitud GET a la API para obtener los empleados con el mismo idEmpleado
    axios
      .get(
        `https://api-nazar-production.up.railway.app/api/empleados/${idEmpleado}`
      )
      .then((response) => {
        setEmpleadosPorId(response.data);
      })
      .catch((error) => {
        console.error("Error fetching empleados por ID:", error);
      });
  };

  const handleSubirDatos = () => {
    if (!nombreArchivo) {
      alert("Por favor, ingresa un nombre de archivo.");
      return;
    }

    const datosData = {
      id_empleado: idEmpleado,
      nombre_archivo: nombreArchivo,
    };

    // Realizamos la solicitud POST a la API para subir los datos
    axios
      .post(
        "https://api-nazar-production.up.railway.app/api/archivos/",
        datosData
      )
      .then((response) => {
        console.log("Datos subidos correctamente:", response.data);
        actualizarDatos(); // Llamada a actualizarDatos después de subir los datos
      })
      .catch((error) => {
        console.error("Error al subir los datos:", error);
      });
  };

  return (
    <View>
      <Text style={styles.heading}>EmpleadoSubida</Text>
      <Text>Nombre del empleado: {nombreEmpleado}</Text>
      <Text>Archivos subidos por el empleado:</Text>
      <Table borderStyle={{ borderWidth: 1 }}>
        <Row
          data={tableData.tableHead}
          style={styles.head}
          textStyle={styles.text}
        />
        {tableData.tableData.map((rowData, index) => (
          <TableWrapper key={index} style={styles.row}>
            {rowData.map((cellData, cellIndex) => (
              <Cell
                key={cellIndex}
                data={cellData}
                textStyle={styles.text}
                flex={cellIndex === 1 ? 2 : 1} // Ajustamos el ancho de la columna del nombre del empleado
              />
            ))}
          </TableWrapper>
        ))}
      </Table>

      <TextInput
        style={styles.input}
        placeholder="Nombre del archivo"
        value={nombreArchivo}
        onChangeText={setNombreArchivo}
      />

      <Button title="Subir datos" onPress={handleSubirDatos} />
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  head: { height: 40, backgroundColor: "lightgreen" },
  text: { textAlign: "center", fontWeight: "bold" },
  row: { flexDirection: "row", height: 28, alignItems: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
});

export default EmpleadoSubida;
