const Income = require("../models/incomeModel");  // or "../models/IncomeModel" based on actual filename

exports.addIncome = async (req, res) => {
    const {title, amount, category, description, date}  = req.body;

    const income = new Income({
        title,
        amount,
        category,
        description,
        date
    });

    try {
        if(!title || !category || !description || !date || !amount){
            return res.status(400).json({message: 'All fields are required!'});
        }
        if(amount <= 0 || typeof amount !== 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'});
        }

        await income.save();
        res.status(200).json({message: 'Income Added'});
    } 
    catch (error) {
        res.status(500).json({message: 'Server Error'});
    }
    console.log(income);
};

exports.getIncomes = async (req, res) =>{
    try {
        const incomes = await Income.find().sort({createdAt: -1});
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({message: 'Server Error'});
    }
};

exports.deleteIncome = async (req, res) =>{
    const {id} = req.params;
    Income.findByIdAndDelete(id)
        .then(() => {
            res.status(200).json({message: 'Income Deleted'});
        })
        .catch(() => {
            res.status(500).json({message: 'Server Error'});
        });
};
