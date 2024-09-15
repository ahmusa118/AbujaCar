import { Text, StyleSheet } from "react-native";
const Banner = ({message, style}) => {
    return (
      <Text style={[styles.banner, style]}>
        {message}
      </Text>
    );
  };
  
  const styles = StyleSheet.create({
    banner: {
      position: 'absolute',
      right: -40,
      top: 20,
      width: 160,
      transform: [{ rotate: "45deg" }],
      backgroundColor: 'black',
      color: 'white',
      padding: 8,
      textAlign: 'center',
    },
  })
  export default Banner