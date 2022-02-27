import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';


export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <View style={styles.container}>
      {/*<Text style={styles.title}>Research</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />*/}
      <WebView
        originWhitelist={['*']}
        source={{uri: 'https://blackcloudconcepts.github.io/cdn/2021_MLB_Prediction_Runs.html'}}
        style={{marginTop: -15, flex: 1, width: 500}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
      {/*<EditScreenInfo path="/screens/TabOneScreen.tsx" />*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
