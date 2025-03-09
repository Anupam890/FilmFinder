import { View, Text } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign'

const saved = () => {
  return (
    <View className='flex-1  bg-backGround'>
      <Text className='text-white  text-2xl font-bold mt-10 p-5'>
        Saved
      </Text>
      <View className='flex-row justify-center items-center mt-10'>
        <AntDesign name='heart' size={24} color='#ffffff' />
        <Text className='text-white text-center text-2xl font-bold ml-2'>
          No saved movies
        </Text>
      </View>

    </View>
  )
}

export default saved