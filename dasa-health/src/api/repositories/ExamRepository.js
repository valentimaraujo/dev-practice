const { Exam, Laboratory } = require('../models');

class ExamRepository {
  async findOne(id) {
    return Exam.findByPk(id);
  }

  async index() {
    try {
      return await Exam.findAll({
        order: [['id', 'DESC']],
      });
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
