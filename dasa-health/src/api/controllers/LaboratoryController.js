const LaboratoryRepository = require('../repositories/LaboratoryRepository');

class LaboratoryController {
  async index(req, res) {
    const laboratory = await LaboratoryRepository.index();

    if (laboratory.error) {
      return res.status(400).send({ error: laboratory.error });
    }

    return res.json(laboratory);
  }

  async storeLote(req, res) {
    const laboratory = await LaboratoryRepository.storeLote(req.body);

    if (laboratory.error) {
      return res.status(400).send({ error: laboratory.error });
    }

    return res.json(laboratory);
  }

  async store(req, res) {
    const laboratory = await LaboratoryRepository.store(req.body);

    if (laboratory.error) {
      return res.status(400).send({ error: laboratory.error });
    }

    return res.json(laboratory);
  }

  async updateLote(req, res) {
    const laboratory = await LaboratoryRepository.updateLote(req.body);

    if (laboratory.error) {
      return res.status(400).send({ error: laboratory.error });
    }

    return res.json(laboratory);
  }

  async update(req, res) {
    const { id } = req.params;
    const laboratory = await LaboratoryRepository.update(id, req.body);

    if (laboratory.error) {
      return res.status(400).send({ error: laboratory.error });
    }

    return res.json(laboratory);
  }

  async destroy(req, res) {
    const { id } = req.params;
    const laboratory = await LaboratoryRepository.destroy(id);

    if (laboratory.error) {
      return res.status(400).send({ error: laboratory.error });
    }

    return res.json(laboratory);
  }

  async destroyLote(req, res) {
    const laboratory = await LaboratoryRepository.destroyLote(req.body);

    if (laboratory.error) {
      return res.status(400).send({ error: laboratory.error });
    }

    return res.json(laboratory);
  }

  async toggleStatus(req, res) {
    const { id } = req.params;
    const laboratory = await LaboratoryRepository.toggleStatus(id);

    if (laboratory.error) {
      return res.status(400).send({ error: laboratory.error });
    }

    return res.json(laboratory);
  }
}

module.exports = new LaboratoryController();
