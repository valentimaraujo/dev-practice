const { Laboratory } = require('../models');

class LaboratoryRepository {
  async index() {
    try {
      return await Laboratory.findAll({
        order: [['id', 'DESC']],
        where: {
          active: true,
        },
      });
    } catch (e) {
      return { error: e.message };
    }
  }

  async storeLote(data) {
    try {
      if (data.length) {
        let insertCount = 0;
        let errorCount = 0;

        await Promise.all(data.map(async (v) => {
          const { name, address, active } = v;

          if (name && address) {
            await Laboratory.create({
              name, address, active,
            });

            insertCount += 1;
          } else {
            errorCount += 1;
          }
        }));

        return { insert: insertCount, insertError: errorCount };
      }
      return { error: 'Laboratory lote invalid' };
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

  async updateLote(data) {
    try {
      if (data.length) {
        let updateCount = 0;
        let errorCount = 0;

        await Promise.all(data.map(async (v) => {
          const {
            id, name, address, active,
          } = v;

          if (!Number.isNaN(Number(id))) {
            const update = await Laboratory.findByPk(id);
            if (update) {
              await update.update({ name, address, active });
              updateCount += 1;
            } else {
              errorCount += 1;
            }
          } else {
            errorCount += 1;
          }
        }));

        return { update: updateCount, updateError: errorCount };
      }
      return { error: 'Laboratory lote invalid' };
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

  async destroyLote(data) {
    try {
      if (data.length) {
        let destroyCount = 0;
        let errorCount = 0;

        await Promise.all(data.map(async (v) => {
          if (!Number.isNaN(Number(v))) {
            const destroy = await Laboratory.findByPk(v);
            if (destroy) {
              await destroy.destroy(v);
              destroyCount += 1;
            } else {
              errorCount += 1;
            }
          } else {
            errorCount += 1;
          }
        }));

        return { destroy: destroyCount, destroyError: errorCount };
      }
      return { error: 'Laboratory lote invalid' };
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
