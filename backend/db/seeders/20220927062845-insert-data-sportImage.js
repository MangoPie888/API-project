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
  return queryInterface.bulkInsert("SpotImages", [
    {
      spotId:4,
      url:'dsda.png',
      preview:true
    },
    {
      spotId:6,
      url:'dsdaasd.jpag',
      preview:false
    },
    {
      spotId:4,
      url:'asdd.png',
      preview:true
    }
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
    return queryInterface.bulkDelete('SpotImages', {
      url: {[Op.in]:['dsda.png','dsdaasd.jpag','asdd.png']}
    })
  }
};
