import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import AppHeader from './components/AppHeader'
import * as Font from 'expo-font';

export default class App extends React.Component {
  constructor(){
    super();
    this.state={
      fontsLoaded: false,
      text: "",
      word: "Loading...",
      lexicalCategory: "",
      definition: "",
      isSearchPressed: false,
      isLoading: false,
      buttonPressed: false,
    }
  }

  async loadFontsAsync() {
    await Font.loadAsync({
      'Poppins': require('./assets/Poppins-Regular.ttf'),
      'Quicksand': require('./assets/Quicksand-Regular-400.ttf'),
      'DuruSans': require('./assets/DuruSans-Regular.ttf'),      
    });
    this.setState({fontsLoaded: true});
  }

  getWord(word){
    var url = "https://whitehat-dictionary.glitch.me/?word=" + word
    return fetch(url)
    .then((data)=>{return data.json()})
    .then((response)=>{
      var responseObject = JSON.parse(response);
      var word = responseObject.word
      var lexicalCategory = responseObject.results[0].lexicalEntries[0].lexicalCategory.text
      var definition = responseObject.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]
      this.setState({
        "word" : word.trim(),
        "lexicalCategory" : lexicalCategory === undefined ? "" : lexicalCategory.trim(),
        "definition" : definition === undefined ? "" : definition.trim(),
      })
    })
  }

  componentDidMount() {
    this.loadFontsAsync();
  }

  render() {
    return (
      <View>
        <AppHeader />

        <TextInput value={this.state.text}
        placeholder="Enter Word"
        placeholderTextColor="#bababa"
        onChangeText={(text)=>{this.setState({
          text: text,
          isSearchPressed: false,
          word  : "Loading...",
          lexicalCategory :'',
          examples : [],
          defination : ""
        })}}
        style={styles.input} />
        
        <TouchableHighlight style={
          this.state.buttonPressed==true
          ? [styles.submit, {top: 6, shadowOffset: {width: 0, height: 3}}]
          : styles.submit
        }
        underlayColor="#f28c0f" activeOpacity={1}
        onShowUnderlay={()=>{this.setState({buttonPressed: true})}}
        onHideUnderlay={()=>{this.setState({buttonPressed: false})}}
        onPress={()=>{
          this.setState({isSearchPressed: true});
          this.getWord(this.state.text);
        }}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableHighlight>

        <Text style={{fontSize:20, alignSelf: "center", marginTop: 30,}}>
            {this.state.isSearchPressed && this.state.word === "Loading..."
              ? this.state.word
              : ""
            }
        </Text>

        <View>
          {this.state.word != "Loading..." && this.state.isSearchPressed
            ? (<View style={{marginTop: 20,marginLeft: 10,}}>
                  <Text style={styles.mainText}>
                    <Text style={styles.typeText}>
                    Word</Text>:{" " + this.state.word.charAt(0).toUpperCase()+this.state.word.slice(1)}
                  </Text>

                  <Text style={styles.mainText}>
                    <Text style={styles.typeText}>
                    Type</Text>: {" " + this.state.lexicalCategory}
                  </Text>

                  <Text style={styles.mainText}>
                    <Text style={styles.typeText}>
                    Definition</Text>: {"\n" + this.state.definition.charAt(0).toUpperCase() + this.state.definition.slice(1)}
                  </Text>
              </View>)           
            :<Text></Text>}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input:{
    borderColor: '#f28c0f',
    borderWidth: 3,
    borderRadius: 10,
    width: 230,
    height: 30,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 30,
    fontSize: 18,
  },
  submit:{
    backgroundColor: '#f28c0f',
    alignItems: 'center',
    alignSelf: 'center',
    width: 100,
    padding: 8,
    marginTop: 20,
    borderRadius: 10,
    shadowColor: "#d97d0d",
    shadowOffset: {width: 0, height: 9},
    shadowRadius: 1,
    elevation: 1,
  },
  buttonText:{
    fontFamily: 'DuruSans',
    fontSize: 15,
    color: 'white',
  },
  typeText:{
    fontWeight: '700',
    color: "#1F84D4",
    fontSize:20
  },
  mainText:{
    fontFamily: 'Poppins',
    fontSize: 15,
  },
});
