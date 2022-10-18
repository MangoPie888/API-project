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
      spotId:1,
      url:'https://media.cntraveler.com/photos/5d112d50c4d7bd806dbc00a4/master/pass/airbnb%20luxe.jpg',
      preview:true
    },
    {
      spotId:2,
      url:'https://a0.muscache.com/im/pictures/miso/Hosting-23565581/original/caee5da4-b514-491e-b663-ead19f5c47a2.jpeg?im_w=720',
      preview:true
    },
    {
      spotId:3,
      url:'https://www.reviewjournal.com/wp-content/uploads/2016/06/web1_airbnblasvegas_6598677.jpg',
      preview:true
    },
    {
      spotId:4,
      url:'https://www.territorysupply.com/wp-content/uploads/2021/01/vdara-airbnb-las-vegas.jpg',
      preview:true
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
    return queryInterface.bulkDelete('SpotImages', {
      url: {[Op.in]:['dsda.png','dsdaasd.jpag','asdd.png']}
    })
  }
};
