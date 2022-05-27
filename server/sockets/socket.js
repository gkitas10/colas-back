const { io } = require('../server');
const {TicketControl}=require('../classes/ticket-control');

const ticketControl=new TicketControl();


io.on('connection', (client) => {
    client.on('nextTicket',(data,callback)=>{
        const nextTicket=ticketControl.nextTicket();
        console.log(nextTicket);
        callback(nextTicket);
    });

    client.emit('ticketStatus',{
        current:ticketControl.getLastTicket(),
        last4:ticketControl.getLast4()
    });

    client.on('assignTicket',(data,callback)=>{
        if(!data.computer){
            return callback({
                ok:false,
                msg:'Computer is required'
            }); 
        }
        let ticketAssigned = ticketControl.assignTicket(data.computer);
            callback(ticketAssigned);

            client.broadcast.emit('last4', {
                last4:ticketControl.getLast4()
            })
    });
});