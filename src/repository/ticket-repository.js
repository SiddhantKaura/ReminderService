const { Op } = require("sequelize");
const { NotificationsTicket } = require("../models");

class TicketRepository {
  async getAll() {
    try {
      const tickets = await NotificationsTicket.findAll();
      return tickets;
    } catch (error) {
      throw error;
    }
  }

  async create(data) {
    try {
      return await NotificationsTicket.create(data);
    } catch (error) {
      throw error;
    }
  }

  async get(filter) {
    try {
      const tickets = await NotificationsTicket.findAll({
        where: {
          status: filter.status,
          notificationTime: { [Op.lte]: new Date() },
        },
      });
      return tickets;
    } catch (error) {
      throw error;
    }
  }

  async update(data) {
    try {
      return await NotificationsTicket.update(data, { where: { id: data.id } });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TicketRepository;
