import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { forwardRef } from 'react'
import Colors from '@/constants/Colors';

type ButtonProps = {
    text: string;
} & React.ComponentPropsWithoutRef<typeof Pressable>;

const Button = forwardRef<View | null, ButtonProps>(
    ({ text, ...pressableProps }, ref) => {
        return (
            <Pressable ref={ref} {...pressableProps} style={styles.container}>
                <Text style={styles.text}>{text}</Text>
            </Pressable>
        )
   }
)

export default Button

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light.tint,
        padding: 15,
        alignItems: 'center',
        borderRadius: 10,
        marginVertical: 10,
        width: '100%',
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white'
    }
})