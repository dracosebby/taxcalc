// Function to calculate tax based on progressive brackets
function calculateProgressiveTax(income, brackets) {
    let tax = 0;
    let previousBracketCap = 0;
    for (const { bracket, rate } of brackets) {
        if (income > bracket) {
            tax += (bracket - previousBracketCap) * rate;
        } else {
            tax += (income - previousBracketCap) * rate;
            break;
        }
        previousBracketCap = bracket;
    }
    return tax;
}

document.getElementById('tax-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const rawIncome = document.getElementById('income').value.replace(/,/g, '');
    const income = parseFloat(rawIncome);
    const state = document.getElementById('state').value;

    if (!income || !state) {
        alert('Please enter all the details.');
        return;
    }

    const federalTax = calculateProgressiveTax(income, federalTaxBrackets);
    const stateTax = calculateProgressiveTax(income, stateTaxRates[state].brackets);

    document.getElementById('result').innerHTML = `
        <p>Federal Tax Rate: ${(federalTax / income * 100).toFixed(2)}%</p>
        <p>State Tax Rate: ${(stateTax / income * 100).toFixed(2)}%</p>
        <p>Federal Tax: $${federalTax.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
        <p>State Tax: $${stateTax.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
        <p>Total Tax: $${(federalTax + stateTax).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
    `;
});

    // Federal tax brackets
    const federalTaxBrackets = [
        { bracket: 11000, rate: 0.10 },
        { bracket: 44725, rate: 0.12 },
        { bracket: 95375, rate: 0.22 },
        { bracket: 182100, rate: 0.24 },
        { bracket: 231250, rate: 0.32 },
        { bracket: 578125, rate: 0.35 },
        { bracket: Infinity, rate: 0.37 }
    ];

    // State tax rates and brackets (partial example, add others similarly)
    const stateTaxRates = {
        
        'AL': { brackets: [{ bracket: 499, rate: 0.02 }, { bracket: 500, rate: 0.04 }, { bracket: 3000, rate: 0.05 }, ] },
        'AK': { brackets: [{ bracket: Infinity, rate: 0.00 }, ] },
        'AZ': { brackets: [{ bracket: Infinity, rate: 0.00 }, ] } ,
        'AR': { brackets: [{ bracket: 0, rate: 0.02 }, { bracket: 4400, rate: 0.04 }, { bracket: 8800, rate: 0.04 }, ] },
        'CA': { brackets: [{ bracket: 8932, rate: 0.01 }, { bracket: 21175, rate: 0.02 }, { bracket: 33421, rate: 0.04 }, { bracket: 46394, rate: 0.06 }, { bracket: 58634, rate: 0.08 }, { bracket: 299508, rate: 0.093 }, { bracket: 359407, rate: 0.103 }, { bracket: 599012, rate: 0.113 }, { bracket: 1000000, rate: 0.123 }, { bracket: Infinity, rate: 0.133 }] },
        'CO': { brackets: [{ bracket: Infinity, rate: 0.00 }, ] },
        'CT': { brackets: [{ bracket: 0, rate: 0.02 }, { bracket: 10000, rate: 0.05 }, { bracket: 50000, rate: 0.06 }, { bracket: 100000, rate: 0.06 }, { bracket: 200000, rate: 0.07 }, { bracket: 250000, rate: 0.07 }, { bracket: 500000, rate: 0.07 }, ] },
        'DE': { brackets: [{ bracket: 2000, rate: 0.02 }, { bracket: 5000, rate: 0.04 }, { bracket: 10000, rate: 0.05 }, { bracket: 20000, rate: 0.05 }, { bracket: 25000, rate: 0.06 }, { bracket: 60000, rate: 0.07 }, ] },

        'FL': { brackets: [{ bracket: Infinity, rate: 0.00 }, ] },
        'GA': { brackets: [{ bracket: Infinity, rate: 0.05 }, ] },
        

        'HI': { brackets: [{ bracket: 4300, rate: 0.02 }, { bracket: 8500, rate: 0.04 }, { bracket: Infinity, rate: 0.049 }, ] },
        'MD': { brackets: [{ bracket: 8932, rate: 0.01 }, { bracket: 21175, rate: 0.02 }, { bracket: 33421, rate: 0.04 }, { bracket: 46394, rate: 0.06 }, { bracket: 58634, rate: 0.08 }, { bracket: 299508, rate: 0.093 }, { bracket: 359407, rate: 0.103 }, { bracket: 599012, rate: 0.113 }, { bracket: 1000000, rate: 0.123 }, { bracket: Infinity, rate: 0.133 }] },
        'DC': { brackets: [{ bracket: 8932, rate: 0.01 }, { bracket: 21175, rate: 0.02 }, { bracket: 33421, rate: 0.04 }, { bracket: 46394, rate: 0.06 }, { bracket: 58634, rate: 0.08 }, { bracket: 299508, rate: 0.093 }, { bracket: 359407, rate: 0.103 }, { bracket: 599012, rate: 0.113 }, { bracket: 1000000, rate: 0.123 }, { bracket: Infinity, rate: 0.133 }] },
        'NY': { brackets: [{ bracket: 4300, rate: 0.02 }, { bracket: 8500, rate: 0.04 }, { bracket: Infinity, rate: 0.049 }, ] },

        'ID': { brackets: [{ bracket: 4489, rate: 0.058 }, ] },
        'IL': { brackets: [{ bracket: 0, rate: 0.05 },  ] },
        'IN': { brackets: [{ bracket: 0, rate: 0.03 }, ] },
        'IA': { brackets: [{ bracket: 0, rate: 0.04 }, { bracket: 6210, rate: 0.05 }, { bracket: 31050, rate: 0.06 }, ] },
        'KS': { brackets: [{ bracket: 0, rate: 0.03 }, { bracket: 15000, rate: 0.05 }, { bracket: 30000, rate: 0.06 },] },
        'KY': { brackets: [{ bracket: 0, rate: 0.04 }, ] },
        'LA': { brackets: [{ bracket: 0, rate: 0.02 }, { bracket: 12500, rate: 0.04 }, { bracket: 50000, rate: 0.04 }, ] },
        'ME': { brackets: [{ bracket: 0, rate: 0.06 }, { bracket: 26050, rate: 0.07 }, { bracket: 61600, rate: 0.07 }, ] },
        'MA': { brackets: [{ bracket: 0, rate: 0.05 }, { bracket: 1000000, rate: 0.09 }, ] },
        'MI': { brackets: [{ bracket: 0, rate: 0.04 }, ] },
        'MN': { brackets: [{ bracket: 0, rate: 0.05 }, { bracket: 31690, rate: 0.07 }, { bracket: 104090, rate: 0.08 }, { bracket: 193240, rate: 0.10 }, ] },
        'MS': { brackets: [{ bracket: 10000, rate: 0.05 }, ] },
        'MT': { brackets: [{ bracket: 0, rate: 0.05 }, { bracket: 20500, rate: 0.06 }, ] },  
        'NE': { brackets: [{ bracket: 0, rate: 0.02 }, { bracket: 3700, rate: 0.04 }, { bracket: 22170, rate: 0.05 }, { bracket: 35730, rate: 0.06 }, ] },
        'NV': { brackets: [{ bracket: Infinity, rate: 0.00 }, ] },
        'NH': { brackets: [{ bracket: Infinity, rate: 0.00 }] },
        'NJ': { brackets: [{ bracket: 0, rate: 0.01 }, { bracket: 20000, rate: 0.02 }, { bracket: 35000, rate: 0.04 }, { bracket: 40000, rate: 0.06 }, { bracket: 75000, rate: 0.06 }, { bracket: 500000, rate: 0.09 }, { bracket: 1000000, rate: 0.11 }, ] },
        'NM': { brackets: [{ bracket: 0, rate: 0.02 }, { bracket: 5500, rate: 0.03 }, { bracket: 11000, rate: 0.05 }, { bracket: 16000, rate: 0.05 }, { bracket: 210000, rate: 0.06 }, ] },
        'NC': { brackets: [{ bracket: 0, rate: 0.05 },] },
        'ND': { brackets: [{ bracket: 44725, rate: 0.02 }, { bracket: 225975, rate: 0.03 }, ] },
        'OH': { brackets: [{ bracket: 26050, rate: 0.02 }, { bracket: 92150, rate: 0.04 },] },
        'OK': { brackets: [{ bracket: 0, rate: 0.00 }, { bracket: 1000, rate: 0.01 }, { bracket: 2500, rate: 0.02 }, { bracket: 3750, rate: 0.03 }, { bracket: 4900, rate: 0.04 }, { bracket: 7200, rate: 0.05 }, ] },
        'OR': { brackets: [{ bracket: 0, rate: 0.05 }, { bracket: 4300, rate: 0.07 }, { bracket: 10750, rate: 0.09 }, { bracket: 125000, rate: 0.10 }, ] },
        'PA': { brackets: [{ bracket: 0, rate: 0.03 }, ] },
        
        
        
        'RI': { brackets: [{ bracket: 0, rate: 0.04 }, { bracket: 77450, rate: 0.05 }, { bracket: 176050, rate: 0.06 },] },
        'SC': { brackets: [{ bracket: 0, rate: 0.0 }, { bracket: 3460, rate: 0.03 }, { bracket: 17330, rate: 0.06 }, ] },
        'SD': { brackets: [{ bracket: Infinity, rate: 0.00 }] },
        'TN': { brackets: [{ bracket: Infinity, rate: 0.00 }, ] },
        'TX': { brackets: [{ bracket: Infinity, rate: 0.00 }, ] },
        'UT': { brackets: [{ bracket: 0, rate: 0.05 }, ] },
        'VT': { brackets: [{ bracket: 0, rate: 0.03 }, { bracket: 45400, rate: 0.07 }, { bracket: 110050, rate: 0.08 }, { bracket: 229550, rate: 0.09 }, ] },    
        'VA': { brackets: [{ bracket: 0, rate: 0.02 }, { bracket: 3000, rate: 0.03 }, { bracket: 5000, rate: 0.05 }, { bracket: 17000, rate: 0.06 }, ] },
        
        'WA': { brackets: [{ bracket: Infinity, rate: 0.00 }, ] },
       
        'WV': { brackets: [{ bracket: 0, rate: 0.02 }, { bracket: 10000, rate: 0.03 }, { bracket: 25000, rate: 0.04 }, { bracket: 40000, rate: 0.05 }, { bracket: 60000, rate: 0.05 }, ] },
        'WI': { brackets: [{ bracket: 0, rate: 0.04 }, { bracket: 14320, rate: 0.04 }, { bracket: 28640, rate: 0.05 }, { bracket: 315310, rate: 0.08 }, ] },
        'WY': { brackets: [{ bracket: Infinity, rate: 0.00 }, ] },
        // Add other states with similar structure
    };

    // Function to calculate tax based on brackets
    function calculateTaxByBrackets(income, brackets) {
        let tax = 0;
        let lastBracket = 0;
        for (const { bracket, rate } of brackets) {
            if (income > bracket) {
                tax += (bracket - lastBracket) * rate;
            } else {
                tax += (income - lastBracket) * rate;
                break;
            }
            lastBracket = bracket;
        }
        return tax;
    }

    const federalTax = calculateTaxByBrackets(income, federalTaxBrackets);
    const stateTax = calculateTaxByBrackets(income, stateTaxRates[state].brackets);

    document.getElementById('result').innerHTML = `
        <p>Federal Tax Rate: ${(federalTax / income * 100).toFixed(2)}%</p>
        <p>State Tax Rate: ${(stateTax / income * 100).toFixed(2)}%</p>
        <p>Federal Tax: $${federalTax.toFixed(2)}</p>
        <p>State Tax: $${stateTax.toFixed(2)}</p>
        <p>Total Tax: $${(federalTax + stateTax).toFixed(2)}</p>
    `;
