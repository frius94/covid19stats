import React from 'react';
import {Page, Text, Image, View, Document, StyleSheet} from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    text: {
        marginBottom: '20px'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});

type Props = {
    images: string[],
}

// Create Document Component
export const MyDocument: React.FC<Props> = (props) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.text}>Corona data</Text>
                    <Image src={props.images[0]}/>
                    <Image src={props.images[1]}/>
                </View>
            </Page>
        </Document>
    );
};