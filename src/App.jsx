import data from './transactions.json';
import BudgetDashboard from './components/budgetDashboard';
import './App.css'

function App() {

  return (
    <>
      <BudgetDashboard transactions={data} />
    </>
  )
}

export default App
