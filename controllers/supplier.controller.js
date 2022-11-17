const {
  createSupplierServices,
  getSupplierServices,
  updateSupplierServices,
  getSuppliersServices,
} = require("../services/supplier.survices");

exports.createSupplier = async (req, res, next) => {
  try {
    const result = await createSupplierServices(req.body);

    res.status(200).json({
      status: "Success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Filed",
      error: "Could not create brand",
    });
  }
};

exports.getSupplier = async (req, res, next) => {
  try {
    const result = await getSuppliersServices();

    res.status(200).json({
      status: "Success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Filed",
      error: "Could not create brand",
    });
  }
};
exports.getSupplierById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const supplier = await getSupplierServices(id);

    if (!supplier) {
      return res.status(400).json({
        status: "failure",
        error: "Could not find brand with id",
      });
    }

    res.status(200).json({
      status: "Success",
      data: supplier,
    });
  } catch (error) {
    res.status(400).json({
      status: "Filed",
      error: "Could not create brand",
    });
  }
};

exports.updateSupplier = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await updateSupplierServices(id, req.body);
    if (!brand.nModified) {
      return res.status(400).json({
        status: "failure",
        error: "Could not update brand with id",
      });
    }
    res.status(200).json({
      status: "Success",
      message: "Successfully updated brand",
    });
  } catch (error) {
    res.status(400).json({
      status: "Filed",
      error: "Could not create brand",
    });
  }
};
