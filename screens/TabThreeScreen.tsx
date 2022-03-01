import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function TabThreeScreen() {
  // const initTime = Date.now();
  const [valueA, setValueA] = useState<any>(null);
  const [errorA, setErrorA] = useState(null);
  const [loadingA, setLoadingA] = useState(true);
  async function getData() {
    try {
      setLoadingA(true);
      const response = await fetch(
        //"https://api.spacexdata.com/v4/launches/past",
        "https://blackcloudconcepts.github.io/cdn/mlbr_20211003_selected.json",
        {}
      );
      const json = await response.json();
      //console.log(json);
      setValueA(json);
    // } catch (e) {
    //   setErrorA(e);
    } finally {
      // setLoadingA(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  // function returnLoop(){
  //   let rows = [];
  //   if (valueA){
  //     for (var i = valueA.length - 1; i >= valueA.length-20; i--) {
  //       var dte = new Date(valueA[i].date_local);
  //       rows.push(<Text key={valueA[i].id+initTime}>
  //         {dte.getMonth()}/{dte.getDate()}/{dte.getFullYear()}&nbsp;-&nbsp;{valueA[i].name}
  //       </Text>)
  //     }
  //   }
  //   return(rows);
  // }

  function returnLoop(){
    let rows: JSX.Element[] = [];
    rows.push(<View key="Header" style={styles.row}>
      <Text key="HeaderName" style={styles.headercellname}>
        Name
      </Text>
      <Text key="HeaderPos" style={styles.headercelldetail}>
        Pos
      </Text>
      <Text key="HeaderTeam" style={styles.headercelldetail}>
        Team
      </Text>
      <Text key="HeaderSalary" style={styles.headercelldetail}>
        Salary
      </Text>
    </View>)
    if (valueA){
      valueA.forEach((obj: { Name_Team_ID: any; Name: any; Pos: any; Team: any; Salary: any; }) => {
        rows.push(
          <View key={obj.Name_Team_ID} style={styles.row}>
            <Text key={obj.Name+obj.Name_Team_ID} style={styles.cellname}>
              {obj.Name}
            </Text>
            <Text key={obj.Pos+obj.Name_Team_ID} style={styles.celldetail}>
              {obj.Pos}
            </Text>
            <Text key={obj.Team+obj.Name_Team_ID} style={styles.celldetail}>
              {obj.Team}
            </Text>
            <Text key={obj.Salary+obj.Name_Team_ID} style={styles.celldetail}>
              ${obj.Salary}
            </Text>
          </View>
        )
      });
    }
    return(rows);
  }

  return (
    <View style={styles.container}>
      <ScrollView key="Scroll" style={styles.separator} >
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
  row: {
   // alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  cellname: {
    width: '40%',
  },
  celldetail: {
    width: '18%',
  },
  headercellname: {
    width: '40%',
    fontWeight: 'bold',
  },
  headercelldetail: {
    width: '18%',
    fontWeight: 'bold',
  },
});
