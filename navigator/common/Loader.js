import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const Loader = ({ modalVisible, setModalVisible }) => {

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{
                    width:130,
                    height:130,
                    margin: 20,
                    backgroundColor: 'off-white',
                    borderRadius: 20,
                    padding: 35,
                    justifyContent:'center',
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    }
                }}>
                <ActivityIndicator size="large" />
                </View>
            </View>
        </Modal>
    )
}

export default Loader

const styles = StyleSheet.create({})