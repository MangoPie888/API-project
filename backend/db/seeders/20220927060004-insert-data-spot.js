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
        owerId:1,
        address:'1345 silva Road',
        city:'Los Angeles',
        state:'California',
        country:'USA',
        lat:30.09780,
        lng:-29.2983,
        name:'ocean house',
        description:'The house is big',
        price:129
      },
      {
        owerId:2,
        address:'346 Disney Land',
        city:'Los Angeles',
        state:'California',
        country:'USA',
        lat:40.09780,
        lng:-10.24590,
        name:'playland',
        description:'You can have a lot of fun here',
        price:369
      },
      {
        owerId:3,
        address:'4555 velly Drive',
        city:'San Francisco',
        state:'California',
        country:'USA',
        lat:50.898874,
        lng:-20.0901,
        name:'App Open',
        description:'Single room',
        price:60
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
