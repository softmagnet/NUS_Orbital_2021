export const type = () => ([
    {id: 1, value: "Business"},
    {id: 2, value: "IT & Software"},
    {id: 3, value: "Photography & Film"},
    {id: 4, value: "Arts & Crafts"},
    {id: 5, value: "Music"},
    {id: 6, value: "Health & Fitness"},
    {id: 7, value: "Sports"},
    {id: 8, value: "Gaming"},
    {id: 9, value: "Volunteer Work"},
    {id: 10, value: "Others"},
])

export const category = () => ([
    {id: 1, value: "Leisure Activity"},
    {id: 2, value: "Project"},
    {id: 3, value: "Competition"},
])

export const groupSize = () => ([
    {id: 1, value: 1},
    {id: 2, value: 2},
    {id: 3, value: 3},
    {id: 4, value: 4},
    {id: 5, value: 5},
    {id: 6, value: 6},
    {id: 7, value: 7},
    {id: 8, value: 8},
    {id: 9, value: 9},
    {id: 10, value: 10},
])

export const location = () => ([
    {id: 1, value: "Online"},
    {id: 2, value: "North"},
    {id: 3, value: "South"},
    {id: 4, value: "East"},
    {id: 5, value: "West"}, 
])

export const education = () => ([
    {id: 1, value: "Any"}, 
    {id: 3, value: "Secondary"}, 
    {id: 4, value: "Pre-University"}, 
    {id: 5, value: "Undergraduate"}, 
    {id: 6, value: "Other"},
])

//below here are selections for profile
export const day = () => {
    const res = []
    for (let i = 1; i < 32; i++) {
        res.push({id: i, value: i})
    }
    return res;
} 

export const month = () => {
    const mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const res = []
    for (let i = 0; i < 12; i++) {
        res.push({id: i+1, value: mL[i]})
    }
    return res;
} 

export const year = () => {
    const res = []
    let j = 1;
    for (let i = 2020; i > 1900; i--) {
        res.push({id: j++, value: i})
    }
    return res;
} 

export const eduYearStart = () => {
    const res = []
    let j = 1;
    for (let i = 1960; i < 2030; i++) {
        res.push({id: j++, value: i})
    }
    return res;
} 

export const eduYearEnd = () => {
    const res = []
    let j = 2;
    res.push({id: 1, value: 'current'})
    for (let i = 1960; i < 2030; i++) {
        res.push({id: j++, value: i})
    }
    return res;
}

export const expCategory = () => {
    return [
        {id: 1, value: 'Work'},
        {id: 1, value: 'Intership'},
        {id: 1, value: 'Personal Project'},
        {id: 1, value: 'Volunteering'},
        {id: 1, value: 'Others'}
    ]
}