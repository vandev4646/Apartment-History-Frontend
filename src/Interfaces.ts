//reminder: interface property names are kept short to reduce the amount of data transfered per api call
export interface DisplayTrend{
    n: string, //name
    aov: number, //average opening value
    aod: number, //average opening difference
    adv: number //average days vacant value
    add: number //average days vacant difference
}

export interface APIResponse{
    success: boolean,
    source: string,
    data: [DisplayTrend[], DisplayTrend[], DisplayTrend[]]
}