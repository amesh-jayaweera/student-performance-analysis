export interface dataset {
    label : string,
    data : number[],
    backgroundColor : string
}

export interface barChart {
    labels : string[],
    datasets : dataset[]
}

