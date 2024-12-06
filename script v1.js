document.getElementById('tax-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const income = parseFloat(document.getElementById('income').value);
    const state = document.getElementById('state').value;

    if (!income || !state) {
        alert('Please enter all the details.');
        return;
    }

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
        
        
        
        'DE': { brackets: [{ bracket: 4300, rate: 0.02 }, { bracket: 8500, rate: 0.04 }, { bracket: Infinity, rate: 0.049 }, ] },
        'DC': { brackets: [{ bracket: 8932, rate: 0.01 }, { bracket: 21175, rate: 0.02 }, { bracket: 33421, rate: 0.04 }, { bracket: 46394, rate: 0.06 }, { bracket: 58634, rate: 0.08 }, { bracket: 299508, rate: 0.093 }, { bracket: 359407, rate: 0.103 }, { bracket: 599012, rate: 0.113 }, { bracket: 1000000, rate: 0.123 }, { bracket: Infinity, rate: 0.133 }] },
        'FL': { brackets: [{ bracket: 0, rate: 0.02 }, { bracket: 500, rate: 0.04 }, { bracket: 3000, rate: 0.05 }, ] },
        'GA': { brackets: [{ bracket: Infinity, rate: 0.00 }, ] },
        'HI': { brackets: [{ bracket: 4300, rate: 0.02 }, { bracket: 8500, rate: 0.04 }, { bracket: Infinity, rate: 0.049 }, ] },
        'ID': { brackets: [{ bracket: 8932, rate: 0.01 }, { bracket: 21175, rate: 0.02 }, { bracket: 33421, rate: 0.04 }, { bracket: 46394, rate: 0.06 }, { bracket: 58634, rate: 0.08 }, { bracket: 299508, rate: 0.093 }, { bracket: 359407, rate: 0.103 }, { bracket: 599012, rate: 0.113 }, { bracket: 1000000, rate: 0.123 }, { bracket: Infinity, rate: 0.133 }] },
        'IL': { brackets: [{ bracket: 0, rate: 0.02 }, { bracket: 500, rate: 0.04 }, { bracket: 3000, rate: 0.05 }, ] },
        'IN': { brackets: [{ bracket: Infinity, rate: 0.00 }, ] },
        'IA': { brackets: [{ bracket: 4300, rate: 0.02 }, { bracket: 8500, rate: 0.04 }, { bracket: Infinity, rate: 0.049 }, ] },
        'KS': { brackets: [{ bracket: 8932, rate: 0.01 }, { bracket: 21175, rate: 0.02 }, { bracket: 33421, rate: 0.04 }, { bracket: 46394, rate: 0.06 }, { bracket: 58634, rate: 0.08 }, { bracket: 299508, rate: 0.093 }, { bracket: 359407, rate: 0.103 }, { bracket: 599012, rate: 0.113 }, { bracket: 1000000, rate: 0.123 }, { bracket: Infinity, rate: 0.133 }] },
        'KY': { brackets: [{ bracket: 0, rate: 0.02 }, { bracket: 500, rate: 0.04 }, { bracket: 3000, rate: 0.05 }, ] },
        'LA': { brackets: [{ bracket: Infinity, rate: 0.00 }, ] },
        'ME': { brackets: [{ bracket: 4300, rate: 0.02 }, { bracket: 8500, rate: 0.04 }, { bracket: Infinity, rate: 0.049 }, ] },
        'MD': { brackets: [{ bracket: 8932, rate: 0.01 }, { bracket: 21175, rate: 0.02 }, { bracket: 33421, rate: 0.04 }, { bracket: 46394, rate: 0.06 }, { bracket: 58634, rate: 0.08 }, { bracket: 299508, rate: 0.093 }, { bracket: 359407, rate: 0.103 }, { bracket: 599012, rate: 0.113 }, { bracket: 1000000, rate: 0.123 }, { bracket: Infinity, rate: 0.133 }] },
        'MA': { brackets: [{ bracket: 0, rate: 0.02 }, { bracket: 500, rate: 0.04 }, { bracket: 3000, rate: 0.05 }, ] },
        'MI': { brackets: [{ bracket: Infinity, rate: 0.00 }, ] },
        'MN': { brackets: [{ bracket: 4300, rate: 0.02 }, { bracket: 8500, rate: 0.04 }, { bracket: Infinity, rate: 0.049 }, ] },
        'MO': { brackets: [{ bracket: 8932, rate: 0.01 }, { bracket: 21175, rate: 0.02 }, { bracket: 33421, rate: 0.04 }, { bracket: 46394, rate: 0.06 }, { bracket: 58634, rate: 0.08 }, { bracket: 299508, rate: 0.093 }, { bracket: 359407, rate: 0.103 }, { bracket: 599012, rate: 0.113 }, { bracket: 1000000, rate: 0.123 }, { bracket: Infinity, rate: 0.133 }] },
        'MT': { brackets: [{ bracket: 0, rate: 0.02 }, { bracket: 500, rate: 0.04 }, { bracket: 3000, rate: 0.05 }, ] },
        'NE': { brackets: [{ bracket: Infinity, rate: 0.00 }, ] },
        'NV': { brackets: [{ bracket: 4300, rate: 0.02 }, { bracket: 8500, rate: 0.04 }, { bracket: Infinity, rate: 0.049 }, ] },
        'NH': { brackets: [{ bracket: 8932, rate: 0.01 }, { bracket: 21175, rate: 0.02 }, { bracket: 33421, rate: 0.04 }, { bracket: 46394, rate: 0.06 }, { bracket: 58634, rate: 0.08 }, { bracket: 299508, rate: 0.093 }, { bracket: 359407, rate: 0.103 }, { bracket: 599012, rate: 0.113 }, { bracket: 1000000, rate: 0.123 }, { bracket: Infinity, rate: 0.133 }] },
        'NJ': { brackets: [{ bracket: 0, rate: 0.02 }, { bracket: 500, rate: 0.04 }, { bracket: 3000, rate: 0.05 }, ] },
        'NM': { brackets: [{ bracket: Infinity, rate: 0.00 }, ] },
        'NY': { brackets: [{ bracket: 4300, rate: 0.02 }, { bracket: 8500, rate: 0.04 }, { bracket: Infinity, rate: 0.049 }, ] },
        'NC': { brackets: [{ bracket: 8932, rate: 0.01 }, { bracket: 21175, rate: 0.02 }, { bracket: 33421, rate: 0.04 }, { bracket: 46394, rate: 0.06 }, { bracket: 58634, rate: 0.08 }, { bracket: 299508, rate: 0.093 }, { bracket: 359407, rate: 0.103 }, { bracket: 599012, rate: 0.113 }, { bracket: 1000000, rate: 0.123 }, { bracket: Infinity, rate: 0.133 }] },
        'ND': { brackets: [{ bracket: 0, rate: 0.02 }, { bracket: 500, rate: 0.04 }, { bracket: 3000, rate: 0.05 }, ] },
        'OH': { brackets: [{ bracket: Infinity, rate: 0.00 }, ] },
        'OK': { brackets: [{ bracket: 4300, rate: 0.02 }, { bracket: 8500, rate: 0.04 }, { bracket: Infinity, rate: 0.049 }, ] },
        'OR': { brackets: [{ bracket: 8932, rate: 0.01 }, { bracket: 21175, rate: 0.02 }, { bracket: 33421, rate: 0.04 }, { bracket: 46394, rate: 0.06 }, { bracket: 58634, rate: 0.08 }, { bracket: 299508, rate: 0.093 }, { bracket: 359407, rate: 0.103 }, { bracket: 599012, rate: 0.113 }, { bracket: 1000000, rate: 0.123 }, { bracket: Infinity, rate: 0.133 }] },
        'PA': { brackets: [{ bracket: 0, rate: 0.02 }, { bracket: 500, rate: 0.04 }, { bracket: 3000, rate: 0.05 }, ] },
        'RI': { brackets: [{ bracket: Infinity, rate: 0.00 }, ] },
        'SC': { brackets: [{ bracket: 4300, rate: 0.02 }, { bracket: 8500, rate: 0.04 }, { bracket: Infinity, rate: 0.049 }, ] },
        'SD': { brackets: [{ bracket: 8932, rate: 0.01 }, { bracket: 21175, rate: 0.02 }, { bracket: 33421, rate: 0.04 }, { bracket: 46394, rate: 0.06 }, { bracket: 58634, rate: 0.08 }, { bracket: 299508, rate: 0.093 }, { bracket: 359407, rate: 0.103 }, { bracket: 599012, rate: 0.113 }, { bracket: 1000000, rate: 0.123 }, { bracket: Infinity, rate: 0.133 }] },
        'TN': { brackets: [{ bracket: 0, rate: 0.02 }, { bracket: 500, rate: 0.04 }, { bracket: 3000, rate: 0.05 }, ] },
        'TX': { brackets: [{ bracket: Infinity, rate: 0.00 }, ] },
        'UT': { brackets: [{ bracket: 4300, rate: 0.02 }, { bracket: 8500, rate: 0.04 }, { bracket: Infinity, rate: 0.049 }, ] },
        'VT': { brackets: [{ bracket: 8932, rate: 0.01 }, { bracket: 21175, rate: 0.02 }, { bracket: 33421, rate: 0.04 }, { bracket: 46394, rate: 0.06 }, { bracket: 58634, rate: 0.08 }, { bracket: 299508, rate: 0.093 }, { bracket: 359407, rate: 0.103 }, { bracket: 599012, rate: 0.113 }, { bracket: 1000000, rate: 0.123 }, { bracket: Infinity, rate: 0.133 }] },
        'VA': { brackets: [{ bracket: 0, rate: 0.02 }, { bracket: 500, rate: 0.04 }, { bracket: 3000, rate: 0.05 }, ] },
        'WA': { brackets: [{ bracket: Infinity, rate: 0.00 }, ] },
        'WV': { brackets: [{ bracket: 4300, rate: 0.02 }, { bracket: 8500, rate: 0.04 }, { bracket: Infinity, rate: 0.049 }, ] },
        'WI': { brackets: [{ bracket: 8932, rate: 0.01 }, { bracket: 21175, rate: 0.02 }, { bracket: 33421, rate: 0.04 }, { bracket: 46394, rate: 0.06 }, { bracket: 58634, rate: 0.08 }, { bracket: 299508, rate: 0.093 }, { bracket: 359407, rate: 0.103 }, { bracket: 599012, rate: 0.113 }, { bracket: 1000000, rate: 0.123 }, { bracket: Infinity, rate: 0.133 }] },
        'WY': { brackets: [{ bracket: 0, rate: 0.02 }, { bracket: 500, rate: 0.04 }, { bracket: 3000, rate: 0.05 }, ] },
        











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
});
