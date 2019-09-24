import { createAppContainer } from 'react-navigation'
import {  createStackNavigator } from 'react-navigation-stack'
import Login from './screens/Login'
import Register from './screens/Register'
import Main from './screens/Main'
import Initial from './screens/Initial'

const AppNavigation = createStackNavigator ({
    Initial:{
        screen: Initial, navigationOptions:{
            header: null,
        }
    },
    Login:{
        screen: Login, navigationOptions:{
            header: null
        }
    },
    Register:{
        screen: Register, navigationOptions:{
            header: null
        }
    },
    Main:{
        screen: Main, navigationOptions:{
            header: null
        }
    },
})

export default createAppContainer(AppNavigation)