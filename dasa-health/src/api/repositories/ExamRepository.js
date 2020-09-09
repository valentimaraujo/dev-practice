const { Op } = require('sequelize');

const { Exam, Laboratory } = require('../models');

const enumType = ['analise clinica', 'imagem'];

class ExamRepository {
  async findOne(id) {
    return Exam.findByPk(id);
  }

  async index() {
    try {
      return await Exam.findAll({
        order: [['id', 'DESC']],
        where: {
          active: true,
        },
      });
    } catch (e) {
      return { error: e.message };
    }
  }

  async findLaboratoriesByExam(filter) {
    try {
      const { name } = filter;
      const exam = await Exam.findAll({
        order: [['id', 'DESC']],
        where: {
          name: { [Op.like]: `%${name}%` },
          active: true,
        },
        include: [
          {
            model: Laboratory,
            as: 'laboratories',
            required: true,
            through: { attributes: [] },
            attributes: ['name', 'address', 'active'],
            where: {
              active: true,
            },
          },
        ],
      });

      return exam;
    } catch (e) {
      return { error: e.message };
    }
  }

  async store(data) {
    try {
      const { name, type, active } = data;

      return await Exam.create({
        name, type, active,
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
          const { name, type, active } = v;

          if (name && type && enumType.includes(type)) {
            await Exam.create({
              name, type, active,
            });

            insertCount += 1;
          } else {
            errorCount += 1;
          }
        }));

        return { insert: insertCount, insertError: errorCount };
      }
      return { error: 'Exam lote invalid' };
    } catch (e) {
      return { error: e.message };
    }
  }

  async update(id, data) {
    try {
      const { name, type, active } = data;
      const update = await this.findOne(id);

      if (update) {
        return await update.update({ name, type, active });
      }

      return { error: 'Exam not found' };
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
            id, name, type, active,
          } = v;

          if (type && !enumType.includes(type)) {
            errorCount += 1;
          } else if (!Number.isNaN(Number(id))) {
            const update = await Exam.findByPk(id);
            if (update) {
              await update.update({ name, type, active });
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
      return { error: 'Exam lote invalid' };
    } catch (e) {
      return { error: e.message };
    }
  }

  async destroy(id) {
    try {
      const destroy = await this.findOne(id);

      if (destroy) {
        await destroy.destroy(id);
        return { message: 'Exam deleted with success' };
      }

      return { error: 'Exam not found' };
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
            const destroy = await Exam.findByPk(v);
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
      return { error: 'Exam lote invalid' };
    } catch (e) {
      return { error: e.message };
    }
  }

  async toggleStatus(id) {
    try {
      const toggle = await this.findOne(id);

      if (toggle) {
        const { active } = toggle;
        await toggle.update({ active: !active });
        return { message: 'status changed successfully', active: !active };
      }

      return { error: 'Exam not found' };
    } catch (e) {
      return { error: e.message };
    }
  }

  async associate(id_exam, id_laboratory) {
    try {
      const exam = await Exam.findOne({
        where: {
          id: id_exam,
          active: true,
        },
        include: [
          {
            association: 'laboratories',
            required: false,
            attributes: ['id'],
            where: [
              { id: id_laboratory },
            ],
          },
        ],
      });

      if (exam) {
        if (!exam.laboratories.length) {
          const laboratory = await Laboratory.findOne({
            where: {
              id: id_laboratory,
              active: true,
            },
          });

          if (laboratory) {
            await exam.addLaboratory(id_laboratory);
            return { message: 'associated successfully' };
          }
          return { error: 'Laboratory not found' };
        }

        return { error: 'exam is already associated with this laboratory' };
      }

      return { error: 'Exam not found' };
    } catch (e) {
      return { error: e.message };
    }
  }

  async associateDestroy(id_exam, id_laboratory) {
    try {
      const exam = await Exam.findOne({
        where: {
          id: id_exam,
          active: true,
        },
        include: [
          {
            association: 'laboratories',
            required: true,
            attributes: ['id'],
            where: [
              { id: id_laboratory },
            ],
          },
        ],
      });

      if (exam) {
        await exam.removeLaboratory(id_laboratory);
        return { message: 'association successfully removed' };
      }

      return { error: 'Association not found' };
    } catch (e) {
      return { error: e.message };
    }
  }
}

module.exports = new ExamRepository();
