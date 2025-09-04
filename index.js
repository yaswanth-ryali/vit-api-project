const express = require('express');
const app = express();

app.use(express.json());

const fullName = "yaswanth ryali"; 
const dob = "28102004"; 
const emailId = "yaswanthryali07@gmail.com"; 
const rollNumber = "Hi_22BCE20037"; 

app.get('/', (req, res) => {
    res.status(200).send("API is running successfully.");
});

app.get('/bfhl', (req, res) => {
    const response = {
        "operation_code": 1,
        "message": "This endpoint is for a POST request. Please send a POST request with a 'data' array in the JSON body.",
        "example_request": {
            "data": ["a", "1", "334", "4", "R", "$"]
        }
    };
    res.status(200).json(response);
});

app.post('/bfhl', (req, res) => {
    try {
        const data = req.body.data;

        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                message: "Invalid input: 'data' must be an array."
            });
        }

        const userId = `${fullName.toLowerCase().replace(' ', '_')}_${dob}`;

        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;
        let alphabeticalChars = '';

        data.forEach(item => {
            if (!isNaN(item) && !isNaN(parseFloat(item))) {
                const num = Number(item);
                sum += num;
                if (num % 2 === 0) {
                    even_numbers.push(item.toString());
                } else {
                    odd_numbers.push(item.toString());
                }
            } else if (/^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item.toUpperCase());
                alphabeticalChars += item;
            } else {
                 special_characters.push(item);
            }
        });

        const reversedAlphabets = alphabeticalChars.split('').reverse().join('');
        let concat_string = '';
        for (let i = 0; i < reversedAlphabets.length; i++) {
            if (i % 2 === 0) {
                concat_string += reversedAlphabets[i].toUpperCase();
            } else {
                concat_string += reversedAlphabets[i].toLowerCase();
            }
        }
        
        const response = {
            is_success: true,
            user_id: userId,
            email: emailId,
            roll_number: rollNumber,
            odd_numbers: odd_numbers,
            even_numbers: even_numbers,
            alphabets: alphabets,
            special_characters: special_characters,
            sum: sum.toString(),
            concat_string: concat_string
        };

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({
            is_success: false,
            message: error.message
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});