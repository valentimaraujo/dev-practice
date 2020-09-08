const { Laboratory } = require('../models');

class LaboratoryRepository {
  async index() {
    try {
      return await Laboratory.findAll({
        order: [['id', 'DESC']],
      });
    } catch (e) {
      return { error: e.message };
    }
  }

  async store(data) {
    try {
      const { name, address, active } = data;

      return await Laboratory.create({
        name, address, active,
      });
    } catch (e) {
      return { error: e.message };
    }
  }

  async update(id, data) {
    try {
      const { name, address, active } = data;
      const update = await Laboratory.findByPk(id);

      if (update) {
        return await update.update({ name, address, active });
      }

      return { error: 'Laboratory not found' };
    } catch (e) {
      return { error: e.message };
    }
  }

  async destroy(id) {
    try {
      const destroy = await Laboratory.findOne({
        where: { id },
      });

      if (destroy) {
        await destroy.destroy(id);
        return { message: 'Laboratory deleted with success' };
      }

      return { error: 'Laboratory not found' };
    } catch (e) {
      return { error: e.message };
    }
  }

  async toggleStatus(id) {
    try {
      const toggle = await Laboratory.findByPk(id);

      if (toggle) {
        const { active } = toggle;
        await toggle.update({ active: !active });
        return { message: 'status changed successfully', active: !active };
      }

      return { error: 'Laboratory not found' };
    } catch (e) {
      return { error: e.message };
    }
  }
}

module.exports = new LaboratoryRepository();
