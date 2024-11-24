import { Text, View } from "react-native";

const Enrollment = () => {
    return (
        <View
            style={[
                {
                    flexDirection: 'column',
                    borderWidth: 1,
                    borderRadius: 6,
                    borderColor: '#00000030',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 20,
                },
            ]}
        >
            <Text
                style={{
                    width: '90%',
                    borderBottomWidth: 1,
                    borderColor: '#00000020',
                    paddingVertical: 6,
                }}
            >
                Pre-Primary :
            </Text>
            <Text
                style={{
                    width: '90%',
                    borderBottomWidth: 1,
                    borderColor: '#00000020',
                    paddingVertical: 6,
                }}
            >
                Primary :
            </Text>
            <Text
                style={{
                    width: '90%',
                    borderBottomWidth: 1,
                    borderColor: '#00000020',
                    paddingVertical: 6,
                }}
            >
                Middle :
            </Text>
            <Text
                style={{
                    width: '90%',
                    borderBottomWidth: 1,
                    borderColor: '#00000020',
                    paddingVertical: 6,
                }}
            >
                Secondary :
            </Text>
            <Text
                style={{
                    width: '90%',
                    paddingVertical: 6,
                }}
            >
                Senior Secondary :
            </Text>
        </View>
    );
};

export default Enrollment;
