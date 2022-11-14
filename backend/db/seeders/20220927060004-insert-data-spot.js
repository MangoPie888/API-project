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
        name:'The Kellogg Doolittle House',
        description:'This is the famous Kellogg Doolittle estate in Joshua Tree California. It is one of the most exclusive homes in the world, and available for the first time as an Airbnb Luxe exclusive.',
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
        name:'Villa Kuro - A Serene and Minimal Hideaway',
        description:'Designed with tranquility and relaxation in mind, Villa Kuro is a minimal organic modern hideaway fusing natural simplicity with contemporary luxuries. Nestled on an unfenced 3.6 acres in front of a boulder hill, the property goes all the way up to the peak of the mountain. At night, the firepit and salt water hot tub offer an unparalleled stargazing experience.',
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
        name:'The Rum Runner - A Modern Desert Homesteader',
        description:'he Rum Runner. A modern take on the classic desert homesteader.This is the unique Joshua Tree experience you have been searching for.',
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
        description:'Zebra Shadow  is an idyllic setting for your desert experience.  Indoor & outdoor living, breathtaking views from each room, and objects curated to reflect the natural landscape encourage you to immerse yourself in the austere and tranquil beauty of your surroundings.',
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
        name:'Laini’s Cottage between Zion and Bryce',
        description:'Right off of Highway 89.  Located between Zion National Park and Bryce Canyon National Park in beautiful Southern Utah.  A  comforatable home with all the amenities you would need for your stay; right between two of the nations most popular National Parks.',
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
        name:'Hawk & Mesa - 120 Acres, Ft. in Travel + Leisure',
        description:"Named #1 Most Loved Retreat of 2021 on Sunset.com - This 'Cowboy Modern' desert retreat has majestic views, and a tiny eco footprint. Residential designer Jeremy Levine wanted to leave the lightest possible footprint on the surrounding landscape, with an energy-efficient, low-impact design. He also wanted to maximize the view from every room, creating a seamless flow from the house into nature.",
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
        name:'Mid-Century Chic "A-Frame" Cabin',
        description:"Looking for a fun and kitschy place to get away with friends or family? Our little two bedroom, one bath A-frame is a nod to Mad Men. We have free internet, a record player and a fun little pulp fiction collection if you want to step back in time. Poker chips and a giant deck with a fenced yard. Small but mighty!",
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
        description:"Be among the first to enjoy this mesmerizing, single level pool and spa home in popular Las Vegas suburb of Henderson, Nevada. Chateau Sunset, living up to its name with picturesque backyard mountainous sunset views, simply perfect for your Insta feed!",
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
        name:'STRIP VIEW Balcony Suite -No Resort Fee- Free Pool',
        description:" Spectacular 180° Strip Views",
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
      name: {[Op.in]:['ocean house', 'playland', 'App Open']}
    })
  }
};
