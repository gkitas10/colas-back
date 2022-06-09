const fs=require('fs');

class Ticket{
    constructor(number,computer){
        this.number=number;
        this.computer=computer;
    }
}

class TicketControl{
    constructor(){
        this.lastTicket=0;
        this.currentDay=new Date().getDate();
        this.tickets=[];
        this.last4=[];
        let data=require('../data/data.json');

        if(data.currentDay===this.currentDay){
            this.lastTicket=data.lastTicket;
            this.tickets=data.tickets;
            this.last4 = data.last4;
        }else{
            this.resetCount();
        }
    }

    nextTicket(){
        this.lastTicket+=1;
        let ticket=new Ticket(this.lastTicket,null);
        this.tickets.push(ticket);
        this.saveFile();
        return `Ticket ${this.lastTicket}`;
    }

    getTickets() {
        return this.tickets;
    }

    getLastTicket(){
        return `Ticket ${this.lastTicket}`;
    }

    getLast4() {
        return this.last4;
    }

    assignTicket(computer){
        if(this.tickets.length === 0){
            return 'There are no tickets'
        }

        let ticketAssigned = this.tickets.shift()
        ticketAssigned.computer = computer;
        this.last4.unshift(ticketAssigned)
        // let ticketAssigned=new Ticket(this.tickets[0].number,computer);
        // this.tickets.shift();
        // this.last4.unshift(ticketAssigned);

        if(this.last4.length>4){
            this.last4.splice(-1,1);
        }

        console.log('las4',this.last4);

        this.saveFile();

        return ticketAssigned;
    }

    resetCount(){
        this.lastTicket=0;
        this.tickets=[];
        this.last4=[];
        console.log('se ha inicializado el sistema');
        this.saveFile();
    }

    saveFile(){
        let jsonData={
            lastTicket:this.lastTicket,
            currentDay:this.currentDay,
            tickets:this.tickets,
            last4:this.last4
        }

        fs.writeFileSync('./server/data/data.json',JSON.stringify(jsonData));
    }
}

module.exports={
    TicketControl
}