// import logo from './logo.svg';
import './App.css';
import { DataStore } from '@aws-amplify/datastore';
import { Todo } from './models';

function App() {
  async function deleteItem() { 
    const modelToDelete = await DataStore.query(Todo, "e512f814-c598-4377-b59f-14093e89ac00");
    DataStore.delete(modelToDelete);
  }
  async function update() {
    const original = await DataStore.query(Todo, "e512f814-c598-4377-b59f-14093e89ac00")

await DataStore.save(
  Todo.copyOf(original, item => {
  // Update the values on {item} variable to update DataStore entry
  item.name = `title ${Date.now()}`;
})
);
  }
  async function showTodos() {
    const models = await DataStore.query(Todo);
      console.log(models);
  }
  
  async function addTodo() {
    await DataStore.save(
      new Todo({
      "title": "Lorem ipsum dolor sit amet",
      "comments": [],
      "content": "Lorem ipsum dolor sit amet"
    })
  );
  }



  return (
    <div className="App">
      <header className="App-header">
        <button onClick={addTodo}>Add</button>
        <button onClick={showTodos}>Show Todos</button>
        <button onClick={update}>Update</button>
        <button onClick={deleteItem}>Delete</button>
      </header>
    </div>
  );
}

export default App;
