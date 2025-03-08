import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router/build/hooks'


const Info = () => {
    const {id} = useLocalSearchParams()
  return (
    <View>
      <Text>Details :{id}</Text>
    </View>
  )
}

export default Info