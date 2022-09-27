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
  return queryInterface.bulkInsert('ReviewImages',[
    {
      reviewId:1,
      url:'fghfg.png',
    },
    {
      reviewId:1,
      url:'sdfsd.png',
    },
    {
      reviewId:2,
      url:'sdfsg.jpag',
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
    return queryInterface.bulkDelete('ReviewImages', {
      reviewId: {[Op.in]:[1,2]}
    })
  }
};
