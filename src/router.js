import { createAppContainer } from 'react-navigation'
import {  createSwitchNavigator  } from 'react-navigation'
import Login from './Login'

const AppNavigation = createSwitchNavigator({
    Login:{
        screen: Login
    }
})

export default createAppContainer(AppNavigation)