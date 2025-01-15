import { Text, View } from "react-native";

const Enrollment = ({data}) => {
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
                Class Nry: {data.ClassNryEnrol}
            </Text>
            <Text
                style={{
                    width: '90%',
                    borderBottomWidth: 1,
                    borderColor: '#00000020',
                    paddingVertical: 6,
                }}
            >
                Class LKG: {data.ClassLKGEnrol}
            </Text>
            <Text
                style={{
                    width: '90%',
                    borderBottomWidth: 1,
                    borderColor: '#00000020',
                    paddingVertical: 6,
                }}
            >
                Class UKG: {data.ClassUKGEnrol}
            </Text>
            <Text
                style={{
                    width: '90%',
                    borderBottomWidth: 1,
                    borderColor: '#00000020',
                    paddingVertical: 6,
                }}
            >
                Class 1: {data.Class1Enrol}
            </Text>
            <Text
                style={{
                    width: '90%',
                    borderBottomWidth: 1,
                    borderColor: '#00000020',
                    paddingVertical: 6,
                }}
            >
                Class 2: {data.Class2Enrol}
            </Text>
            <Text
                style={{
                    width: '90%',
                    borderBottomWidth: 1,
                    borderColor: '#00000020',
                    paddingVertical: 6,
                }}
            >
                Class 3: {data.Class3Enrol}
            </Text>
            <Text
                style={{
                    width: '90%',
                    borderBottomWidth: 1,
                    borderColor: '#00000020',
                    paddingVertical: 6,
                }}
            >
                Class 4: {data.Class4Enrol}
            </Text>
            <Text
                style={{
                    width: '90%',
                    borderBottomWidth: 1,
                    borderColor: '#00000020',
                    paddingVertical: 6,
                }}
            >
                Class 5: {data.Class5Enrol}
            </Text>
            <Text
                style={{
                    width: '90%',
                    borderBottomWidth: 1,
                    borderColor: '#00000020',
                    paddingVertical: 6,
                }}
            >
                Class 6: {data.Class6Enrol}
            </Text>
            <Text
                style={{
                    width: '90%',
                    borderBottomWidth: 1,
                    borderColor: '#00000020',
                    paddingVertical: 6,
                }}
            >
                Class 7: {data.Class7Enrol}
            </Text>
            <Text
                style={{
                    width: '90%',
                    borderBottomWidth: 1,
                    borderColor: '#00000020',
                    paddingVertical: 6,
                }}
            >
                Class 8: {data.Class8Enrol}
            </Text>
            <Text
                style={{
                    width: '90%',
                    borderBottomWidth: 1,
                    borderColor: '#00000020',
                    paddingVertical: 6,
                }}
            >
                Class 9: {data.Class9Enrol}
            </Text>
            <Text
                style={{
                    width: '90%',
                    borderBottomWidth: 1,
                    borderColor: '#00000020',
                    paddingVertical: 6,
                }}
            >
                Class 10: {data.Class10Enrol}
            </Text>
            <Text
                style={{
                    width: '90%',
                    borderBottomWidth: 1,
                    borderColor: '#00000020',
                    paddingVertical: 6,
                }}
            >
                Class 11: {data.Class11Enrol}
            </Text>
            <Text
                style={{
                    width: '90%',
                    borderBottomWidth: 1,
                    borderColor: '#00000020',
                    paddingVertical: 6,
                }}
            >
                Class 12: {data.Class12Enrol}
            </Text>
            <Text
                style={{
                    width: '90%',
                    borderBottomWidth: 1,
                    borderColor: '#00000020',
                    paddingVertical: 6,
                }}
            >
                Pre-Primary : {data.ppenrolment}
            </Text>
            <Text
                style={{
                    width: '90%',
                    borderBottomWidth: 1,
                    borderColor: '#00000020',
                    paddingVertical: 6,
                }}
            >
                Primary : {data.penrolment}
            </Text>
            <Text
                style={{
                    width: '90%',
                    borderBottomWidth: 1,
                    borderColor: '#00000020',
                    paddingVertical: 6,
                }}
            >
                Middle : {data.menrolment}
            </Text>
            <Text
                style={{
                    width: '90%',
                    borderBottomWidth: 1,
                    borderColor: '#00000020',
                    paddingVertical: 6,
                }}
            >
                Secondary : {data.senrolment}
            </Text>
            <Text
                style={{
                    width: '90%',
                    paddingVertical: 6,
                }}
            >
                Senior Secondary : {data.ssenrolment}
            </Text>
        </View>
    );
};

export default Enrollment;
