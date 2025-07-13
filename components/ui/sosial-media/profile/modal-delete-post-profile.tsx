import { router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CustomButtonSecundary from '../../component-globals/button-secundary';
import CustomButton from '../../component-globals/button-primary';

interface ModalDeletePostProps {
    setModalDeletePost: (visible: boolean) => void;
}

const ModalDeletePost: React.FC<ModalDeletePostProps> = ({
    setModalDeletePost,
}) => {
    const handleDiscard = () => {
        setModalDeletePost(false);
    };

    return (
        <View
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <View
                style={{
                    backgroundColor: '#fff',
                    padding: 20,
                    borderRadius: 10,
                    width: '90%',
                    alignItems: 'center',
                }}
            >
                <Text style={{ marginBottom: 10, color: '#1F1F1F', fontSize: 18, textAlign: 'center', fontWeight: 600 }}>
                    Delete Post
                </Text>
                <Text style={{ marginBottom: 20, color: '#1F1F1F', fontSize: 14, textAlign: 'center' }}>
                    Are you sure you want to delete this post? Once deleted, this post cannot be recovered.
                </Text>
                <View
                    className='flex-row justify-between items-center w-full'
                >
                    <View style={{width:130}}>
                        <CustomButtonSecundary
                            className="py-[10px] px-[20px]"
                            onPress={handleDiscard}
                            title="Cancel"
                        />
                    </View>
                    <View style={{width:130}}> 
                        <CustomButton
                            title="Yes, delete"
                            className="py-[10px] px-[20px]"
                            onPress={() => setModalDeletePost(false)}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ModalDeletePost;
