import "./index.css";
import { MdDeleteOutline } from "react-icons/md";
import { HiArrowTrendingUp, HiArrowTrendingDown } from "react-icons/hi2";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";

const TransactionHistory = ({ transactionList, handleDelete }) => {
  

  console.log(transactionList);

  return (
    transactionList.length>0 &&
    <div className="transaction-history-main-container">
      <div className="transaction-history-sub-container">
        <h1 className="transaction-history-heading">Transaction History</h1>
        <table className="transaction-history-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactionList?.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.name}</td>
                <td
                  className={
                    transaction.type === "income" ? "income" : "expense"
                  }
                >
                  {transaction.type === "income"
                    ? `+₹ ${transaction.amount.toFixed(2)}`
                    : `-₹ ${Math.abs(transaction.amount).toFixed(2)}`}
                </td>
                <td>{transaction.date}</td>
                <td>
                  {transaction.type === "income" ? (
                    <HiArrowTrendingUp className="income-icon" />
                  ) : (
                    <HiArrowTrendingDown className="expense-icon" />
                  )}
                </td>
                <td>
                    {transaction.type==="income"?<HiOutlineCurrencyRupee className="income-icon" />:
                  <MdDeleteOutline
                    className="delete-icon"
                    onClick={(e) => handleDelete(transaction.id,transaction.amount,transaction.type)}
                  />
                }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    
  );
};

export default TransactionHistory;
