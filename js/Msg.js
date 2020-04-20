class Msg{
    constructor(msg, date, user){
        this.msg = msg;
        this.date = date;
        this.user = user;
    }
    
    constructor(msg, date){
        this.msg = msg;
        this.date = date;
        this.user = "";
    }
}