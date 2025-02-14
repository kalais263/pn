import React from 'react';
import {
Text,
View
TextInput,
KeyboardAvoidingView,
TouchableOpacity,
AsyncStorage,
} from 'react-native';
import {StackNavigator } from 'react-navigation';
export default class Login extends React Component {
constructor(props) {
super(props);
this.state
{
username: "",
password: "",
}
}
componentDidMount() {
this._loadInitialState().done();
}
_loadInitialState=async() => {
var value=await AsyncStorage.getItem('user');
if(value!==null)
{
this.props.navigation.navigate('Profile');
}
}
render() {
return (
<KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
<View style={styles.container}>
<Text style={styles.header}>- LOGIN -</Text>
<TextInput
style={styles.textInput} placeholder='Username'
onChangeText={ (username) => this.setState({username})}
underlineColorAndroid='transparent'
/>
<TextInput
style={styles.textInput} placeholder='Password'
onChangeText={ (password) => this.setState({password})}
underlineColorAndroid='transparent'
/>
<TouchableOpacity
style={styles btn}
onPress={this.login}>
<Text>Log in</Text>
</View>
</KeyboardAvoidingView>
);
}
login=() => {
fetch('http://192.168.25.2:3000/user', {
	method='POST',
	headers: {
		'Accept':'application/json',
		'Content-Type':'application/json',
	},
	body:JSON.stringify({
		username:this.state.username,
	password:this.state.password,
	})
})
.then((response) => response.json())
.then((res) => {
	if(res.success ===true) {
		AsyncStorage.setItem('user,res.user);
		this.props.navigation.navigate('Profile');
	}
	else {
		alert(res.message);
	}
})
.done();
}
}

