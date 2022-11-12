export interface hamster {
    age: number,
    defeats: number,
    favFood: string,
    games: number,
    imgName: string,
    loves: string,
    name: string,
    wins: number,
    _id: string
}

export interface errorObjInterface {
    message: string,
    status: number
}

export interface GlobalErrorContent {
    errObj: errorObjInterface
    setErrObj:(c: string) => void
  }


export interface match {
    _id: string,
    winnerId: string,
    loserId: string
}

export interface bodyObjWinner {
    wins: any,
    games: any
}

export interface bodyObjLoser {
    defeats: any,
    games: any
}

export interface bodyObjMatch {
    winnerId: string,
    loserId: string
}

export interface inputI {
    name: string,
    age: number,
    favFood: string,
    loves: string,
    imgName: string
}

export interface matchObjI {
    _id: string,
    winnerId: string,
    loserId: string
}