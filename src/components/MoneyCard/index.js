import './index.css'

import balanceImg from '../images/balance-image.png'
import expenseImg from '../images/expenses-image.png'
import incomeImg from '../images/income-image.png'

const MoneyCard = ({ totalIncome = 0, totalExpense = 0 }) => {
    console.log(totalExpense, "totalExpense");
  return (
    <div className="money-card-main-container">
      <div className="money-card-sub-container">
        <div
          className="money-card-display-container"
          style={{ background: "#cffafe" }}
        >
          <div className="money-card-image-container">
            <img src={incomeImg} alt="" className="money-card-image" />
          </div>
          <div>
            <p className="money-card-text">Income</p>
            <h1 className="money-card-amount">{totalIncome}</h1>
          </div>
        </div>
        <div
          className="money-card-display-container"
          style={{ background: "#ede9fe" }}
        >
          <div className="money-card-image-container">
            <img src={expenseImg} alt="" className="money-card-image" />
          </div>
          <div>
            <p className="money-card-text">Expense</p>
            <h1 className="money-card-amount">{totalExpense}</h1>
          </div>
        </div>
        <div
          className="money-card-display-container"
          style={{ background: "#ecfccb" }}
        >
          <div className="money-card-image-container">
            <img src={balanceImg} alt="" className="money-card-image" />
          </div>
          <div>
            <p className="money-card-text">Balance</p>
            <h1 className="money-card-amount">{totalIncome-totalExpense}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoneyCard