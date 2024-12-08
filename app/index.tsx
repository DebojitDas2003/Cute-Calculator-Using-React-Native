import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native'
import { Platform } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const App = () => {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [isResultDisplayed, setIsResultDisplayed] = useState(false)

  const handlePress = (value: string) => {
    if (value === '=') {
      try {
        const calculationResult = eval(input).toString() // Caution: Use a safer evaluation method for production.
        setResult(calculationResult)
        setHistory([`${input} = ${calculationResult}`, ...history]) // Add latest calculation to the top
        setIsResultDisplayed(true)
      } catch {
        setResult('Error')
      }
    } else if (value === 'backspace') {
      setInput(input.slice(0, -1))
    } else if (value === 'clear') {
      setHistory([]) // Clear the history
    } else {
      if (isResultDisplayed && !isNaN(Number(value))) {
        // Start a new calculation if the last result was displayed and a number is pressed
        setInput(value)
        setResult('')
      } else {
        setInput(isResultDisplayed ? result + value : input + value)
        setResult('')
      }
      setIsResultDisplayed(false)
    }
  }

  const renderButton = (label: string, icon?: string) => (
    <TouchableOpacity style={styles.button} onPress={() => handlePress(label)}>
      {icon ? (
        <MaterialCommunityIcons
          name={icon as keyof typeof MaterialCommunityIcons.glyphMap}
          size={24}
          color="#fff"
        />
      ) : (
        <Text style={styles.buttonText}>{label}</Text>
      )}
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* Display Area */}
      <View style={styles.displayContainer}>
        <View style={styles.historyHeader}>
          <Text style={styles.historyTitle}>History</Text>
          <TouchableOpacity
            onPress={() => handlePress('clear')}
            style={styles.clearButton}
          >
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.historyContainer}
          contentContainerStyle={styles.historyContent}
        >
          {history.map((item, index) => (
            <Text key={index} style={styles.historyText}>
              {item}
            </Text>
          ))}
        </ScrollView>
        <Text style={styles.inputText}>{input || '0'}</Text>
        <Text style={styles.resultText}>{result}</Text>
      </View>

      {/* Numeric and Operator Buttons */}
      <View style={styles.buttonsContainer}>
        <View style={styles.row}>
          {renderButton('7')}
          {renderButton('8')}
          {renderButton('9')}
          {renderButton('/', 'division')}
        </View>
        <View style={styles.row}>
          {renderButton('4')}
          {renderButton('5')}
          {renderButton('6')}
          {renderButton('*', 'multiplication')}
        </View>
        <View style={styles.row}>
          {renderButton('1')}
          {renderButton('2')}
          {renderButton('3')}
          {renderButton('-', 'minus')}
        </View>
        <View style={styles.row}>
          {renderButton('.')}
          {renderButton('0')}
          {renderButton('backspace', 'backspace-outline')}
          {renderButton('+', 'plus')}
        </View>
        <View style={styles.row}>{renderButton('=')}</View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8E8F8',
  },
  displayContainer: {
    flex: 5,
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
  },
  clearButton: {
    backgroundColor: '#D88AC8',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  clearButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
  historyContainer: {
    flex: 1,
    marginBottom: 10,
  },
  historyContent: {
    justifyContent: 'flex-start',
  },
  historyText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  inputText: {
    fontSize: 28,
    color: '#888',
    textAlign: 'right',
  },
  resultText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'right',
  },
  buttonsContainer: {
    flex: Platform.OS === 'web' ? 6 : 4,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: Platform.OS === 'web' ? '18%' : '20%',
    flex: 1,
    backgroundColor: '#D88AC8',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    marginVertical: 5,
    height: Platform.OS === 'web' ? 40 : 60,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 24,
    color: '#FFF',
  },
})

export default App
