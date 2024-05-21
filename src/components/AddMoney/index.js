import { useEffect, useState } from "react";
import MoneyCard from "../MoneyCard"
import TransactionHistory from "../TransactionHistory";
import './index.css'

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddMoney=()=>{

    const [income,setIncome]= useState("")
    const [totalIncome,setTotalIncome]=useState(0)

    const [transactionList,setTransactionList]=useState([])

    const [name,setName] = useState("")
    const [expense,setExpense]= useState()
    const [totalExpense,setTotalExpense] = useState(0)

    const [balance,setBalance]= useState()

    useEffect(()=>{
        const getIncome=  parseInt(localStorage.getItem("income"))||0
        const getExpense = parseInt(localStorage.getItem("expense"))||0
        const getTransactions = JSON.parse(localStorage.getItem("transaction"))||[];

        console.log(getTransactions,"getTransactions");

        setTotalIncome(getIncome);
        setTotalExpense(getExpense)
        setTransactionList(getTransactions)
        

    },[])

    const handleIncome=()=>{
        console.log(income)
        if(income<1){
           toast.warn("Amount Can not be Negative or 0",
            {
                position: "top-center",
                theme:"dark"
            });
            return
      
        }else{
            
            const newTotalIncome = totalIncome + parseInt(income);
            setTotalIncome(newTotalIncome);
            setIncome("");
            setBalance(totalIncome-totalExpense)
            const newTransactionList =  [
              ...transactionList,
              {
                id: Date.now(),
                name:"Income",
                type: "income",
                amount: parseInt(income),
                date: new Date().toLocaleString(),
              },
            ];
            setTransactionList(newTransactionList)
            toast.success(`${income} Added Successfully`, {
              position: "top-center",
              theme: "colored",
            });
            localStorage.setItem("income", newTotalIncome);
            localStorage.setItem("transaction", JSON.stringify(newTransactionList));
            
        }
    }


    const handleExpense=()=>{
        if(name==="" || expense===""){
            toast.warn("Name and Expense Required", {
              position: "top-center",
              theme: "dark",
            });
            return;
        }
        else{

            if (parseInt(expense) > parseInt(totalIncome - totalExpense)) {
              toast.error("Balance is Insuffient", {
                position: "top-center",
                theme: "colored",
              });
              setName("");
              setExpense("");
              return;
            }

           const newTotalExpense = totalExpense + parseInt(expense);
           setTotalExpense(newTotalExpense);
            setName("");
            setExpense("");
            
            const newTransactionList = [
                ...transactionList,
                {
                    id:Date.now(),
                    name:name,
                    type:"expense",
                    amount:parseInt(expense),
                    date:new Date().toLocaleString()
                }
            ]
            setTransactionList(newTransactionList);
            toast.success("Expenses Added Successfully", {
              position: "top-center",
              theme: "colored",
            });
            localStorage.setItem("expense", newTotalExpense);
            localStorage.setItem(
              "transaction",
              JSON.stringify(newTransactionList)
            );
        }

    }

    const handleDelete=(id,amount,type)=>{
        const remainingItems = transactionList.filter((each)=>each.id!==id)

        if(totalIncome-totalExpense<=0){
            toast.warn("Income can not be less than Expense", {
              position: "top-center",
              theme: "dark",
            });
            return;
        }

        if(type==="income"){
            const newIncome = totalIncome-amount 
            localStorage.setItem("income", newIncome);
            setTotalIncome(newIncome)
            
        }
        else{ 
            const newExpense = totalExpense-amount 

            
            localStorage.setItem("expense", newExpense);

            
            setTotalExpense(newExpense)
            
        }
        localStorage.setItem("transaction", JSON.stringify(remainingItems));

        setTransactionList(remainingItems);
    }

  
    return (
      <div className="add-money-main-container">
        <MoneyCard totalIncome={totalIncome} totalExpense={totalExpense} />
        <div className="add-money-sub-container">
          <h1 className="add-balance-heading">Add Balance</h1>
          <div className="add-balnce-input-container">
            <input
              type="number"
              placeholder="Add Income"
              className="add-balance-input"
              name="income"
              onChange={(e) => setIncome(e.target.value)}
              required
              value={income}
            />
            <button className="add-button" onClick={handleIncome}>
              Add
            </button>
          </div>
          <h1 className="add-balance-heading">Add Expenses</h1>
          <div className="add-balnce-input-container">
            <input
              type="text"
              placeholder="Add your Expense name"
              className="add-balance-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Add Expense Amount"
              className="add-balance-input"
              value={expense}
              onChange={(e) => setExpense(e.target.value)}
            />
            <button className="add-button" onClick={handleExpense}>
              Add
            </button>
          </div>
        </div>

        <TransactionHistory
          transactionList={transactionList}
          handleDelete={handleDelete}
        />
        <ToastContainer />
      </div>
    );
}
export default AddMoney