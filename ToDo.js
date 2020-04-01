import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from 'react-native';

const { height, width } = Dimensions.get('window');

export default class Todo extends Component {
    state = {
        isEdition: false,
        isCompleted: false,
        toDoValue: "",
    }
    render() {
        const { isCompleted, isEdition, toDoValue } = this.state;
        const { text } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.column}>
                    <TouchableOpacity onPress={this._toggleComplete}>
                        <View
                            style={[
                                styles.circle,
                                isCompleted ? styles.completeCircle : styles.uncompleteCircle
                            ]} />
                    </TouchableOpacity>

                    {isEdition ? (
                        <TextInput
                            style={[
                                styles.input,
                                styles.text,
                                isCompleted ? styles.completedText : styles.uncompletedText
                            ]}
                            value={toDoValue}
                            multiline={true}
                            onChangeText={this._controllInput}
                            returnKeyType={"done"}
                            onBlur={this._finishEditing}
                        />
                    ) : (
                            <Text style={[
                                styles.text,
                                isCompleted ? styles.completedText : styles.uncompletedText
                            ]}>
                                {text}
                            </Text>
                        )}
                </View>

                {isEdition ? (
                    <View style={styles.actions}>
                        <TouchableOpacity onPressOut={this._finishEditing}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>✅</Text>
                            </View>
                        </TouchableOpacity>
                    </View>)
                    :
                    (<View style={styles.actions}>
                        <TouchableOpacity onPressOut={this._startEditing}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>✏</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>❌</Text>
                            </View>
                        </TouchableOpacity>
                    </View>)
                }
            </View>
        );
    }

    _toggleComplete = () => {
        this.setState(prevState => {
            return ({
                isCompleted: !prevState.isCompleted
            })
        })
    }

    _startEditing = () => {
        const { text } = this.props;
        this.setState({
            isEdition: true,
            toDoValue: text
        })
    }

    _finishEditing = () => {
        this.setState({
            isEdition: false
        })
    }
    _controllInput = (text) => {
        this.setState({
            toDoValue: text
        })
    }
}

const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 3,
        marginRight: 20
    },
    completeCircle: {
        borderColor: "#bbb"
    },
    uncompleteCircle: {
        borderColor: "#F23657"
    },
    text: {
        fontWeight: "600",
        fontSize: 20,
        marginVertical: 20
    },
    completedText: {
        color: "#bbb",
        textDecorationLine: "line-through"
    },
    uncompletedText: {
        color: "#353535",
    },
    column: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width / 2,
        justifyContent: 'space-between',
    },
    actions: {
        flexDirection: 'row',
    },
    actionContainer: {
        marginVertical: 10,
        marginHorizontal: 10,
    },
    input: {
        marginVertical: 20,
        width: width / 2,
    }
})