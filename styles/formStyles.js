import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  form: {
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 5,
    padding: 10
  },
  prompt: {
    padding: 10,
    borderBottomColor: '#C5C3C6',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  promptText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  addLabel: {
    alignItems: 'center'
  },
  addLabelText: {
    fontSize: 10
  },
  formGroup: {
    flexDirection: 'column'
  },
  label: {
    fontSize: 12,
    fontStyle: 'italic'
  },
  dateText: {
    marginLeft: 10
  },
  addButton: {
    backgroundColor: '#2EC4B6',
    marginTop: 10
  },
  addButtonText: {
    fontSize: 20,
    color: '#fff',
    textTransform: 'uppercase'
  },
  authButton: {
    backgroundColor: '#3E92CC',
    borderRadius: 5
  },
  authButtonText: {
    fontSize: 20,
    color: '#fff',
    textTransform: 'uppercase'
  },
  authToggle: {
    flexDirection: 'column'
  }
});
