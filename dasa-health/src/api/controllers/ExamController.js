const ExamRepository = require('../repositories/ExamRepository');

class ExamController {
  async index(req, res) {
    const exam = await ExamRepository.index();

    if (exam.error) {
      return res.status(400).send({ error: exam.error });
    }

    return res.json(exam);
  }

  async store(req, res) {
    const exam = await ExamRepository.store(req.body);

    if (exam.error) {
      return res.status(400).send({ error: exam.error });
    }

    return res.json(exam);
  }

  async update(req, res) {
    const { id } = req.params;
    const exam = await ExamRepository.update(id, req.body);

    if (exam.error) {
      return res.status(400).send({ error: exam.error });
    }

    return res.json(exam);
  }

  async destroy(req, res) {
    const { id } = req.params;
    const exam = await ExamRepository.destroy(id);

    if (exam.error) {
      return res.status(400).send({ error: exam.error });
    }

    return res.json(exam);
  }

  async toggleStatus(req, res) {
    const { id } = req.params;
    const exam = await ExamRepository.toggleStatus(id);

    if (exam.error) {
      return res.status(400).send({ error: exam.error });
    }

    return res.json(exam);
  }

  async associate(req, res) {
    const { id_exam, id_laboratory } = req.params;
    const exam = await ExamRepository.associate(id_exam, id_laboratory);

    if (exam.error) {
      return res.status(400).send({ error: exam.error });
    }

    return res.json(exam);
  }

  async associateDestroy(req, res) {
    const { id_exam, id_laboratory } = req.params;
    const exam = await ExamRepository.associateDestroy(id_exam, id_laboratory);

    if (exam.error) {
      return res.status(400).send({ error: exam.error });
    }

    return res.json(exam);
  }
}

module.exports = new ExamController();
