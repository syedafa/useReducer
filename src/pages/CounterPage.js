import { useReducer } from "react";
import Button from "../components/Button";
import Panel from "../components/Panel";

const INCREMENT = "inc";
const DECREMENT = "dec";
const SET_VALUE_TO_ADD = "value-to-add";
const ADDING_VALUE = "adding-value";

const reducer = (state, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };
    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };
    case SET_VALUE_TO_ADD:
      return {
        ...state,
        valueToAdd: action.payload,
      };
    case ADDING_VALUE:
      return {
        ...state,
        count: state.count + state.valueToAdd,
        valueToAdd: 0,
      };
    default:
      return state;
  }
};
function CounterPage({ initialCount }) {
  // const [count, setCount] = useState(initialCount);
  // const [valueToAdd, setValueToAdd] = useState(0);
  const [state, dispatch] = useReducer(reducer, {
    count: initialCount,
    valueToAdd: 0,
  });

  const increment = () => {
    // setCount(count + 1);
    dispatch({
      type: INCREMENT,
    });
  };
  const decrement = () => {
    // setCount(count - 1);
    dispatch({
      type: DECREMENT,
    });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // setCount(count + valueToAdd);
    // setValueToAdd(0);
    dispatch({ type: ADDING_VALUE });
  };
  const handleChange = (e) => {
    console.log(e.target.value);
    // setValueToAdd(parseInt(e.target.value) || 0);
    dispatch({
      type: SET_VALUE_TO_ADD,
      payload: parseInt(e.target.value) || 0,
    });
  };
  console.log(state);
  return (
    <Panel className="m-3">
      <h1 className="text-lg">Count is {state.count}</h1>
      <div className="flex flex-row">
        <Button onClick={increment}>Increment</Button>
        <Button onClick={decrement}>Decrement</Button>
      </div>

      <form onSubmit={handleFormSubmit}>
        <label>Add a lot!</label>
        <input
          value={state.valueToAdd || ""}
          type="number"
          onChange={handleChange}
          className="p-1 m-3 bg-gray-50 border border-gray-300"
        />
        <Button>Add it!</Button>
      </form>
    </Panel>
  );
}

export default CounterPage;
