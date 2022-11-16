'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Spots',[
      {
        ownerId:1,
        address:'1345 silva Road',
        city:'Joshua Tree',
        state:'California',
        country:'United States',
        lat:30.09780,
        lng:-29.2983,
        name:'The Kellogg House',
        description:'This is the famous Kellogg Doolittle estate.',
        price:999
      },
      {
        ownerId:2,
        address:'346 Disney Land',
        city:'Los Angeles',
        state:'California',
        country:'United States',
        lat:40.09780,
        lng:-10.24590,
        name:'Villa Kuro',
        description:'Villa Kuro is a cool house.',
        price:369
      },
      {
        ownerId:3,
        address:'4555 velly Drive',
        city:'Yucca Valley',
        state:'California',
        country:'United States',
        lat:50.898874,
        lng:-20.0901,
        name:'Rum Runner',
        description:'Unique Joshua Tree experience you have been searching for.',
        price:145
      },
      {
        ownerId:1,
        address:'4523 green valley',
        city:'Joshua Tree',
        state:'California',
        country:'United States',
        lat:31.09784,
        lng:-28.2983,
        name:'Zebra Shadow',
        description:'Zebra Shadow is an idyllic setting for your experience.',
        price:338
      },
      {
        ownerId:2,
        address:'3370 west grassland',
        city:'Joshua Tree',
        state:'California',
        country:'United States',
        lat:31.09784,
        lng:-28.2983,
        name:"Lainis Cottage",
        description:'Located between Zion National Park.',
        price:80
      },
      {
        ownerId:2,
        address:'666 South Maryland',
        city:'Yucca Valley',
        state:'California',
        country:'United States',
        lat:31.09784,
        lng:-28.2983,
        name:'Hawk & Mesa',
        description:"Most Loved Retreat of 2021 on Sunset.com",
        price:80
      },
      {
        ownerId:3,
        address:'237 south lake road',
        city:'Big Bear',
        state:'California',
        country:'United States',
        lat:31.09784,
        lng:-28.2983,
        name:'Mid-Century Cabin',
        description:"Looking for a fun and kitschy place?",
        price:476
      },
      {
        ownerId:3,
        address:'1370 Solitude Dr',
        city:'Las Vegas',
        state:'Nevada',
        country:'United States',
        lat:31.09784,
        lng:-28.2983,
        name:'Chateau Sunset',
        description:"Single level pool and spa home in popular Las Vegas.",
        price:121
      },
      {
        ownerId:1,
        address:'917 rainbow blvd',
        city:'Las Vegas',
        state:'Nevada',
        country:'United States',
        lat:31.09784,
        lng:-28.2983,
        name:'Balcony Suite',
        description:"Spectacular 180° Strip Views",
        price:256
      },
      
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Spots', {
      name: {[Op.in]:['The Kellogg House', 'Rum Runner','Zebra Shadow','Lainis Cottage',"Hawk & Mesa",'Mid-Century Cabin','Chateau Sunset','Balcony Suite']}
    })
  }
};


//'Zebra Shadow','Lainis Cottage',"Hawk & Mesa",'Mid-Century Cabin','Chateau Sunset','Balcony Suite'