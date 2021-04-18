import { Easing, Animated } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation'
import Add from '../containers/Add/Add'
import Home from '../containers/Home/Home'

const MainStack = createStackNavigator(
    {
        Home: {
            screen: Home,
        },

        Add: {
            screen: Add,
        },
    },
    {
        defaultNavigationOptions: {
            header: null
        },
    }
);

export default AppNavigator = createAppContainer(MainStack);