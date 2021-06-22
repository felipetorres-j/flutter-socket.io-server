const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands= new Bands();

bands.addBand( new Band( 'Queen' ) );
bands.addBand( new Band( 'Bon Jovi' ) );
bands.addBand( new Band( 'Ed Sheeran' ) );
bands.addBand( new Band( 'The Chainsmokers ' ) );

//mensajes de sockets

io.on('connection', client => {
    console.log("Cliente conectado")

   client.emit('active-bands', bands.getBands() )

    client.on('disconnect', () => {
        console.log("Cliente desconectado")
     });

   client.on('mensaje', (payload)=> {
      console.log('Mensaje!!!', payload);

      io.emit('mensaje', {admin: 'nuevo mensaje'})
   });

   client.on('nuevo-mensaje', (payload)=> {
      console.log('nuevo Mensaje!!!', payload);
      client.broadcast.emit('nuevo-mensaje', payload)
   } );

   client.on('vote-band', function(payload){
      bands.voteBand(payload.id);
      io.emit('active-bands', bands.getBands() )
   });

   client.on('add-band', function(payload){
      const newBand = new Band(payload.name);
      bands.addBand(newBand);
      io.emit('active-bands', bands.getBands() );
   });

   client.on('delete-band', function(payload){
      bands.deleteBand(payload.id)
      io.emit('active-bands', bands.getBands() );
   });

  });