import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function TabThreeScreen() {
  const [valueA, setValueA] = useState<any>(null);
  const [errorA, setErrorA] = useState(null);
  const [loadingA, setLoadingA] = useState(true);
  async function getData() {
    try {
      setLoadingA(true);
      const response = await fetch(
        "https://api.spacexdata.com/v4/launches/past",
        {}
      );
      const json = await response.json();
      // console.log(json);
      setValueA(json);
    // } catch (e) {
    //   setErrorA(e);
    } finally {
      setLoadingA(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  function returnLoop(){
    let rows = [];
    if (valueA){
      for (var i = valueA.length - 1; i >= 0; i--) {
        var dte = new Date(valueA[i].date_local);
          rows.push(<Text>
            {dte.getMonth()}/{dte.getDate()}/{dte.getFullYear()}&nbsp;-&nbsp;{valueA[i].name}
          </Text>)
      }
    }
    return(rows);
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.separator} >
        {
          returnLoop()
        }
      </ScrollView>
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
